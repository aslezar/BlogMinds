import * as React from "react"
import img from "../assets/img/Auth/signup.webp"
import { useAppDispatch, useAppSelector } from "../hooks"
import { login } from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { LoginType } from "../definitions"

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAppSelector((state) => state.user)
  const [loginValues, setLoginValues] = React.useState<LoginType>({
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login(loginValues))
  }
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/")
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
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Welcome Back!
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            We missed you at Creativerse
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
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
                value={loginValues.email}
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
                value={loginValues.password}
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
                Login
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
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 22a10 10 0 0 1-7.1-3A9.9 9.9 0 0 1 5 4.8C7 3 9.5 2 12.2 2h.2c2.4 0 4.8 1 6.6 2.6l-2.5 2.3a6.2 6.2 0 0 0-4.2-1.6c-1.8 0-3.5.7-4.8 2a6.6 6.6 0 0 0-.1 9.3c1.2 1.3 2.9 2 4.7 2h.1a6 6 0 0 0 4-1.1c1-.9 1.8-2 2.1-3.4v-.2h-6v-3.4h9.6l.1 1.9c-.1 5.7-4 9.6-9.7 9.6H12Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <Link to="/signup" className="hover:underline cursor-pointer">
              Don't have an account?
              <span className="text-black hover:underline"> Signup here</span>
            </Link>
          </div>
          {/* {loading && <Loader />} */}
        </div>
      </div>
    </div>
  )
}
