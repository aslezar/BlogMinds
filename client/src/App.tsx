import { useEffect } from "react"
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom"

//Components
import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"

//Pages
import HomePage from "./Pages/HomePage"
import SignIn from "./Pages/SignInPage"
import SignUp from "./Pages/SignUpPage"
import VerifyOTP from "./Pages/VerifyOTP"
import ForgotPassword from "./Pages/ForgotPasswordPage"
import DashBoard from "./Pages/DashBoardPage"
import Profile from "./Pages/ProfilePage"
import MyBlogs from "./Pages/MyBlogsPage"
import AddBlog from "./Pages/AddBlogPage"
import EditBlog from "./Pages/EditBlogPage"
import Blog from "./Pages/BlogPage"
import About from "./Pages/AboutPage"
import ContactUs from "./Pages/ContactUsPage"
import ErrorPage from "./Pages/ErrorPage"
import { useAppDispatch, useAppSelector } from "./hooks"
import { loadUser } from "./features/userSlice"
import AllBlogs from "./Pages/AllBlogs"
import Loader from "./components/Loader"
import SearchResults from "./Pages/SearchResults"

const Layout = () => {
  const location = useLocation()
  const hideNavbarRoutes = ["/signin", "/signup", "/verify"]
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <ScrollRestoration />
      <div className={`min-h-screen ${!shouldHideNavbar && "pt-20"}`}>
        <Outlet />
      </div>
    </div>
  )
}
const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAppSelector((state) => state.user)

  if (loading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/signin" />
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "forgotpassword",
            element: <ForgotPassword />,
          },
          {
            path: "dashboard",
            element: <DashBoard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myblogs",
            element: <MyBlogs />,
          },
          {
            path: "write",
            element: <AddBlog />,
          },
          {
            path: "editBlog/:id",
            element: <EditBlog />,
          },
        ],
      },
      { path: "search", element: <SearchResults /> },
      { path: "signin", element: <SignIn /> },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "verify",
        element: <VerifyOTP />,
      },
      {
        path: "feed",
        element: <AllBlogs />,
      },

      {
        path: "blog/:id",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
])

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return <RouterProvider router={router} />
}

export default App
