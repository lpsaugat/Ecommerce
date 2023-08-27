const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "lpsaugat@gmail.com",
  from: "infoprabidhilabs@gmail.com",
  subject: "Hello from SendGrid!",
  text: "This is a test email from SendGrid.",
};

sgMail
  .send(msg)
  .then(() => console.log("Email sent"))
  .catch((error) => console.error(error));
