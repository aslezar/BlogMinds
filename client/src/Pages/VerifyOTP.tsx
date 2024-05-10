import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { verification } from "../features/userSlice"
import { MuiOtpInput } from "mui-one-time-password-input"
import img from "../assets/img/Auth/otp.png"
import Loader from "../components/Loader"

export default function SignUp(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { verificationRequired, loading } = useAppSelector(
    (state) => state.user,
  )

  const [otp, setOtp] = React.useState<string>("")

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  React.useEffect(() => {
    if (!loading && verificationRequired === false) {
      navigate("/feed")
    }
  }, [loading, verificationRequired])

  React.useEffect(() => {
    if (otp.length === 6) {
      console.log(otp)
      dispatch(verification(otp))
    }
  }, [otp])

  if (loading || !verificationRequired) return <Loader />

  return (
    <div className="flex h-screen">
      <div className=" w-screen  top-0 z-50 bg-white flex flex-col justify-center  items-center h-4/5 ">
        <div className="w-4/5 md:w-2/5">
          <div className="mb-5">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 text-sm"
            >
              <span className="mr-1">&#8592;</span>
              Back
            </button>
          </div>

          <img src={img} alt="" className="h-40 aspect-square mx-auto" />
          <div className="my-5">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">
              OTP Verification
            </h1>
            <p className="text-highlight italic">
              An OTP has been sent to your email address, please check your
              email.
            </p>
          </div>
          <MuiOtpInput
            TextFieldsProps={{ color: "secondary" }}
            value={otp}
            onChange={handleChange}
            length={6}
            autoFocus={true}
            color={"#000"}
          />
        </div>
      </div>
    </div>
  )
}
