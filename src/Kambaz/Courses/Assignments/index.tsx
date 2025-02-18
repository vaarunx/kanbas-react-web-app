/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { PiNotePencilFill } from "react-icons/pi";
import { useParams } from "react-router";
import { assignments } from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignment = assignments;

  function formatDate(dateStr: string | Date) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="mb-2 mb-lg-0 w-40 mt-1">
          <form className="d-flex " role="search">
            <CiSearch className="position-absolute mt-2 ms-2" size={20} />
            <input
              className="form-control h-48 w-95"
              id="wd-search-assignment"
              type="search"
              placeholder="Search..."
              style={{ paddingLeft: "35px" }}
            />
          </form>
        </div>
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="btn btn-m me-1 btn-secondary"
          >
            + Group
          </button>
          <button id="wd-add-assignment" className="btn btn-m btn-danger me-1">
            + Assignment
          </button>
        </div>
      </div>
      <ul id="wd-modules" className="list-group rounded-0 mt-5">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-assignments-title"
            className="d-flex justify-content-between align-items-center wd-title p-3 ps-2 bg-secondary fs-4"
          >
            <span>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </span>
            <div className="ms-auto me-2 fs-4">
              <span className="border border-grey rounded-5 p-2">
                40% of Total
              </span>
              <button className="btn btn-lg ">
                <BsPlus className="fs-2" />
              </button>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignment
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-lesson wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-start">
                  <BsGripVertical className="me-3 mt-5 fs-3" />
                  <PiNotePencilFill className="me-3 mt-5 fs-3 text-success" />
                  <div className="mt-2">
                    <a
                      className="wd-assignment-link text-black text-decoration-none"
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      <b className="fs-4">{assignment.title}</b>
                    </a>
                    <br />
                    <p>
                      <span className="text-danger">{assignment.modules}</span>{" "}
                      |<b> Not available until</b>{" "}
                      {formatDate(assignment.availableDate)} |
                    </p>
                    <p>
                      <b>Due</b> {formatDate(assignment.dueDate)} |{" "}
                      {assignment.points} pts
                    </p>
                  </div>
                  <div className="ms-auto">
                    <LessonControlButtons />
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
