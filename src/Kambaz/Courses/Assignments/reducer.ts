/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
  assignment: {
    _id: "",
    title: "",
    course: "",
    modules: "Multiple Modules",
    availableDate: "",
    dueDate: "",
    points: 0,
    description: "",
  },
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: course_id}) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: "",
        course: course_id,
        modules: "Multiple Modules",
        availableDate: "",
        dueDate: "",
        points: "",
        description: "",
      };
      state.assignments = [...state.assignments, newAssignment] as any;
      state.assignment = newAssignment;
    },
    deleteAssignment: (state, { payload: assignment_id }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignment_id
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
    setAssignment: (state, { payload: assignment }) => {
      state.assignment = assignment;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;