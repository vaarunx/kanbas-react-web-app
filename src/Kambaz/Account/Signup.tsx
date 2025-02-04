import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h2>Sign up</h2>
      <Form.Control placeholder="username" className="mb-2" />
      <Form.Control placeholder="password" type="password" className="mb-2" />
      <Form.Control
        placeholder="verify password"
        type="password"
        className="mb-2"
      />
      <Link to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2">
        Sign up
      </Link>
      <br />
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}