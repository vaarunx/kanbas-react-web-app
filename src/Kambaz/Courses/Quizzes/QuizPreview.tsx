/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// import { questions } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import * as questionClient from "./QuestionEditor/client";
import * as quizClient from "./client";
import { setQuestions } from "./QuestionEditor/reducerQuestion";

interface Answer {
  questionId: string;
  answer: string[]; // The answer is always an array of strings
}

interface Attempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  timestamp: string;
  score: number;
}

// 1. If the user exists, display the retries left if retries exists
// 2. If the user exists, we need to display the already existing attempted answer and not allow them to modify it
// 3. If the user exists, disable to submit button.
// 4. If they click retest, enable the editing option and make the user attempt the quiz.

export default function QuizPreview() {
  const { quizId } = useParams();
  // const { quesId } = useParams();
  const { attemptId } = useParams();
  const navigate = useNavigate();

  console.log(quizId);
  console.log(attemptId);

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((q: any) => q._id === quizId);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const { cid } = useParams();

  console.log("Current quiz", quiz);

  // const ques = useSelector((state: any) => state.questionReducer.questions);
  // const quizQuestions = ques.filter((q: any) => q.quizId === quizId); // Filter questions by quizId
  const [userAttempts, setUserAttempts] = useState<Attempt[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any>([{}]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState("");
  const [score, setScore] = useState(0);
  const [existingAttempt, setExistingAttempt] = useState<Attempt[]>([]);
  const [disable, setDisable] = useState(false);
  const [back, setBack] = useState(false);
  const [quesId, setQuesId] = useState();
  let [att, setAtt] = useState<number | null>(null);
  useEffect(() => {
    if (quiz) {
      setAtt(quiz.attempts);
    }
  }, [quiz]);

  // const hasExistingAttempt = userAttempts.length > 0;
  // const retriesLeft = 3 - userAttempts.length; // Assume max 3 attempts

  // If there exists a attemptId, we can fetch the existing user attempt

  // const fetchExistingUserAttempt = async () => {
  //   try {
  //     console.log("Aftercalling");
  //     const uA = await quizClient.fetchUserAttemptById(attemptId as string);
  //     console.log("Inside fetching existing user attempt");
  //     setExistingAttempt(uA);
  //     setDisable(true);
  //   } catch (error) {
  //     console.error("Error fetching user attempt:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchExistingUserAttempt();
  // }, []);

  // console.log(existingAttempt);

  const fetchQuestion = async () => {
    const quiz = await quizClient.findQuestionsForQuiz(quizId as string);
    console.log("Inside fetchQuestion");
    setQuizQuestions(quiz);
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchAttempts = async () => {
    try {
      const userId = currentUser._id; // Replace with actual user ID
      const attempts = await quizClient.fetchUserAttempts(
        quizId as string,
        userId
      );
      if (attemptId) {
        setDisable(true);
      }
      setUserAttempts(attempts);
    } catch (error) {
      console.error("Failed to fetch attempts:", error);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  // Now we need to
  console.log(userAttempts);

  // Fetch questions from Redux store
  // const quizQuestions = useSelector(
  //   (state: any) => state.questionReducer.questions
  // );
  console.log(quizQuestions);

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index

//   const handleRetest = () => {
//     // set;
//   };

  // if (attemptId === undefined) {
  //   setAnswers([]);
  //   // setCurrentIndex(0);
  // }
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next question
    }
  };

  const handleBefore = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the next question
    }
  };

  const handleSubmit = () => {
    setAtt(att ? att-- : null);
    console.log("Attempt Remaining", att);
    const currentTime = new Date().toLocaleString(); // Get current date and time
    setTime(currentTime); // Update state with the current time

    let calculatedScore = 0;
    console.log(answers);
    // Iterate through submitted answers
    answers.forEach((submittedAnswer) => {
      const question = quizQuestions.find(
        (q: any) => q._id === submittedAnswer.questionId
      );

      console.log(question);
      if (question) {
        console.log("Inside Question");
        // Extract correct answers based on question type
        let correctAnswers: string[] = [];

        // if (Array.isArray(question.answer)) {
        //   correctAnswers = question.answer
        //     .filter((opt: any) => opt.isAnswer)
        //     .map((opt: any) => opt.answer);
        // }

        // // console.log(correctAnswers);
        // Check if the submitted answer matches the correct answers
        // let isCorrect = false;
        let isCorrect = false;

        switch (question.qtype) {
          case "multipleChoice":
            if (Array.isArray(question.answer)) {
              correctAnswers = question.answer
                .filter((opt: any) => opt.isAnswer)
                .map((opt: any) => opt.answer);
            }

            isCorrect =
              JSON.stringify(correctAnswers.sort()) ===
              JSON.stringify(submittedAnswer.answer.sort());
            console.log(isCorrect);

            if (isCorrect) {
              calculatedScore += question.points;
            }
            break;

          case "true / false":
            if (Array.isArray(question.answer)) {
              correctAnswers = question.answer[0].isAnswer;
            }
            console.log("t/f", correctAnswers);
            console.log("t/f   ", submittedAnswer.answer[0]);
            isCorrect =
              question.answer[0].isAnswer ===
              (submittedAnswer.answer[0].toLowerCase() === "true");

            console.log("Checking", isCorrect);
            if (isCorrect) {
              calculatedScore += question.points;
            }
            // correctAnswers.length === 1 &&
            //   correctAnswers[0] === submittedAnswer.answer[0];
            break;

          case "fillIn":
            // Ensure correctAnswers is an array of answer strings
            correctAnswers = question.answer
              .filter((opt: any) => opt.isAnswer) // Filter correct answers
              .map((opt: any) => opt.answer.trim().toLowerCase()); // Extract and normalize the answers

            // Compare if the submitted answer is included in the correct answers array
            isCorrect = correctAnswers.includes(
              (submittedAnswer.answer[0] || "").trim().toLowerCase()
            );

            if (isCorrect) {
              calculatedScore += question.points;
            }
            break;

          default:
            console.warn(
              "Unsupported question type for scoring:",
              question.qtype
            );
        }

        // if (isCorrect) {
        //   console.log("1");
        //   calculatedScore += question.points; // Add points for correct answers
        // }
      }
    });

    console.log("Final Calculated Score:", calculatedScore);
    setScore(calculatedScore); // Update score state

    // Create a new attempt object
    const newAttempt: Attempt = {
      _id: userAttempts[0]?._id ?? "", // Use existing ID if available
      quizId: quizId as string,
      userId: currentUser._id,
      answers: [...answers],
      timestamp: new Date().toISOString(),
      score: calculatedScore,
    };

    // Update or create a new attempt
    if (userAttempts && userAttempts.length > 0) {
      quizClient.updateQuizz({ ...quiz, attempts: att });
      quizClient.updateAttempt(newAttempt);
      console.log("Updated attempt:", newAttempt);
    } else {
      quizClient.createAttempt(newAttempt);
      console.log("Created new attempt:", newAttempt);
    }

    setBack(!back);
  };

  const handleReturn = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  };

  // console.log(score);

  const handleEditQuiz = () => {
    // navigate(
    //   `/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit/Questions/${quesId}`
    // );
    console.log("Editing Quiz");
  };

  // Current question to render
  const currentQuestion = quizQuestions[currentIndex];
  console.log(currentQuestion);

  // Function to render different question types
  const renderQuestion = (question: any) => {
    const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
      console.log(disable);
      if (disable) return;
      setQuesId(question._id);
      setAnswers((prevAnswers) => {
        // Find if the question already has an answer
        const questionIndex = prevAnswers.findIndex(
          (answer) => answer.questionId === questionId
        );

        if (questionIndex > -1) {
          // Update the existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionIndex] = {
            questionId,
            answer: [selectedAnswer], // Always store as an array
          };
          return updatedAnswers;
        } else {
          // Add a new answer
          return [
            ...prevAnswers,
            { questionId, answer: [selectedAnswer] }, // Add new answer
          ];
        }
      });
    };

    // console.log(answers);
    // const existingAnswer = answers.find(
    //   (ans) => ans.questionId === question._id
    // );
    // const isChecked = (option: string) =>
    //   existingAnswer?.answer.includes(option);

    if (Array.isArray(question.answer) && question.answer.length > 0) {
      console.log(question.answer[0].isAnswer);
    } else {
      console.log("question.answer is not a valid array or is empty.");
    }
    const userAnswer = userAttempts[0]?.answers.find(
      (answer) => answer.questionId === question._id
    );
    const userSelectedAnswer = userAnswer ? userAnswer.answer : [];
    console.log(userSelectedAnswer);

    switch (question.qtype) {
      case "multipleChoice":
        return (
          <div>
            {question.answer.map((option: any, index: any) => (
              <div
                className={`form-check p-2 rounded ${
                  attemptId && option.isAnswer
                    ? "bg-success bg-opacity-25 border border-success"
                    : ""
                } ${
                  attemptId &&
                  userSelectedAnswer.includes(option.answer) &&
                  !option.isAnswer
                    ? "bg-danger bg-opacity-25 border border-danger"
                    : ""
                }`}
                key={index}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${question._id}`}
                  className="form-check-input"
                  disabled={disable} // Disable inputs
                  onChange={() =>
                    handleAnswerChange(question._id, option.answer)
                  }
                  checked={
                    attemptId
                      ? userSelectedAnswer.includes(option.answer)
                      : false
                  }
                />
                <label
                  htmlFor={`option-${index}`}
                  className={`form-check-label ${disable ? "text-body" : ""}`}
                >
                  {attemptId && option.isAnswer && (
                    <span
                      className="me-2 text-success fw-bold"
                      aria-label="Correct Answer"
                    >
                      ✓
                    </span>
                  )}
                  {attemptId &&
                    userSelectedAnswer.includes(option.answer) &&
                    !option.isAnswer && (
                      <span
                        className="me-2 text-danger fw-bold"
                        aria-label="Your Answer"
                      >
                        ✗
                      </span>
                    )}
                  {option.answer}
                </label>
              </div>
            ))}
          </div>
        );

      case "fillIn":
        // {correctAnswers = question.answer
        // .filter((opt: any) => opt.isAnswer) // Filter correct answers
        // .map((opt: any) => opt.answer.trim().toLowerCase());}
        return (
          <div>
            <input
              type="text"
              className={`form-control ${
                attemptId &&
                question.answer
                  .filter((opt: any) => opt.isAnswer) // Filter correct answers
                  .map((opt: any) => opt.answer.trim().toLowerCase())
              }
                  ? "border-success"
                  : ""
              } ${
                attemptId &&
                !question.answer
                  .filter((opt: any) => opt.isAnswer) // Filter correct answers
                  .map((opt: any) => opt.answer.trim().toLowerCase())
              }
                  ? "border-danger"
                  : ""
              }`}
              placeholder="Type your answer here..."
              disabled={disable} // Disable inputs
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value.trim())
              }
              {...(attemptId && { value: userSelectedAnswer[0] || "" })}
            />
            {attemptId && question.answer.some((ans: any) => ans.isAnswer) && (
              <p className="text-success mt-2">
                Correct Answer:{" "}
                {question.answer
                  .filter((ans: any) => ans.isAnswer)
                  .map((ans: any) => ans.answer)
                  .join(", ")}
              </p>
            )}
          </div>
        );

      case "true / false":
        return (
          <div>
            <div
              // key={index}
              className={`form-check ${
                attemptId &&
                Array.isArray(question.answer) &&
                question.answer.length > 0 &&
                question.answer[0].isAnswer &&
                userSelectedAnswer.includes("True")
                  ? "bg-success text-white" // Correctly answered as True
                  : attemptId &&
                    userSelectedAnswer.includes("True") &&
                    !question.answer[0].isAnswer
                  ? "bg-danger text-white" // Incorrectly answered as True
                  : ""
              }`}
            >
              <input
                type="radio"
                id="true"
                name={`question-${question.questionId}`}
                disabled={disable} // Disable inputs
                checked={
                  attemptId ? userSelectedAnswer.includes("True") : false
                }
                className="form-check-input"
                onChange={() => handleAnswerChange(question._id, "True")}
              />
              <label htmlFor="true" className="form-check-label">
                True
              </label>
            </div>
            <div
              className={`form-check ${
                attemptId &&
                Array.isArray(question.answer) &&
                question.answer.length > 0 &&
                !question.answer[0].isAnswer &&
                userSelectedAnswer.includes("False")
                  ? "bg-success text-white" // Correctly answered as False
                  : attemptId &&
                    userSelectedAnswer.includes("False") &&
                    question.answer[0].isAnswer
                  ? "bg-danger text-white" // Incorrectly answered as False
                  : ""
              }`}
            >
              <input
                type="radio"
                id="false"
                name={`question-${question.questionId}`}
                className="form-check-input"
                onChange={() => handleAnswerChange(question._id, "False")}
                disabled={disable} // Disable inputs
                checked={
                  attemptId ? userSelectedAnswer.includes("False") : false
                }
                // checked={userSelectedAnswer.includes("False")}
              />
              <label htmlFor="false" className="form-check-label">
                False
              </label>
            </div>
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="container mt-4">
      {/* Quiz Title */}

      {/* Warning Banner */}
      {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
        <>
          <h2>Quiz Preview</h2>

          <div className="alert alert-danger" role="alert">
            This is a preview of the published version of the quiz
          </div>
        </>
      )}

      {/* Quiz Details */}
      <p>
        <strong>Started:</strong> Nov 29 at 8:19am
      </p>

      <h5>
        <strong>Quiz Instructions</strong>
      </h5>

      {/* Render Current Question */}
      <div className="border rounded p-3 mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Question Header */}
          <div>
            <strong>Question {currentIndex + 1}</strong>
          </div>
          <span>{currentQuestion.points} pts</span>
        </div>
        <p>{currentQuestion.question}</p>

        {/* Render Question Based on Type */}
        {renderQuestion(currentQuestion)}

        {/* Next Button */}
        <div className="d-flex justify-content-end">
          {currentIndex > 0 && (
            <div className="row-5 text-end me-4 mt-3">
              <button className="btn btn-danger" onClick={handleBefore}>
                &lt; Before
              </button>
            </div>
          )}
          {currentIndex < quizQuestions.length - 1 && (
            <div className="d-flex justify-content-end">
              <div className="row text-end me-2 mt-3">
                <button className="btn btn-primary" onClick={handleNext}>
                  Next &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Save Info */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p>Quiz saved at 8:19am</p>
        {!back && !attemptId && currentIndex === quizQuestions.length - 1 && (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
        {back && (
          <button className="btn btn-primary" onClick={handleReturn}>
            Return
          </button>
        )}
        {(score !== null || attemptId) && (
          <div>
            {/* Score will be displayed after submission in attempt mode, or immediately in preview mode */}
            <h3>Your Score: {attemptId ? userAttempts[0]?.score : score}</h3>
          </div>
        )}
      </div>

      {/* Edit Quiz Button */}
      <div className="d-flex justify-content-between mt-3">
        {/* <div>
          {hasExistingAttempt && retriesLeft > 0 && (
            <button className="btn btn-warning" onClick={handleRetest}>
              Retest ({retriesLeft} left)
            </button>
          )}
        </div> */}
        {currentUser.role === "FACULTY" && (
          <button
            className="btn btn-link text-decoration-none"
            onClick={handleEditQuiz}
          >
            📎 Edit This Quiz
          </button>
        )}
      </div>

      {/* Question Navigation */}
      <div className="mt-4">
        <h6>Questions</h6>
        <ul className="list-unstyled">
          {quizQuestions.map((question: any, index: any) => (
            <li
              key={question.questionId}
              className={`text-danger ${
                index === currentIndex ? "fw-bold" : ""
              }`}
            >
              <span>?</span> Question {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
