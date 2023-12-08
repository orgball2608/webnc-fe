import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import courseApi from 'src/apis/courses.api'
// import { useAppSelector } from 'src/app/store'
import AccountItem from 'src/components/AccountItem'

function ClassDetailPeople() {
  // const { profile } = useAppSelector((state) => state.auth)
  const { classId } = useParams()
  const membersData = useQuery({
    queryKey: ['members'],
    queryFn: () => {
      return courseApi.getUserInClass(classId as string)
    }
  })

  const memberList = membersData?.data?.data.data
  console.log(memberList)

  return (
    <>
      <div className='mb-10'>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>Giáo viên</h2>
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
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>Bạn học</h2>

          <span className='pr-6 text-sm font-medium text-third'>{memberList?.students.length} Sinh viên</span>
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
    </>
  )
}

export default ClassDetailPeople
