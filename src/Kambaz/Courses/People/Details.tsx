/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    role: false,
  });
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing({ name: false, email: false, role: false });
    navigate(-1);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {editing.name ? (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        ) : (
          <FaPencil
            onClick={() => setEditing({ ...editing, name: true })}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing.name ? (
          <input
            className="form-control w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        ) : (
          <div>
            {user.firstName} {user.lastName}
          </div>
        )}
      </div>
      <div>
        <b>Email: </b>
        {editing.email ? (
          <input
            className="form-control w-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        ) : (
          <>
            <span className="wd-email">{email}</span>
            <FaPencil
              onClick={() => setEditing({ ...editing, email: true })}
              className="ms-2 wd-edit"
            />
          </>
        )}
      </div>
      <div>
        <b>Role: </b>
        {editing.role ? (
          <>
            <select
              className="form-select w-50"
              value={role}
              onChange={(e) => {
                const newRole = e.target.value;
                setRole(newRole); // Update the role in state
                // saveUser(); // Save immediately after selection
              }}
            >
              <option value="STUDENT">Student</option>
              <option value="TA">Assistant</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrator</option>
            </select>
            <FaCheck onClick={saveUser} className="ms-2 wd-save" />
          </>
        ) : (
          <>
            <span className="wd-roles">{role}</span>
            <FaPencil
              onClick={() => setEditing({ ...editing, role: true })}
              className="ms-2 wd-edit"
            />
          </>
        )}
      </div>
      {/* <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
      <b>Email: </b> <span className="wd-email">{user.email}</span> <br /> */}
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        {" "}
        Delete{" "}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
