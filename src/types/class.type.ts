export interface ClassItem {
  id: string
  name: string
  description: string
  path: string
  owner: {
    id: string
    name: string
    avatar?: string
  }
}
