import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { User } from "../definitions";

interface CounterState {
	loading: boolean;
	isAuthenticated: boolean;
	user: any;
	error: any;
}

const initialState: CounterState = {
	loading: false,
	isAuthenticated: false,
	user: null,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
