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
import { SETUSER, SETLOADINGUSER, LOGOUTUSER } from "../features/userSlice"
import { useAppDispatch, useAppSelector } from "../hooks"

export const login = async (email: string, password: string) => {
    try {
        handler(
            signIn,
            (data) => {
                console.log(data)
            },
            {
                email,
                password,
            },
        )
    } catch (error) {
        console.log(error)
    }
}
