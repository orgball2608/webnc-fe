import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import courseApi from 'src/apis/courses.api'
// import { useAppSelector } from 'src/app/store'
import AccountItem from 'src/components/AccountItem'
import { LuUserPlus } from 'react-icons/lu'
import IconButton from 'src/components/IconButton'
import { useEffect, useState } from 'react'
import InviteFormModal from 'src/components/InviteFormModal'
import { useAppSelector } from 'src/app/store'
import path from 'src/constants/path'

const role = {
  teachers: 'Giáo viên',
  students: 'Học sinh'
}

function ClassDetailPeople() {
  const { profile } = useAppSelector((state) => state.auth)
  const { classId } = useParams()
  const navigate = useNavigate()

  const membersData = useQuery({
    queryKey: ['members'],
    queryFn: () => {
      return courseApi.getUserInClass(classId as string)
    }
  })

  useEffect(() => {
    if (membersData.isError) {
      navigate(path.home)
    }
  }, [membersData.isError, navigate])

  const memberList = membersData?.data?.data.data
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [isRole, setIsRole] = useState('')

  // eslint-disable-next-line prettier/prettier
  const handleClick: any = (role: string) => {
    setIsInviteModalOpen(true)
    setIsRole(role)
  }

  const inviteFormModal = InviteFormModal({ isInviteModalOpen, setIsInviteModalOpen, isRole, role, profile })

  return (
    <>
      <div className='mb-10'>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{role.teachers}</h2>
          <IconButton
            Icon={<LuUserPlus />}
            mode='dark'
            tooltip='Mời giáo viên'
            onClick={() => handleClick(role.teachers)}
          />
        </div>
        <ul>
          {memberList?.teachers?.map((member, index) => (
            <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
              <AccountItem
                className='cursor-default'
                alt={`user ${index}`}
                avatarUrl={member?.avatar as string}
                name={(member?.firstName + ' ' + member?.lastName) as string}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{role.students}</h2>

          <div className='flex items-center'>
            <span className='pr-6 text-sm font-medium text-third'>{memberList?.students?.length || 0} Sinh viên</span>
            <IconButton
              Icon={<LuUserPlus />}
              tooltip='Mời học sinh'
              mode='dark'
              onClick={() => handleClick(role.students)}
            />
          </div>
        </div>
        <ul>
          {memberList?.students?.map((member, index) => (
            <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
              <AccountItem
                className='cursor-default'
                alt={`user ${index}`}
                avatarUrl={member?.avatar as string}
                name={(member?.firstName + ' ' + member?.lastName) as string}
              />
            </li>
          ))}
        </ul>
      </div>
      {inviteFormModal}
    </>
  )
}

export default ClassDetailPeople
