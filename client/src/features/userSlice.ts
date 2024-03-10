import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import toast from "react-hot-toast"
// import { User } from "../definitions";

import {
  handler,
  signIn,
  signUp,
  signinToken,
  signOut,
  updateName,
  updateBio,
  updateImage,
} from "../api/index.ts"

interface CounterState {
  loading: boolean
  isAuthenticated: boolean
  user: any
}

const initialState: CounterState = {
  loading: false,
  isAuthenticated: false,
  user: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SETUSER: (state, action) => {
      console.log(action.payload)

      state.isAuthenticated = true
      state.loading = false
      state.user = { ...state.user, ...action.payload }
    },
    SETLOADINGUSER: (state) => {
      state.loading = true
    },
    LOGOUTUSER: (state) => {
      console.log("logout")
      state.isAuthenticated = false
      state.loading = false
      state.user = null
      localStorage.removeItem("token")
    },
    UPDATENAME: (state, action) => {
      state.user.name = action.payload
    },
    UPDATEBIO: (state, action) => {
      state.user.bio = action.payload
    },
  },
})

export const logout = () => async (dispatch: any) => {
  const token = localStorage.getItem("token") || null
  dispatch(userSlice.actions.SETLOADINGUSER())
  handler(
    signOut,
    token,
    () => {
      dispatch(userSlice.actions.LOGOUTUSER())
      toast.success("Logged out")
    },
    (msg: string) => {
      toast.error(msg)
    },
  )
}
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(userSlice.actions.SETLOADINGUSER())
    handler(
      signIn,
      { email, password },
      (user: any) => {
        dispatch(userSlice.actions.SETUSER(user))
        localStorage.setItem("token", user.token)
        toast.success("Logged in")
      },
      (msg: string) => {
        toast.error(msg)
      },
    )
  }
export const register =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    dispatch(userSlice.actions.SETLOADINGUSER())
    console.log(name, email, password)

    handler(
      signUp,
      { name, email, password },
      (user: any) => {
        dispatch(userSlice.actions.SETUSER(user))
        localStorage.setItem("token", user.token)
        toast.success("Registered")
      },
      (msg: string) => {
        toast.error(msg)
      },
    )
  }

export const loadUser = () => async (dispatch: any) => {
  const token = localStorage.getItem("token") || null

  if (token) {
    dispatch(userSlice.actions.SETLOADINGUSER())
    handler(
      signinToken,
      token,
      (user: any) => {
        dispatch(userSlice.actions.SETUSER(user))
      },
      (msg: string) => {
        dispatch(userSlice.actions.LOGOUTUSER())
        console.log(msg)
      },
    )
  }
}

export const { SETUSER, SETLOADINGUSER, LOGOUTUSER } = userSlice.actions
export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer
