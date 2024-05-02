import axios from "axios"
import toast from "react-hot-toast"
import {
  LoginType,
  SignUpType,
  BlogShortType,
  UserType,
  ForgotPasswordType,
  BlogCreateType,
} from "../definitions"

/*
 ********************** Configuring Axios **********************
 */

const URL = import.meta.env.PROD ? "/api/v1" : "http://localhost:8000/api/v1"

const API = axios.create({ baseURL: URL, withCredentials: true })

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token") || ""

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)
API.interceptors.response.use(
  function (response) {
    const isAIImage = response.headers["x-ai-generated-image"] === "true"
    if (isAIImage) return response

    if (response.data.success) {
      return response.data
    } else {
      toast.error(response.data.msg, { id: response.data.msg })
      return Promise.reject(response.data)
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(error)

    if (error.response) {
      toast.error(error.response.data?.msg, { id: error.response.data?.msg })
    } else {
      toast.error("Network Error: Please try again later.", {
        id: "Network Error",
      })
    }
    return Promise.reject(error)
  },
)

interface VerifyOtpParams {
  userId: UserType["userId"]
  otp: string
}

/*
 ********************** Sign In and Sign Up **********************
 */
export const signIn = (login: LoginType) => API.post("/auth/signin", login)
export const signUp = (signup: SignUpType) => API.post("/auth/signup", signup)
export const forgotPasswordSendOtpApi = (email: string) =>
  API.post("/auth/forgot-password/send-otp", { email })
export const forgotPasswordVerifyOtpApi = (
  forgotPasswordValues: ForgotPasswordType,
) => API.post("/auth/forgot-password/verify-otp", forgotPasswordValues)
export const verifyOtp = (verifyOtpParams: VerifyOtpParams) =>
  API.post("/auth/verify", verifyOtpParams)
export const signinToken = () => API.get("/auth/me")
export const signOut = () => API.post("/auth/signout")

/*
 ********************** User Requests **********************
 */
/* /my-profile */
export const getMyProfile = () => API.get("/user/my-profile")
export const getAssests = () => API.get("/user/assets")
export const deleteAssest = (assets: string) =>
  API.delete("/user/assets", { data: { assets } })

export const uploadAssests = (assetFiles: FormData) => {
  return API.post("/user/assets", assetFiles)
}

export const updateProfile = (userData: UserType) => {
  const { name, bio, myInterests } = userData
  return API.patch("/user/update-profile", {
    name,
    bio,
    myInterests,
  })
}

/*
 *********************** User Requests ***********************
 */

export const getUserProfile = (id: UserType["userId"]) =>
  API.get(`/public/profile/${id}`)

export const updateName = (name: UserType["name"]) =>
  API.patch("/user/updatename", { name })

export const updateBio = (bio: UserType["bio"]) =>
  API.patch("/user/updatebio", { bio })

// export const updateImage = (profileImage: UserType["profileImage"]) => {
//   const formData = new FormData()
//   formData.append("profileImage", profileImage)
//   return API.patch("/user/updateimage", formData)
// }

/*User Blog Req*/

export const getUserBlogs = (page: number = 1, limit: number = 10) =>
  API.get("/user/blog", {
    params: {
      page,
      limit,
    },
  })

export const getUserBlogById = (id: BlogShortType["_id"]) =>
  API.get(`/user/blog/${id}`)

export const createBlog = (blog: BlogCreateType) =>
  API.post("/user/blog", {
    title: blog.title,
    description: blog.description,
    content: JSON.stringify(blog.content),
    img: blog.img,
    tags: blog.tags,
  })

export const updateBlog = (blog: BlogCreateType) =>
  API.patch(`/user/blog/${blog._id}`, {
    title: blog.title,
    description: blog.description,
    content: JSON.stringify(blog.content),
    img: blog.img,
    tags: blog.tags,
  })

export const deleteBlog = (id: BlogShortType["_id"]) =>
  API.delete(`/user/blog/${id}`)

/*
 ************************ Blogs Requests ************************
 */
export const getBlogs = (
  category: string,
  pageNo: number = 1,
  limit: number = 10,
) =>
  API.get("/blog/category", {
    params: {
      tags: category,
      page: pageNo,
      limit: limit,
    },
  })

export const getRecommendedBlogs = (
  userId: BlogShortType["_id"],
  pageNo: number = 1,
  limit: number = 10,
) =>
  API.get("/blog/recommended", {
    params: {
      userId: userId,
      page: pageNo,
      limit: limit,
    },
  })

export const getBlog = (
  id: BlogShortType["_id"],
  userId: BlogShortType["_id"] | null,
) =>
  API.get(`/blog/${id}`, {
    params: {
      userId: userId,
    },
  })

export const likeBlog = (id: BlogShortType["_id"]) =>
  API.patch(`/blog/${id}/like`)

export const commentBlog = (id: BlogShortType["_id"], message: string) =>
  API.post(`/blog/${id}/comment`, { message })

export const getTrendingBlog = () => API.get("/blog/trending")

/*
 ************************ Search Requests ************************
 */
export const search = (
  query: string,
  type: string,
  page: number,
  limit: number,
) =>
  API.get("/search", {
    params: {
      query,
      type,
      page,
      limit,
    },
  })
/*
 ************************ AI Requests ************************
 */

export const getAICompletion = (text: string) =>
  API.get("/ai/suggest/text", { params: { text } })

export const getAImage = (prompt: string) =>
  API.get("/ai/suggest/image", { params: { prompt }, responseType: "blob" })
