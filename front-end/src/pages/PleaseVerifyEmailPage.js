import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParams } from "../util/useQueryParams";

export const PleaseVerifyEmailPage = () => {
  const history = useHistory();
  const { email } = useQueryParams();
  console.log("---- email --- ", email);

  useEffect(() => {
    setTimeout(() => {
      history.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 3000);
  }, [history, email]);

  return (
    <div className="content-container">
      <h1>Thanks for Signing up!!</h1>
      <p>
        A Verification email is sent to your email address. Please verify your
        email to unlock full site features.
      </p>
    </div>
  );
};
