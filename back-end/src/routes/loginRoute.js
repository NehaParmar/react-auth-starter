import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { getDbConnection } from "../db";
import { awsUserPool } from "../util/awsUserPool";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          const db = getDbConnection("react-auth-db");
          const user = await db.collection("users").findOne({ email });
          // if (!user) return res.sendStatus(401);

          const { _id: id, isVerified, info } = user;
          console.log("---user----", user);
          console.log("---password----", password);

          jwt.sign(
            { id, isVerified, email, info },
            process.env.JWT_SECRET,
            { expiresIn: "2d" },
            (err, token) => {
              if (err) return res.sendStatus(500);
              res.status(200).json({ token });
            }
          );
        },
        onFailure: (err) => {
          console.log("error --- ", err);
          res.sendStatus(401);
        },
      }
    );
  },
};
