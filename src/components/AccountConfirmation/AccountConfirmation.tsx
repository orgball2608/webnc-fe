import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { useTranslation } from 'react-i18next'

interface Props {
  email: string
  onSubmit: () => void
  buttonTitle?: string
}

function AccountConfirmation({ email, onSubmit, buttonTitle = 'Proceed' }: Props) {
  const { t } = useTranslation()
  return (
    <div className='px-5'>
      <Card className='bg-primary text-white'>
        <CardBody>
          <Typography variant='h2' className='mb-8 text-center'>
            {t('accountConfirmation')}
          </Typography>
          <Typography className='mb-3 text-center'>
            {t('emailWithConfirmationLink')} <b className='font-bold'>{email}</b>
          </Typography>
          <Typography className='text-center'>{t('checkEmailAndComeback')}</Typography>
        </CardBody>
        <CardFooter className='pt-0 text-center'>
          <Button size='lg' onClick={onSubmit}>
            {buttonTitle}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AccountConfirmation
