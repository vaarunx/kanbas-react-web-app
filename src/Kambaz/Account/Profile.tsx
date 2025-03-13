/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, FormGroup, FormSelect } from "react-bootstrap";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen">
      <h2>Profile</h2>
      {profile && (
        <div>
          <Form.Control
            defaultValue={profile.username}
            placeholder="username"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <Form.Control
            defaultValue={profile.password}
            placeholder="password"
            type="password"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <Form.Control
            defaultValue={profile.firstName}
            placeholder="First Name"
            id="wd-firstname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <Form.Control
            defaultValue={profile.lastName}
            placeholder="Last Name"
            id="wd-lastname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormGroup className="input-group">
            <Form.Control
              defaultValue={profile.dob}
              placeholder="2000-01-01"
              type="date"
              id="wd-dob"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="mb-2"
            />
            <span className="input-group-text mb-2">
              <i className="bi bi-calendar-date" />{" "}
              <SlCalender className="mb-2" />
            </span>
          </FormGroup>
          <Form.Control
            defaultValue={profile.email}
            type="email"
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <FormSelect id="wd-role" className="mb-2"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role:  e.target.value })}>
            <option value="USER" selected>User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <Button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
