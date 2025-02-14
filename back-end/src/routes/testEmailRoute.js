import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "nehastestingemail+test1@gmail.com",
        from: "nehastestingemail@gmail.com",
        subject: "first test email",
        text: "Testing email sending funtionality",
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
