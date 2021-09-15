const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https:://formulario-api-80f71.firebaseio.com",
});

app.get("/hello-word", (req, res) => {
  return res.status(200).json({message: "Hello world"});
});

app.use(require("./routes/products.routers"));

exports.app = functions.https.onRequest(app);
