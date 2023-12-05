const classDetailPrefix = '/class/:classId'

const path = {
  home: '/home',
  signup: '/signup',
  signin: '/signin',
  logout: '/logout',
  profile: '/user/profile',
  change_password: '/user/change-password',
  landingPage: '/',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  classDetail: {
    prefix: classDetailPrefix,
    news: classDetailPrefix + '/news',
    excercises: classDetailPrefix + '/excercise',
    people: classDetailPrefix + '/people'
  }
} as const

export default path
