import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'

interface Props {
  email: string
  onSubmit: () => void
  buttonTitle?: string
}

function AccountConfirmation({ email, onSubmit, buttonTitle = 'Proceed' }: Props) {
  return (
    <div className='px-5'>
      <Card className='bg-primary text-white'>
        <CardBody>
          <Typography variant='h2' className='mb-8 text-center'>
            Account Confirmation
          </Typography>
          <Typography className='mb-3 text-center'>
            An email with your account confirmation link has been sent to your email:{' '}
            <b className='font-bold'>{email}</b>
          </Typography>
          <Typography className='text-center'>Check your email and comeback to proceed!</Typography>
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
