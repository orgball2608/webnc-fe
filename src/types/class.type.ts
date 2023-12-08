export interface ClassItem {
  id: string
  name: string
  description: string
  createdBy: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}
