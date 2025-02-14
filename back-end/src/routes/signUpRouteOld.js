import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });
    if (user) res.sendStatus(409);

    const salt = uuid();
    const pepper = process.env.PEPPER_STRING;

    const passwordHash = await bcrypt.hash(salt + password + pepper, 10);
    const verificationString = uuid();
    const startingInfo = {
      hairColor: "",
      favouriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      salt,
      info: startingInfo,
      isVerified: false,
      verificationString,
    });
    console.log("---- signup result ----", result);
    const { insertedId } = result;
    console.log("----insertedId ----", insertedId);

    try {
      await sendEmail({
        to: email,
        from: "nehastestingemail@gmail.com",
        subject: " Please verify your email",
        text: `
              Thanks for signing up! To verify your email, click here:
              http://localhost:3000/verify-email/${verificationString}
        `,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        console.log("----error ----", err);
        console.log("----token----", token);
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
