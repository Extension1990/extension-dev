const express = require('express');
const nodeMailer = require('nodemailer');

const contactForm = (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let message = req.body.message;

    async function mainMail(firstName, lastName, email, message) {
        const transporter = await nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
  
        const mailOption = {
          from: email,
          to: process.env.EMAIL,
          html: `Email from : ${email} <br><br>
          Message:<br><br> ${message} <br><br>
          Kind regards <br>
          ${firstName} ${lastName}`,
        };
        try {
          await transporter.sendMail(mailOption);
          return Promise.resolve(message);
        } catch (error) {
          console.log(error)
          return Promise.reject(error);
        }
    }

    try {
        mainMail(firstName, lastName, email, message);
        res.status(200).send({firstName, lastName, email, message});
        console.log(res)
  
      } catch (error) {
        res.send("Message Could not be Sent");
        console.log(error)
      }
}

module.exports = contactForm;