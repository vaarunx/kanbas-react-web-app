/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowDropDown, MdOutlineRocketLaunch } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { quizzes } from "../../Database";
import * as quizClient from "./client";
import * as coursesClient from "../client";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducerQuiz";
import { useDispatch, useSelector } from "react-redux";
// import { ObjectId } from "mongodb";

export default function Quiz() {
  const { cid } = useParams(); // Get course ID from the route params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user

  // const [quizzesList, setQuizzesList] = useState(quizzes);

  // const filteredQuizzes = quizzesList.filter(
  //   (quiz: any) => quiz.courseId === cid
  // );

  const fetchQuiz = async () => {
    const quiz = await coursesClient.findQuizzesForCourse(cid as string);
    console.log("Inside fetchQuiz");
    dispatch(setQuizzes(quiz));
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  const { quizzes } = useSelector((state: any) => state.quizReducer);

  // console.log(quizzess);

  const handleEdit = (quizId: any) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Edit`);
  };

  const handleDelete = async (quizId: string) => {
    console.log(quizId);
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizClient.deleteQuiz(quizId); // Call the client method to delete the quiz
        dispatch(deleteQuiz(quizId)); // Update Redux state by dispatching the delete action
        console.log("Quiz deleted successfully.");
      } catch (error) {
        console.error("Failed to delete quiz:", error);
        alert("Failed to delete quiz. Please try again.");
      }
    }
  };

  const togglePublish = async (quiz: any) => {
    if (window.confirm("Are you sure you want to publish this quiz?")) {
      try {
        const newQuiz = { ...quiz, published: !quiz.published };
        await quizClient.updateQuizz(newQuiz); // Call the client method to delete the quiz
        dispatch(updateQuiz(newQuiz)); // Update Redux state by dispatching the delete
        console.log("Quiz updated successfully.", newQuiz);
      } catch (error) {
        console.error("Failed to publish quiz:", error);
        alert("Failed to delete quiz. Please try again.");
      }
    }
    // setQuizzesList(
    //   quizzesList.map((quiz: any) =>
    //     quiz._id === quizId ? { ...quiz, published: !quiz.published } : quiz
    //   )
    // );
  };

  const openQuizDetails = async () => {
    // const response = await quizClient.getId();
    // const id = response.id;
    // console.log(id);
    // const newQuizId = new ObjectId().toString();
    // console.log("Generated Quiz ID:", newQuizId);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/Edit`);
  };
  console.log(currentUser.role);
  console.log("Printing Quizzes", quizzes);

  return (
    <div id="wd-quizzes">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="mb-2 mb-lg-0 w-40 mt-1">
          <form className="ms-1 d-flex" role="search">
            <input
              className="form-control h-48 w-95"
              id="wd-search-quiz"
              type="search"
              placeholder="Search for Quiz"
            />
          </form>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="d-flex">
            <button
              id="wd-add-quiz"
              className="btn btn-m btn-danger me-1"
              onClick={openQuizDetails}
            >
              + Quiz
            </button>
          </div>
        )}
      </div>
      <hr />

      {/* Quizzes List Section */}
      <ul id="wd-quizzes-list" className="list-group rounded-0 mt-5">
        <li className="wd-module list-group-item p-0 mb-5 fs-5">
          <div
            id="wd-quizzes-title"
            className="d-flex justify-content-between align-items-center wd-title p-3 ps-2 bg-light"
          >
            <span>
              <MdArrowDropDown className="me-2 fs-3" />
              <b>Assignment Quizzes</b>
            </span>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {
              // quizzes.length > 0 ? (

              quizzes
                .filter(
                  (quiz: any) =>
                    currentUser.role === "FACULTY" ||
                    currentUser.role === "TA" ||
                    (currentUser.role === "STUDENT" && quiz?.published)
                )
                .map((quiz: any) => (
                  <li
                    key={quiz._id}
                    className="wd-quiz wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-start"
                  >
                    {/* Publish Icon */}
                    <MdOutlineRocketLaunch
                      className={`ms-3 me-4 mt-4 fs-3 ${
                        quiz.published ? "text-success" : "text-danger"
                      }`}
                      onClick={() => togglePublish(quiz)}
                    />

                    {/* Quiz Details */}
                    <div className="mt-2">
                      <Link
                        className="wd-quiz-link text-black text-decoration-none"
                        to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      >
                        <b className="fs-4">{quiz.name}</b>
                      </Link>
                      <div className="ms-auto d-flex text-secondary">
                        <p>
                          <b>{quiz.availability}</b>
                        </p>
                        <div
                          className="vr me-2 ms-3"
                          style={{
                            borderLeft: "3px solid black",
                            height: "1.5rem",
                          }}
                        ></div>
                        <p>
                          <b>Due:</b> {quiz.dueDate}
                        </p>
                        <div
                          className="vr me-2 ms-3"
                          style={{
                            borderLeft: "3px solid black",
                            height: "1.5rem",
                          }}
                        ></div>
                        <p>{quiz?.points} pts</p>
                        <div
                          className="vr me-2 ms-3"
                          style={{
                            borderLeft: "3px solid black",
                            height: "1.5rem",
                          }}
                        ></div>
                        <p>
                          {/* {quiz.questions.length} */}
                          Questions
                        </p>
                      </div>
                    </div>

                    {/* Context Menu */}
                    {currentUser.role === "FACULTY" && (
                      <div className="ms-auto">
                        <div className="dropdown">
                          <button
                            className="btn border border-secondary bg-light p-2"
                            type="button"
                            id={`dropdownMenuButton-${quiz._id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <BsThreeDotsVertical />
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby={`dropdownMenuButton-${quiz._id}`}
                          >
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleEdit(quiz._id)}
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleDelete(quiz._id)}
                              >
                                Delete
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => togglePublish(quiz)}
                              >
                                {quiz.published ? "Unpublish" : "Publish"}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                ))
              // ) : (
              //   <p className="text-muted ms-3">
              //     No quizzes available for this course.
              //   </p>
              // )
            }
          </ul>
        </li>
      </ul>
    </div>
  );
}