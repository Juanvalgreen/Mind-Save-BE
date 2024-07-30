'use strict';

const {firestore, doc, setDoc} = require('../db');
const Exam = require('../models/exam');
const {generateUniqueNumber} = require('./utils');

const addExam = async (req, res, next) => {
    console.log(req);
    try {
        const data = req.body;
        await setDoc(doc(firestore,'exams',generateUniqueNumber(data.userInfo.dateOfBirth)),data);
        res.json({message: 'record Saved'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllExams = async (req, res, next) => {
    try {
        const exams = await firestore.collection('exams');
        const data = await exams.get();
        const examsArray = [];
        if (data.empty) {
            res.status(404).json({message: 'Error'});
        } else {
            data.forEach(doc => {
                const exam = new Exam(
                    doc.data().userInfo.name,
                    doc.data().userInfo.dateOfBirth,
                    doc.data().userInfo.canRead,
                    doc.data().userInfo.canWrite,
                    doc.data().userInfo.profession,
                    doc.data().examInfo.orientation,
                    doc.data().examInfo.fixation,
                    doc.data().examInfo.calcAttention,
                    doc.data().examInfo.memory,
                    doc.data().examInfo.lenguage,
                    doc.data().examInfo.applicationDate,
                    doc.data().examInfo.itAutoEvaluation
                );
                examsArray.push(exam);
            });
            res.send(examsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getExam = async (req, res, next) => {
    try {
        const id = req.params.id;
        const exam = await firestore.collection('exams').doc(id);
        const data = await exam.get();
        if (!data.exists) {
            res.status(404).send('Exam with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateExam = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const exam = await firestore.collection('exams').doc(id);
        await exam.update(data);
        res.send('Exam record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteExam = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('exams').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addExam,
    getAllExams,
    getExam,
    updateExam,
    deleteExam
}
