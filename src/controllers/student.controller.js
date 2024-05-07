const getLogger = require("../common/logger");
const Student = require("../models/student.model");

const logger = getLogger(__filename);

const getAllStudents = async (req, res) => {
  const students = await Student.find().exec(); //querry
  res.formatResponse(students);
};

const addStudent = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const student = await Student.create({ firstName, lastName, email });
  res.formatResponse(student, 201);
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    console.log(student);
    if (!student) {
      return res.formatResponse(`Student with id ${id} not found`, 404);
      //throw new NotFoundException(`Student with id ${id} not found`);
    }
    res.formatResponse(student);
  } catch (error) {
    logger.error(error.message);
    res.formatResponse(`Something went wrong, please try again later`, 500);
  }
};

const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
    },
    {
      new: true,
    }
  ).exec();
  if (!student) {
    return res.formatResponse(`Student with id ${id} not found`, 404);
  }
  res.formatResponse(student);
};

const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.formatResponse(`Student with id ${id} not found`, 404);
  }
  res.formatResponse(undefined, 204);
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
