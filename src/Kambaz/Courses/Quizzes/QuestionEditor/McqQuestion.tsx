/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Import Redux actions
import * as questionClient from "./client";
import * as quizClient from "../client";

interface Option {
  id: number;
  answer: string;
  isAnswer: boolean;
}

export default function McqQuestion() {
  const { quesId } = useParams();
  console.log(quesId);
  const { cid } = useParams();
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<Option[]>([]); // Explicitly define the type of options
  const [points, setPoints] = useState(0);

  // Fetch question details if editing an existing question
  const fetchQuestionDetails = async () => {
    try {
      if (quesId !== "QuestionEditor") {
        const fetchedQuestion = await questionClient.findQuestionById(
          quesId as string
        );

        // Extract the first question if the response is an array
        const actualQuestion = Array.isArray(fetchedQuestion)
          ? fetchedQuestion[0]
          : fetchedQuestion;
        console.log(actualQuestion);

        setQuestion(actualQuestion);
        setPoints(actualQuestion.points || 0);
        setTitle(actualQuestion.title || "");
        setQuestionText(actualQuestion.question || "");
        setOptions(
          actualQuestion.answer.map((opt: any, index: number) => ({
            id: index + 1,
            answer: opt.answer || "",
            isAnswer: opt.isAnswer || false,
          }))
        );
      } else {
        // Initialize default options for a new question
        setOptions([{ id: 1, answer: "", isAnswer: false }]);
      }
    } catch (error) {
      console.error("Failed to fetch question details:", error);
    }
  };

  console.log(question);

  useEffect(() => {
    fetchQuestionDetails();
  }, [quesId]);

  // Add a new answer option
  const addAnswer = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { id: prevOptions.length + 1, answer: "", isAnswer: false },
    ]);
  };

  // Update an answer's text
  const updateAnswer = (id: number, text: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, answer: text } : option
      )
    );
  };

  // Mark an answer as correct
  const markCorrect = (id: number) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id
          ? { ...option, isAnswer: true }
          : { ...option, isAnswer: false }
      )
    );
  };

  // Remove an answer
  const removeAnswer = (id: number) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  // Handle Save or Update
  const handleSave = async () => {
    const newQuestion = {
      _id:
        quesId === "QuestionEditor"
          ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
          : quesId, // Use the existing ID for updates
      questionId:
        quesId === "QuestionEditor"
          ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
          : quesId, // Use the existing ID for updates
      title,
      quizId,
      qtype: "multipleChoice",
      question: questionText,
      points: points || 4,
      answer: options.map(({ id, ...rest }) => rest), // Exclude internal IDs
    };

    try {
      if (quesId === "QuestionEditor") {
        // Create a new question
        const createdQuestion = await quizClient.createQuestionsForQuiz(
          newQuestion
        );
        // Also have to update the quiz question
        dispatch(addQuestion(createdQuestion));
        console.log("New Question Added:", createdQuestion);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
        // http://localhost:3000/#/Kambaz/Courses/674f9ae2f84d29eaab2a2398/Quizzes/6754755143a12ed21120b453/Edit
      } else {
        // Update an existing question
        const updatedQuestion = await questionClient.updateQuestions(
          newQuestion
        );
        dispatch(updateQuestion(updatedQuestion));
        console.log("Question Updated:", updatedQuestion);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
      }
    } catch (error) {
      console.error("Failed to save the question:", error);
    }
  };

  const handleCancel = () => {
    console.log("Edit Cancelled");
  };

  return (
    <div className="container mt-4">
      {/* Title Input */}
      {/* Title and Points Input */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-3"
          style={{ width: "70%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
        <div className="d-flex align-items-center">
          <label className="me-2 fw-bold">Points:</label>
          <input
            type="number"
            className="form-control"
            style={{ width: "100px" }}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      {/* Question Instructions */}
      <p>
        Enter your question and multiple answers, then select the one correct
        answer.
      </p>

      {/* Question Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Question:</label>
        <textarea
          className="form-control"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here..."
        />
      </div>

      {/* Answers Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Answers:</label>
        {options.map((option: any) => (
          <div
            key={option.id}
            className={`d-flex align-items-center mb-2 p-2 ${
              option.isAnswer ? "border border-success rounded" : ""
            }`}
          >
            {/* Correct Answer Icon */}
            <div
              className={`me-2 ${
                option.isAnswer ? "text-success" : "text-muted"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => markCorrect(option.id)}
            >
              {option.isAnswer ? "✓ Correct Answer" : "→"}
            </div>

            {/* Answer Input */}
            <input
              type="text"
              className="form-control me-2"
              value={option.answer}
              onChange={(e) => updateAnswer(option.id, e.target.value)}
              placeholder={`Possible Answer ${option.id}`}
            />

            {/* Remove Icon */}
            {options.length > 2 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeAnswer(option.id)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}

        {/* Add Another Answer */}
        <button className="btn btn-link text-danger" onClick={addAnswer}>
          + Add Another Answer
        </button>
      </div>

      {/* Cancel and Update Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save Question
        </button>
      </div>
    </div>
  );
}
