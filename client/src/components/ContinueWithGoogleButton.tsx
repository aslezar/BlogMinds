import React from "react"
import { loginGoogle } from "../features/userSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useNavigate } from "react-router-dom"

const ContinueWithGoogleButton = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading } = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  React.useEffect(() => {
    const googleDataCallback = (res: any) => {
      dispatch(loginGoogle(res.credential))
    }
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    // script.async = true
    script.defer = true
    document.body.appendChild(script)
    ;(window as any).continueWithGoogle = googleDataCallback

    return () => {
      document.body.removeChild(script)
      ;(window as any).continueWithGoogle = null
    }
  }, [])

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/feed")
    }
  }, [loading, isAuthenticated])

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={process.env.VITE_GOOGLE_CLIENT_ID}
        data-context="use"
        data-ux_mode="popup"
        data-callback="continueWithGoogle"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="center"
      ></div>
    </>
  )
}

export default ContinueWithGoogleButton
