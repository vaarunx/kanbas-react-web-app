/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnrollments,
  addEnrollment,
  deleteEnrollment,
} from "./Courses/People/reducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import * as enrollmentClient from "./Courses/People/client";

export default function Dashboard({
  allCourses,
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  fetchCourses,
}: {
  allCourses: any[];
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  fetchCourses: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const fetchAllEnrollments = async () => {
    const enrollmentss = await enrollmentClient.getEnrollments();
    dispatch(setEnrollments(enrollmentss));
  };

  useEffect(() => {
    fetchAllEnrollments();
  }, []);

  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const filteredCourses = showAllCourses ? allCourses : courses;

  const isEnrolled = (courseId: any) => {
    console.log("enrollments", enrollments);
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const enrollCourse = async (courseId: any) => {
    const newEnrollment = await enrollmentClient.enrollCourse(
      currentUser._id,
      courseId
    );
    console.log("newEnrollment", newEnrollment);
    dispatch(addEnrollment(newEnrollment));
    fetchCourses();
  };

  const unenrollCourse = async (courseId: any) => {
    await enrollmentClient.unenrollCourse(currentUser._id, courseId);
    dispatch(
      deleteEnrollment({
        user: currentUser._id,
        course: courseId,
      })
    );
    fetchCourses();
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />{" "}
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary float-end"
            onClick={toggleShowAllCourses}
          >
            {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
          </button>
        )}
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.img}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </Card.Text>
                    <Button variant="primary"> Go </Button>
                    {currentUser.role === "FACULTY" && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}

                    {currentUser.role === "STUDENT" &&
                      isEnrolled(course._id) && (
                        <>
                          <button
                            id="wd-unenroll"
                            className="btn btn-danger me-2 float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              unenrollCourse(course._id);
                              naviagte(`/Kambaz/Dashboard`);
                            }}
                          >
                            Unenroll
                          </button>
                        </>
                      )}

                    {currentUser.role === "STUDENT" &&
                      !isEnrolled(course._id) && (
                        <button
                          id="wd-enroll"
                          className="btn btn-success me-2 float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            enrollCourse(course._id);
                            naviagte(`/Kambaz/Dashboard`);
                          }}
                        >
                          Enroll
                        </button>
                      )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}