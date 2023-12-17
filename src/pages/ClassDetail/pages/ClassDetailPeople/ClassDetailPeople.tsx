import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import courseApi from 'src/apis/courses.api'
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
import Skeleton from 'react-loading-skeleton'

function ClassDetailPeople() {
  const { profile } = useAppSelector((state) => state.auth)
  const { classId } = useParams()
  const navigate = useNavigate()

  const membersData = useQuery({
    queryKey: ['members', classId],
    queryFn: () => {
      return courseApi.getUserInClass(classId as string)
    },
    enabled: Boolean(classId)
  })

  useEffect(() => {
    if (membersData.isError) {
      navigate(path.home)
    }
  }, [membersData.isError, navigate])

  const members = membersData.data?.data.data[0]

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [isRole, setIsRole] = useState('')

  const handleClick = (role: string) => {
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
          {members?.courseTeachers &&
            members.courseTeachers.length > 0 &&
            members.courseTeachers.map((member, index) => (
              <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
                <AccountItem
                  className='cursor-default'
                  alt={`teacher ${index}`}
                  avatarUrl={member?.teacher.avatar as string}
                  name={(member?.teacher.firstName + ' ' + member?.teacher.lastName) as string}
                />
              </li>
            ))}
          {(!members?.courseTeachers || members.courseTeachers.length === 0) &&
            membersData.isLoading &&
            Array(2)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[54px]' />)}
        </ul>
      </div>

      <div>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{role.students}</h2>

          <div className='flex items-center'>
            <span className='pr-6 text-sm font-medium text-third'>{members?.enrollments?.length || 0} Sinh viên</span>
            <IconButton
              Icon={<LuUserPlus />}
              tooltip='Mời học sinh'
              mode='dark'
              onClick={() => handleClick(role.students)}
            />
          </div>
        </div>
        <ul>
          {members?.enrollments &&
            members.enrollments.length > 0 &&
            members.enrollments.map((member, index) => (
              <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
                <AccountItem
                  className='cursor-default'
                  alt={`user ${index}`}
                  avatarUrl={member?.student.avatar as string}
                  name={(member?.student.firstName + ' ' + member?.student.lastName) as string}
                />
              </li>
            ))}

          {(!members?.enrollments || members.enrollments.length === 0) &&
            membersData.isLoading &&
            Array(2)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[56px]' />)}
        </ul>
      </div>
      {inviteFormModal}
    </>
  )
}

export default ClassDetailPeople
