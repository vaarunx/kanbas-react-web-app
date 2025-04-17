/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { TiPencil } from "react-icons/ti";
import { useNavigate, useParams } from "react-router";
// import { quizzes } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import * as quizClient from "./client"; // Import the server client
import {setSelectedQuiz } from "./reducerQuiz";

interface Attempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  timestamp: string;
  score: number;
}

interface Answer {
  questionId: string;
  answer: string[]; // The answer is always an array of strings
}

export default function QuizDetails({ role = "faculty" }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  console.log(currentUser);
  const [userAttempts, setUserAttempts] = useState<Attempt[]>([]);
  // const navigate = useNavigate();
  // const { cid, quizId } = useParams(); // Get course ID and quiz ID from route params
  // const dispatch = useDispatch();

  // // Fetch quiz details and set it in Redux
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

  // // Get the selected quiz from Redux
  // const selectedQuiz = useSelector(
  //   (state: any) => state.quizReducer.selectedQuiz
  // );

  // const handleEditClick = () => {
  //   navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
  // };

  // const handlePreviewClick = () => {
  //   navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`);
  // };

  // // Show loading or fallback if quiz is not yet loaded
  // if (!selectedQuiz) {
  //   return <p>Loading quiz details...</p>;
  // }

  const navigate = useNavigate();
  // HAVE TO CHANGE TO QUIZ ID
  const { cid } = useParams();
  const { quizId } = useParams();
  const dispatch = useDispatch();

  // Here we need to display retest and See last attempt if already the user attempted the quiz.
  //  If the user does not attempted the quiz we have to show the start quiz button

  // To ckeck if the user already attempted the quiz we can get the last attempted information from the db
  const fetchAttempts = async () => {
    try {
      const userId = currentUser._id; // Replace with actual user ID
      const attempts = await quizClient.fetchUserAttempts(
        quizId as string,
        userId
      );
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
  // const existingQuiz = quizzes.find((q) => q._id === quizId);

  // Fetch quiz details and set it in Redux
  const fetchQuizDetails = async () => {
    try {
      const fetchedQuiz = await quizClient.findQuizzById(quizId as string); // Fetch quiz by ID
      console.log(fetchedQuiz);
      dispatch(setSelectedQuiz(fetchedQuiz)); // Set the fetched quiz in Redux
    } catch (error) {
      console.error("Failed to fetch quiz details:", error);
    }
  };

  useEffect(() => {
    fetchQuizDetails(); // Fetch quiz details when the component loads
  }, [quizId]);

  const quiz = useSelector((state: any) => state.quizReducer.selectedQuiz);

  // const quiz = selectedQuiz && selectedQuiz.length > 0 ? selectedQuiz[0] : null;

  console.log("Current quiz", quiz);

  // Show loading or fallback if quiz is not yet loaded
  if (!quiz) {
    return <p>Loading quiz details...</p>;
  }

  // const [name, setName] = useState(existingQuiz?.name || "");
  // const [type, setType] = useState(existingQuiz?.type || "");
  // const [points, setPoints] = useState(existingQuiz?.points || "");
  // const [assignmentGroup, setassignmentGroup] = useState(
  //   existingQuiz?.group || ""
  // );
  // const [shuffleAnswers, setShuffleAnswers] = useState(
  //   existingQuiz?.shuffled || ""
  // );
  // const [time, setTime] = useState(existingQuiz?.time || "");
  // const [multipleAttempts, setMultipleAttempts] = useState(
  //   existingQuiz?.multipleAttempts || ""
  // );
  // const [due, setDue] = useState(existingQuiz?.dueDate || "");
  // const [from, setFrom] = useState(existingQuiz?.availableDate || "");
  // const [until, setUntil] = useState(existingQuiz?.untilDate || "");

  // console.log(quizId);
  // console.log(shuffleAnswers);

  // console.log(existingQuiz);
  // const {}
  // const [quizDetails] = useState({
  //   quizType: "Graded Quiz",
  //   points: 29,
  //   assignmentGroup: "Quizzes",
  //   shuffleAnswers: "No",
  //   timeLimit: "30 Minutes",
  //   multipleAttempts: "No",
  //   viewResponses: "Always",
  //   attempts: 1,
  //   showCorrectAnswers: "Immediately",
  //   accessCode: "",
  //   oneQuestionAtATime: "Yes",
  //   webcamRequired: "No",
  //   lockQuestionsAfterAnswering: "No",
  //   viewRes: "No",
  //   respondusLockDown: "No",
  //   dueDate: "Sep 21 at 1pm",
  //   availableFrom: "Sep 21 at 11:40am",
  //   untilDate: "Sep 21 at 1pm",
  // });

  const handleEditClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
  };

  const handlePreviewClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`);
  };

  const handlePreviewAttempt = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/${userAttempts[0]._id}`);
  };

  return (
    <div className="container mt-4">
      {/* Button Section */}
      <div className="d-flex justify-content-center">
        {(currentUser.role === "STUDENT" || currentUser.role === "TA") &&
        userAttempts.length > 0 ? (
          <>
            {quiz?.attempts > 0 && ( // Display "Retest" only if remaining attempts are greater than 1
              <button
                className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
                onClick={handlePreviewClick}
              >
                Retest
              </button>
            )}
            <button
              className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
              onClick={handlePreviewAttempt}
            >
              Preview
            </button>
          </>
        ) : (
          <button
            className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
            onClick={handlePreviewClick}
          >
            Start Quiz
          </button>
        )}

        {/* For FACULTY or ADMIN */}
        {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
          (userAttempts.length > 0 ? (
            <>
              {/* <button
                className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
                onClick={handlePreviewClick}
              >
                Test
              </button> */}
              <button
                className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
                onClick={handlePreviewAttempt}
              >
                Preview
              </button>
              <button
                className="border p-1 pe-4 ps-3 rounded btn btn-primary"
                onClick={handleEditClick}
              >
                <TiPencil className="me-1" />
                Edit
              </button>
            </>
          ) : (
            <>
              {/* <button
                className="border p-1 pe-3 ps-3 me-2 rounded btn btn-danger"
                onClick={handlePreviewClick}
              >
                Test
              </button> */}
              <button
                className="border p-1 pe-4 ps-3 rounded btn btn-primary"
                onClick={handleEditClick}
              >
                <TiPencil className="me-1" />
                Edit
              </button>
            </>
          ))}
      </div>

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">{quiz.name}</h3>
        {/* {role === "student" && (
          <button className="btn btn-primary">Start Quiz</button>
        )} */}
      </div>

      {/* Quiz Details Section */}
      <div className="border p-4 rounded bg-light ">
        <div className="w-75">
          <div className="row">
            <div className="col-6 d-flex justify-content-end">
              <strong>Quiz Type:</strong>
            </div>
            <div className="col-6">{quiz.type}</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Points:</strong>
            </div>
            <div className="col-6">{quiz.points}</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Assignment Group:</strong>
            </div>
            <div className="col-6">{quiz.group}</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Shuffle Answers:</strong>
            </div>
            <div className="col-6">{quiz.shuffled ? "Yes" : "No"}</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Time Limit:</strong>
            </div>
            <div className="col-6">{quiz.time}</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Multiple Attempts:</strong>
            </div>
            <div className="col-6">{quiz.multipleAttempts ? "Yes" : "No"}</div>
            <div className="col-6  d-flex justify-content-end">
              <strong>View Responses:</strong>
            </div>
            <div className="col-6">Always</div>
            {quiz.multipleAttempts && (
              <>
                <div className="col-6  d-flex justify-content-end">
                  <strong>How Many Attempts:</strong>
                </div>
                <div className="col-6">{quiz.attempts}</div>
              </>
            )}

            <div className="col-6  d-flex justify-content-end">
              <strong>Show Correct Answers:</strong>
            </div>
            <div className="col-6">Immediately</div>

            {/* <div className="col-6  d-flex justify-content-end">
              <strong>Access Code:</strong>
            </div>
            <div className="col-6">{quizDetails.accessCode || "None"}</div> */}

            <div className="col-6  d-flex justify-content-end">
              <strong>One Question at a Time:</strong>
            </div>
            <div className="col-6">Yes</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Require Respondus LockDown:</strong>
            </div>
            <div className="col-6">Yes</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Browser </strong>
            </div>
            <div className="col-6"></div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Require to view Quiz Results:</strong>
            </div>
            <div className="col-6">Yes</div>

            <div className="col-6  d-flex justify-content-end">
              <strong>Webcam Required:</strong>
            </div>
            <div className="col-6">No</div>

            <div className="col-6 d-flex justify-content-end">
              <strong>Lock Questions After Answering:</strong>
            </div>
            <div className="col-6">No</div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="border-top mt-4 pt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available From</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.dueDate}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export default QuizDetails;

/////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { TiPencil } from "react-icons/ti";
// import { useNavigate, useParams } from "react-router";
// import * as quizClient from "./client"; // Import the server client
// import * as coursesClient from "../client";

// export default function QuizDetails({ role = "faculty" }) {
//   const navigate = useNavigate();
//   const { cid, quizId } = useParams(); // Get course and quiz IDs from the route params

//   const [loading, setLoading] = useState(true); // Loading state
//   const [quiz, setQuiz] = useState<any>(null); // State to store fetched quiz details

//   // Fetch quiz details from the server
//   const fetchQuizDetails = async () => {
//     try {
//       setLoading(true);
//       const fetchedQuiz = await coursesClient.findQuizzesForCourse(
//         quizId as string
//       ); // Server request
//       setQuiz(fetchedQuiz);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch quiz details:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuizDetails(); // Fetch data on component load
//   }, [quizId]);

//   const handleEditClick = () => {
//     navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
//   };

//   const handlePreviewClick = () => {
//     navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`);
//   };

//   if (loading) {
//     return <p>Loading quiz details...</p>; // Loading state fallback
//   }

//   if (!quiz) {
//     return <p>Quiz not found!</p>; // Fallback for no quiz data
//   }

//   return (
//     <div className="container mt-4">
//       {/* Button Section */}
//       <div className="d-flex justify-content-center">
//         <button
//           className="border p-1 pe-2 ps-2 me-2 rounded bg-light"
//           onClick={handlePreviewClick}
//         >
//           Preview
//         </button>
//         <button
//           className="border p-1 pe-3 ps-2 rounded bg-light"
//           onClick={handleEditClick}
//         >
//           {" "}
//           <TiPencil className="me-1" />
//           Edit
//         </button>
//       </div>

//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="mb-4">{quiz.name}</h3>
//         {role === "student" && (
//           <button className="btn btn-primary">Start Quiz</button>
//         )}
//       </div>

//       {/* Quiz Details Section */}
//       <div className="border p-4 rounded bg-light">
//         <div className="w-75">
//           <div className="row">
//             <div className="col-6 d-flex justify-content-end">
//               <strong>Quiz Type:</strong>
//             </div>
//             <div className="col-6">{quiz.type}</div>

//             <div className="col-6  d-flex justify-content-end">
//               <strong>Points:</strong>
//             </div>
//             <div className="col-6">{quiz.points}</div>

//             <div className="col-6  d-flex justify-content-end">
//               <strong>Assignment Group:</strong>
//             </div>
//             <div className="col-6">{quiz.group}</div>

//             <div className="col-6  d-flex justify-content-end">
//               <strong>Shuffle Answers:</strong>
//             </div>
//             <div className="col-6">{quiz.shuffled ? "Yes" : "No"}</div>

//             <div className="col-6  d-flex justify-content-end">
//               <strong>Time Limit:</strong>
//             </div>
//             <div className="col-6">
//               {quiz.time ? `${quiz.time} mins` : "None"}
//             </div>

//             <div className="col-6  d-flex justify-content-end">
//               <strong>Multiple Attempts:</strong>
//             </div>
//             <div className="col-6">{quiz.multipleAttempts ? "Yes" : "No"}</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Show Correct Answers:</strong>
//             </div>
//             <div className="col-6">Immediately</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>One Question at a Time:</strong>
//             </div>
//             <div className="col-6">
//               {quiz.oneQuestionAtATime ? "Yes" : "No"}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Availability Section */}
//       <div className="border-top mt-4 pt-4">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Due</th>
//               <th>For</th>
//               <th>Available From</th>
//               <th>Until</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{quiz.dueDate}</td>
//               <td>Everyone</td>
//               <td>{quiz.availableDate}</td>
//               <td>{quiz.untilDate}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { TiPencil } from "react-icons/ti";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import * as quizClient from "./client"; // Import the server client
// import { setSelectedQuiz } from "./reducerQuiz"; // Import the setSelectedQuiz action

// export default function QuizDetails({ role = "faculty" }) {
//   const navigate = useNavigate();
//   const { cid, quizId } = useParams(); // Get course ID and quiz ID from route params
//   const dispatch = useDispatch();

//   // Fetch quiz details and set it in Redux
//   const fetchQuizDetails = async () => {
//     try {
//       const fetchedQuiz = await quizClient.findQuizzById(quizId as string); // Fetch quiz by ID
//       dispatch(setSelectedQuiz(fetchedQuiz)); // Set the fetched quiz in Redux
//     } catch (error) {
//       console.error("Failed to fetch quiz details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuizDetails(); // Fetch quiz details when the component loads
//   }, [quizId]);

//   // Get the selected quiz from Redux
//   const selectedQuiz = useSelector(
//     (state: any) => state.quizReducer.selectedQuiz
//   );

//   const handleEditClick = () => {
//     navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
//   };

//   const handlePreviewClick = () => {
//     navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`);
//   };

//   // Show loading or fallback if quiz is not yet loaded
//   if (!selectedQuiz) {
//     return <p>Loading quiz details...</p>;
//   }

//   return (
//     <div className="container mt-4">
//       {/* Button Section */}
//       <div className="d-flex justify-content-center">
//         <button
//           className="border p-1 pe-2 ps-2 me-2 rounded bg-light"
//           onClick={handlePreviewClick}
//         >
//           Preview
//         </button>
//         <button
//           className="border p-1 pe-3 ps-2 rounded bg-light"
//           onClick={handleEditClick}
//         >
//           <TiPencil className="me-1" />
//           Edit
//         </button>
//       </div>

//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="mb-4">{selectedQuiz.name}</h3>
//         {role === "student" && (
//           <button className="btn btn-primary">Start Quiz</button>
//         )}
//       </div>

//       {/* Quiz Details Section */}
//       <div className="border p-4 rounded bg-light">
//         <div className="w-75">
//           <div className="row">
//             <div className="col-6 d-flex justify-content-end">
//               <strong>Quiz Type:</strong>
//             </div>
//             <div className="col-6">{selectedQuiz.type}</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Points:</strong>
//             </div>
//             <div className="col-6">{selectedQuiz.points}</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Assignment Group:</strong>
//             </div>
//             <div className="col-6">{selectedQuiz.group}</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Shuffle Answers:</strong>
//             </div>
//             <div className="col-6">{selectedQuiz.shuffled ? "Yes" : "No"}</div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Time Limit:</strong>
//             </div>
//             <div className="col-6">
//               {selectedQuiz.time ? `${selectedQuiz.time} mins` : "None"}
//             </div>

//             <div className="col-6 d-flex justify-content-end">
//               <strong>Multiple Attempts:</strong>
//             </div>
//             <div className="col-6">
//               {selectedQuiz.multipleAttempts ? "Yes" : "No"}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Availability Section */}
//       <div className="border-top mt-4 pt-4">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Due</th>
//               <th>For</th>
//               <th>Available From</th>
//               <th>Until</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{selectedQuiz.dueDate}</td>
//               <td>Everyone</td>
//               <td>{selectedQuiz.availableDate}</td>
//               <td>{selectedQuiz.untilDate}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
