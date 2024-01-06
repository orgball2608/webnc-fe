import { GradeReview } from './grade-review.type'

export interface Grade {
  id: number
  studentId: string
  fullName: string
  gradeCompositionId: number
  grade: number
  createdById: number
  createdAt: string
  updatedAt: string
  GradeReview: GradeReview[]
}

export interface GradeBoardHeaderItem {
  key: string
  label: string
  metaData: {
    id: number
    courseId: number
    createdById: number
    name: string
    scale: number
    index: number
    isFinalized: boolean
    createdAt: string
    updatedAt: string
  } | null
}

export type GradeBoardRowItem = {
  index: number
  studentId: string
  fullName: string
  totalGrade: number
} & Record<string, number>

export interface GradeBoard {
  headers: GradeBoardHeaderItem[]
  rows: GradeBoardRowItem[]
}

export interface StudentGrade {
  id: number
  courseId: number
  studentId: string
  createdById: number
  name: string
  scale: number
  index: number
  isFinalized: boolean
  createdAt: string
  updatedAt: string
  grades: Grade[]
}
