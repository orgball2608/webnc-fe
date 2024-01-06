export interface GradeComposition {
  id: number
  createdAt: string
  updatedAt: string
  courseId: number
  name: string
  scale: number
  createdBy: {}
  isFinalized?: boolean
}
