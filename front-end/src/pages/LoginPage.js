import { useState } from "react";
import { useHistory } from "react-router-dom";
export const LogInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onLoginClicked = async () => {};

  return (
    <div className="content-container">
      <h1>Log In</h1>
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
      <hr />
      <button disabled={!email || !password} onClick={onLoginClicked}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account?Sign Up.
      </button>
    </div>
  );
};
