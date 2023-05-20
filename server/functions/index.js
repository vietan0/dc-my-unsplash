/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    msg: 'This is dc-my-unsplash backend, build with Express and Firebase Cloud Functions 🎉😎',
  });
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

module.exports = { api: onRequest(app) };
