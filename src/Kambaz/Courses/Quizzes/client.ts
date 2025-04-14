/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import { assignments } from "../../Database";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

const QUIZZES_API = `${REMOTE_SERVER}/api/Quizzes`;
const ATTEMPT_API = `${REMOTE_SERVER}/api/userAnswers`;

// Updating
export const updateQuizz = async (quiz: any) => {
  console.log(quiz);
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  console.log("Inside deletere");
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const findQuizzById = async (quizId: string) => {
  console.log("inside client");
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Getting questions for the quiz.
export const findQuestionsForQuiz = async (quizId: string) => {
  console.log("Inside question client", quizId);
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/Questions`
  );
  console.log(response.data);
  return response.data;
};

// Creating new quizzes for the course
export const createQuestionsForQuiz = async (question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/Questions`,
    question
  );
  return response.data;
};

export const createAttempt = async (attempt: any) => {
  const userId = attempt.userId;
  const quesId = attempt.quesId;
  const quizId = attempt.quizId;
  console.log(userId, quesId, quizId);
  const response = await axiosWithCredentials.post(`${ATTEMPT_API}`, attempt);
  return response.data;
};

// Fetch user attempts by quizId and userId
export const fetchUserAttempts = async (quizId: string, userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${ATTEMPT_API}/${quizId}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user attempts:", error);
    throw error;
  }
};

export const fetchUserAttemptById = async (attemptId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${ATTEMPT_API}/existing/${attemptId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user attempts:", error);
    throw error;
  }
};

// Updating
export const updateAttempt = async (attempt: any) => {
  console.log(attempt._id);

  const response = await axiosWithCredentials.put(
    `${ATTEMPT_API}/${attempt._id}`,
    attempt
  );
  return response.data;
};
