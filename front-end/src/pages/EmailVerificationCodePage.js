import { useState, useEffect } from "react";
import axios from "axios";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";

export const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const [verificationString, setVerificationString] = useState("");
  const { email } = useQueryParams();
  const [, setToken] = useToken();

  const onSubmitVerificationString = async () => {
    try {
      const response = await axios.put("/api/verify-email", {
        email,
        verificationString,
      });
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailure) return <EmailVerificationFail />;
  return (
    <div className="content-container">
      <h1>Please Verify Your Email</h1>
      <p>
        You should have received a verification code at the email address you
        provided. Please enter it here:
      </p>
      <input
        placeholder="e.g. 123456"
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
      />
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>
  );
};
