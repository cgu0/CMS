const { Router } = require('express'); 
const { getAllStudents, getStudentById, addStudent, updateStudentById, deleteStudentById, addStudentToCourse, removeStudentToCourse} = require('../controllers/student.controller');

const studentRouter = Router();

studentRouter.get('/', getAllStudents);

studentRouter.get('/:id', getStudentById);  

studentRouter.post('/', addStudent);

studentRouter.put('/:id', updateStudentById);

studentRouter.delete('/:id', deleteStudentById);

studentRouter.post('/:studentId/courses/courseId', addStudentToCourse);

studentRouter.delete('/:studentId/courses/courseId', removeStudentToCourse);

module.exports = studentRouter;