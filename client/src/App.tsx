import { Routes, Route } from "react-router-dom";

//Components
// import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

//Pages
import HomePage from "./Pages/HomePage";
// import DashBooard from "./Pages/DashBoard";
import ErrorPage from "./Pages/ErrorPage";
import { useEffect } from "react";
import toast from "react-hot-toast";

function App() {
	useEffect(() => {
		toast.success("Welcome to BlogMinds!");
	}, []);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				{/* <Route path="/room/:roomId" element={<WhiteBoard />} /> */}
				{/* <Route path="/dashboard" element={<DashBooard />} /> */}
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</div>
	);
}

export default App;
