import { Button, Card, CardBody, CardFooter, Dialog, Input } from '@material-tailwind/react'
import React from 'react'
import { LuCopy } from 'react-icons/lu'
import IconButton from '../IconButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InviteFormModal({ isInviteModalOpen, setIsInviteModalOpen, isRole, role }: any) {
  return (
    <>
      <Dialog size='sm' open={isInviteModalOpen} handler={setIsInviteModalOpen} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full'>
          <CardBody className='flex flex-col gap-4'>
            <h4 className='mb-4 text-base font-medium text-primary'>Mời {isRole}</h4>
            {isRole === role.students && (
              <div>
                <p className='mb-2 text-sm font-medium'>Link mời</p>
                <div className='mb-4 flex items-center'>
                  <p className='= w-full overflow-hidden text-ellipsis text-third'>abc</p>
                  <IconButton Icon={<LuCopy />} tooltip='copy link' mode='dark' />
                </div>
                <hr className='border-t-[2px]' />
              </div>
            )}
            <Input variant='standard' label='Email' containerProps={{ className: 'mb-4' }} />
          </CardBody>
          <CardFooter className='flex gap-8 pt-0'>
            <Button variant='outlined' className='flex-1 text-sm' onClick={() => setIsInviteModalOpen(false)} fullWidth>
              Hủy
            </Button>
            <Button variant='gradient' className='flex-1 text-sm' onClick={() => setIsInviteModalOpen(false)} fullWidth>
              Mời
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}
