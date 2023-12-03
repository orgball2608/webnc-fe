import ClassCard from 'src/components/ClassCard'

function Homepage() {
  return (
    <div className='p-6'>
      <div className='flex flex-wrap gap-6'>
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  )
}

export default Homepage
