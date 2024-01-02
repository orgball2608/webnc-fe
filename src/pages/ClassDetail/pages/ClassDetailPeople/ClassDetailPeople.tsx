import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import courseApi, { Member } from 'src/apis/courses.api'
import AccountItem from 'src/components/AccountItem'
import { LuUserPlus } from 'react-icons/lu'
import IconButton from 'src/components/IconButton'
import { useState } from 'react'
import InviteFormModal from 'src/components/InviteFormModal'
import { useAppSelector } from 'src/app/store'

const role = {
  teachers: 'Giáo viên',
  students: 'Học sinh'
}

type MemberStudent = Member & {
  studentId?: string
}

import Skeleton from 'react-loading-skeleton'
import Dropdown, { DropdownItem } from 'src/components/Dropdown'
import { BsThreeDotsVertical } from 'react-icons/bs'
import UserInfoModal from '../../../../components/MembersModals/UserInfoModal'
import DeleteMemberModal from 'src/components/MembersModals/DeleteMemberModal'
import { useCourseDetail } from '../../ClassDetail'
import { Role } from 'src/constants/enums'

function ClassDetailPeople() {
  const { profile } = useAppSelector((state) => state.auth)
  const { members, myRole, isLoading } = useCourseDetail()

  const [isRole, setIsRole] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [selectedMember, setSelectedMember] = useState<MemberStudent>()
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleClick = (role: string) => {
    setIsInviteModalOpen(true)
    setIsRole(role)
  }

  const handleClickInfo = (member: MemberStudent, role: string) => {
    setSelectedMember(member)
    setIsInfoModalOpen(true)
    setIsRole(role)
  }

  const handleClickDelete = (member: MemberStudent) => {
    setSelectedMember(member)
    setIsDeleteModalOpen(true)
  }

  const inviteFormModal = InviteFormModal({ isInviteModalOpen, setIsInviteModalOpen, isRole, role, profile })
  const userInfoModal = UserInfoModal({
    isInfoModalOpen,
    setIsInfoModalOpen,
    UserData: selectedMember as MemberStudent,
    isRole,
    role
  })

  const deleteMemberModal = DeleteMemberModal({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    UserData: selectedMember as MemberStudent
  })

  return (
    <>
      <div className='mb-10'>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{Role.TEACHER}</h2>
          {myRole === Role.TEACHER && (
            <IconButton
              Icon={<LuUserPlus />}
              mode='dark'
              tooltip='Mời giáo viên'
              onClick={() => handleClick(Role.TEACHER)}
            />
          )}
        </div>
        <ul>
          {members?.courseTeachers &&
            members.courseTeachers.length > 0 &&
            members.courseTeachers.map((member, index) => (
              <li
                key={index}
                className='flex cursor-default items-center justify-between border-b border-b-primary p-3 last:border-b-0 hover:bg-slate-50'
              >
                <AccountItem
                  className='cursor-default'
                  alt={`teacher ${index}`}
                  avatarUrl={member?.teacher?.avatar as string}
                  name={(member?.teacher?.firstName + ' ' + member?.teacher?.lastName) as string}
                />
                {members.createdById === profile?.id && member.teacher?.id !== profile?.id && (
                  <Dropdown
                    render={() => (
                      <>
                        {
                          <DropdownItem onClick={() => handleClickInfo(member?.teacher, Role.TEACHER)}>
                            Thông tin
                          </DropdownItem>
                        }
                        {<DropdownItem onClick={() => handleClickDelete(member?.teacher)}>Xóa</DropdownItem>}
                      </>
                    )}
                  >
                    <div className=''>
                      <IconButton Icon={<BsThreeDotsVertical />} mode='dark' />
                    </div>
                  </Dropdown>
                )}
              </li>
            ))}
          {(!members?.courseTeachers || members.courseTeachers.length === 0) &&
            isLoading &&
            Array(2)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[54px]' />)}
        </ul>
      </div>

      <div>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{Role.STUDENT}</h2>

          <div className='flex items-center'>
            <span className='pr-6 text-sm font-medium text-third'>{members?.enrollments?.length || 0} Sinh viên</span>
            {myRole === Role.TEACHER && (
              <IconButton
                Icon={<LuUserPlus />}
                tooltip='Mời học sinh'
                mode='dark'
                onClick={() => handleClick(Role.STUDENT)}
              />
            )}
          </div>
        </div>
        <ul>
          {members?.enrollments && members.enrollments.length > 0 && myRole === Role.TEACHER
            ? members.enrollments.map((member, index) => (
                <li
                  key={index}
                  className='flex  cursor-default items-center justify-between border-b border-b-primary p-3 last:border-b-0 hover:bg-slate-50'
                >
                  <AccountItem
                    className='cursor-default'
                    alt={`user ${index}`}
                    avatarUrl={member?.student?.avatar as string}
                    name={(member?.student?.firstName + ' ' + member?.student?.lastName) as string}
                  />
                  <Dropdown
                    render={() => (
                      <>
                        {
                          <DropdownItem onClick={() => handleClickInfo(member?.student, Role.STUDENT)}>
                            Thông tin
                          </DropdownItem>
                        }
                        {<DropdownItem onClick={() => handleClickDelete(member?.student)}>Xóa</DropdownItem>}
                      </>
                    )}
                  >
                    <div className=''>
                      <IconButton Icon={<BsThreeDotsVertical />} mode='dark' />
                    </div>
                  </Dropdown>
                </li>
              ))
            : members?.enrollments.map((member, index) => (
                <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
                  <AccountItem
                    className='cursor-default'
                    alt={`user ${index}`}
                    avatarUrl={member?.student?.avatar as string}
                    name={(member?.student?.firstName + ' ' + member?.student?.lastName) as string}
                  />
                </li>
              ))}

          {(!members?.enrollments || members.enrollments.length === 0) &&
            isLoading &&
            Array(2)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[56px]' />)}
        </ul>
      </div>
      {inviteFormModal}
      {userInfoModal}
      {deleteMemberModal}
    </>
  )
}

export default ClassDetailPeople
