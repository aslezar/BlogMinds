import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { RootState } from "../store"
import toast from "react-hot-toast"
import { LoginType, SignUpType, UserType } from "../definitions"
import {
  signIn,
  signUp,
  signinToken,
  signOut,
  verifyOtp,
  updateName as updateNameApi,
  updateBio as updateBioApi,
  // updateImage as updateImageApi,
} from "../api/index.ts"

interface CounterState {
  loading: boolean
  isAuthenticated: boolean
  user: UserType | null
  verificationRequired: boolean
  verificationUserID: UserType["_id"] | string
}

const initialState: CounterState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  verificationRequired: false,
  verificationUserID: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      console.log(action.payload)
      state.isAuthenticated = true
      state.verificationRequired = false
      state.verificationUserID = ""
      state.user = { ...state.user, ...action.payload }
    },
    SET_LOADING: (state) => {
      state.loading = true
    },
    //set loading false
    SET_LOADING_FALSE: (state) => {
      state.loading = false
    },
    LOGOUT_USER: (state) => {
      console.log("logout")
      state.isAuthenticated = false
      state.user = null
      verificationRequired: false
      verificationUserID: ""
      localStorage.removeItem("token")
    },
    UPDATE_NAME: (state, action) => {
      if (state.user) state.user.name = action.payload
    },
    UPDATE_BIO: (state, action) => {
      if (state.user) state.user.bio = action.payload
    },
    SET_VERIFICATION_REQUIRED: (state, action) => {
      state.verificationUserID = action.payload
      state.verificationRequired = true
    },
  },
})

export const logout = () => async (dispatch: Dispatch) => {
  toast.loading("Logging out", { id: "logout" })
  dispatch(userSlice.actions.SET_LOADING())
  signOut()
    .then((res) => {
      console.log(res)

      dispatch(userSlice.actions.LOGOUT_USER())
      toast.success("Logged out")
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      dispatch(userSlice.actions.SET_LOADING_FALSE())
      toast.dismiss("logout")
    })
}
export const login = (loginValues: LoginType) => async (dispatch: any) => {
  if (!loginValues.email || !loginValues.password)
    return toast.error("Email and Password are required")

  dispatch(userSlice.actions.SET_LOADING())
  signIn(loginValues)
    .then((res: any) => {
      // res is objecy here with property token, msg and success
      console.log(res)

      localStorage.setItem("token", res.token)
      dispatch(loadUser())
      // toast.success("Logged in")
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      dispatch(userSlice.actions.SET_LOADING_FALSE())
    })
}
export const register =
  (signupValues: SignUpType) => async (dispatch: Dispatch) => {
    toast.loading("Registering", { id: "register" })
    dispatch(userSlice.actions.SET_LOADING())

    signUp(signupValues)
      .then((res) => {
        console.log(res)

        const id = res.data.userId
        dispatch(userSlice.actions.SET_VERIFICATION_REQUIRED(id))
        toast.success("Email Sent", { id: "register" })
      })
      .catch((err) => {
        console.log(err)
        toast.dismiss("register")
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
      })
  }

export const verification =
  (otp: string) => async (dispatch: any, getState: any) => {
    const verificationRequired = getState().user.verificationRequired
    if (!verificationRequired) return toast.error("Something went wrong.")

    const userId = getState().user.verificationUserID
    if (!userId) return toast.error("User Not Found")

    toast.loading("Verifying", { id: "verification" })
    dispatch(userSlice.actions.SET_LOADING())
    verifyOtp({ userId, otp })
      .then((res: any) => {
        // console.log(res)

        localStorage.setItem("token", res.token)
        dispatch(loadUser())
        toast.success("Registered Successfully", { id: "verification" })
      })
      .catch((err) => {
        console.log(err)
        toast.dismiss("verification")
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
      })
  }

export const loadUser = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token") || null

  if (token) {
    toast.loading("Loading", { id: "loadUser" })
    dispatch(userSlice.actions.SET_LOADING())
    signinToken()
      .then((res: any) => {
        // res is objecy here with property data,token, msg and success
        // console.log(res)

        const user = res.data
        const token = res.token

        toast.success("Logged in", { id: "loadUser" })
        localStorage.setItem("token", token)
        dispatch(userSlice.actions.SET_USER(user))
      })
      .catch((err) => {
        dispatch(userSlice.actions.LOGOUT_USER())
        toast.dismiss("loadUser")
        console.log(err)
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
      })
  }
}

export const updateName =
  (name: UserType["name"]) => async (dispatch: Dispatch) => {
    toast.loading("Updating Name", { id: "name" })
    dispatch(userSlice.actions.SET_LOADING())
    updateNameApi(name)
      .then((_res) => {
        // console.log(res)
        dispatch(userSlice.actions.UPDATE_NAME(name))
        toast.success("Name Updated")
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
        toast.dismiss("name")
      })
  }

export const updateBio =
  (bio: UserType["bio"]) => async (dispatch: Dispatch) => {
    if (!bio) return toast.error("Bio is required")
    if (bio.length > 150)
      return toast.error("Bio should be less than 150 characters")
    toast.loading("Updating Bio", { id: "bio" })
    dispatch(userSlice.actions.SET_LOADING())
    updateBioApi(bio)
      .then((_res) => {
        // console.log(res)
        dispatch(userSlice.actions.UPDATE_BIO(bio))
        toast.success("Bio Updated")
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
        toast.dismiss("bio")
      })
  }
export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer
