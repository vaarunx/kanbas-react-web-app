/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CgShapeHalfCircle } from "react-icons/cg";

// const Details = ({ quizDetails }: { quizDetails: any }) => {
//   // console.log(quizDetails);
//   return (
//     <div className="details">
//       {/* Quiz Name Section */}
//       <div className="mb-3 col-5">
//         <input
//           type="text"
//           className="form-control border"
//           name="name"
//           value={quizDetails.name || ""}
//           placeholder="Unnamed Quiz"
//           readOnly // Make it editable if needed
//         />
//       </div>
//       <div className="mb-4">
//         <label className="form-label">Quiz Instructions:</label>

//         <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
//           {/* Left Toolbar Options */}
//           <div className="d-flex">
//             <button className="btn btn-link text-decoration-none me-3 text-black">
//               Edit
//             </button>
//             <button className="btn btn-link text-decoration-none me-3 text-black">
//               View
//             </button>
//             <button className="btn btn-link text-decoration-none me-3 text-black">
//               Insert
//             </button>
//             <button className="btn btn-link text-decoration-none me-3 text-black">
//               Format
//             </button>
//             <button className="btn btn-link text-decoration-none me-3 text-black">
//               Tools
//             </button>
//           </div>

//           {/* Right Progress */}
//           <div className="d-flex align-items-center">
//             <CgShapeHalfCircle
//               className="d-inline-block text-success fs-1"
//               style={{ transform: "rotate(90deg)" }}
//             />
//             <span className="me-2 fw-bold">100%</span>
//           </div>
//         </div>
//         <textarea
//           className="form-control"
//           name="instructions"
//           value={quizDetails.description || ""}
//           placeholder="Add quiz instructions here..."
//           readOnly // Make it editable if needed
//         ></textarea>
//       </div>

//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           {/* Quiz Type */}
//           <div className="mb-3 row">
//             <div className="col-3">
//               <label htmlFor="wd-group">Quiz Type</label>
//             </div>
//             <div className="col-9">
//               <select
//                 id="wd-group"
//                 className="form-select"
//                 value={quizDetails.type || ""}
//                 // readOnly // Make it editable if needed
//               >
//                 <option>Graded Quiz</option>
//                 <option>Ungraded Survey</option>
//                 <option>Graded Survey</option>
//                 <option>Practice Quiz</option>
//               </select>
//             </div>
//           </div>

//           {/* Assignment Group */}
//           <div className="mb-3 row">
//             <div className="col-3">
//               <label htmlFor="wd-display-grade-as">Assignment Group</label>
//             </div>
//             <div className="col-9">
//               <select
//                 id="wd-display-grade-as"
//                 className="form-select"
//                 value={quizDetails.group || ""}
//                 // readOnly // Make it editable if needed
//               >
//                 <option>Quizzes</option>
//                 <option>Exams</option>
//                 <option>Assignments</option>
//                 <option>Project</option>
//               </select>
//             </div>
//           </div>

//           {/* Options Section */}
//           <div className="mb-3 row">
//             <div className="col-9">
//               <label className="fs-5">
//                 <h6>
//                   <b>Options</b>
//                 </h6>
//               </label>
//               <div className="form-check mt-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="wd-chkbox-text"
//                   checked={quizDetails.shuffled || false}
//                   readOnly // Make it editable if needed
//                 />
//                 <label className="form-check-label" htmlFor="wd-chkbox-text">
//                   Shuffle Answers
//                 </label>
//               </div>
//               <div className="form-check mt-3 me-2 col-11 d-flex">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="wd-chkbox-website"
//                   checked={!!quizDetails.time}
//                   readOnly // Make it editable if needed
//                 />
//                 <label
//                   className="form-check-label col-3 ms-2"
//                   htmlFor="wd-chkbox-website"
//                 >
//                   Time Limit
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control me-2 w-2"
//                   name="timeLimit"
//                   value={quizDetails.time || ""}
//                   placeholder="Enter time limit"
//                   readOnly // Make it editable if needed
//                 />
//                 <label className="form-label">Minutes</label>
//               </div>
//               <div className="form-check mt-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="wd-chkbox-media"
//                   checked={quizDetails.multipleAttempts || false}
//                   readOnly // Make it editable if needed
//                 />
//                 <label className="form-check-label" htmlFor="wd-chkbox-media">
//                   Allow Multiple Attempts
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Assign Section */}
//           <div className="mb-3 row">
//             <div className="col-3 ">
//               <label htmlFor="wd-assign-to">Assign</label>
//             </div>
//             <div className="col-9">
//               <div className="border rounded p-3">
//                 <label htmlFor="wd-assign-to" className="form-label fs-5">
//                   <b>Assign to</b>
//                 </label>
//                 <input
//                   id="wd-assign-to"
//                   className="form-control"
//                   type="text"
//                   value={quizDetails.assignTo || "Everyone"}
//                   readOnly // Make it editable if needed
//                 />
//                 <div className="form-group mt-4">
//                   <label htmlFor="wd-due fs-6">
//                     <b>Due</b>
//                   </label>
//                   <div className="input-group">
//                     <input
//                       type="date"
//                       id="wd-due"
//                       className="form-control col-9"
//                       value={quizDetails.dueDate || ""}
//                       readOnly // Make it editable if needed
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group row mt-4">
//                   <div className="col-6">
//                     <label htmlFor="wd-available-from">
//                       <b>Available from</b>
//                     </label>
//                     <input
//                       type="date"
//                       id="wd-available-from"
//                       className="form-control"
//                       value={quizDetails.availableDate || ""}
//                       readOnly // Make it editable if needed
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label htmlFor="wd-until">
//                       <b>Available until</b>
//                     </label>
//                     <input
//                       type="date"
//                       id="wd-until"
//                       className="form-control"
//                       value={quizDetails.untilDate || ""}
//                       readOnly // Make it editable if needed
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* Save and Cancel Buttons */}
//               <div className="d-flex justify-content-end mt-4">
//                 <button
//                   className="btn btn-secondary me-2"
//                   // onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//                 <button className="btn btn-danger">Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuiz } from "./reducerQuiz"; // Import the updateQuiz action
import { CgShapeHalfCircle } from "react-icons/cg";
import {updateQuizz } from "./client"; // Client API
import { useNavigate, useParams } from "react-router";
import * as courseClient from "../client";

const Details = ({ quizDetails }: { quizDetails: any }) => {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("quizDetails", quizDetails);
  // const selectedQuiz = useSelector(
  //   (state: any) => state.quizReducer.selectedQuiz
  // );
  // const quiz = selectedQuiz && selectedQuiz.length > 0 ? selectedQuiz[0] : null;
  // console.log(selectedQuiz);

  // Local state for editing the quiz details
  const [details, setDetails] = useState({
    _id: quizDetails?._id,
    name: quizDetails?.name || "",
    description: quizDetails?.description || "",
    availability: quizDetails?.availability || "Closed",
    type: quizDetails?.type || "Graded Quiz",
    group: quizDetails?.group || "Assignments",
    shuffled: quizDetails?.shuffled || false,
    time: quizDetails?.time || "",
    multipleAttempts: quizDetails?.multipleAttempts || false,
    assignTo: quizDetails?.assignTo || "Everyone",
    dueDate: quizDetails?.dueDate || "2024-11-01",
    availableDate: quizDetails?.availableDate || "2024-10-01",
    untilDate: quizDetails?.untilDate || "2024-12-01",
    points: quizDetails?.points || 15,
    attempts: quizDetails?.attempts || 0,
  });

  // Function to determine availability
  const calculateAvailability = () => {
    const currentDate = new Date();
    const availableFrom = new Date(details.availableDate);
    const availableUntil = new Date(details.untilDate);

    if (currentDate < availableFrom) {
      return "Not Available"; // Not yet available
    } else if (currentDate > availableUntil) {
      return "Closed"; // Past the available date
    } else {
      return "Available"; // Currently available
    }
  };

  useEffect(() => {
    const updatedAvailability = calculateAvailability();
    setDetails((prevDetails) => ({
      ...prevDetails,
      availability: updatedAvailability,
    }));
  }, [details.availableDate, details.untilDate]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      // Handle checkbox inputs
      setDetails((prev) => ({
        ...prev,
        [target.name]: target.checked, // 'checked' property is safe to use here
      }));
    } else if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      // Handle text, textarea, or select inputs
      setDetails((prev) => ({
        ...prev,
        [target.name]: target.value, // 'value' property is safe to use here
      }));
    }
  };

  // Save the updated quiz details
  const handleSave = () => {
    const updatedQuiz = {
      // ...quizDetails,
      ...details,
    };

    if (quizDetails) {
      // Update the existing quiz
      updateQuizz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      console.log("Quiz Details Updated:", details);
    } else {
      // Create a new assignment
      const newQuiz = {
        ...details,
        _id: new Date().getTime().toString(),
      };
      courseClient.createQuizForCourse(cid, newQuiz); // Assuming createAssignment is a function for creating assignments
      // dispatch(addQuiz(newAssignment)); // Assuming addQuiz is the Redux action for adding a new quiz
      console.log("New quiz Created:", newQuiz);
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      // http://localhost:3000/#/Kambaz/Courses/674f9ae2f84d29eaab2a2398/Quizzes/Edit
    }
  };

  // Reset local state to cancel changes
  const handleCancel = () => {
    setDetails({
      _id: quizDetails._id,
      name: quizDetails?.name || "",
      description: quizDetails?.description || "",
      type: quizDetails?.type || "Graded Quiz",
      availability: quizDetails?.availability || "Closed",
      group: quizDetails?.group || "Assignments",
      shuffled: quizDetails?.shuffled || false,
      time: quizDetails?.time || "",
      multipleAttempts: quizDetails?.multipleAttempts || false,
      assignTo: quizDetails?.assignTo || "Everyone",
      dueDate: quizDetails?.dueDate || "",
      availableDate: quizDetails?.availableDate || "",
      untilDate: quizDetails?.untilDate || "",
      points: quizDetails?.points || 15,
      attempts: quizDetails?.attempts || 0,
    });
    // navigate(`/Kambaz/Courses/${cid}/Assignments`);
    console.log("Edit Cancelled");
  };

  return (
    <div className="details">
      {/* Quiz Name Section */}
      <div className="mb-3 col-5">
        <input
          type="text"
          className="form-control border"
          name="name"
          value={details.name}
          onChange={handleInputChange}
          placeholder="Unnamed Quiz"
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Quiz Instructions:</label>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          {/* Left Toolbar Options */}
          <div className="d-flex">
            <button className="btn btn-link text-decoration-none me-3 text-black">
              Edit
            </button>
            <button className="btn btn-link text-decoration-none me-3 text-black">
              View
            </button>
            <button className="btn btn-link text-decoration-none me-3 text-black">
              Insert
            </button>
            <button className="btn btn-link text-decoration-none me-3 text-black">
              Format
            </button>
            <button className="btn btn-link text-decoration-none me-3 text-black">
              Tools
            </button>
          </div>

          {/* Right Progress */}
          <div className="d-flex align-items-center">
            <CgShapeHalfCircle
              className="d-inline-block text-success fs-1"
              style={{ transform: "rotate(90deg)" }}
            />
            <span className="me-2 fw-bold">100%</span>
          </div>
        </div>
        <textarea
          className="form-control"
          name="description"
          value={details.description}
          onChange={handleInputChange}
          placeholder="Add quiz instructions here..."
        ></textarea>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Quiz Type */}
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-group">Quiz Type</label>
            </div>
            <div className="col-9">
              <select
                id="wd-group"
                className="form-select"
                name="type"
                value={details.type}
                onChange={handleInputChange}
              >
                <option>Graded Quiz</option>
                <option>Ungraded Survey</option>
                <option>Graded Survey</option>
                <option>Practice Quiz</option>
              </select>
            </div>
          </div>

          {/* Assignment Group */}
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-display-grade-as">Assignment Group</label>
            </div>
            <div className="col-9">
              <select
                id="wd-display-grade-as"
                className="form-select"
                name="group"
                value={details.group}
                onChange={handleInputChange}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>
          </div>

          {/* Options Section */}
          <div className="mb-3 row">
            <div className="col-9">
              <label className="fs-5">
                <h6>
                  <b>Options</b>
                </h6>
              </label>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-chkbox-text"
                  name="shuffled"
                  checked={details.shuffled}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="wd-chkbox-text">
                  Shuffle Answers
                </label>
              </div>
              <div className="form-check mt-3 me-2 col-11 d-flex">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-chkbox-website"
                  name="time"
                  checked={!!details.time}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label col-3 ms-2"
                  htmlFor="wd-chkbox-website"
                >
                  Time Limit
                </label>
                <input
                  type="number"
                  className="form-control me-2 w-2"
                  name="time"
                  value={details.time}
                  onChange={handleInputChange}
                  placeholder="Enter time limit"
                />
                <label className="form-label">Minutes</label>
              </div>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wd-chkbox-media"
                  name="multipleAttempts"
                  checked={details.multipleAttempts}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="wd-chkbox-media">
                  Allow Multiple Attempts
                </label>
              </div>
              {details.multipleAttempts && (
                <div className="mt-2">
                  <label htmlFor="num-attempts" className="form-label">
                    Number of Attempts
                  </label>
                  <input
                    type="number"
                    id="num-attempts"
                    name="attempts"
                    value={details.attempts || 1}
                    className="form-control"
                    min="1"
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Assign Section */}
          <div className="mb-3 row">
            <div className="col-3 ">
              <label htmlFor="wd-assign-to">Assign</label>
            </div>
            <div className="col-9">
              <div className="border rounded p-3">
                <label htmlFor="wd-assign-to" className="form-label fs-5">
                  <b>Assign to</b>
                </label>
                <input
                  id="wd-assign-to"
                  className="form-control"
                  type="text"
                  name="assignTo"
                  value={details.assignTo}
                  onChange={handleInputChange}

                  // readOnly // Make it editable if needed
                />
                <div className="form-group mt-4">
                  <label htmlFor="wd-due fs-6">
                    <b>Due</b>
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      id="wd-due"
                      name="dueDate"
                      className="form-control col-9"
                      value={details.dueDate}
                      onChange={handleInputChange}

                      // readOnly // Make it editable if needed
                    />
                  </div>
                </div>

                <div className="form-group row mt-4">
                  <div className="col-6">
                    <label htmlFor="wd-available-from">
                      <b>Available from</b>
                    </label>
                    <input
                      type="date"
                      name="availableFrom"
                      id="wd-available-from"
                      className="form-control"
                      value={details.availableDate}
                      onChange={handleInputChange}

                      // readOnly // Make it editable if needed
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="wd-until">
                      <b>Available until</b>
                    </label>
                    <input
                      type="date"
                      id="wd-until"
                      name="untilDate"
                      className="form-control"
                      value={details.untilDate}
                      onChange={handleInputChange}

                      // readOnly // Make it editable if needed
                    />
                  </div>
                </div>
              </div>
              {/* Save and Cancel Buttons */}
              {/* <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-secondary me-2"
                  // onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="btn btn-danger">Save</button>
              </div> */}
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-secondary me-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
