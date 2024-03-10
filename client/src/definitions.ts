export interface BlogShortType {
  _id: string
  title: string
  description: string
  author: string
  img: string
}

export interface BlogFullType extends BlogShortType {
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface ProfileImage {
  data: Buffer
  contentType: string
}

interface User {
  name: string
  email: string
  password: string
  bio?: string
  profileImage?: ProfileImage
}

export interface UserDocumentType extends User {
  _id: string
  createdAt: string
  updatedAt: string
  blogs?: BlogFullType[]
}
