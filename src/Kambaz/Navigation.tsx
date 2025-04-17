import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

export default function KambazNavigation() {
  const links = [
    {
      to: "/Kambaz/Dashboard",
      id: "wd-dashboard-link",
      icon: <AiOutlineDashboard className="fs-1 text-danger" />,
      label: "Dashboard",
    },
    {
      to: "/Kambaz/Courses",
      id: "wd-course-link",
      icon: <LiaBookSolid className="fs-1 text-danger" />,
      label: "Courses",
    },
    {
      to: "/Kambaz/Calendar",
      id: "wd-calendar-link",
      icon: <IoCalendarOutline className="fs-1 text-danger" />,
      label: "Calendar",
    },
    {
      to: "/Kambaz/Inbox",
      id: "wd-inbox-link",
      icon: <FaInbox className="fs-1 text-danger" />,
      label: "Inbox",
    },
    {
      to: "/Labs",
      id: "wd-labs-link",
      icon: <LiaCogSolid className="fs-1 text-danger" />,
      label: "Labs",
    },
  ];

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="list-group-item bg-black border-0 text-center text-white"
      >
        <img src="/images/northeastern-logo-red.png" width="75px" />
      </a>
      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text text-white" />
        <br /> Account{" "}
      </Link>

      {links.map(({ to, id, icon, label }) => (
        <NavLink
          key={id}
          to={to}
          id={id}
          className={({ isActive }) =>
            isActive
              ? "list-group-item text-center border-0 bg-white text-danger"
              : "list-group-item text-center border-0 bg-black text-white"
          }
        >
          {icon} <br />
          {label}
        </NavLink>
      ))}
    </div>
  );
}
