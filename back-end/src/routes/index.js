import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { logInRoute } from "./loginRoute";
import { updteUserInfo } from "./updateUserInfo";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { testEmailRoute } from "./testEmailRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";

export const routes = [
  testRoute,
  signUpRoute,
  logInRoute,
  updteUserInfo,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
];

// testEmailRoute,
