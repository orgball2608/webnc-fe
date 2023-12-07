import { useAppSelector } from 'src/app/store'
import AccountItem from 'src/components/AccountItem'

function ClassDetailPeople() {
  const { profile } = useAppSelector((state) => state.auth)

  return (
    <>
      <div className='mb-10'>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>Giáo viên</h2>
        </div>
        <ul>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
                <AccountItem
                  className='cursor-default'
                  alt={`user ${index}`}
                  avatarUrl={profile?.avatar as string}
                  name='Tai'
                />
              </li>
            ))}
        </ul>
      </div>

      <div>
        <div className='mb-1 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
          <h2 className='pl-4 text-[32px] font-normal leading-10 text-third'>Bạn học</h2>

          <span className='pr-6 text-sm font-medium text-third'>30 sinh viên</span>
        </div>
        <ul>
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <li key={index} className='cursor-default border-b border-b-primary p-2 last:border-b-0'>
                <AccountItem
                  className='cursor-default'
                  alt={`user ${index}`}
                  avatarUrl={profile?.avatar as string}
                  name='Tai'
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default ClassDetailPeople
