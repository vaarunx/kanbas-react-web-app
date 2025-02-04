// import { Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// export default function Profile() {
//   return (
//     <div id="wd-profile-screen">
//       <h3>Profile</h3>
//       <Form.Control
//         defaultValue="alice"
//         placeholder="username"
//         className="mb-2"
//       />
//       <br />
//       <input
//         defaultValue="123"
//         placeholder="password"
//         type="password"
//         className="wd-password"
//       />
//       <br />
//       <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
//       <br />
//       <input
//         defaultValue="Wonderland"
//         placeholder="Last Name"
//         id="wd-lastname"
//       />
//       <br />
//       <input defaultValue="2000-01-01" type="date" id="wd-dob" />
//       <br />
//       <input defaultValue="alice@wonderland" type="email" id="wd-email" />
//       <br />
//       <select defaultValue="FACULTY" id="wd-role">
//         <option value="USER">User</option> <option value="ADMIN">Admin</option>
//         <option value="FACULTY">Faculty</option>{" "}
//         <option value="STUDENT">Student</option>
//       </select>
//       <br />
//       <Link to="/Kambaz/Account/Signin">Sign out</Link>
//     </div>
//   );
// }

import { Form, FormGroup, FormSelect } from "react-bootstrap";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h2>Profile</h2>
      <Form.Control
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <Form.Control
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Form.Control
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2"
      />
      <Form.Control
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2"
      />

      <FormGroup className="input-group">
        <Form.Control
          placeholder="2000-01-01"
          type="date"
          id="wd-dob"
          className="mb-2"
        />
        <span className="input-group-text mb-2">
          <i className="bi bi-calendar-date" /> <SlCalender className="mb-2"/>
        </span>
      </FormGroup>
      <Form.Control
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="mb-2"
      />
      <FormSelect id="wd-role" className="mb-2">
        <option value="USER" selected>
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link className="btn btn-danger w-100 mb-2" to="/Kambaz/Account/Signin">
        Sign out
      </Link>
    </div>
  );
}