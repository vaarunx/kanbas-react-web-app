import { createSlice } from "@reduxjs/toolkit";
// import { questions as questionDB } from "../../../Database";

interface Answer {
  answer: string;
  isAnswer: boolean;
}

interface Question {
  _id: string;
  questionId: string;
  title: string;
  quizId: string;
  qtype: string;
  question: string;
  points: number;
  answer: Answer[];
  selectedQuestion: Question | null;
}

interface QuestionState {
  questions: Question[];
  selectedQuestion: Question | null;
}

const initialState: QuestionState = {
  questions: [],
  selectedQuestion: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: Question = {
        questionId: new Date().getTime().toString(),
        ...question,
      };
      state.questions = [...state.questions, newQuestion];
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: Question) => q._id !== questionId
      );
    },
    // Set a specific quiz as the selected quiz
    setSelectedQuestion: (state, { payload: quiz }) => {
      state.selectedQuestion = quiz; // Store the selected quiz
    },

    // Clear the selected quiz (optional for cleanup)
    clearSelectedQuestion: (state) => {
      state.selectedQuestion = null; // Reset the selected quiz
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: Question) =>
        q._id === question._id ? question : q
      );
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setSelectedQuestion,
  clearSelectedQuestion,
} = questionsSlice.actions;
export default questionsSlice.reducer;
