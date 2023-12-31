import { IoPencil } from 'react-icons/io5'
import { Typography, IconButton, Tooltip } from '@material-tailwind/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Dropdown, { DropdownItem } from 'src/components/Dropdown'
import { CgExport, CgImport } from 'react-icons/cg'
import { GradeComposition } from 'src/types/grade-composition.type'
import { useMemo } from 'react'

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

interface Props {
  gradeCompositions: GradeComposition[]
  setIsOpenModalEditGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalAddGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModalSortGradeCompositions: React.Dispatch<React.SetStateAction<boolean>>
}

function GradeBoardTable({
  gradeCompositions,
  setIsOpenModalAddGradeCompositions,
  setIsOpenModalEditGradeCompositions,
  setIsOpenModalSortGradeCompositions
}: Props) {
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

  return (
    <table className='mt-4 w-full min-w-max table-auto text-left'>
      <thead>
        <tr>
          <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
            <div className='flex gap-2'>
              <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                Học sinh
              </Typography>
              <Tooltip content='Tải xuống danh sách học sinh'>
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
          {gradeCompositions &&
            gradeCompositions.length > 0 &&
            gradeCompositions.map((gradeComposition) => (
              <th key={gradeComposition.id} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                <div className='flex gap-2'>
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                    {gradeComposition.name} ({gradeComposition.scale}%)
                  </Typography>

                  <Tooltip content='Tải xuống điểm thành phần'>
                    <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                      <CgImport />
                    </button>
                  </Tooltip>

                  <Tooltip content='Tải lên điểm thành phần'>
                    <button className='relative top-[-3px] cursor-pointer text-lg transition-all duration-300 hover:text-blue-gray-400'>
                      <CgExport />
                    </button>
                  </Tooltip>
                </div>
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
  )
}

export default GradeBoardTable
