/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ to: "/Kambaz/Account/Profile", label: "Profile" }]
    : [
        { to: "/Kambaz/Account/Signin", label: "Signin" },
        { to: "/Kambaz/Account/Signup", label: "Signup" },
      ];

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-5 rounded-0 position-fixed"
    >
      {links.map(({ to, label }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "list-group-item active border border-0"
              : "list-group-item text-danger border border-0"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
