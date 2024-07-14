const express = require('express');
const { addExam, getAllExams, getExam, updateExam, deleteExam } = require('../controllers/examController');
const router = express.Router();

// Ruta para agregar un nuevo examen
router.post('/exams', addExam);

// Ruta para obtener todos los exámenes
router.get('/exams', getAllExams);

// Ruta para obtener un examen específico por ID
router.get('/exams/:id', getExam);

// Ruta para actualizar un examen específico por ID
router.put('/exams/:id', updateExam);

// Ruta para eliminar un examen específico por ID
router.delete('/exams/:id', deleteExam);

module.exports = router;
