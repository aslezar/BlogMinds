import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { User } from "../definitions";

interface CounterState {
	loading: boolean;
	isAuthenticated: boolean;
	user: any;
}

const initialState: CounterState = {
	loading: false,
	isAuthenticated: true,
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		SETUSER: (state, action) => {
			state.isAuthenticated = true;
			state.loading = false;
			state.user = action.payload;
		},
		SETLOADINGUSER: (state) => {
			state.loading = true;
		},
		LOGOUTUSER: (state) => {
			console.log("logout");
			state = initialState;
		},
	},
});

export const { SETUSER, SETLOADINGUSER, LOGOUTUSER } = userSlice.actions;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
