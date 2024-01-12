import { Button, Dialog, Card, CardBody, CardFooter } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import courseApi from 'src/apis/courses.api'
import { CourseItem } from 'src/types/course.type'

interface Props {
  open: boolean
  handler: () => void
  courseData: CourseItem
}

function ModalUnsubscribeClass({ open, handler, courseData }: Props) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const unsubscribeClassMutation = useMutation({
    mutationKey: ['unsubscribe-class', courseData.id],
    mutationFn: courseApi.deleteCourse
  })

  const onSubmit = () => {
    unsubscribeClassMutation.mutate(String(courseData.id), {
      onSuccess: async () => {
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

        handler()
        toast.success(t('deleteClassSuccessfully'))
      }
    })
  }
  return (
    <>
      <Dialog size='xs' open={open} handler={handler} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className=''>
            <h4 className='mb-4 text-base font-medium text-primary'>
              {t('delete')} {courseData.name}?
            </h4>
            <p className='mb-[14px] text-sm'>{t('unpermissionClass')}</p>
            <p className='text-sm font-medium'>{t('cannotUndo')}</p>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth>
              {t('cancel')}
            </Button>
            <Button color='red' variant='filled' className='flex-1 text-sm text-white' onClick={onSubmit} fullWidth>
              {t('delete')}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default ModalUnsubscribeClass
