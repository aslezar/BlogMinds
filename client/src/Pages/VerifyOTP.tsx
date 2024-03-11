import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import img from "../assets/img/Auth/signup.webp"
import { verification } from "../features/userSlice"

export default function SignUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { verificationRequired, loading, isAuthenticated } = useAppSelector(
    (state) => state.user,
  )

  const [otp, setOtp] = React.useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(+e.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!otp) return alert("All fields are required")
    dispatch(verification(otp))
  }

  React.useEffect(() => {
    if (!loading) {
      if (verificationRequired === false || isAuthenticated) {
        navigate("/")
      }
    }
  }, [loading, verificationRequired, isAuthenticated])

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <img
          src={img}
          alt=""
          className="hidden lg:block w-full h-full object-cover"
        />
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6 scale-105">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Enter OTP
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className=" gap-3 mt-4">
              <label
                htmlFor="otp"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="number"
                name="otp"
                id="otp"
                required
                value={otp}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white rounded-md"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
