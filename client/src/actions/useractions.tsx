import { handler } from "../api";
import { SETUSER, SETLOADINGUSER, LOGOUTUSER } from "../features/userSlice";

export const getUser = () => async (dispatch: any) => {
	dispatch(SETLOADINGUSER());
	try {
		const res = await handler.get("/user");
		dispatch(SETUSER(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const logoutUser = () => async (dispatch: any) => {
	try {
		await handler.get("/logout");
		dispatch(LOGOUTUSER());
	} catch (err) {
		console.log(err);
	}
};

export const loginUser = (user: any) => async (dispatch: any) => {
	try {
		const res = await handler.post("/login", user);
		dispatch(SETUSER(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const registerUser = (user: any) => async (dispatch: any) => {
	try {
		const res = await handler.post("/register", user);
		dispatch(SETUSER(res.data));
	} catch (err) {
		console.log(err);
	}
};
