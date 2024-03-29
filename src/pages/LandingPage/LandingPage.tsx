import { Alert, Button, Card, CardBody, CardHeader, IconButton, Typography } from '@material-tailwind/react'
import { FaDribbble, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import introStudy from 'src/assets/images/intro_study.png'
import introFunc1 from 'src/assets/images/intro_func_1.jpg'
import introFunc2 from 'src/assets/images/intro_func_2.png'
import introFunc3 from 'src/assets/images/intro_func_3.png'
import introFunc4 from 'src/assets/images/intro_func_4.png'
import defaultUser from 'src/assets/images/default-user.webp'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const members = [
  {
    avatar: defaultUser,
    studentID: '20120443',
    fullName: 'Nguyễn Tấn Chữ'
  },
  {
    avatar: defaultUser,
    studentID: '20120557',
    fullName: 'Huỳnh Minh Quang'
  },
  {
    avatar: defaultUser,
    studentID: '20120569',
    fullName: 'Nguyễn Văn Tài'
  }
]

function LandingPage() {
  const { t } = useTranslation()

  const features = [
    {
      image: introFunc1,
      description: t('easilyManage')
    },
    {
      image: introFunc2,
      description: t('assignAssignmentsAndManageDeadlines')
    },
    {
      image: introFunc3,
      description: t('secureDocuments')
    },
    {
      image: introFunc4,
      description: t('easilyManage')
    }
  ]

  return (
    <>
      <Helmet>
        <title>{t('classroom')}</title>
      </Helmet>

      <section className='py-8'>
        <div className='container'>
          <div className='grid grid-cols-2 gap-4 px-4'>
            <div className='col-span-2 flex flex-col justify-center md:col-span-1 '>
              <Typography variant='h1' className='mb-6 text-4xl'>
                {t('effectiveAndPopularPlatform')}
              </Typography>

              <Typography className='mb-5 text-gray-600'>{t('friendlyClassWasBorn')}</Typography>

              <Link className='inline-block' to={path.signin}>
                <Button className='rounded-full bg-primary'> {t('joinNow')}</Button>
              </Link>
            </div>

            <div className='col-span-2 md:col-span-1'>
              <div className='mx-14 my-7'>
                <img src={introStudy} alt='intro study' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-light-blue-50 py-8'>
        <div className='container'>
          <Typography variant='h2' className='mb-6'>
            {t('mainFeatures')}
          </Typography>

          <div className='grid grid-cols-4 gap-6'>
            {features.map((feature, index) => (
              <div key={index} className='col-span-2'>
                <div className='flex items-center gap-4 rounded-3xl border-4 border-light-blue-100 bg-white px-2 py-5'>
                  <img src={feature.image} alt='Intro func 1' className='h-[150px]' />
                  <Typography className='text-lg font-bold'>{feature.description}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='pb-14 pt-8'>
        <div className='container'>
          <div className='text-center'>
            <Typography variant='h3'>
              {t('team')} <span className='text-[#3061AF]'>WebNC2023</span>
            </Typography>

            <Typography className='mb-2 mt-5'>{t('yearOfEstablishment')}: 2023</Typography>
            <Typography>{t('subject')}</Typography>
          </div>

          <div className='mt-10 grid grid-cols-3 gap-20'>
            {members.map((member) => (
              <div key={member.studentID} className='col-span-1'>
                <Card className=''>
                  <CardHeader floated={false} className='shadow-none'>
                    <img src={member.avatar} alt={member.fullName} className='w-full' />
                  </CardHeader>
                  <CardBody className='text-center'>
                    <Typography variant='h4' color='blue-gray' className='mb-2'>
                      {member.fullName}
                    </Typography>
                    <Typography color='blue-gray' className='font-medium' textGradient>
                      {member.studentID}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <Alert color='blue' className='mx-auto mt-10 w-max text-base font-bold uppercase'>
            {t('thanksForUsing')}
          </Alert>
        </div>
      </section>

      <footer className='bg-light-blue-50 pb-14 pt-10'>
        <div className='container'>
          <div className='grid grid-cols-3 gap-10 px-10'>
            <div className='col-span-1'>
              <p className='mb-6 text-center text-xl font-bold uppercase'>{t('classroom')}</p>
              <p className='text-base'>©Copyright WebNC2023 Team</p>
            </div>

            <div className='col-span-1'>
              <p className='mb-6 text-center text-xl font-bold uppercase'>{t('address')}</p>
              <p className='mb-1 text-base'>Trường Đại học Khoa học Tự nhiên</p>
              <p className='text-base'>Phát triển ứng dụng web nâng cao - 20_3</p>
            </div>

            <div className='col-span-1'>
              <p className='mb-6 text-center text-xl font-bold uppercase'>{t('contact')}</p>
              <div className='flex justify-center gap-4'>
                <IconButton className='rounded bg-[#ea4335] text-lg text-white hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10'>
                  <FaGoogle />
                </IconButton>
                <IconButton className='rounded bg-[#1DA1F2] text-lg text-white hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10'>
                  <FaTwitter />
                </IconButton>
                <IconButton className='rounded bg-[#ea4c89] text-lg text-white hover:shadow-[#ea4c89]/20 focus:shadow-[#ea4c89]/20 active:shadow-[#ea4c89]/10'>
                  <FaDribbble />
                </IconButton>
                <IconButton className='rounded bg-[#333333] text-lg text-white hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10'>
                  <FaGithub />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
