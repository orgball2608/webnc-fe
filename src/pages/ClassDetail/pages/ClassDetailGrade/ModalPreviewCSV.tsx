import { useId } from 'react'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react'
import { IoClose } from 'react-icons/io5'
import { Button, Typography } from '@material-tailwind/react'
import { motion } from 'framer-motion'
import { HEADER_FULLNAME_KEY, HEADER_INDEX_KEY, HEADER_STUDENT_ID_KEY } from './ClassDetailGrade'
import { GradeBoardHeaderItem } from 'src/types/grade.type'
import { CSVDataType } from './GradeBoardTable'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  CSVData: CSVDataType
  gradeCompositions: GradeBoardHeaderItem[]
  isLoading: boolean
  onSubmit: () => Promise<void>
  disabled: boolean
}

function ModalPreviewCSV({ isOpen, setIsOpen, CSVData, gradeCompositions, isLoading, disabled, onSubmit }: Props) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePress: false
  })
  const role = useRole(context)

  // Merge all the interactions into prop getters
  const { getFloatingProps } = useInteractions([click, dismiss, role])

  // Set up label and description ids
  const labelId = useId()
  const descriptionId = useId()

  return (
    <>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll className='z-[9999] bg-white'>
            <FloatingFocusManager context={context}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  ref={refs.setFloating}
                  aria-labelledby={labelId}
                  aria-describedby={descriptionId}
                  {...getFloatingProps()}
                  className='h-full w-full'
                >
                  <div className='my-auto flex max-h-screen flex-col items-center px-10 py-4'>
                    <Typography variant='h2' className='mb-3 text-center text-3xl'>
                      Preview {CSVData?.fileName}
                    </Typography>

                    <div className='relative w-full flex-1 overflow-auto shadow-md sm:rounded-lg'>
                      {isLoading ? (
                        <div className='text-center'>Loading...</div>
                      ) : (
                        <table className='mt-4 w-full min-w-max table-auto text-left'>
                          <thead>
                            <tr>
                              {CSVData?.data?.headers && CSVData.data.headers.length > 0 ? (
                                CSVData.data.headers.map((header) => {
                                  if (header.key === HEADER_STUDENT_ID_KEY) return

                                  if (header.key === HEADER_FULLNAME_KEY) {
                                    return (
                                      <th
                                        key={header.key}
                                        className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                                      >
                                        <div className='flex gap-2'>
                                          <Typography
                                            variant='small'
                                            color='blue-gray'
                                            className='text-base font-bold leading-none'
                                          >
                                            Học sinh
                                          </Typography>
                                        </div>
                                      </th>
                                    )
                                  }

                                  return (
                                    <th
                                      key={header.key}
                                      className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                                    >
                                      <div className='flex gap-2'>
                                        <Typography
                                          variant='small'
                                          color='blue-gray'
                                          className='text-base font-bold leading-none'
                                        >
                                          {header.label}{' '}
                                          {header.key !== HEADER_INDEX_KEY && ` (${header.metaData?.scale}%)`}
                                        </Typography>
                                      </div>
                                    </th>
                                  )
                                })
                              ) : (
                                <th></th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {CSVData?.data?.rows && CSVData.data.rows.length > 0 ? (
                              CSVData.data.rows.map((row, index) => {
                                const isLast = index === CSVData.data.rows.length - 1
                                const classes = isLast
                                  ? 'p-4 text-center'
                                  : 'p-4 border-b border-blue-gray-50 text-center'

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
                                          <Typography
                                            variant='small'
                                            color='blue-gray'
                                            className='font-normal opacity-70'
                                          >
                                            {row.fullName}
                                          </Typography>
                                        </div>
                                      </div>
                                    </td>

                                    {gradeCompositions.map((gradeComposition) => (
                                      <td key={gradeComposition.key} className={classes}>
                                        <div className='group flex items-center justify-center gap-2'>
                                          <Typography variant='small' color='blue-gray' className='font-normal'>
                                            {row?.[gradeComposition.key] || 0}
                                          </Typography>
                                        </div>
                                      </td>
                                    ))}
                                  </tr>
                                )
                              })
                            ) : (
                              <tr className='text-center'>NO DATA</tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>

                    <div className='mt-8 flex w-full max-w-[400px] items-center justify-center gap-8'>
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant='outlined'
                        className='flex-1 text-sm'
                        disabled={disabled}
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        variant='filled'
                        className='flex-1 bg-primary text-sm'
                        onClick={onSubmit}
                        disabled={disabled}
                      >
                        Tải lên
                      </Button>
                    </div>

                    <button onClick={() => setIsOpen(false)} className='absolute right-0 top-0 p-3 text-[36px]'>
                      <IoClose />
                    </button>
                  </div>
                </div>
              </motion.div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}

export default ModalPreviewCSV
