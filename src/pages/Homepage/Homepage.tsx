import { useState } from 'react'
import { Helmet } from 'react-helmet'
import ClassCard from 'src/components/ClassCard'
import { ClassItem } from 'src/types/class.type'

const initialClasses: ClassItem[] = [
  {
    id: '1',
    name: 'Math 101',
    description: 'Introduction to Algebra',
    path: '/math-101',
    owner: {
      id: '101',
      name: 'Professor Smith'
    }
  },
  {
    id: '2',
    name: 'History 202',
    description: 'World History: 20th Century',
    path: '/history-202',
    owner: {
      id: '202',
      name: 'Professor Johnson'
    }
  },
  {
    id: '3',
    name: 'Physics 301',
    description: 'Quantum Mechanics',
    path: '/physics-301',
    owner: {
      id: '301',
      name: 'Professor Brown'
    }
  },
  {
    id: '4',
    name: 'English 201',
    description: 'Shakespearean Literature',
    path: '/english-201',
    owner: {
      id: '201',
      name: 'Professor Davis'
    }
  },
  {
    id: '5',
    name: 'Computer Science 401',
    description: 'Advanced Algorithms',
    path: '/cs-401',
    owner: {
      id: '401',
      name: 'Professor White'
    }
  },
  {
    id: '6',
    name: 'Psychology 301',
    description: 'Cognitive Psychology',
    path: '/psych-301',
    owner: {
      id: '301',
      name: 'Professor Turner'
    }
  },
  {
    id: '7',
    name: 'Chemistry 201',
    description: 'Organic Chemistry',
    path: '/chem-201',
    owner: {
      id: '201',
      name: 'Professor Adams'
    }
  },
  {
    id: '8',
    name: 'Art 102',
    description: 'Introduction to Painting',
    path: '/art-102',
    owner: {
      id: '102',
      name: 'Professor Miller'
    }
  },
  {
    id: '9',
    name: 'Economics 202',
    description: 'Macroeconomics',
    path: '/econ-202',
    owner: {
      id: '202',
      name: 'Professor Harris'
    }
  },
  {
    id: '10',
    name: 'Biology 301',
    description: 'Genetics and Evolution',
    path: '/bio-301',
    owner: {
      id: '301',
      name: 'Professor Turner'
    }
  }
]

function Homepage() {
  const [classes, setClasses] = useState(initialClasses)

  return (
    <>
      <Helmet>
        <title>Màn hình chính</title>
      </Helmet>

      <div className='p-6'>
        <div className='flex flex-wrap gap-6'>
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} data={classItem} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Homepage
