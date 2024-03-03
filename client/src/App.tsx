import { useEffect } from "react";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import toast from "react-hot-toast";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Pages
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignInPage";
import SignUp from "./Pages/SignUpPage";
import ForgotPassword from "./Pages/ForgotPasswordPage";
import DashBoard from "./Pages/DashBoardPage";
import Profile from "./Pages/ProfilePage";
import MyBlogs from "./Pages/MyBlogsPage";
import AddBlog from "./Pages/AddBlogPage";
import EditBlog from "./Pages/EditBlogPage";
import Blog from "./Pages/BlogPage";
import About from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUsPage";
import ErrorPage from "./Pages/ErrorPage";
import { useAppDispatch } from "./hooks";
import { loadUser } from "./features/userSlice";
import AllBlogs from "./Pages/AllBlogs";

const Layout = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
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
        path : "blogs/all",
        element : <AllBlogs/>
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
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
        path: "addBlog",
        element: <AddBlog />,
      },
      {
        path: "editBlog/:id",
        element: <EditBlog />,
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
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
    toast.success("Welcome to BlogMinds!");
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
