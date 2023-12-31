import { useId, useState } from 'react'
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

function ModalPreviewCSV() {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown'
  })
  const role = useRole(context)

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  // Set up label and description ids
  const labelId = useId()
  const descriptionId = useId()

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </button>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll className='z-[9999] bg-white'>
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
                className='h-full w-full'
              >
                <div className='overflow-x-aut o relative shadow-md sm:rounded-lg'>
                  <table className='w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Product name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Color
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Category
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Price
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td className='px-6 py-4'>Silver</td>
                        <td className='px-6 py-4'>Laptop</td>
                        <td className='px-6 py-4'>$2999</td>
                        <td className='px-6 py-4'>
                          <a href='#' className='text-blue-600 dark:text-blue-500 font-medium hover:underline'>
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          Microsoft Surface Pro
                        </th>
                        <td className='px-6 py-4'>White</td>
                        <td className='px-6 py-4'>Laptop PC</td>
                        <td className='px-6 py-4'>$1999</td>
                        <td className='px-6 py-4'>
                          <a href='#' className='text-blue-600 dark:text-blue-500 font-medium hover:underline'>
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          Magic Mouse 2
                        </th>
                        <td className='px-6 py-4'>Black</td>
                        <td className='px-6 py-4'>Accessories</td>
                        <td className='px-6 py-4'>$99</td>
                        <td className='px-6 py-4'>
                          <a href='#' className='text-blue-600 dark:text-blue-500 font-medium hover:underline'>
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          Google Pixel Phone
                        </th>
                        <td className='px-6 py-4'>Gray</td>
                        <td className='px-6 py-4'>Phone</td>
                        <td className='px-6 py-4'>$799</td>
                        <td className='px-6 py-4'>
                          <a href='#' className='text-blue-600 dark:text-blue-500 font-medium hover:underline'>
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          Apple Watch 5
                        </th>
                        <td className='px-6 py-4'>Red</td>
                        <td className='px-6 py-4'>Wearables</td>
                        <td className='px-6 py-4'>$999</td>
                        <td className='px-6 py-4'>
                          <a href='#' className='text-blue-600 dark:text-blue-500 font-medium hover:underline'>
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button onClick={() => setIsOpen(false)} className='absolute right-0 top-0 p-3 text-[36px]'>
                  <IoClose />
                </button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}

export default ModalPreviewCSV
