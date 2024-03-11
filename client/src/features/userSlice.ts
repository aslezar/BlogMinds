import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import toast from "react-hot-toast"
import { LoginType, SignUpType, UserType } from "../definitions"
import {
  signIn,
  signUp,
  signinToken,
  signOut,
  verifyOtp,
  // updateName,
  // updateBio,
  // updateImage,
} from "../api/index.ts"

interface CounterState {
  loading: boolean
  isAuthenticated: boolean
  user: any
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
      state.user.name = action.payload
    },
    UPDATE_BIO: (state, action) => {
      state.user.bio = action.payload
    },
    SET_VERIFICATION_REQUIRED: (state, action) => {
      state.verificationUserID = action.payload
      state.verificationRequired = true
    },
  },
})

export const logout = () => async (dispatch: any) => {
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
    })
}
export const login = (loginValues: LoginType) => async (dispatch: any) => {
  if (!loginValues.email || !loginValues.password)
    return toast.error("Email and Password are required")
  dispatch(userSlice.actions.SET_LOADING())
  signIn(loginValues)
    .then((res) => {
      // res is objecy here with property token, msg and success
      console.log(res)
      localStorage.setItem("token", res.token)
      dispatch(loadUser())
      toast.success("Logged in")
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      dispatch(userSlice.actions.SET_LOADING_FALSE())
    })
}
export const register = (signupValues: SignUpType) => async (dispatch: any) => {
  dispatch(userSlice.actions.SET_LOADING())

  signUp(signupValues)
    .then((res) => {
      const id = res.data.userId
      console.log(res.data.userId)
      dispatch(userSlice.actions.SET_VERIFICATION_REQUIRED(id))
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      dispatch(userSlice.actions.SET_LOADING_FALSE())
    })
}

export const verification =
  (otp: number) => async (dispatch: any, getState: any) => {
    const verificationRequired = getState().user.verificationRequired
    if (!verificationRequired) return toast.error("Something went wrong.")

    const userId = getState().user.verificationUserID
    if (!userId) return toast.error("User Not Found")
    dispatch(userSlice.actions.SET_LOADING())
    verifyOtp({ userId, otp })
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.token)
        dispatch(loadUser())
        toast.success("Registered Successfully")
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
      })
  }

export const loadUser = () => async (dispatch: any) => {
  const token = localStorage.getItem("token") || null

  if (token) {
    dispatch(userSlice.actions.SET_LOADING())
    signinToken()
      .then((res) => {
        // res is objecy here with property data,token, msg and success
        console.log(res)

        const user = res.data
        const token = res.token

        console.log(user)

        localStorage.setItem("token", token)
        dispatch(userSlice.actions.SET_USER(user))
      })
      .catch((err) => {
        dispatch(userSlice.actions.LOGOUT_USER())
        console.log(err)
      })
      .finally(() => {
        dispatch(userSlice.actions.SET_LOADING_FALSE())
      })
  }
}

// export const {
//   SET_USER: SETUSER,
//   SET_LOADING: SETLOADINGUSER,
//   LOGOUT_USER: LOGOUTUSER,
// } = userSlice.actions
export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer
