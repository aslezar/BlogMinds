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

export interface ForgotPasswordType {
  email: string
  otp: string
  password: string
}

interface Author {
  _id: string
  name: string
  profileImage?: string
}

export interface CommentType {
  _id: string
  message: string
  author: Author
  createdAt: string
}

export interface BlogShortType {
  _id: string
  title: string
  description: string
  author: Author
  img: string
  tags: Category[]
}

export interface BlogCreateType {
  _id: string
  title: string
  description: string
  img: string
  tags: Category[]
  content: {
    time: number
    blocks: { type: string; data: any }[]
    version: string
  }
}

export interface BlogCardType extends BlogShortType {
  likesCount: number
  commentsCount: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface BlogFullType extends BlogShortType {
  likesCount: number
  commentsCount: number
  views: number
  createdAt: string
  updatedAt: string
  content: string
  comments: CommentType[]
}

interface User {
  name: string
  email: string
  bio?: string
  profileImage?: string
}

export interface UserType extends User {
  userId: string
  createdAt: string
  updatedAt: string
  blogs?: BlogFullType[]
  followingCount: number
  followersCount: number
  myInterests: string[]
}

export enum Category {
  All = "all",
  Technology = "technology",
  Science = "science",
  Programming = "programming",
  Health = "health",
  Business = "business",
  Entertainment = "entertainment",
  Sports = "sports",
  Education = "education",
  Lifestyle = "lifestyle",
}
export interface TrendingType {
  _id: string
  title: string
  totalScore: number
  author: Author
}

type ProfileBlogs = {
  _id: string
  title: string
  author: string
  img: string
  tags: string[]
  likesCount: number
  commentsCount: number
  views: number
  createdAt: string
  description: string
}

export type Profile = {
  _id: string
  name: string
  blogs: ProfileBlogs[]
  followersCount: number
  followingCount: number
  myInterests: string[]
  profileImage: string
  bio: string | undefined
  createdAt: string
}

export type Comment = {
  _id: string
  message: string
  author: {
    _id: string
    name: string
    profileImage: string
  }
}
