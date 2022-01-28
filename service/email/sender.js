const sgMail = require("@sendgrid/mail");

class Sender {
  async send(msg) {
    sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    return await sgMail.send({ ...msg, from: process.env.EMAIL_SENDGRID });
  }
}

module.exports = Sender;
