import { Dialog, Card, CardBody } from '@material-tailwind/react'
import { LuX } from 'react-icons/lu'
import IconButton from 'src/components/IconButton'
import { Member } from 'src/apis/courses.api'

interface Props {
  isInfoModalOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsInfoModalOpen: any
  UserData: Member & {
    studentId?: string
  }
  isRole: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: any
}

function UserInfoModal({ isInfoModalOpen, setIsInfoModalOpen, UserData, isRole, role }: Props) {
  return (
    <>
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
            <h4 className='my-5 text-3xl font-bold text-primary'>{`${UserData?.firstName} ${UserData?.lastName}`}</h4>
            <div className='mb-4'>
              {isRole === role.students && (
                <p className='mb-3'>
                  <span className='font-bold'>Student ID: </span> {`${UserData?.studentId || 'N/A'}`}
                </p>
              )}
              <p className='mb-3'>
                <span className='font-bold'>Email: </span> {`${UserData?.email || 'N/A'}`}
              </p>
              <p className='mb-3'>
                <span className='font-bold'>Địa chỉ: </span>
                {`${UserData?.address || 'N/A'}`}
              </p>
              <p className='mb-3'>
                <span className='font-bold'>Số điện thoại: </span> {`${UserData?.phoneNumber || 'N/A'}`}
              </p>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  )
}

export default UserInfoModal
