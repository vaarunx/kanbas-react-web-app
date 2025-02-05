import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
// import "./Navigation.css";

export default function KambazNavigation() {
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 115 }}
      className="list-group rounded-0 position-fixed
    bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="images/northeastern-logo-red.png" width="75px" />
      </a>
      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className={`list-group-item text-center border-0 bg-black ${
          location.pathname === "/Kambaz/Account"
            ? "bg-white text-danger"
            : "text-white"
        }`}
      >
        <FaRegCircleUser className="fs-1 text text-white" />
        <br />
        Account{" "}
      </Link>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className={`list-group-item text-center border-0 bg-white text-danger ${
          location.pathname === "/Kambaz/Dashboard"
            ? "bg-white text-danger"
            : "bg-black text-danger"
        }`}
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard{" "}
      </Link>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-course-link"
        className={`list-group-item text-center border-0 ${
          location.pathname === "/Kambaz/Courses"
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses{" "}
      </Link>
      <Link
        to="/Kambaz/Calendar"
        id="wd-calendar-link"
        className={`list-group-item text-center border-0 ${
          location.pathname === "/Kambaz/Calendar"
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calender{" "}
      </Link>
      <Link
        to="/Kambaz/Inbox"
        id="wd-inbox-link"
        className={`list-group-item text-center border-0 ${
          location.pathname === "/Kambaz/Inbox"
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox{" "}
      </Link>
      <Link
        to="/Labs"
        id="wd-labs-link"
        className={`list-group-item text-center border-0 ${
          location.pathname === "/Labs"
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs{" "}
      </Link>
    </div>
  );
}