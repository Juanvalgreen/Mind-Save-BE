// This is the route for the diferent validations with Vertex AI

const express = require('express');
const router = express.Router();
const {handUpVerification, closesEyesVerification} = require('../controllers/vertexController')


//Hand Verification
router.post('/handVerification', handUpVerification);

//Closes eyes verification

router.post('/eyesVerification', closesEyesVerification);


module.exports = router;
