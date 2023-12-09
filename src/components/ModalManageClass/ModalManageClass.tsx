import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import courseApi from 'src/apis/courses.api'
import { ErrorResponseApi } from 'src/types/utils.type'
import { ClassSchema, classSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

interface Props {
  open: boolean
  handler: () => void
}

type FormData = ClassSchema

function ModalManageClass({ open, handler }: Props) {
  const queryClient = useQueryClient()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(classSchema)
  })

  const createClassMutation = useMutation({
    mutationKey: ['create-class'],
    mutationFn: courseApi.createCourse
  })

  const onSubmit = handleSubmit((data) => {
    createClassMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['classes']
        })
        handler()
        reset()
        toast.success('Tạo lớp học thành công!')
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

  return (
    <>
      <Dialog size='sm' open={open} handler={handler} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className='flex flex-col gap-4'>
            <h4 className='mb-4 text-base font-medium text-primary'>Tạo lớp học</h4>
            <form onSubmit={onSubmit}>
              <div className='mb-2'>
                <Input
                  {...register('name')}
                  className='!text-base !text-primary'
                  variant='standard'
                  label='Tên lớp học (bắt buộc)'
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.name?.message}
                </p>
              </div>
              <div className='mb-2'>
                <Input
                  {...register('description')}
                  className='!text-base !text-primary'
                  variant='standard'
                  label='Phần'
                />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.description?.message}
                </p>
              </div>

              <div className='mb-2'>
                <Input {...register('topic')} className='!text-base !text-primary' variant='standard' label='Chủ đề' />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.topic?.message}
                </p>
              </div>

              <div className='mb-2'>
                <Input {...register('room')} className='!text-base !text-primary' variant='standard' label='Phòng' />
                <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                  {errors.room?.message}
                </p>
              </div>
            </form>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth>
              Hủy
            </Button>
            <Button variant='filled' className='flex-1 bg-primary text-sm' onClick={onSubmit} fullWidth>
              Tạo
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default ModalManageClass