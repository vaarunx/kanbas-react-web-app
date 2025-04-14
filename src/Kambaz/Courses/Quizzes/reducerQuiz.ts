import { createSlice } from "@reduxjs/toolkit";
// import { quizzes as quizzesDB } from "../../Database";

interface Quiz {
  _id: string;
  courseId: string;
  name: string;
  availability: string;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  points: number;
  score: number;
  type: string;
  group: string;
  shuffled: boolean;
  time: number;
  multipleAttempts: boolean;
  description: string;
  questions: string[];
}

interface QuizState {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  selectedQuiz: null, // Add the selectedQuiz field in the state
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: Quiz = {
        _id: new Date().getTime().toString(),
        ...quiz,
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: Quiz) => q._id !== quizId);
    },
    // Set a specific quiz as the selected quiz
    setSelectedQuiz: (state, { payload: quiz }) => {
      state.selectedQuiz = quiz; // Store the selected quiz
    },

    // Clear the selected quiz (optional for cleanup)
    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null; // Reset the selected quiz
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: Quiz) =>
        q._id === quiz._id ? quiz : q
      );
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setSelectedQuiz,
  clearSelectedQuiz,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
