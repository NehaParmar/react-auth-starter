import axios from "axios";
import { oauthClient } from "./oauthClient";

const getAccessAndBearerToken = ({ accessToken }) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

export const getGoogleUser = async ({ code }) => {
  const { tokens } = await oauthClient.getToken(code);
  const response = await axios.get(
    getAccessAndBearerToken({ accessToken: tokens.access_token }),
    { headers: { Authorization: `Bearer ${tokens.id_token}` } }
  );
  return response.data;
};
