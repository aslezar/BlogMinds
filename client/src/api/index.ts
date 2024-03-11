import axios from "axios"
import toast from "react-hot-toast"
import {
  LoginType,
  SignUpType,
  BlogShortType,
  BlogFullType,
  UserType,
} from "../definitions"

/*
 ********************** Configuring Axios **********************
 */

const URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:5000/api/v1"

const API = axios.create({ baseURL: URL })

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
    if (response.data.success) {
      return response.data
    } else {
      toast.error(response.data.msg)
      return Promise.reject(response.data)
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(error)

    if (error.response) {
      toast.error(error.response.data?.msg)
    } else {
      toast.error("Network Error: Please try again later.")
    }
    return Promise.reject(error)
  },
)

interface VerifyOtpParams {
  userId: UserType["_id"]
  otp: number
}

/*
 ********************** Sign In and Sign Up **********************
 */
export const signIn = (login: LoginType) => API.post("/auth/signin", login)
export const signUp = (signup: SignUpType) => API.post("/auth/signup", signup)
export const verifyOtp = (verifyOtpParams: VerifyOtpParams) =>
  API.post("/auth/verify", verifyOtpParams)
export const signinToken = () => API.get("/auth/me")
export const signOut = () => API.post("/auth/signout")

/*
 *********************** Update User ***********************
 */
export const updateName = (name: UserType["name"]) =>
  API.patch("/user/updatename", { name })

export const updateBio = (bio: UserType["bio"]) =>
  API.patch("/user/updatebio", { bio })

// export const updateImage = (profileImage: UserType["profileImage"]) => {
//   const formData = new FormData()
//   formData.append("profileImage", profileImage)
//   return API.patch("/user/updateimage", formData)
// }

/*
 ************************ Blogs Requests ************************
 */
export const getBlog = (id: BlogShortType["_id"]) => API.get(`/blog/${id}`)
