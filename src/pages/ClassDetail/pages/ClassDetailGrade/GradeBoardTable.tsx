/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoPencil } from 'react-icons/io5'
import { Typography, IconButton, Tooltip, Input } from '@material-tailwind/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Dropdown, { DropdownItem } from 'src/components/Dropdown'
import { CgExport, CgImport } from 'react-icons/cg'
import { useEffect, useMemo, useState } from 'react'
import { GradeBoard, GradeBoardHeaderItem, GradeBoardRowItem } from 'src/types/grade.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import excelApi from 'src/apis/excel.api'
import { downloadFile, getExtension } from 'src/utils/utils'
import { useCourseDetail } from '../../ClassDetail'
import readXlsxFile from 'read-excel-file'
import { toast } from 'react-toastify'
import ModalPreviewCSV from './ModalPreviewCSV'
import { HEADER_FULLNAME_KEY, HEADER_INDEX_KEY, HEADER_STUDENT_ID_KEY } from './ClassDetailGrade'
import { cloneDeep, keyBy, orderBy } from 'lodash'
import gradeCompositionApi from 'src/apis/grade-composition.api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateGradeSchema, updateGradeSchema } from 'src/utils/rules'
import gradeReviewApi from 'src/apis/review-grade.api'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface Props {
  gradeBoardData: GradeBoard
  setIsOpenModalEditGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalAddGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalSortGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
}

type DataGradeUpdate = GradeBoardHeaderItem

export type CSVDataType = {
  fileName: string
  data: GradeBoard
  gradeCompositionId?: number
}

function GradeBoardTable({
  gradeBoardData,
  setIsOpenModalAddGradeCompositions,
  setIsOpenModalEditGradeCompositions,
  setIsOpenModalSortGradeCompositions
}: Props) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch
  } = useForm<UpdateGradeSchema>({
    resolver: zodResolver(updateGradeSchema)
  })

  const studentIdUpdate = watch('studentId')

  const { data: courseDetailData, id: classId } = useCourseDetail()

  const [dataGradeUpdate, setDataGradeUpdate] = useState<DataGradeUpdate | null>(null)
  const [dataCSVPreview, setDataCSVPreview] = useState<CSVDataType | null>(null)
  const [isOpenModalPreviewCSV, setIsOpenModalPreviewCSV] = useState(false)
  const [isLoadingCSV, setIsLoadingCSV] = useState(false)
  const [studentsFile, setStudentsFile] = useState<File | null>(null)
  const [gradesFile, setGradesFile] = useState<File | null>(null)

  const totalScale = useMemo(() => {
    if (gradeBoardData && gradeBoardData.headers && gradeBoardData.headers.length > 0) {
      return gradeBoardData.headers.slice(3).reduce((total, gradeComposition) => {
        const scale = Number(gradeComposition.metaData?.scale)
        if (isNaN(scale)) return total
        return total + scale
      }, 0)
    }
    return 0
  }, [gradeBoardData])

  const gradeCompositions = useMemo(() => {
    if (gradeBoardData && gradeBoardData.headers && gradeBoardData.headers.length > 0) {
      return gradeBoardData.headers.slice(3)
    }
    return []
  }, [gradeBoardData])

  const downloadStudentsTemplateQuery = useQuery({
    queryKey: ['students-template'],
    queryFn: excelApi.exportStudentsTemplate,
    enabled: false
  })

  const downloadGradesTemplateQuery = useQuery({
    queryKey: ['grades-template'],
    queryFn: () => excelApi.exportGradesTemplate(String(courseDetailData?.id)),
    enabled: false
  })

  const uploadStudentsFileMutation = useMutation({
    mutationFn: (body: FormData) => excelApi.importStudentsFile(String(courseDetailData?.id), body)
  })

  const uploadGradesFileMutation = useMutation({
    mutationFn: ({ gradeCompositionId, body }: { gradeCompositionId: number; body: FormData }) =>
      excelApi.importGrades(String(courseDetailData?.id), gradeCompositionId, body)
  })

  const markFinalizeMutation = useMutation({
    mutationFn: ({ gradeCompositionId, body }: { gradeCompositionId: number; body: any }) =>
      gradeCompositionApi.markFinalize(String(courseDetailData?.id), gradeCompositionId, body)
  })

  const updateGradeMutation = useMutation({
    mutationFn: (body: UpdateGradeSchema) =>
      gradeReviewApi.updateGrade(
        Number(dataGradeUpdate?.metaData?.courseId),
        String(dataGradeUpdate?.metaData?.id),
        Number(dataGradeUpdate?.metaData?.index),
        body
      )
  })

  useEffect(() => {
    if (!isOpenModalPreviewCSV) {
      setIsLoadingCSV(false)
      setDataCSVPreview(null)
    }
  }, [isOpenModalPreviewCSV])

  const exportStudentsTemplateFile = async () => {
    try {
      const res = await downloadStudentsTemplateQuery.refetch()

      if (res && res.data?.data) {
        const outputFileName = `${courseDetailData?.name}Students-Template.xlsx`
        downloadFile(res.data.data, outputFileName)
      }
    } catch (error) {}
  }

  const exportGradesTemplateFile = async (compositionName: string) => {
    try {
      const res = await downloadGradesTemplateQuery.refetch()

      if (res && res.data?.data) {
        const outputFileName = `${courseDetailData?.name}-${compositionName}-Template.xlsx`
        downloadFile(res.data.data, outputFileName)
      }
    } catch (error) {}
  }

  const onChangeStudentsInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const ext = getExtension(file.name)
      if (!['xlsx', 'xls', 'csv'].includes(ext)) {
        toast.error(t('pleaseUploadCorrectFormat'))
        return
      }
      setStudentsFile(file)
      try {
        setIsOpenModalPreviewCSV(true)

        const fileRows = await readXlsxFile(file)

        const extendedGradeBoardDataObject = keyBy(gradeBoardData?.rows, 'studentId')

        setDataCSVPreview(() => {
          const extendedGradeBoardData = cloneDeep(gradeBoardData)

          fileRows.slice(1).forEach((row) => {
            const studentId = Number(row[1])
            const fullName = String(row[2])

            if (extendedGradeBoardDataObject[studentId]) {
              const studentExistIndex = extendedGradeBoardData.rows.findIndex(
                (row) => row.studentId === String(studentId)
              )

              if (studentExistIndex !== -1) {
                extendedGradeBoardData.rows[studentExistIndex].fullName = fullName
              }
              return
            } else {
              const newRow = gradeCompositions.reduce((result, gradeComposition) => {
                return { ...result, [gradeComposition.key]: 0 }
              }, {})

              Object.assign(newRow, {
                studentId: studentId,
                fullName: fullName,
                totalGrade: 0
              })
              extendedGradeBoardData.rows.push(newRow as GradeBoardRowItem)
            }
          })

          extendedGradeBoardData.rows = orderBy(extendedGradeBoardData.rows, 'studentId', 'asc')

          return { fileName: file.name, data: extendedGradeBoardData }
        })
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    }
  }

  const onSubmitUploadFile = async () => {
    if (studentsFile) {
      const body = new FormData()
      body.append('file', studentsFile)
      await uploadStudentsFileMutation.mutateAsync(body)
      setIsOpenModalPreviewCSV(false)

      await queryClient.invalidateQueries({
        queryKey: ['courses', courseDetailData?.id.toString(), 'grade-boards/final']
      })
      toast.success(t('uploadStudentsSuccessful'))
    } else if (gradesFile && dataCSVPreview?.gradeCompositionId) {
      const body = new FormData()
      body.append('file', gradesFile)
      await uploadGradesFileMutation.mutateAsync({ gradeCompositionId: dataCSVPreview.gradeCompositionId, body })
      setIsOpenModalPreviewCSV(false)

      await queryClient.invalidateQueries({
        queryKey: ['courses', courseDetailData?.id.toString(), 'grade-boards/final']
      })
      toast.success(t('uploadGradesSuccessful'))
    }
  }

  const onChangeGradesInputFile =
    (gradeCompositionId: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const ext = getExtension(file.name)
        const compositionName = gradeBoardData.headers.find((header) => header.metaData?.id === gradeCompositionId)
          ?.key as string

        setGradesFile(file)

        if (!['xlsx', 'xls', 'csv'].includes(ext)) {
          toast.error(t('pleaseUploadCorrectFormat'))
          return
        }

        setIsOpenModalPreviewCSV(true)

        const fileRows = await readXlsxFile(file)

        setDataCSVPreview(() => {
          const extendedGradeBoardData = cloneDeep(gradeBoardData)

          for (const row of extendedGradeBoardData.rows) {
            for (let i = 1; i < fileRows.length; i++) {
              const grade = Number(fileRows[i][2])
              const studentId = String(fileRows[i][1])

              if (row.studentId === studentId) {
                row[compositionName] = grade
                break
              }
            }
          }

          return { gradeCompositionId, fileName: file.name, data: extendedGradeBoardData }
        })

        try {
        } catch (error) {
          if (error instanceof Error) toast.error(error.message)
        }
      }
    }

  const handleCheckboxChange = async (gradeCompositionId: number, e: any) => {
    try {
      const value = e.target.checked
      const body = {
        isFinalized: value
      }
      await markFinalizeMutation.mutateAsync({ gradeCompositionId, body })
      await queryClient.invalidateQueries({
        queryKey: ['courses', classId, 'grade-boards/final']
      })
    } catch (error) {}
  }

  const onSubmitUpdateGrade = handleSubmit(async (data) => {
    await updateGradeMutation.mutateAsync(data)
    await queryClient.invalidateQueries({
      queryKey: ['courses', classId, 'grade-boards/final']
    })
    setDataGradeUpdate(null)
    toast.success(t('updateGradeSuccessfully'))
  })

  return (
    <>
      <table className='mt-4 w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {gradeBoardData &&
              gradeBoardData.headers.length > 0 &&
              gradeBoardData.headers.map((header, index) => {
                if (header.key === HEADER_STUDENT_ID_KEY) return

                if (header.key === HEADER_FULLNAME_KEY) {
                  const uploadStudentsInputId = `upload-students-file-${index}`

                  return (
                    <th key={header.key} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                      <div className='flex gap-2'>
                        <Typography variant='small' color='blue-gray' className='text-base font-bold leading-none'>
                          {t('student')}
                        </Typography>

                        <Tooltip content={t('downloadStudentsTemplate')}>
                          <button
                            onClick={exportStudentsTemplateFile}
                            className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'
                          >
                            <CgExport />
                          </button>
                        </Tooltip>

                        <input
                          id={uploadStudentsInputId}
                          type='file'
                          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                          hidden
                          onChange={onChangeStudentsInputFile}
                          onClick={(event) => {
                            ;(event.target as any).value = null
                          }}
                        />

                        <Tooltip content={t('uploadStudentsList')}>
                          <label
                            htmlFor={uploadStudentsInputId}
                            className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'
                          >
                            <CgImport />
                          </label>
                        </Tooltip>
                      </div>
                    </th>
                  )
                }

                const uploadGradesInputId = `upload-grades-file-${index}`

                return (
                  <th key={header.key} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                    <div className='flex gap-2'>
                      <Typography variant='small' color='blue-gray' className='text-base font-bold leading-none'>
                        {header.label} {header.key !== HEADER_INDEX_KEY && ` (${header.metaData?.scale}%)`}
                      </Typography>

                      {header.key !== HEADER_INDEX_KEY && (
                        <>
                          <Tooltip content={t('markAsCompleted')}>
                            <input
                              onChange={(e) => handleCheckboxChange(header?.metaData?.id as number, e)}
                              type='checkbox'
                              defaultChecked={header?.metaData?.isFinalized}
                              className='text-blue-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                            />
                          </Tooltip>

                          <Tooltip content={t('downloadGradesTemplate')}>
                            <button
                              onClick={() => exportGradesTemplateFile(header.label)}
                              className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'
                            >
                              <CgExport />
                            </button>
                          </Tooltip>

                          <input
                            id={uploadGradesInputId}
                            type='file'
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            hidden
                            onChange={onChangeGradesInputFile(header.metaData?.id as number)}
                            onClick={(event) => {
                              ;(event.target as any).value = null
                            }}
                          />

                          <Tooltip content={t('uploadGradesList')}>
                            <label
                              htmlFor={uploadGradesInputId}
                              className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'
                            >
                              <CgImport />
                            </label>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </th>
                )
              })}
            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
              <Typography variant='small' color='blue-gray' className='font-bold leading-none opacity-70'>
                {t('total')} ({totalScale}%)
              </Typography>
            </th>
            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
              <Dropdown
                placement='bottom-start'
                render={() => (
                  <>
                    <DropdownItem onClick={() => setIsOpenModalAddGradeCompositions(true)}>{t('add')}</DropdownItem>
                    <DropdownItem onClick={() => setIsOpenModalEditGradeCompositions(true)}>{t('edit')}</DropdownItem>
                    <DropdownItem onClick={() => setIsOpenModalSortGradeCompositions(true)}>{t('sort')}</DropdownItem>
                  </>
                )}
              >
                <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                  <IconButton variant='text'>
                    <BsThreeDotsVertical className='h-4 w-4' />
                  </IconButton>
                </Typography>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody>
          {gradeBoardData?.rows &&
            gradeBoardData.rows.length > 0 &&
            gradeBoardData.rows.map((row, index) => {
              const isLast = index === gradeBoardData.rows.length - 1
              const classes = isLast ? 'p-4 text-center' : 'p-4 border-b border-blue-gray-50 text-center'

              return (
                <tr key={row.index}>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={`${classes} !text-left`}>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-col'>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {row.studentId}
                        </Typography>
                        <Typography variant='small' color='blue-gray' className='font-normal opacity-70'>
                          {row.fullName}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  {gradeCompositions.map((gradeComposition) => (
                    <td key={gradeComposition.key} className={classes}>
                      <div className='group flex items-center justify-center gap-2'>
                        {dataGradeUpdate &&
                        dataGradeUpdate.key === gradeComposition.key &&
                        studentIdUpdate === row.studentId ? (
                          <div className='flex'>
                            <div>
                              <input
                                {...register('grade')}
                                className={classNames(
                                  'h-[34px] w-[100px] rounded-l-md border border-gray-300 px-2 py-1 outline-none',
                                  {
                                    'border-red-400': Boolean(errors.grade?.message)
                                  }
                                )}
                              />
                            </div>

                            <button
                              onClick={() => setDataGradeUpdate(null)}
                              className={classNames(
                                'flex h-[34px] items-center justify-center border border-l-0 border-gray-300 bg-white px-2 text-sm text-black outline-none transition-colors duration-200',
                                {
                                  'cursor-not-allowed active:bg-none': updateGradeMutation.isPending,
                                  'active:bg-blue-gray-50': !updateGradeMutation.isPending
                                }
                              )}
                              disabled={updateGradeMutation.isPending}
                            >
                              {t('cancel')}
                            </button>
                            <button
                              onClick={onSubmitUpdateGrade}
                              className={classNames(
                                'flex h-[34px] items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-black px-2 text-sm text-white outline-none transition-colors duration-200',
                                {
                                  'cursor-not-allowed active:bg-none': updateGradeMutation.isPending,
                                  'active:bg-blue-gray-800': !updateGradeMutation.isPending
                                }
                              )}
                              disabled={updateGradeMutation.isPending}
                            >
                              {t('update')}
                            </button>
                          </div>
                        ) : (
                          <>
                            <Typography variant='small' color='blue-gray' className='font-normal'>
                              {row?.[gradeComposition.key] || 0}
                            </Typography>
                            {!gradeComposition.metaData?.isFinalized && (
                              <Tooltip content={t('updateGrade')}>
                                <IconButton
                                  variant='text'
                                  className='opacity-0 group-hover:opacity-100'
                                  size='sm'
                                  onClick={() => {
                                    const grade = String(row[gradeComposition.key])
                                    setDataGradeUpdate(gradeComposition)

                                    setValue('grade', grade)
                                    setValue('studentId', row.studentId)
                                  }}
                                >
                                  <IoPencil className='h-4 w-4' />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  ))}

                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-bold'>
                      {row.totalGrade}
                    </Typography>
                  </td>

                  <td className={classes}></td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <ModalPreviewCSV
        CSVData={dataCSVPreview as CSVDataType}
        gradeCompositions={gradeCompositions}
        isOpen={isOpenModalPreviewCSV}
        setIsOpen={setIsOpenModalPreviewCSV}
        isLoading={isLoadingCSV}
        onSubmit={onSubmitUploadFile}
        disabled={uploadStudentsFileMutation.isPending || uploadGradesFileMutation.isPending}
      />
    </>
  )
}

export default GradeBoardTable
