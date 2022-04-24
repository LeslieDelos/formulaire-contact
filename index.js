const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const MAIL = process.env.MAIL;

const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", (req, res) => {
  const { firstname, lastname, subject, email, message } = req.fields;
  //   console.log(req.fields);

  const data = {
    from: `${firstname} ${lastname} ${subject} <${email}>`,
    to: MAIL,
    subject: `Formulaire envoyé par ${firstname}`,
    text: message,
  };

  //   console.log(data);
  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
  });

  res.status(200).json({ message: "Données reçues, message envoyé" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(3000, () => {
  console.log("Server Started");
});
