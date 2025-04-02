/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: r }) => {
      state.enrollments = [...state.enrollments, r] as any;
    },
    deleteEnrollment: (state, { payload: r }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === r.user && e.course === r.course)
      );
    },
  },
});

export const { setEnrollments, addEnrollment, deleteEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
