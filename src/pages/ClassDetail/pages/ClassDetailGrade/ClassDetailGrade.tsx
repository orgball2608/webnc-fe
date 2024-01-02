import { Card, CardHeader, Typography, Button, CardBody, CardFooter } from '@material-tailwind/react'
import { useEffect, useMemo, useState } from 'react'
import ModalManageGrade from 'src/components/ModalManageGrade'
import { useQuery } from '@tanstack/react-query'
import gradeCompositionApi from 'src/apis/grade-composition.api'
import { GradeComposition } from 'src/types/grade-composition.type'
import { useCourseDetail } from '../../ClassDetail'
import { CgExport } from 'react-icons/cg'
import ModalPreviewCSV from './ModalPreviewCSV'
import GradeBoardTable from './GradeBoardTable'
import gradeApi from 'src/apis/grade.api'
import { GradeBoard } from 'src/types/grade.type'
import excelApi from 'src/apis/excel.api'
import { downloadFile } from 'src/utils/utils'

export const HEADER_INDEX_KEY = 'index'
export const HEADER_STUDENT_ID_KEY = 'studentId'
export const HEADER_FULLNAME_KEY = 'fullName'

export default function ClassDetailGrade() {
  const { id: classId, data: courseDetailData } = useCourseDetail()

  const [isOpenModalEditGradeCompositions, setIsOpenModalEditGradeCompositions] = useState(false)
  const [isOpenModalAddGradeCompositions, setIsOpenModalAddGradeCompositions] = useState(false)
  const [isOpenModalSortGradeCompositions, setIsOpenModalSortGradeCompositions] = useState(false)
  const [gradeCompositions, setGradeCompositions] = useState<GradeComposition[]>([])

  const getGradeCompositionsQuery = useQuery({
    queryKey: ['courses', classId, 'grade-compositions'],
    queryFn: () => gradeCompositionApi.getGradeCompositions(classId as string),
    enabled: Boolean(classId)
  })

  const getGradeBoardQuery = useQuery({
    queryKey: ['courses', classId, 'grade-boards/final'],
    queryFn: () => gradeApi.getGradeBoard(classId as string),
    enabled: Boolean(classId)
  })

  const gradeBoardData = getGradeBoardQuery.data?.data.data

  const downloadGradeBoardQuery = useQuery({
    queryKey: ['grade-board'],
    queryFn: () => excelApi.exportGradeboard(classId as string),
    enabled: false
  })

  useEffect(() => {
    const gradeCompositions = getGradeCompositionsQuery.data?.data.data

    if (gradeCompositions && gradeCompositions.length > 0) {
      setNewGradeCompositions(gradeCompositions)
    }
  }, [getGradeCompositionsQuery.data?.data.data])

  const setNewGradeCompositions = (newData: GradeComposition[]) => {
    setGradeCompositions(newData)
  }

  const exportGradesBoardFile = async () => {
    try {
      const res = await downloadGradeBoardQuery.refetch()

      if (res && res.data?.data) {
        const outputFileName = `${courseDetailData?.name + '-' || ''}Gradeboard.xlsx`
        downloadFile(res.data.data, outputFileName)
      }
    } catch (error) {}
  }

  return !classId ? (
    <div>Something wrong</div>
  ) : (
    <>
      <Card className='h-full w-full shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='mb-8 flex items-center justify-between gap-8'>
            <div>
              <Typography variant='h2' color='blue-gray'>
                Bảng điểm
              </Typography>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            {/* <div className='w-full md:w-72'>
              <Input label='Search' icon={<IoSearchOutline className='h-5 w-5' />} />
            </div> */}

            <div className='ml-auto flex shrink-0 flex-col items-center gap-2 sm:flex-row'>
              <Button className='flex items-center gap-2' size='md' onClick={exportGradesBoardFile}>
                <span className='relative top-[-1px] text-lg'>
                  <CgExport />
                </span>
                Export grade board
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-auto px-0'>
          <GradeBoardTable
            gradeBoardData={gradeBoardData as GradeBoard}
            setIsOpenModalAddGradeCompositions={setIsOpenModalAddGradeCompositions}
            setIsOpenModalEditGradeCompositions={setIsOpenModalEditGradeCompositions}
            setIsOpenModalSortGradeCompositions={setIsOpenModalSortGradeCompositions}
          />
        </CardBody>
        {/* <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            Page 1 of 10
          </Typography>
          <div className='flex gap-2'>
            <Button variant='outlined' size='sm'>
              Previous
            </Button>
            <Button variant='outlined' size='sm'>
              Next
            </Button>
          </div>
        </CardFooter> */}
      </Card>

      {/* Edit modal */}
      <ModalManageGrade
        type='EDIT'
        classId={classId}
        open={isOpenModalEditGradeCompositions}
        handler={() => setIsOpenModalEditGradeCompositions(false)}
        gradeCompositions={gradeCompositions as GradeComposition[]}
      />

      {/* Add modal */}
      <ModalManageGrade
        type='ADD'
        classId={classId}
        open={isOpenModalAddGradeCompositions}
        handler={() => setIsOpenModalAddGradeCompositions(false)}
        gradeCompositions={gradeCompositions as GradeComposition[]}
      />

      {/* Sort modal */}
      <ModalManageGrade
        type='SORT'
        classId={classId}
        open={isOpenModalSortGradeCompositions}
        handler={() => setIsOpenModalSortGradeCompositions(false)}
        gradeCompositions={gradeCompositions as GradeComposition[]}
        setNewGradeCompositions={setNewGradeCompositions}
      />

      <ModalPreviewCSV />
    </>
  )
}
