import bcrypt from "bcrypt";
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { newPassword } = req.body;
    console.log("passwordResetCode -", passwordResetCode);

    const db = getDbConnection("react-auth-db");

    const newSalt = uuid();
    const pepper = process.env.PEPPER_STRING;

    const newPasswordHash = await bcrypt.hash(
      newSalt + newPassword + pepper,
      10
    );

    const result = await db.collection("users").findOneAndUpdate(
      { passwordResetCode },
      {
        $set: { passwordHash: newPasswordHash, salt: newSalt },
        $unset: { passwordResetCode: "" },
      }
    );
    console.log("result ---", result);
    if (result.lastErrorObject.n === 0) return res.sendStatus(404);

    res.sendStatus(200);
  },
};
