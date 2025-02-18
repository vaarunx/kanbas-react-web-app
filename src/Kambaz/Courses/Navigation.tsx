import { NavLink, useParams } from "react-router-dom";
import { courses } from "../Database";
export default function CourseNavigation() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const links = [
    {
      id: "wd-course-home-link",
      label: "Home",
    },
    {
      id: "wd-course-modules-link",
      label: "Modules",
    },
    {
      id: "wd-course-piazza-link",
      label: "Piazza",
    },
    {
      id: "wd-course-zoom-link",
      label: "Zoom",
    },
    {
      id: "wd-course-quizzes-link",
      label: "Assignments",
    },
    {
      id: "wd-course-assignments-link",
      label: "Quizzes",
    },
    {
      id: "wd-course-grades-link",
      label: "Grades",
    },
    {
      id: "wd-course-people-link",
      label: "People",
    },
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ id, label }) => (
        <NavLink
          key={id}
          to={`/Kambaz/Courses/${course && course._id}/${label}`}
          id={id}
          className={({ isActive }) =>
            isActive
              ? "list-group-item active border border-0"
              : "list-group-item text-danger border border-0"
          }
          style={{ fontSize: "1rem", fontWeight: "normal" }}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
