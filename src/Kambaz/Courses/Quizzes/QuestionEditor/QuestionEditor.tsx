/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import McqQuestion from "./McqQuestion"; // Import the MCQEditor component
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestion,
  addQuestion,
  setSelectedQuestion,
} from "./reducerQuestion"; // Import Redux actions
import * as questionClient from "./client";

export default function QuestionEditor() {
  const dispatch = useDispatch();
  const { quesId } = useParams();
  console.log(quesId);
  const [question, setQuestion] = useState<any>(null);
  // const [question, setQuestion] = useState<any>(null);
  // const [questionType, setQuestionType] = useState("Multiple Choice");
  // const [points, setPoints] = useState(4);
  const [isEditableType, setIsEditableType] = useState(true);
  // Fetch the question from the store using quesId
  // const questions = useSelector(
  //   (state: any) => state.questionReducer.questions
  // );
  // const existingQuestion = questions.find((q: any) => q.questionId === quesId);

  // Fetch question details from the server
  const fetchQuestionDetails = async () => {
    // try {
    if (quesId !== "QuestionEditor") {
      const fetchedQuestion = await questionClient.findQuestionById(quesId);

      const question = Array.isArray(fetchedQuestion)
        ? fetchedQuestion[0]
        : fetchedQuestion;
      console.log(question);
      setQuestion(question);
      setQuestionType(question.qtype || "Multiple Choice");
      // setPoints(fetchedQuestion.points || 4);
      setIsEditableType(false);
    }
    // else {
    //   // For new questions, allow editing the type
    //   setIsEditableType(true);
    // }
    // }
    // catch (error) {
    //   console.error("Failed to fetch question details:", error);
    // }
  };

  console.log(question);

  useEffect(() => {
    fetchQuestionDetails(); // Fetch question details when the component loads
  }, [quesId]);

  // const selectedQuestion = useSelector(
  //   (state: any) => state.questionReducer.selectedQuestion
  // );

  // Manage the state of question type and points
  const [questionType, setQuestionType] = useState(
    question?.qtype || "multipleChoice"
  );

  // const [points, setPoints] = useState(question?.points || 4);

  const renderQuestionType = () => {
    if (questionType === "multipleChoice") {
      return <McqQuestion />;
    } else if (questionType === "true / false") {
      return <TrueFalseEditor />;
    } else {
      return <FillInTheBlankEditor />;
    }
  };

  // const handleSave = () => {
  //   if (existingQuestion) {
  //     // Update the question
  //     dispatch(
  //       updateQuestion({
  //         ...question,
  //         qtype: questionType,
  //         points,
  //       })
  //     );
  //     console.log("Question Updated");
  //   } else {
  //     // Add a new question
  //     dispatch(
  //       addQuestion({
  //         questionId: new Date().getTime().toString(),
  //         title: "",
  //         quizId: "SomeQuizId", // Replace with actual quiz ID context
  //         qtype: questionType,
  //         question: "",
  //         points,
  //         answer: [],
  //       })
  //     );
  //     console.log("New Question Added");
  //   }
  // };

  // const handleCancel = () => {
  //   console.log("Edit Cancelled");
  // };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <select className="form-select me-2" style={{ width: "150px" }}>
            <option>Easy Question</option>
            <option>Medium Question</option>
            <option>Hard Question</option>
          </select>
          <select
            className="form-select"
            style={{ width: "150px" }}
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)} // Update the question type
            disabled={!isEditableType}
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="true / false">True/False</option>
            <option value="fillIn">Fill In The Blank</option>
          </select>
        </div>
        {/* <div>
          <label className="me-2 fw-bold">pts:</label>
          <input
            type="number"
            className="form-control d-inline-block"
            style={{ width: "80px" }}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))} // Update the points
          />
        </div> */}
      </div>

      {/* Conditional Rendering Based on Question Type */}
      {renderQuestionType()}

      {/* Cancel and Update Buttons */}
      {/* <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save Question
        </button>
      </div> */}
    </div>
  );
}