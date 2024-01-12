import { Button, Dialog, Card, CardBody, CardFooter } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import courseApi from 'src/apis/courses.api'
import { Member } from 'src/types/course.type'

interface Props {
  isDeleteModalOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsDeleteModalOpen: any
  UserData: Member & {
    studentId?: string
  }
}
function DeleteMemberModal({ isDeleteModalOpen, setIsDeleteModalOpen, UserData }: Props) {
  const { t } = useTranslation()

  const handler = () => setIsDeleteModalOpen(false)
  const queryClient = useQueryClient()
  const { classId } = useParams()

  const deleteMemberMutation = useMutation({
    mutationKey: ['delete-member'],
    mutationFn: courseApi.deleteMember
  })

  const onSubmit = () => {
    const courseId = classId as string
    const userId = String(UserData?.id) as string
    deleteMemberMutation.mutate(
      { courseId, userId },
      {
        onSuccess: async () => {
          handler()
          await queryClient.invalidateQueries({
            queryKey: ['members']
          })

          toast.success(t('deleteMemberSuccessfully'))
        }
      }
    )
  }

  return (
    <>
      <Dialog
        size='xs'
        open={isDeleteModalOpen}
        handler={() => setIsDeleteModalOpen(false)}
        className='bg-transparent shadow-none'
      >
        <Card className='mx-auto w-full'>
          <CardBody className=''>
            <h4 className='mb-4 text-center text-lg font-medium text-primary'>
              {t('confirmDelete', {
                delete: UserData?.firstName + ' ' + UserData?.lastName
              })}
            </h4>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth>
              {t('cancel')}
            </Button>
            <Button
              color='red'
              variant='filled'
              className='flex-1 text-sm text-white'
              onClick={onSubmit}
              disabled={deleteMemberMutation.isPending}
              fullWidth
            >
              {t('delete')}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default DeleteMemberModal
