/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsGripVertical } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssignments,
  setAssignment,
  deleteAssignment,
  addAssignment,
} from "./reducer";
import DescriptionControlButtonsEnd from "./DescriptionControlButtonEnd";
import DescriptionControlButtonsStart from "./DescriptionControlButtonStart";
import { FaTrash } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";
import { useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentClient from "./client";

export default function Assignments() {
  const { cid } = useParams();

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

  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const navigate = useNavigate();

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { course: cid, modules: "Multiple Modules" };
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignment));
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment?._id}`);
  };

  const deleteAssignmentForCourse = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  }

  return (
    <div id="wd-assignments">
      <AssignmentControls addAssignment={createAssignmentForCourse} />

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
            </div>
            <AssignmentControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li className="wd-lesson wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-start">
                <DescriptionControlButtonsStart />
                <div className="mt-2">
                  <Link
                    className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                    to={`./${assignment._id}`}
                    onClick={() => dispatch(setAssignment(assignment))}
                  >
                    <b className="fs-4">{assignment.title}</b>
                  </Link>
                  <br />
                  <p>
                    <span className="text-danger">{assignment.modules}</span> |
                    <b> Not available until</b>{" "}
                    {formatDate(assignment.availableDate)} |
                  </p>
                  <p>
                    <b>Due</b> {formatDate(assignment.dueDate)} |{" "}
                    {assignment.points} pts
                  </p>
                </div>
                <div className="ms-auto">
                  {currentUser.role === "FACULTY" && (
                    <FaTrash
                      className="text-danger me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this assignment?"
                        );
                        if (confirmDelete) {
                          deleteAssignmentForCourse(assignment._id);
                        }
                      }}
                    />
                  )}
                  <DescriptionControlButtonsEnd />
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
