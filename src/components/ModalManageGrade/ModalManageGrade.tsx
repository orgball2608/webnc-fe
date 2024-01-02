import { Button, Dialog, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import IconButton from '../IconButton'
import { MdDragIndicator } from 'react-icons/md'
import { IoCloseOutline } from 'react-icons/io5'
import { useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { DndItem, DndList, DndTrigger } from '../DragAndDrop'
import { GradeCompositionSchema, GradeCompositionsSchema, gradeCompositionsSchema } from 'src/utils/rules'
import { zodResolver } from '@hookform/resolvers/zod'
import { GradeComposition } from 'src/types/grade-composition.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import gradeCompositionApi, { GradeCompositionRequestBody } from 'src/apis/grade-composition.api'
import { toast } from 'react-toastify'

interface Props {
  type: 'ADD' | 'EDIT' | 'SORT'
  classId: string
  open: boolean
  handler: () => void
  gradeCompositions?: GradeComposition[]
  setNewGradeCompositions?: (data: GradeComposition[]) => void
}

type FormData = GradeCompositionsSchema

function ModalManageGrade({ type, classId, open, handler, gradeCompositions, setNewGradeCompositions }: Props) {
  const queryClient = useQueryClient()

  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      grades: [{ name: '', scale: '' }]
    },
    resolver: zodResolver(gradeCompositionsSchema, undefined, { raw: true })
  })

  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'grades', // unique name for your Field Array
    keyName: '_id'
  })

  const createGradeCompositionMutation = useMutation({
    mutationFn: (body: GradeCompositionRequestBody) => gradeCompositionApi.createGradeComposition(classId, body)
  })

  const updateGradeCompositionMutation = useMutation({
    mutationFn: (body: GradeCompositionRequestBody) => gradeCompositionApi.updateGradeComposition(classId, body)
  })

  const deleteGradeCompositionMutation = useMutation({
    mutationFn: (gradeCompositionId: number) => gradeCompositionApi.deleteGradeComposition(classId, gradeCompositionId)
  })

  const sortGradeCompositionsMutation = useMutation({
    mutationFn: ({ firstId, secondId }: { firstId: number; secondId: number }) =>
      gradeCompositionApi.sortGradeCompositions(classId, firstId, secondId)
  })

  const [deleteIds, setDeleteIds] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      reset()
      setDeleteIds([])
    }
  }, [open])

  useEffect(() => {
    if (open && gradeCompositions && gradeCompositions.length > 0) {
      const grades = gradeCompositions.map<GradeCompositionSchema>((grade) => ({
        id: grade.id,
        name: grade.name,
        scale: grade.scale.toString()
      }))

      setValue('grades', grades as GradeCompositionSchema[])
    }
  }, [gradeCompositions, open])

  useEffect(() => {
    if ((errors as any).ununiqueGradeCompositionName) {
      toast.error((errors as any).ununiqueGradeCompositionName.message)
    }
  }, [(errors as any).ununiqueGradeCompositionName])

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (newIndex === oldIndex) return

    setIsLoading(true)

    sortGradeCompositionsMutation.mutate(
      {
        firstId: fields[oldIndex].id as number,
        secondId: fields[newIndex].id as number
      },
      {
        onSuccess: async (res) => {
          setNewGradeCompositions && setNewGradeCompositions(res.data.data)
          await queryClient.invalidateQueries({ queryKey: ['courses', classId, 'grade-boards/final'] })
          toast.success('Sắp xếp điểm thành phần thành công!')
        },
        onSettled: () => {
          setIsLoading(false)
        }
      }
    )

    move(oldIndex, newIndex)
  }

  const handleDeleteGrade = ({ gradeIndex, gradeId }: { gradeIndex: number; gradeId?: number }) => {
    remove(gradeIndex)

    if (type === 'EDIT' && gradeId) {
      setDeleteIds((prev) => [...prev, gradeId])
    }
  }

  const calculateTotalScale = () => {
    const grades = watch().grades

    return grades.reduce((total, grade) => {
      const scale = +grade.scale
      if (isNaN(scale)) return total
      return total + scale
    }, 0)
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      if (type === 'ADD') {
        for (const gradeComposition of data.grades) {
          if (!gradeComposition.id) {
            await createGradeCompositionMutation.mutateAsync({
              name: gradeComposition.name,
              scale: +gradeComposition.scale
            })
          }
        }

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['courses', classId, 'grade-compositions'] }),
          queryClient.invalidateQueries({ queryKey: ['courses', classId, 'grade-boards/final'] })
        ])

        handler()
        toast.success('Thêm điểm thành phần thành công!')
      } else if (type === 'EDIT') {
        if (deleteIds.length > 0) {
          for (const deleteId of deleteIds) {
            await deleteGradeCompositionMutation.mutateAsync(deleteId)
          }
        }

        const updateGradeCompositionsPromises = data.grades
          .filter((gradeComposition) => !deleteIds.includes(gradeComposition.id as number))
          .map((gradeComposition) => {
            return updateGradeCompositionMutation.mutateAsync({
              name: gradeComposition.name,
              scale: +gradeComposition.scale,
              id: gradeComposition.id as number
            })
          })

        await Promise.all(updateGradeCompositionsPromises)

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['courses', classId, 'grade-compositions'] }),
          queryClient.invalidateQueries({ queryKey: ['courses', classId, 'grade-boards/final'] })
        ])

        handler()
        toast.success('Cập nhật điểm thành phần thành công!')
      }
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <>
      <Dialog
        size='sm'
        open={open}
        handler={handler}
        className='bg-transparent shadow-none'
        dismiss={{ escapeKey: !isLoading }}
      >
        <Card className='mx-auto w-full'>
          <CardBody className='flex max-h-[calc(100vh-200px)] flex-col gap-4 overflow-auto'>
            <h4 className='mb-4 text-base font-medium text-primary'>
              {type === 'ADD' ? 'Thêm điểm thành phần' : 'Chỉnh sửa điểm thành phần'}
            </h4>
            <form onSubmit={handler}>
              <DndList
                lockAxis='y'
                lockToContainerEdges={true}
                useDragHandle
                onSortEnd={onSortEnd}
                helperClass='z-[9999] bg-white/80 shadow-md'
              >
                {/* {type === 'ADD' &&
                  gradeCompositions &&
                  gradeCompositions.length > 0 &&
                  gradeCompositions.map((gradeComposition) => (
                    <div key={gradeComposition.id} className='mb-2 grid grid-cols-12 gap-2'>
                      <div className='col-span-7 flex'>
                        <div className='mr-2 mt-[14px] min-w-[20px] cursor-move text-xl'></div>
                        <div>
                          <Input
                            className='!text-base !text-primary disabled:cursor-not-allowed disabled:border-b disabled:bg-inherit disabled:opacity-50'
                            variant='standard'
                            disabled
                            defaultValue={gradeComposition.name}
                          />
                          <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'></p>
                        </div>
                      </div>
                      <div className='col-span-3'>
                        <Input
                          className='!text-base !text-primary disabled:cursor-not-allowed disabled:border-b disabled:bg-inherit disabled:opacity-50'
                          containerProps={{ className: 'min-w-min' }}
                          variant='standard'
                          disabled
                          defaultValue={gradeComposition.scale}
                        />
                        <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'></p>
                      </div>
                      <div className='col-span-2 flex flex-col'>
                        <div className='flex flex-1 items-center justify-center'></div>
                        <div className='h-[20px] w-full'></div>
                      </div>
                    </div>
                  ))} */}
                {fields.map((field, index) => {
                  return (
                    <DndItem index={index} key={field._id} className='mb-2 grid grid-cols-12 gap-2'>
                      <div className='col-span-7 flex'>
                        {type === 'SORT' && (
                          <DndTrigger className='mr-2 mt-[14px] min-w-[20px] cursor-move text-xl'>
                            <MdDragIndicator />
                          </DndTrigger>
                        )}
                        <div>
                          <Input
                            {...register(`grades.${index}.name`, { required: true })}
                            className='!text-base !text-primary disabled:cursor-not-allowed disabled:border-b disabled:bg-inherit disabled:opacity-50'
                            variant='standard'
                            label={`Điểm thành phần ${index + 1}`}
                            disabled={type === 'ADD' && Boolean(field.id)}
                          />
                          <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                            {errors.grades?.[index]?.name?.message}
                          </p>
                        </div>
                      </div>
                      <div className='col-span-3'>
                        <Input
                          {...register(`grades.${index}.scale`, { required: true })}
                          className='!text-base !text-primary disabled:cursor-not-allowed disabled:border-b disabled:bg-inherit disabled:opacity-50'
                          containerProps={{ className: 'min-w-min' }}
                          variant='standard'
                          label={`Tỉ lệ ${index + 1}`}
                          disabled={type === 'ADD' && Boolean(field.id)}
                        />
                        <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                          {errors.grades?.[index]?.scale?.message}
                        </p>
                      </div>
                      <div className='col-span-2 flex flex-col'>
                        <div className='flex flex-1 items-center justify-center'>
                          {fields.length > 1 && ((type === 'ADD' && !Boolean(field.id)) || type === 'EDIT') && (
                            <IconButton
                              className=''
                              Icon={<IoCloseOutline />}
                              mode='dark'
                              onClick={() => handleDeleteGrade({ gradeIndex: index, gradeId: field.id })}
                            />
                          )}
                        </div>
                        <div className='h-[20px] w-full'></div>
                      </div>
                    </DndItem>
                  )
                })}
              </DndList>

              {/* Placeholder */}
              <div className='mb-2 grid grid-cols-12 gap-2'>
                <div className='col-span-7'>
                  <div className='mb-[20px] w-[200px]'>
                    {type === 'ADD' && (
                      <button
                        type='button'
                        onClick={() => {
                          append({ name: '', scale: '' })
                        }}
                        className='text-14 h-11 w-full cursor-text border-b border-b-[#b0bec5] pb-[6px] pt-4 text-left text-sm text-[#607d8b]'
                      >
                        Thêm điểm thành phần
                      </button>
                    )}
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='border-b border-b-[#b0bec5] pb-[6px] pt-4 text-sm font-medium text-black'>
                    Tổng: {calculateTotalScale()}%
                  </div>
                  <p className='ml-1 flex min-h-[20px] items-center gap-1 text-xs font-normal text-red-400'>
                    {(errors as any)?.totalScale?.message}
                  </p>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={handler} fullWidth disabled={isLoading}>
              {type === 'SORT' ? 'Đóng' : 'Hủy'}
            </Button>
            {type !== 'SORT' && (
              <Button
                variant='filled'
                className='flex-1 bg-primary text-sm'
                onClick={onSubmit}
                fullWidth
                disabled={isLoading}
              >
                Lưu
              </Button>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default ModalManageGrade
