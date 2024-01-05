import { Avatar, Grid, Paper } from '@mui/material'

const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

export default function Comment() {
  return (
    <>
      <Paper style={{ padding: '1rem 0.5rem' }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink}>
              N
            </Avatar>
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <div className='md:flex'>
              <h4 style={{ margin: 0, textAlign: 'left' }}>
                <strong>Michel Michel</strong>
              </h4>
              <p className='text-left text-[0.8rem] text-gray-600 md:ml-2 md:mt-[0.2rem]'>13:30 05/01/2024</p>
            </div>
            <p style={{ textAlign: 'justify', color: 'black' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum
              ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque
              arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
            </p>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
