import { useEffect, useState } from "react"
import { MuiOtpInput } from "mui-one-time-password-input"
import { useAppDispatch, useAppSelector } from "../hooks"
import { loadUser } from "../features/userSlice"

const OTP = () => {
  const [otp, setOtp] = useState<string>("")
  const { user, loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }
  useEffect(() => {
    if (!loading && !user) {
      dispatch(loadUser())
    }
  }, [loading])

  return (
    <div className="h-screen w-screen fixed top-0 z-50 bg-white flex justify-center items-center">
      <div className="w-3/5">
        {" "}
        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={6}
          autoFocus={true}
          // onComplete={(value: string) => {
          //   dispatch(verify(value));
          // }}
        />
      </div>
    </div>
  )
}

export default OTP
