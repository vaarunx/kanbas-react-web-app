import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Courses/People/reducer";
import quizReducer from "./Courses/Quizzes/reducerQuiz"
import questionReducer from "./Courses/Quizzes/QuestionEditor/reducerQuestion";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizReducer,
    questionReducer,
  },
});
export default store;
