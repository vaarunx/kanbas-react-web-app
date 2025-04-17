/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Redux actions
import * as questionClient from "./client";
import * as quizClient from "../client";

interface Answer {
  id: number;
  text: string;
}

export default function FillInTheBlankEditor() {
  const { quesId } = useParams();
  const { quizId } = useParams();
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, setQuestion] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [points, setPoints] = useState(4);
  const [answers, setAnswers] = useState<Answer[]>([]);

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

        setQuestion(actualQuestion);
        setTitle(actualQuestion.title || "");
        setQuestionText(actualQuestion.question || "");
        setPoints(actualQuestion.points || 4);
        setAnswers(
          actualQuestion.answer.map((a: any, index: number) => ({
            id: index + 1,
            text: a.answer || "",
          }))
        );
      } else {
        // Initialize default answers for a new question
        setAnswers([{ id: 1, text: "" }]);
      }
    } catch (error) {
      console.error("Failed to fetch question details:", error);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, [quesId]);

  // Add a new answer
  const addAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { id: prevAnswers.length + 1, text: "" },
    ]);
  };

  // Update an answer's text
  const updateAnswer = (id: number, value: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, text: value } : answer
      )
    );
  };

  // Remove an answer
  const removeAnswer = (id: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== id)
    );
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
          ? new Date().getTime().toString() // Generate a new ID for new questions
          : quesId, // Use existing ID for updates
      title,
      quizId,
      qtype: "fillIn",
      question: questionText,
      points,
      answer: answers.map(({ text }) => ({ answer: text, isAnswer: true })), // Exclude internal IDs
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
          placeholder="Enter the title..."
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
        Enter your question text, then define all possible correct answers for
        the blank. Students will see the question followed by a small text box
        to type their answer.
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
        {answers.map((answer) => (
          <div key={answer.id} className="d-flex align-items-center mb-2 p-2">
            <span className="fw-bold me-2">Possible Answer:</span>
            <input
              type="text"
              className="form-control me-2"
              value={answer.text}
              onChange={(e) => updateAnswer(answer.id, e.target.value)}
              placeholder={`Answer ${answer.id}`}
            />
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeAnswer(answer.id)}
            >
              🗑️
            </button>
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
