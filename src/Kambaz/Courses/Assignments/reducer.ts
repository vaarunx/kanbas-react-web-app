/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
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
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: newAssignment }) => {
      state.assignments = [...state.assignments, newAssignment] as any;
      state.assignment = newAssignment;
    },
    deleteAssignment: (state, { payload: assignment_id }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignment_id
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    setAssignment: (state, { payload: assignment }) => {
      state.assignment = assignment;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
