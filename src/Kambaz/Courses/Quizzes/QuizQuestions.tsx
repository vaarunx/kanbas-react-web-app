/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { SlQuestion } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestion } from "./QuestionEditor/reducerQuestion"; // Import the deleteQuestion action from the questionReducer
import * as quizClient from "./client";
import { setQuestions } from "./QuestionEditor/reducerQuestion";
import * as questionClient from "./QuestionEditor/client";


const QuizQuestions = () => {
  const { cid, quizId } = useParams(); // Get course and quiz IDs from the route params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
  };

  // const

  const fetchQuestion = async () => {
    const quiz = await quizClient.findQuestionsForQuiz(quizId as string);
    console.log("Inside fetchQuestion");
    dispatch(setQuestions(quiz));
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Fetch questions from Redux store
  const questions = useSelector(
    (state: any) => state.questionReducer.questions
  );
  console.log(questions);

  // const { questions } = useSelector((state: any) => state.quizReducer);

  // // Filter questions based on the current quizId
  // const filteredQuestions = questions.filter(
  //   (question: any) => question.quizId === quizId
  // );

  const handleAddClick = () => {
    navigate(
      `/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit/Questions/QuestionEditor`
    );
  };

  const handleDeleteClick = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await questionClient.deleteQuestion(questionId); // Call the client method to delete the quiz
        dispatch(deleteQuestion(questionId)); // Dispatch the delete action
        console.log("Quiz deleted successfully.");
      } catch (error) {
        console.error("Failed to delete quiz:", error);
        alert("Failed to delete quiz. Please try again.");
      }
    }
  };

  // if (questions.length === 0) {
  //   return <p>No questions found for this quiz!</p>; // Show this if no questions are found
  // }

  // const renderQuestionByType = (question: any) => {
  //   switch (question.qtype) {
  //     case "multipleChoice":
  //       return <McqQuestion question={question} />;
  //     case "fillIn":
  //       return <FillInTheBlankEditor question={question} />;
  //     case "true / false":
  //       return <TrueFalseEditor question={question} />;
  //     default:
  //       return <p>Unsupported question type</p>;
  //   }
  // };

  return (
    <div>
      <h5>Questions Section</h5>
      <div className="d-flex justify-content-center">
        <button
          className="border p-2 me-2 rounded bg-light"
          onClick={handleAddClick}
        >
          + New Question
        </button>
      </div>

      {/* Rendering the questions */}
      <ul id="wd-modules" className="list-group rounded-0 mt-5">
        <li className="wd-module list-group-item p-0 mb-5 fs-5">
          <div
            id="wd-assignments-title"
            className="d-flex justify-content-between align-items-center wd-title p-3 ps-2 bg-light"
          >
            <span>
              <MdArrowDropDown className="me-2 fs-3" />
              <b>Questions</b>
            </span>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {/* Map over the filtered questions */}
            {questions.map((question: any, index: number) => (
              <li
                key={question._id}
                className="wd-lesson wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-start"
              >
                <SlQuestion className="ms-3 me-4 mt-2 fs-3 text-success" />
                <div className="mt-2">
                  <Link
                    className="wd-assignment-link text-black text-decoration-none d-flex"
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit/Questions/${question._id}`}
                    // to="#"
                    // onClick={() => handleQuestionClick(question)}
                  >
                    <b className="fs-5 me-2 text-danger">
                      Question {index + 1}
                    </b>
                    <span>{question.question}</span>
                  </Link>
                  <div className="text-secondary mt-1">
                    <small>
                      Points: {question.points} | Type:{" "}
                      {question.qtype === "multipleChoice"
                        ? "Multiple Choice"
                        : question.qtype === "fillIn"
                        ? "Fill in the Blank"
                        : question.qtype === "true / false"
                        ? "True / False"
                        : "Other"}
                    </small>
                  </div>
                </div>
                {/* Delete Button */}
                <button
                  className="btn btn-danger btn-sm ms-auto"
                  onClick={() => handleDeleteClick(question._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <hr />
      <div className="d-flex justify-content-end">
        {/* Optional Footer (Add buttons here if necessary) */}
      </div>
    </div>
  );
};

export default QuizQuestions;
