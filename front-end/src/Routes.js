import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { LogInPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { EmailVerificationCodePage } from "./pages/EmailVerificationCodePage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <UserInfoPage />
        </PrivateRoute>
        <Route path="/verify-email" exact>
          <EmailVerificationCodePage />
        </Route>
        <Route path="/verify-email/:verificationString">
          <EmailVerificationLandingPage />
        </Route>
        // ---- Uncomment while not using awz cognito login method -----//
        {/* <Route path="/reset-password/:passwordResetCode">
          <PasswordResetLandingPage />
        </Route> */}
        // ---- Uncomment while not using awz cognito login method -----//
        <Route path="/reset-password">
          <PasswordResetLandingPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/please-verify">
          <PleaseVerifyEmailPage />
        </Route>
      </Switch>
    </Router>
  );
};
