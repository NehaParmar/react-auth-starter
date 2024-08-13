import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const history = useHistory();

  const onSubmitClicked = async () => {
    await axios.put(`/api/forgot-password/${emailValue}`);
    setSuccess(true);
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  };

  return success ? (
    <div className="content-container">
      <h1>Sucess</h1>
      <p>Check your email for reset link.</p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot Password</h1>
      <p>
        Enter your email and we will send you a link to reset your Password.
      </p>
      {errorMessage && <div className="fail">{errorMessage}</div>}

      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="something@gmail.come"
      />
      <button disabled={!emailValue} onClick={onSubmitClicked}>
        Send Reset Link
      </button>
    </div>
  );
};
