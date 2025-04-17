/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Redux actions
import * as questionClient from "./client";
import * as quizClient from "../client";

export default function TrueFalseEditor() {
  const { quesId } = useParams();
  const { quizId } = useParams();
  const { cid } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, setQuestion] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [points, setPoints] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState("True");

  // Fetch question details if editing an existing question
  const fetchQuestionDetails = async () => {
    try {
      if (quesId !== "QuestionEditor") {
        const fetchedQuestion = await questionClient.findQuestionById(
          quesId as string
        );

        // Use the first question if response is an array
        const actualQuestion = Array.isArray(fetchedQuestion)
          ? fetchedQuestion[0]
          : fetchedQuestion;

        console.log(actualQuestion);

        setQuestion(actualQuestion);
        setTitle(actualQuestion.title || "");
        setQuestionText(actualQuestion.question || "");
        setPoints(actualQuestion.points || 3);
        setSelectedAnswer(actualQuestion.answer.find((a: any) => a.isAnswer));
      }
    } catch (error) {
      console.error("Failed to fetch question details:", error);
    }
  };

  console.log(selectedAnswer);

  useEffect(() => {
    fetchQuestionDetails();
  }, [quesId]);

  // Handle answer selection
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  // Save or Update the question
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
      qtype: "true / false",
      question: questionText,
      points,
      answer: [
        { answer: "True", isAnswer: selectedAnswer === "True" },
        { answer: "False", isAnswer: selectedAnswer === "False" },
      ],
    };

    try {
      if (quesId === "QuestionEditor") {
        // Create a new question
        const createdQuestion = await quizClient.createQuestionsForQuiz(
          newQuestion
        );
        dispatch(addQuestion(createdQuestion));
        console.log("New Question Added:", createdQuestion);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          style={{ width: "60%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
        <div>
          <label className="me-2 fw-bold">pts:</label>
          <input
            type="number"
            className="form-control d-inline-block"
            style={{ width: "80px" }}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Question Instructions */}
      <p>
        Enter your question text, then select if True or False is the correct
        answer.
      </p>

      {/* Question Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Question:</label>
        <textarea
          className="form-control"
          rows={3}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here..."
        ></textarea>
      </div>

      {/* Answers Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Answers:</label>
        <div className="d-flex flex-column">
          {/* True Option */}
          <div
            className={`d-flex align-items-center p-2 mb-2 ${
              selectedAnswer ? "border border-success rounded" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleAnswerSelection("True")}
          >
            <div
              className={`me-2 ${
                selectedAnswer ? "text-success" : "text-muted"
              }`}
            >
              {selectedAnswer ? "✓" : "→"}
            </div>
            <span className={`fw-bold ${selectedAnswer ? "text-success" : ""}`}>
              True
            </span>
          </div>

          {/* False Option */}
          <div
            className={`d-flex align-items-center p-2 ${
              !selectedAnswer ? "border border-success rounded" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleAnswerSelection("False")}
          >
            <div
              className={`me-2 ${
                !selectedAnswer ? "text-success" : "text-muted"
              }`}
            >
              {!selectedAnswer ? "✓" : "→"}
            </div>
            <span
              className={`fw-bold ${!selectedAnswer ? "text-success" : ""}`}
            >
              False
            </span>
          </div>
        </div>
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
