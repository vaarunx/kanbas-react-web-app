/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
export default function AssignmentControls({
  addAssignment,
}: {
  addAssignment: (course_id: string) => void;
}) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleAssignment = () => {
    if (cid) { 
      addAssignment(cid);
    } else {
      console.error("Course ID (cid) is undefined");
    }
  };

  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-between align-items-center flex-wrap"
    >
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
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </button>
        {currentUser.role === "FACULTY" && (
          <button
            id="wd-add-assignment"
            className="btn btn-m btn-danger me-1"
            onClick={handleAssignment}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </button>
        )}
      </div>
    </div>
  );
}
