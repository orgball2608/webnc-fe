import { Member } from 'src/types/course.type'

import AccountItem from 'src/components/AccountItem'
import { LuUserPlus } from 'react-icons/lu'
import IconButton from 'src/components/IconButton'
import { useState } from 'react'
import InviteFormModal from 'src/components/InviteFormModal'
import { useAppSelector } from 'src/app/store'

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
import { useTranslation } from 'react-i18next'

function ClassDetailPeople() {
  const { t } = useTranslation()
  const { profile } = useAppSelector((state) => state.auth)
  const { members, isLoading } = useCourseDetail()
  const { roleInCourse } = useAppSelector((state) => state.class)

  const [isRole, setIsRole] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [selectedMember, setSelectedMember] = useState<MemberStudent>()
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const role = {
    teachers: t('teacher'),
    students: t('student')
  }

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
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{t('teacher')}</h2>
          {roleInCourse.role === Role.TEACHER && (
            <IconButton
              Icon={<LuUserPlus />}
              mode='dark'
              tooltip={t('inviteTeachers')}
              onClick={() => handleClick(role.teachers)}
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
                          <DropdownItem onClick={() => handleClickInfo(member?.teacher, role.teachers)}>
                            {t('detail')}
                          </DropdownItem>
                        }
                        {<DropdownItem onClick={() => handleClickDelete(member?.teacher)}>{t('delete')}</DropdownItem>}
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
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>{t('student')}</h2>

          <div className='flex items-center'>
            <span className='pr-6 text-sm font-medium text-third'>
              {members?.enrollments?.length || 0} {t('student')}
            </span>
            {roleInCourse.role === Role.TEACHER && (
              <IconButton
                Icon={<LuUserPlus />}
                tooltip={t('inviteStudents')}
                mode='dark'
                onClick={() => handleClick(role.students)}
              />
            )}
          </div>
        </div>
        <ul>
          {members?.enrollments && members.enrollments.length > 0 && roleInCourse.role === Role.TEACHER
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
                          <DropdownItem onClick={() => handleClickInfo(member?.student, role.students)}>
                            {t('detail')}
                          </DropdownItem>
                        }
                        {<DropdownItem onClick={() => handleClickDelete(member?.student)}>{t('delete')}</DropdownItem>}
                      </>
                    )}
                  >
                    <div>
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
