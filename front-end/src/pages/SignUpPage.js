import { useState } from "react";
import { useHistory } from "react-router-dom";
export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {};

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm password"
        type="password"
      />
      <hr />
      <button
        disabled={!email || !password || password !== confirmPassword}
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => history.push("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
};
