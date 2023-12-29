import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import courseApi from 'src/apis/courses.api'
import { classCodeSchema, ClassCodeSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

interface Props {
  open: boolean
  handler: () => void
}

type FormData = ClassCodeSchema

export default function JoinClassModal({ open, handler }: Props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const currentURL = useLocation().pathname

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(classCodeSchema)
  })

  const joinClassMutation = useMutation({
    mutationKey: ['join-class-by-code'],
    mutationFn: (body: ClassCodeSchema) => courseApi.joinCourseByCode(body)
  })

  const onSubmit = handleSubmit((data) => {
    joinClassMutation.mutate(data, {
      onSuccess: async (res) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['teaching-list']
          }),

          queryClient.invalidateQueries({
            queryKey: ['enrolled-list']
          }),
          queryClient.invalidateQueries({
            queryKey: ['classes']
          })
        ])
        const course = res.data.data
        console.log(course)
        const classURL = currentURL.replace(`/home`, `class/${course?.courseId}/news`)
        handler()
        reset()
        toast.success('Tham gia lớp học thành công!')
        console.log(classURL)
        navigate(classURL)
      },
      onError: (error) => {
        reset()
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

  return (
    <>
      <Dialog size='sm' open={open} handler={handler} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className='flex flex-col gap-4'>
            <h4 className='mb-4 text-base font-medium text-primary'>Tham gia lớp học</h4>
            <form onSubmit={onSubmit}>
              <div className='mb-2'>
                <Input
                  {...register('classCode')}
                  className='!text-base !text-primary'
                  variant='standard'
                  label='Class code'
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.classCode?.message}
                </p>
              </div>
            </form>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth>
              Hủy
            </Button>
            <Button
              variant='filled'
              className='flex-1 bg-primary text-sm'
              onClick={onSubmit}
              fullWidth
              disabled={joinClassMutation.isPending}
            >
              Tham gia
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}
