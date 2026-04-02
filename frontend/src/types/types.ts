export interface User {
  id: number
  email: string
}

export interface PostFeed {
  Post: {
    id: number
    title: string
    owner: User
  }
  subscribers: number
}

export interface PostDetail {
  Post: {
    id: number
    title: string
    content: string
    created_at: string
    published: boolean
    owner: User
  }
  subscribers: number
}