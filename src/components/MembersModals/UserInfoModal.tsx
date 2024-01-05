import React from 'react'
import { Dialog, Card, CardBody, Button } from '@material-tailwind/react'
// import { LuX } from 'react-icons/lu'
// import IconButton from 'src/components/IconButton'
import { Member } from 'src/types/course.type'
import { LuX } from 'react-icons/lu'
import IconButton from '../IconButton'

interface Props {
  isInfoModalOpen: boolean
  setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  UserData: Member & {
    studentId?: string
  }
  isRole: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: any
}

function UserInfoModal({ isInfoModalOpen, setIsInfoModalOpen, UserData, isRole, role }: Props) {
  return (
    <Dialog
      size='md'
      open={isInfoModalOpen}
      handler={() => setIsInfoModalOpen(false)}
      className='border-10 bg-transparent shadow-none'
    >
      <Card className='mx-auto w-full' tabIndex={0}>
        <CardBody className='mb-8 ml-4 break-words text-base'>
          <div className='flex justify-between'>
            <h4 className='mb-7 mt-3 text-2xl font-bold text-primary'>{`${UserData?.firstName} ${UserData?.lastName}`}</h4>
            <IconButton Icon={<LuX />} onClick={() => setIsInfoModalOpen(false)} tooltip='Edit' mode='dark' />
          </div>
          <table className='mb-4 w-full table-auto'>
            <tbody>
              {isRole === role.students && (
                <tr>
                  <td className='border-b py-4 pr-4 font-bold'>Student ID:</td>
                  <td className='border-b py-4'>{`${UserData?.studentId || 'N/A'}`}</td>
                </tr>
              )}
              <tr>
                <td className='border-b py-4 pr-4 font-bold'>Email:</td>
                <td className='border-b py-4'>{`${UserData?.email || 'N/A'}`}</td>
              </tr>
              <tr>
                <td className='border-b py-4 pr-4 font-bold'>Địa chỉ:</td>
                <td className='border-b py-4'>{`${UserData?.address || 'N/A'}`}</td>
              </tr>
              <tr>
                <td className='py-4 pr-4 font-bold'>Số điện thoại:</td>
                <td className='py-4'>{`${UserData?.phoneNumber || 'N/A'}`}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
        {/* <Button variant='text' className='border-0 hover:bg-blue-300' onClick={() => setIsInfoModalOpen(false)}>
          Close
        </Button> */}
        <Button variant='text' size='md' tabIndex={-3} onClick={() => setIsInfoModalOpen(false)}>
          close
        </Button>
      </Card>
    </Dialog>
  )
}

export default UserInfoModal
