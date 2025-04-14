import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuBan } from "react-icons/lu";
import QuizDetail from "./QuizDetail";
import QuizQuestions from "./QuizQuestions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import * as quizClient from "./client"; // Import the server client
import { setQuestions } from "./QuestionEditor/reducerQuestion";
import { useDispatch } from "react-redux";

export default function QuizEditor() {
  const { cid } = useParams();
  const { quizId } = useParams();
  const dispatch = useDispatch();

  // const { assignments } = useSelector((state: any) => state.assignmentReducer);

  // const existingAssignment = assignments.find((a: any) => a._id === aid);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((q: any) => q._id === quizId);

  // const quiz = selectedQuiz && selectedQuiz.length > 0 ? selectedQuiz[0] : null;
  console.log(quiz);
  // console.log(quiz.courseId);
  // const questions = quiz.answers;

  // const fetchQuestion = async () => {
  //   const quiz = await quizClient.findQuestionsForQuiz(quizId as string);
  //   console.log("Inside fetchQuestion");
  //   dispatch(setQuestions(quiz));
  // };
  // useEffect(() => {
  //   fetchQuestion();
  // }, []);

  // Fetch questions from Redux store
  const questions = useSelector(
    (state: any) => state.questionReducer.questions
  );

  const [totalPoints, setTotalPoints] = useState(quiz?.points || 0);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const pointsSum = questions.reduce(
        (sum: number, question: any) => sum + (question.points || 0),
        0
      );
      setTotalPoints(pointsSum); // Update total points
      if (quiz) {
        const updatedQuiz = { ...quiz, points: pointsSum };
        quizClient.updateQuizz(updatedQuiz);
      }
    } else {
      setTotalPoints(0); // Default to 0 if there are no questions
    }
  }, [questions]);

  console.log(totalPoints);

  // const fetchQuizDetails = async () => {
  //   try {
  //     const fetchedQuiz = await quizClient.findQuizzById(quizId as string); // Fetch quiz by ID
  //     dispatch(setSelectedQuiz(fetchedQuiz)); // Set the fetched quiz in Redux
  //   } catch (error) {
  //     console.error("Failed to fetch quiz details:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuizDetails(); // Fetch quiz details when the component loads
  // }, [quizId]);

  const [activeTab, setActiveTab] = useState("Details"); // To manage the active tab

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Quiz Editor</h3>

      {/* THE TOP RIGHT */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        {/* Points Section */}
        <div className="me-3">
          <strong>Points</strong>: <span>{totalPoints || 0}</span>
        </div>

        {/* Not Published Section */}
        <div className="me-3">
          <LuBan className="me-2 text-muted" />
          <span className="text-muted">
            {quiz?.published ? "Published" : "Not Published"}
          </span>
        </div>

        {/* Vertical Dotted Button */}
        <button className="border p-1 pt-2 pb-2 pe-2 ps-2 rounded bg-light ">
          <BsThreeDotsVertical />
        </button>
      </div>

      <hr />

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
            onClick={() => setActiveTab("Questions")}
          >
            Questions
          </a>
        </li>
      </ul>

      {/* Conditional Rendering of Tabs Content */}
      <div className="mt-3">
        {activeTab === "Details" && <QuizDetail quizDetails={quiz} />}
        {activeTab === "Questions" && <QuizQuestions />}
      </div>
    </div>
  );
}