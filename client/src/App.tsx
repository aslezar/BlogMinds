import { Routes, Route } from "react-router-dom";

//Components
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";

//Pages
// import Homepage from "./Pages/HomePage";
// import DashBooard from "./Pages/DashBoard";
// import ErrorPage from "./Pages/ErrorPage";
import Blog from "./Pages/Blog";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Blog />} />
			{/* <Navbar /> */}
			{/* <Route path="/" element={<Homepage />} />
				<Route path="/room/:roomId" element={<WhiteBoard />} />
				<Route path="/dashboard" element={<DashBooard />} />
				<Route path="/*" element={<ErrorPage />} /> */}
		</Routes>
	);
}

export default App;
