export interface Grade {
  id: number
  studentId: string
  fullName: string
  gradeCompositionId: number
  grade: number
  createdById: number
  createdAt: string
  updatedAt: string
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
