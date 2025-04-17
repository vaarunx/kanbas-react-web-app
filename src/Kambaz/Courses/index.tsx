/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import Quiz from "./Quizzes";
import QuestionEditor from "./Quizzes/QuestionEditor/QuestionEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import PeopleTable from "./People/table";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" /> {course && course.name}{" "}
        &gt; {pathname.split("/")[4]}
      </h2>
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEditor />} />
            <Route path="Quizzes/Edit" element={<QuizEditor />} />

            <Route
              path="Quizzes/:quizId/Edit/Questions/:quesId"
              element={<QuestionEditor />}
            />
            <Route
              path="Quizzes/:quizId/:attemptId"
              element={<QuizPreview />}
            />
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview />} />
            <Route path="Quizzes" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
