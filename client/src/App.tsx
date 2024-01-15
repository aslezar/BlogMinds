import React from "react";
import { Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";

//Components
// import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import SpeedDial from "./components/SpeedDial";
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

function App() {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		//check token exist in localstorage
		dispatch(loadUser());
		toast.success("Welcome to BlogMinds!");
	}, []);

	return (
		<div className="min-h-100">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />

				<Route path="/dashboard" element={<DashBoard />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/myblogs" element={<MyBlogs />} />
				<Route path="/addBlog" element={<AddBlog />} />
				<Route path="/editBlog/:id" element={<EditBlog />} />

				<Route path="/blog/:id" element={<Blog />} />
				<Route path="/about" element={<About />} />
				<Route path="/contactus" element={<ContactUs />} />

				<Route path="/*" element={<ErrorPage />} />
			</Routes>
			<SpeedDial />
			<Footer />
		</div>
	);
}

export default App;
