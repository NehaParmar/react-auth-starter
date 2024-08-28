import { getGoogleOauthUrl } from "../util/getGoogleOauthUrl";

export const getGoogleOauthUrlRoute = {
  path: "/auth/google/url",
  method: "get",
  handler: (req, res) => {
    const url = getGoogleOauthUrl();
    console.log("url----", url);
    res.status(200).json({ url });
  },
};
