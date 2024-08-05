// This is the route for the diferent validations with Vertex AI

const express = require('express');
const router = express.Router();
const {handUpVerification, closesEyesVerification, sentenceVerification} = require('../controllers/vertexController')


//Hand Verification
router.post('/handVerification', handUpVerification);

//Closes eyes verification

router.post('/eyesVerification', closesEyesVerification);

//result Analysis

router.post('/sentenceVerification', sentenceVerification);


module.exports = router;
