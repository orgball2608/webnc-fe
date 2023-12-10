import { Button, Dialog, Card, CardBody, CardFooter } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

  const unsubscribeClassMutation = useMutation({
    mutationKey: ['unsubscribe-class', courseData.id],
    mutationFn: courseApi.deleteCourse
  })

  const onSubmit = () => {
    unsubscribeClassMutation.mutate(String(courseData.id), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['classes']
        })

        handler()
        toast.success('Tạo lớp học thành công!')
      }
    })
  }

  return (
    <>
      <Dialog size='xs' open={open} handler={handler} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className=''>
            <h4 className='mb-4 text-base font-medium text-primary'>Xóa {courseData.name}?</h4>
            <p className='mb-[14px] text-sm'>
              Bạn sẽ không còn quyền truy cập vào bất kỳ bài đăng hoặc nhận xét nào đã được thêm vào lớp học này.
            </p>
            <p className='text-sm font-medium'>Bạn không thể hoàn tác hành động này.</p>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth>
              Hủy
            </Button>
            <Button color='red' variant='filled' className='flex-1 text-sm text-white' onClick={onSubmit} fullWidth>
              Xóa
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default ModalUnsubscribeClass
