import { useHistory } from "react-router-dom";

export const EmailVerificationFail = () => {
  const history = useHistory();
  return (
    <div className="content-container">
      <h1>Uh Oh ....</h1>
      <p>Something went wrong while trying to verify your email.</p>
      <button onClick={() => history.push("/signup")}>Back to Sign-up</button>
    </div>
  );
};
