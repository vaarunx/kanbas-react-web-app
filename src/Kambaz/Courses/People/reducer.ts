/* eslint-disable @typescript-eslint/no-explicit-any */
import { enrollments } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
  enrollment: {
    _id: "",
    user: "",
    course: "",
  },
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: r }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        user: r.user,
        course: r.course,
      };
      state.enrollments = [
        ...state.enrollments,
        {
          ...newEnrollment,
        },
      ];
      state.enrollment = newEnrollment;
    },

    deleteEnrollment: (state, { payload: r }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === r.user && e.course === r.course)
      );
    },
  },
});

export const { addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;