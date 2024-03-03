import axios from "axios";
import toast from "react-hot-toast";
import { BlogType, BlogFullType, UserType } from "../definitions";

const URL =
	process.env.NODE_ENV === "production"
		? "/api/v1"
		: "http://localhost:5000/api/v1";

const API = axios.create({ baseURL: URL });

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

export const getBlog = (id) => {
	return API.get(`/blog/${id}`);
};
export const handler = async (task, data, onSucess, onFailure) => {
	try {
		const res = await task(data);
		console.log(res.data);
		if (res.data.success) {
			if (onSucess) onSucess(res.data?.data);
			// toast.success(res.data.msg, {
			// 	toastId: res.data.msg,
			// });
		} else {
			// toast.error(res.data.msg);
			if (onFailure) onFailure(res.data?.msg);
		}
	} catch (error) {
		console.log(error);
		if (error.response) {
			// toast.error(error.response.data?.msg);
			if (onFailure) onFailure(error.response.data?.msg);
		} else {
			toast.error("Server Unreachable: Network Error");
		}
	}
};
