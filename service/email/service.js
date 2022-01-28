const Mailgen = require("mailgen");

const link = (env) => {
  switch (env) {
    case "development":
      return "http://localhost:3001/";

    case "test":
      return "";

    case "production":
      return "";

    default:
      return "http://localhost:3001/";
  }
};

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    this.link = link(env);
  }

  createEmailTemplate(userEmail, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: "To get started with por API, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}api/users/verify/${verifyToken}`,
          },
        },
        outro: "TEST",
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, verifyToken) {
    const emailBody = this.createEmailTemplate(email, verifyToken);
    const msg = {
      to: email,
      subject: "Verify email!",
      html: emailBody,
    };

    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

module.exports = EmailService;
