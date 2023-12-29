import { Button, Card, CardBody, CardFooter, Dialog, Input } from '@material-tailwind/react'
import { LuCheck, LuCopy } from 'react-icons/lu'
import IconButton from '../IconButton'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InvitationSchema, invitationSchema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import courseApi from 'src/apis/courses.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { useLocation } from 'react-router-dom'

type FormData = InvitationSchema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InviteFormModal({ isInviteModalOpen, setIsInviteModalOpen, isRole, role, profile }: any) {
  const currentURL = window.location.href
  const inviteLink = currentURL.replace('/people', `/invite?scr=${profile.id}`)
  const [isCopied, setIsCopied] = useState(false)
  const { classId } = useParams()
  const formSchema = invitationSchema.pick({ email: true })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })
  const invitationMutation = useMutation({
    mutationKey: ['invitation'],
    mutationFn: courseApi.inviteUserByEmail
  })

  const Role = isRole === role.teachers ? 'teacher' : 'student'

  const onSubmit = handleSubmit((data) => {
    const invitationData = {
      email: data.email as string,
      courseId: classId as string,
      role: Role
    }

    invitationMutation.mutate(invitationData, {
      onSuccess: () => {
        reset()
        toast.success('Gửi email thành công!')
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<{ message: { fieldName: keyof FormData; errorMessage: string }[] }>(error)
        ) {
          const formError = error.response?.data.message

          if (formError) {
            formError.forEach((item) => {
              setError(item.fieldName, {
                message: item.errorMessage,
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  const handleClickCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(inviteLink)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      <Dialog size='sm' open={isInviteModalOpen} handler={setIsInviteModalOpen} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className='flex flex-col gap-4'>
            <h4 className='mb-4 text-base font-medium text-primary'>Mời {isRole}</h4>
            <form>
              {isRole === role.students && (
                <div>
                  <p className='mb-2 text-sm font-medium'>Link mời</p>
                  <div className='mb-4 flex items-center'>
                    <p className='= w-full overflow-hidden text-ellipsis text-third'>{inviteLink}</p>
                    <IconButton
                      Icon={isCopied ? <LuCheck /> : <LuCopy />}
                      tooltip='copy link'
                      mode='dark'
                      onClick={handleClickCopy}
                    />
                  </div>
                  <hr className='border-t-[2px]' />
                </div>
              )}
              <div className='my-6'>
                <Input {...register('email')} variant='standard' label='Email' containerProps={{ className: 'mb-4' }} />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.email?.message as string}
                </p>
              </div>
            </form>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={() => setIsInviteModalOpen(false)} fullWidth>
              Hủy
            </Button>
            <Button
              variant='gradient'
              className='flex-1 text-sm'
              onClick={onSubmit}
              disabled={invitationMutation.isPending}
              fullWidth
            >
              Mời
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}
