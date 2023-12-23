import React from 'react'
import { Dialog, Card, CardBody } from '@material-tailwind/react'
import { LuX } from 'react-icons/lu'
import IconButton from 'src/components/IconButton'
import { Member } from 'src/apis/courses.api'

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
      size='sm'
      open={isInfoModalOpen}
      handler={() => setIsInfoModalOpen(false)}
      className='bg-transparent shadow-none'
    >
      <Card className='mx-auto w-full'>
        <CardBody className='mb-8 ml-4 break-words text-lg'>
          <div className='flex justify-end'>
            <IconButton Icon={<LuX />} mode='dark' onClick={() => setIsInfoModalOpen(false)} />
          </div>
          <h4 className='mb-7 text-2xl font-bold text-primary'>{`${UserData?.firstName} ${UserData?.lastName}`}</h4>
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
      </Card>
    </Dialog>
  )
}

export default UserInfoModal
