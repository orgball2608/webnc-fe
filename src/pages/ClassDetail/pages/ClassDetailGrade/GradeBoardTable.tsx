import { IoPencil } from 'react-icons/io5'
import { Typography, IconButton, Tooltip, Input } from '@material-tailwind/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Dropdown, { DropdownItem } from 'src/components/Dropdown'
import { CgExport, CgImport } from 'react-icons/cg'
import { GradeComposition } from 'src/types/grade-composition.type'
import { useMemo, useState } from 'react'
import { GradeBoard, GradeBoardHeaderItem } from 'src/types/grade.type'

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

const HEADER_INDEX_KEY = 'index'
const HEADER_STUDENT_ID_KEY = 'studentId'
const HEADER_FULLNAME_KEY = 'fullName'

interface Props {
  gradeBoardData: GradeBoard
  setIsOpenModalEditGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalAddGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalSortGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
}

type DataGradeUpdate = GradeBoardHeaderItem & {
  studentId: string
}

function GradeBoardTable({
  gradeBoardData,
  setIsOpenModalAddGradeCompositions,
  setIsOpenModalEditGradeCompositions,
  setIsOpenModalSortGradeCompositions
}: Props) {
  const [dataGradeUpdate, setDataGradeUpdate] = useState<DataGradeUpdate | null>(null)

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

  console.log(dataGradeUpdate)

  return (
    <table className='mt-4 w-full min-w-max table-auto text-left'>
      <thead>
        <tr>
          {gradeBoardData &&
            gradeBoardData.headers.length > 0 &&
            gradeBoardData.headers.map((header) => {
              if (header.key === HEADER_STUDENT_ID_KEY) return

              if (header.key === HEADER_FULLNAME_KEY) {
                return (
                  <th key={header.key} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                    <div className='flex gap-2'>
                      <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                        Học sinh
                      </Typography>
                      <Tooltip content='Tải xuống mẫu danh sách học sinh'>
                        <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                          <CgImport />
                        </button>
                      </Tooltip>

                      <Tooltip content='Tải lên danh sách học sinh'>
                        <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                          <CgExport />
                        </button>
                      </Tooltip>
                    </div>
                  </th>
                )
              }

              return (
                <th key={header.key} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <div className='flex gap-2'>
                    <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                      {header.label} {header.key !== HEADER_INDEX_KEY && ` (${header.metaData?.scale}%)`}
                    </Typography>

                    {header.key !== HEADER_INDEX_KEY && (
                      <>
                        <Tooltip content='Tải xuống mẫu điểm thành phần'>
                          <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                            <CgImport />
                          </button>
                        </Tooltip>

                        <Tooltip content='Tải lên điểm thành phần'>
                          <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                            <CgExport />
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </th>
              )
            })}
          <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
            <Typography variant='small' color='blue-gray' className='font-bold leading-none opacity-70'>
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
                      dataGradeUpdate.studentId === row.studentId ? (
                        <div className='flex'>
                          <input
                            type='text'
                            value={row?.[gradeComposition.key] || 0}
                            className='h-[34px] w-[100px] rounded-l-md border border-gray-300 px-2 py-1 outline-none'
                          />

                          <button
                            onClick={() => setDataGradeUpdate(null)}
                            className='flex h-[34px] items-center justify-center border border-l-0 border-gray-300 bg-white px-2 text-sm text-black outline-none transition-colors duration-200 active:bg-blue-gray-50'
                          >
                            Hủy
                          </button>
                          <button className='flex h-[34px] items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-black px-2 text-sm text-white outline-none transition-colors duration-200 active:bg-blue-gray-800'>
                            Cập nhật
                          </button>
                        </div>
                      ) : (
                        <>
                          <Typography variant='small' color='blue-gray' className='font-normal'>
                            {row?.[gradeComposition.key] || 0}
                          </Typography>
                          <Tooltip content='Cập nhật điểm'>
                            <IconButton
                              variant='text'
                              className='opacity-0 group-hover:opacity-100'
                              size='sm'
                              onClick={() => setDataGradeUpdate({ ...gradeComposition, studentId: row.studentId })}
                            >
                              <IoPencil className='h-4 w-4' />
                            </IconButton>
                          </Tooltip>
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

                <td className={classes}>
                  {/* <Tooltip content='Edit User'>
                    <IconButton variant='text'>
                      <IoPencil className='h-4 w-4' />
                    </IconButton>
                  </Tooltip> */}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default GradeBoardTable
