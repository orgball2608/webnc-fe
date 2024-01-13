import { Button } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import courseApi from 'src/apis/courses.api'
import { useAppDispatch } from 'src/app/store'
import ClassCard from 'src/components/ClassCard'
import ModalManageClass, { JoinClassModal } from 'src/components/ModalManageClass'
import { clearBreadcrumbs } from 'src/slices/app.slice'
import { setMyClass } from 'src/slices/class.slice'
import { CourseItem } from 'src/types/course.type'

function Homepage() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const [isOpenCreateClassModal, setIsOpenCreateClassModal] = useState(false)
  const [isOpenJoinClassModal, setIsOpenJoinClassModal] = useState(false)

  const courseData = useQuery({
    queryKey: ['classes'],
    queryFn: () => {
      return courseApi.getCoursesOfMe()
    }
  })

  const courseList = courseData?.data?.data.data as CourseItem[]

  useEffect(() => {
    if (courseData.isSuccess) {
      dispatch(setMyClass({ courseList }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList])

  useEffect(() => {
    dispatch(clearBreadcrumbs())
  }, [])

  return (
    <>
      <Helmet>
        <title>{t('mainScreen')}</title>
      </Helmet>

      <div className='p-6'>
        <div className='flex flex-wrap gap-6'>
          {courseList &&
            courseList.length > 0 &&
            courseList.map((classItem) => <ClassCard key={classItem.id} data={classItem} />)}

          {(!courseList || courseList.length === 0) &&
            courseData.isLoading &&
            Array(6)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[300px] w-[300px] rounded-lg' />)}

          {(!courseList || courseList.length === 0) && !courseData.isLoading && (
            <>
              <div className='mt-[60px] flex h-full w-full flex-col items-center justify-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width={187} height={219} viewBox='0 0 187 219' fill='none'>
                  <path
                    d='M171.921 112.679C173.1 112.174 174.446 111.921 175.877 111.921C181.43 111.921 185.975 116.466 185.975 122.02C185.975 127.574 181.43 132.118 175.877 132.118C174.698 132.118 173.604 131.949 172.51 131.529'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeMiterlimit={10}
                  />
                  <path
                    d='M71.1079 96.7744C71.4445 96.7744 76.0167 100.14 78.2608 101.824'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M50.7432 99.2988C53.7726 98.2889 58.1485 94.5021 59.9998 91.8934C61.8512 89.2847 64.6282 86.7602 67.8259 87.1809C70.8554 87.6017 72.9592 90.7995 73.0433 93.8289C73.2116 96.8584 71.8652 99.8037 70.3505 102.497C65.8904 110.828 57.5594 119.243 50.7432 125.806V99.2988Z'
                    fill='#CEEAD6'
                  />
                  <path d='M50.4067 126.227H156.438' stroke='#5F6368' strokeWidth={2} strokeMiterlimit={10} />
                  <path d='M50.4067 74.0532H156.438' stroke='#5F6368' strokeWidth={2} strokeMiterlimit={10} />
                  <path
                    d='M29.4531 185.554L79.5232 208.275M85.8346 204.488L142.216 168.303'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path d='M103.422 127.069V0' stroke='#5F6368' strokeWidth={2} strokeMiterlimit={10} />
                  <path
                    d='M69.9298 34.8388C67.0687 44.0113 64.2917 53.1838 61.4305 62.2722C61.0939 63.4503 62.8611 63.9552 63.2819 62.7771C66.143 53.6046 68.92 44.4321 71.7812 35.3437C72.1178 34.2497 70.2664 33.7448 69.9298 34.8388Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M51 6.1582C51 3.39678 53.2386 1.1582 56 1.1582H150C152.761 1.1582 155 3.39678 155 6.1582V135.158H51L51 6.1582Z'
                    stroke='#5F6368'
                    strokeWidth={2}
                  />
                  <path
                    d='M72.2019 53.9411C71.697 55.7924 71.2762 57.7279 70.7713 59.5793C70.6872 60.0842 70.9396 60.5891 71.4445 60.7574C71.9494 60.8415 72.4544 60.5891 72.6227 60.0842C73.1276 58.2328 73.5483 56.2973 74.0532 54.446C74.1374 53.9411 73.8849 53.4362 73.38 53.2679C72.8751 53.1837 72.3702 53.4362 72.2019 53.9411Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M173.689 101.823V143.057H134.138V101.823C134.138 101.823 138.177 106.031 153.913 106.031C169.65 106.031 173.689 101.823 173.689 101.823Z'
                    fill='#FBBC04'
                  />
                  <path
                    d='M15.7363 154.502C24.4273 154.502 31.4726 147.457 31.4726 138.766C31.4726 130.075 24.4273 123.029 15.7363 123.029C7.04539 123.029 0 130.075 0 138.766C0 147.457 7.04539 154.502 15.7363 154.502Z'
                    fill='#FAD2CF'
                  />
                  <path
                    d='M15.147 114.446C14.2213 113.352 13.2956 112.174 12.0334 111.584C10.7711 110.995 9.0039 111.08 8.16239 112.089C6.90011 113.604 8.07823 116.044 9.84541 116.886C11.6126 117.728 13.7164 117.391 15.5677 117.054'
                    stroke='#5F6368'
                    strokeWidth={2}
                  />
                  <path
                    d='M15.4837 114.109C16.4094 113.015 17.3351 111.837 18.5973 111.248C19.8596 110.659 21.6268 110.743 22.4683 111.753C23.7306 113.268 22.5525 115.708 20.7853 116.55C19.0181 117.391 16.9143 117.054 15.063 116.718'
                    stroke='#5F6368'
                    strokeWidth={2}
                  />
                  <path
                    d='M5.04938 139.103C6.64826 139.103 6.64826 136.578 5.04938 136.578C3.36635 136.578 3.36635 139.103 5.04938 139.103Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M6.81635 145.835C8.41522 145.835 8.41522 143.31 6.81635 143.31C5.21747 143.31 5.21747 145.835 6.81635 145.835Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M11.3603 141.964C12.9592 141.964 12.9592 139.439 11.3603 139.439C9.76141 139.439 9.76141 141.964 11.3603 141.964Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M14.8105 148.107C16.4094 148.107 16.4094 145.582 14.8105 145.582C13.2116 145.582 13.2116 148.107 14.8105 148.107Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M10.0981 149.79C11.697 149.79 11.697 147.265 10.0981 147.265C8.49921 147.265 8.49921 149.79 10.0981 149.79Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M129.172 164.095L138.429 156.101L175.035 170.406L146.423 202.805C141.655 200.981 130.182 196.83 122.44 194.81C114.698 192.791 108.836 191.444 106.872 191.023'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M15.7363 123.029C7.06872 123.029 0 130.098 0 138.766C0 141.29 0.58906 143.646 1.59888 145.666L25.4979 126.395C22.805 124.292 19.439 123.029 15.7363 123.029Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M153.913 106.031C164.137 106.031 172.426 104.147 172.426 101.823C172.426 99.4995 164.137 97.6157 153.913 97.6157C143.688 97.6157 135.399 99.4995 135.399 101.823C135.399 104.147 143.688 106.031 153.913 106.031Z'
                    fill='white'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeMiterlimit={10}
                  />
                  <path
                    d='M171.08 104.684L134.138 126.648V101.402L142.553 105.61L159.804 105.862L171.08 104.684Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M81.543 201.964L29.3691 181.767L89.9582 147.265L142.132 163.254L81.543 201.964Z'
                    fill='#1A73E8'
                  />
                  <path
                    d='M166.62 195.736L146.76 218.121L117.56 205.75C117.56 205.75 133.212 191.865 141.122 184.965L166.62 195.736Z'
                    fill='#DADCDF'
                  />
                  <path
                    d='M67.0689 95.1749C68.6678 95.1749 68.6678 92.6504 67.0689 92.6504C65.3859 92.6504 65.3859 95.1749 67.0689 95.1749Z'
                    fill='#5F6368'
                  />
                  <path
                    d='M14.3057 106.872L15.9887 124.123'
                    stroke='#5F6368'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <p className='mt-6 font-medium text-primary'>{t('addClassToStart')}</p>

                <div className='mt-6 flex items-center gap-3'>
                  <Button variant='outlined' onClick={() => setIsOpenCreateClassModal(true)}>
                    {t('createClass')}
                  </Button>
                  <Button className='bg-primary' onClick={() => setIsOpenJoinClassModal(true)}>
                    {t('joinClass')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ModalManageClass open={isOpenCreateClassModal} handler={() => setIsOpenCreateClassModal((prev) => !prev)} />
      <JoinClassModal open={isOpenJoinClassModal} handler={() => setIsOpenJoinClassModal((prev) => !prev)} />
    </>
  )
}

export default Homepage
