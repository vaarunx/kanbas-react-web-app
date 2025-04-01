/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KambazNavigation from "./Navigation";
import "./styles.css";
import * as db from "./Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import { addEnrollment } from "./Courses/People/reducer";
import { useDispatch, useSelector } from "react-redux";
import Session from "./Account/Session";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const addNewCourse = () => {
    const _isd = uuidv4();
    const coursess = {
      _id: _isd,
      name: course.name,
      description: course.description,
      img: "/images/reactjs.jpg",
      department: "D123",
      credits: 3,
    };
    setCourses([...courses, coursess]);
    dispatch(
      addEnrollment({
        user: currentUser._id,
        course: _isd,
      })
    );
    setCourse({
      name: "Enter New Course",
      description: "Enter New Description",
    });
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    setCourse({
      name: "Enter New Course",
      description: "Enter New Description",
    });
  };

  return (
    <Session>
      <div id="wd-kambaz">
        {/* <h1 className="wd-main-content-offset p-3"> Kambaz </h1> */}
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
