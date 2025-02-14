import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import { useQueryParams } from "../util/useQueryParams";

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState("");
  const [isFailure, setIsFailure] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const { email } = useQueryParams();

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;

  const onResetClicked = async () => {
    try {
      console.log("passwordResetCode -", passwordResetCode);
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        email,
        newPassword: passwordValue,
      });
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password.</p>

      <input
        value={passwordResetCode}
        onChange={(e) => setPasswordResetCode(e.target.value)}
        placeholder="Password Reset Code"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="confirm password"
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
    </div>
  );
};
