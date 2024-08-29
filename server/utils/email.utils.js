const nodemailer = require('nodemailer');
const santaService = require('../services/santa.service');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL || 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER || 'jalen.cassin@ethereal.email',
    pass: process.env.EMAIL_PASSWORD || '9r6wbhaypsbjbTd13D',
  },
});

async function sendEmail() {
  try {
    const requests = await santaService.getPendingRequests();

    if (!Array.isArray(requests)) {
      console.error('getPendingRequests did not return an array:', requests);
      return;
    }

    if (requests.length === 0) {
      console.info('No pending requests to send.');
      return;
    }

    const mailOptions = {
      from: 'do_not_reply@northpole.com',
      to: 'santa@northpole.com',
      subject: 'Pending Santa Requests',
      text: requests
        .map(
          (r) =>
            `Username: ${r.username || 'N/A'}\nAddress: ${
              r.address || 'N/A'
            }\nMessage: ${r.message || 'N/A'}\n\n`
        )
        .join(''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    santaService.clearRequests();
  } catch (error) {
    console.error('Error in sendEmail:', error);
  }
}

const emailInterval = setInterval(sendEmail, 15000);

module.exports = { sendEmail, emailInterval };
