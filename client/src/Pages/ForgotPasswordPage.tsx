import * as React from "react"
import img from "../assets/img/Auth/signup.webp"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
} from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { ForgotPasswordType } from "../definitions"

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAppSelector((state) => state.user)
  const [forgotPasswordValues, setForgotPasswordValues] =
    React.useState<ForgotPasswordType>({
      email: "",
      otp: "",
      password: "",
    })
  const [page, setPage] = React.useState<Number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForgotPasswordValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (page == 0) {
      if (!forgotPasswordValues.email) return alert("Email is required")
      dispatch(forgotPasswordSendOtp(forgotPasswordValues, setPage))
    } else if (page == 1) {
      if (
        !forgotPasswordValues.email ||
        !forgotPasswordValues.otp ||
        !forgotPasswordValues.password
      )
        return alert("All fields are required")
      dispatch(forgotPasswordVerifyOtp(forgotPasswordValues))
    }
  }
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/feed")
    }
  }, [loading, isAuthenticated])
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <img
          src={img}
          alt=""
          className="hidden lg:block w-full object-cover h-full"
        />
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6 scale-105">
          <Link to="/" className="text-gray-500 text-lg">
            <span className="mr-1">&#8592;</span>
          </Link>
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Forgot Password?
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            We got you covered
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {page === 0 ? (
              <div className=" gap-3 mt-4">
                <label
                  htmlFor="email"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={forgotPasswordValues.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            ) : (
              <>
                <div className="gap-3 mt-4">
                  <label
                    htmlFor="otp"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={forgotPasswordValues.otp}
                    onChange={handleChange}
                    placeholder="123456"
                    className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div className="gap-3 mt-4">
                  <label
                    htmlFor="otp"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={forgotPasswordValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div
                  onClick={() => setPage(0)}
                  className="mt-4 ml-2 text-sm text-gray-600"
                >
                  <span className="text-black hover:underline">
                    Change Email
                  </span>
                </div>
              </>
            )}
            <div>
              <button
                type="submit"
                className="w-full bg-dark text-white p-2.5 px-4 font-medium rounded-3xl hover:bg-highlight  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {page == 0 ? "Request OTP" : "Verify OTP"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <Link to="/signin" className="hover:underline cursor-pointer">
              Remember Password?
              <span className="text-black hover:underline"> Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
