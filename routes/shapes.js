// This is the route for the validation of shapes similarity in DrawShape question

const express = require('express');
const router = express.Router();
const {compareShape} = require('../controllers/shapesController');

router.post('/compare', compareShape);

module.exports = router;
