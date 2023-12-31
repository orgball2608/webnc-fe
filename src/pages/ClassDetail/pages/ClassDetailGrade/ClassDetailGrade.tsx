import { IoSearchOutline } from 'react-icons/io5'
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter } from '@material-tailwind/react'
import { useEffect, useMemo, useState } from 'react'
import ModalManageGrade from 'src/components/ModalManageGrade'
import { useQuery } from '@tanstack/react-query'
import gradeCompositionApi from 'src/apis/grade-composition.api'
import { GradeComposition } from 'src/types/grade-composition.type'
import { CSVLink } from 'react-csv'
import { useCourseDetail } from '../../ClassDetail'
import Papa from 'papaparse'
import { CgExport, CgImport } from 'react-icons/cg'
import ModalPreviewCSV from './ModalPreviewCSV'
import GradeBoardTable from './GradeBoardTable'

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

  const gradeCompositionsCSVDataExport = useMemo(() => {
    if (gradeCompositions && gradeCompositions.length > 0) {
      const headers = gradeCompositions.map((gradeComposition) => {
        return gradeComposition.name
      })

      return [headers]
    }
    return []
  }, [gradeCompositions])

  useEffect(() => {
    const gradeCompositions = getGradeCompositionsQuery.data?.data.data

    if (gradeCompositions && gradeCompositions.length > 0) {
      setNewGradeCompositions(gradeCompositions)
    }
  }, [getGradeCompositionsQuery.data?.data.data])

  const setNewGradeCompositions = (newData: GradeComposition[]) => {
    setGradeCompositions(newData)
  }

  // Import CSV
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = []
          const valuesArray = []

          console.log(results)

          // Iterating data to get column name and their values
          // results.data.map((d) => {
          //   rowsArray.push(Object.keys(d));
          //   valuesArray.push(Object.values(d));
          // });
          // console.log(rowsArray, valuesArray);

          // // Parsed Data Response in array format
          // setParsedData(results.data);

          // // Filtered Column Names
          // setTableRows(rowsArray[0]);

          // // Filtered Values
          // setValues(valuesArray);
        }
      })
    }
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
            <div className='w-full md:w-72'>
              <Input label='Search' icon={<IoSearchOutline className='h-5 w-5' />} />
            </div>

            <div className='flex shrink-0 flex-col items-center gap-2 sm:flex-row'>
              <div>
                <input hidden id='read-csv-input' type='file' name='file' accept='.csv' onChange={changeHandler} />

                <label
                  className='flex h-[42px] cursor-pointer select-none items-center gap-2 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  htmlFor='read-csv-input'
                >
                  <span className='relative top-[-1px] text-lg'>
                    <CgImport />
                  </span>
                  Import
                </label>
              </div>

              <CSVLink data={gradeCompositionsCSVDataExport} filename={`${courseDetailData?.name}.csv`}>
                <Button className='flex items-center gap-2' size='md'>
                  <span className='relative top-[-1px] text-lg'>
                    <CgExport />
                  </span>
                  Export
                </Button>
              </CSVLink>
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-auto px-0'>
          <GradeBoardTable
            gradeCompositions={gradeCompositions}
            setIsOpenModalAddGradeCompositions={setIsOpenModalAddGradeCompositions}
            setIsOpenModalEditGradeCompositions={setIsOpenModalEditGradeCompositions}
            setIsOpenModalSortGradeCompositions={setIsOpenModalSortGradeCompositions}
          />
        </CardBody>
        <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
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
        </CardFooter>
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
