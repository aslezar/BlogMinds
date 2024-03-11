export interface LoginType {
  email: string
  password: string
}

export interface SignUpType {
  firstName: string
  lastName: string
  email: string
  password: string
}

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

interface User {
  name: string
  email: string
  password: string
  bio?: string
  profileImage?: string
}

export interface UserType extends User {
  _id: string
  createdAt: string
  updatedAt: string
  blogs?: BlogFullType[]
}
