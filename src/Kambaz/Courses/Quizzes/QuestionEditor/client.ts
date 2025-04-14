/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import { assignments } from "../../Database";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/Questions`;

// Updating
export const updateQuestions = async (question: any) => {
  console.log(question);
  const response = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  console.log("Inside deletere");
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};

export const findQuestionById = async (questionId: any) => {
  console.log("question id", questionId);
  const response = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};
