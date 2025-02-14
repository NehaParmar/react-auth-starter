import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";
import { getDbConnection } from "../db";

export const forgotPasswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;

    const db = getDbConnection("react-auth-db");
    const passwordResetCode = uuid();
    console.log("---- code----", passwordResetCode);

    const { result } = await db
      .collection("users")
      .updateOne({ email }, { $set: { passwordResetCode } });

    if (result.nModified > 0) {
      console.log("--- updated in db-----");
      try {
        await sendEmail({
          to: email,
          from: "nehastestingemail@gmail.com",
          subject: "Password Reset",
          text: `
            To reset this password, please click this link:
            http://localhost:3000/reset-password/${passwordResetCode}
            `,
        });
      } catch (error) {
        console.log("---error----", error);
        res.sendStatus(500);
      }
    }
    res.sendStatus(200);
  },
};
