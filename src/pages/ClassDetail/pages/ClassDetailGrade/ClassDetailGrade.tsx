import { IoSearchOutline, IoPencil } from 'react-icons/io5'

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip
} from '@material-tailwind/react'
import { useMemo, useState } from 'react'
import ModalManageGrade from 'src/components/ModalManageGrade'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import gradeCompositionApi from 'src/apis/grade-composition.api'
import { GradeComposition } from 'src/types/grade-composition.type'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Dropdown, { DropdownItem } from 'src/components/Dropdown'

const TABLE_ROWS = [
  {
    name: 'John Michael',
    email: 'john@creative-tim.com'
  },
  {
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com'
  },
  {
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com'
  },
  {
    name: 'Michael Levi',
    email: 'michael@creative-tim.com'
  },
  {
    name: 'Richard Gran',
    email: 'richard@creative-tim.com'
  }
]

export default function ClassDetailGrade() {
  const { classId } = useParams()

  const [isOpenModalEditGradeCompositions, setIsOpenModalEditGradeCompositions] = useState(false)
  const [isOpenModalAddGradeCompositions, setIsOpenModalAddGradeCompositions] = useState(false)
  const [isOpenModalSortGradeCompositions, setIsOpenModalSortGradeCompositions] = useState(false)

  const getGradeCompositionsQuery = useQuery({
    queryKey: ['courses', classId, 'grade-compositions'],
    queryFn: () => gradeCompositionApi.getGradeCompositions(classId as string),
    enabled: Boolean(classId)
  })

  const gradeCompositions = getGradeCompositionsQuery.data?.data.data

  const totalScale = useMemo(() => {
    if (gradeCompositions && gradeCompositions.length > 0) {
      return gradeCompositions.reduce((total, gradeComposition) => {
        const scale = +gradeComposition.scale
        if (isNaN(scale)) return total
        return total + scale
      }, 0)
    }
    return 0
  }, [gradeCompositions])

  return !classId ? (
    <div>Something wrong</div>
  ) : (
    <>
      <Card className='h-full w-full shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='mb-8 flex items-center justify-between gap-8'>
            <div>
              <Typography variant='h5' color='blue-gray'>
                Students list
              </Typography>
              <Typography color='gray' className='mt-1 font-normal'>
                See information about all students
              </Typography>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <Button variant='outlined' size='sm'>
                view all
              </Button>
              <Button
                className='flex items-center gap-3'
                size='sm'
                onClick={() => setIsOpenModalAddGradeCompositions(true)}
              >
                Add grade compositions
              </Button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='w-full md:w-72'>
              <Input label='Search' icon={<IoSearchOutline className='h-5 w-5' />} />
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-auto px-0'>
          <table className='mt-4 w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {/* {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={classNames('border-y border-blue-gray-100 bg-blue-gray-50/50 p-4', {
                      'text-center': index !== 0
                    })}
                  >
                    <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                      {head || (
                        <Tooltip content='Thay đổi điểm thành phần'>
                          <IconButton variant='text' onClick={() => setIsOpenModalEditGradeCompositions(true)}>
                            <IoPencil className='h-4 w-4' />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Typography>
                  </th>
                ))} */}
                <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                    Học sinh
                  </Typography>
                </th>
                {gradeCompositions &&
                  gradeCompositions.length > 0 &&
                  gradeCompositions.map((gradeComposition) => (
                    <th key={gradeComposition.id} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                        {gradeComposition.name} ({gradeComposition.scale}%)
                      </Typography>
                    </th>
                  ))}
                <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                    Tổng điểm ({totalScale}%)
                  </Typography>
                </th>
                <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Dropdown
                    placement='bottom-start'
                    render={() => (
                      <>
                        <DropdownItem onClick={() => setIsOpenModalAddGradeCompositions(true)}>Thêm</DropdownItem>
                        <DropdownItem onClick={() => setIsOpenModalEditGradeCompositions(true)}>Chỉnh sửa</DropdownItem>
                        <DropdownItem onClick={() => setIsOpenModalSortGradeCompositions(true)}>Sắp xếp</DropdownItem>
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
              {TABLE_ROWS.map((student, index) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast ? 'p-4 text-center' : 'p-4 border-b border-blue-gray-50 text-center'

                return (
                  <tr key={index}>
                    <td className={`${classes} !text-left`}>
                      <div className='flex items-center gap-3'>
                        <div className='flex flex-col'>
                          <Typography variant='small' color='blue-gray' className='font-normal'>
                            {student.name}
                          </Typography>
                          <Typography variant='small' color='blue-gray' className='font-normal opacity-70'>
                            {student.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {index}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {index}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {index}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text'>
                          <IoPencil className='h-4 w-4' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
      />
    </>
  )
}
