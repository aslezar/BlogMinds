import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import img from "../assets/img/Auth/signup.webp"
import { SignUpType } from "../definitions"
import { register } from "../features/userSlice"
import GoogleSvg from "../assets/img/Auth/GoogleSvg"

export default function SignUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, verificationRequired } = useAppSelector(
    (state) => state.user,
  )
  console.log(isAuthenticated, loading, verificationRequired)
  const [signupValues, setSignupValues] = React.useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignupValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !signupValues.firstName ||
      !signupValues.email ||
      !signupValues.password
    )
      return alert("All fields are required")
    dispatch(register(signupValues))
  }

  React.useEffect(() => {
    if (!loading && verificationRequired) {
      navigate("/verify")
    }
  }, [loading, verificationRequired])

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
          <Link to="/" className="text-gray-500 text-lg">
            <span className="mr-1">&#8592;</span>
          </Link>
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Register with us!
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={signupValues.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={signupValues.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
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
                value={signupValues.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={signupValues.password}
                onChange={handleChange}
                placeholder="*********"
                className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-dark text-white p-2.5 px-4 font-medium rounded-3xl hover:bg-highlight  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>OR</p>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full  mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-highlight  text-white p-2.5 px-4 rounded-3xl hover:bg-dark border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300 text-base font-medium"
              >
                <GoogleSvg />
                Continue with Google
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <Link to="/signin" className="hover:underline">
              Already have an account?{" "}
              <span className="text-black hover:underline">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
