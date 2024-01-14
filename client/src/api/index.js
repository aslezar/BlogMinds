import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

const URL =
	process.env.NODE_ENV === "production" ? "/api" : config.serverAPIURL;
const API = axios.create({ baseURL: URL });
//for mobile
// const API = axios.create({ baseURL: '/api' });

export const signIn = (data) => API.post("/auth/signin", data);
export const signUp = (data) => API.post("/auth/signup", data);
export const signinToken = (token) => API.post("/auth/signin/token", { token });
export const signOut = () => API.post("/auth/signout");

export const updateName = (name) => {
	const token = JSON.parse(localStorage.getItem("token")) || null;
	return API.patch(
		"/user/updatename",
		{ name },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
export const updateBio = (bio) => {
	const token = JSON.parse(localStorage.getItem("token")) || null;
	return API.patch(
		"/user/updatebio",
		{ bio },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
export const updateImage = (profileImage) => {
	const token = JSON.parse(localStorage.getItem("token")) || null;
	const formData = new FormData();
	formData.append("profileImage", profileImage);
	return API.patch("/user/updateimage", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});
};
export const handler = async (task, onSucess, data, onFailure) => {
	try {
		const res = await task(data);
		console.log(res.data);
		if (res.data.success) {
			onSucess(res.data?.data);
			toast.success(res.data.msg, {
				toastId: res.data.msg,
			});
		} else {
			toast.error(res.data.msg);
			if (onFailure) onFailure(res.data.msg);
		}
	} catch (error) {
		console.log(error);
		if (error.response) {
			toast.error(error.response.data.msg);
			if (onFailure) onFailure(error.response.data.msg);
		} else {
			toast.error("Server offline: Network Error");
		}
	}
};
