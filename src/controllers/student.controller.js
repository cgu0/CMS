const getLogger = require("../common/logger");
const Student = require("../models/student.model");
const Course = require("../models/course.model");
const NotFoundException = require("../common/exceptions/notFound.exception");
const { add } = require("winston");
const logger = getLogger(__filename);

const getAllStudents = async (req, res, next) => {
  try {
    
    // add pagination 添加分页
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const students = await Student.find().limit(pageSize).skip(skip).exec(); //querry
    res.formatResponse(students);
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = await Student.create({ firstName, lastName, email });
    res.formatResponse(student, 201);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
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
    next(error);
  }
};

const updateStudentById = async (req, res, next) => {
  try {
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
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
      return res.formatResponse(`Student with id ${id} not found`, 404);
    }
    await Course.updateMany(
      {
        students: id,
      },
      {
        $pull: {
          students: id,
        },
      }
    ).exec();
    res.formatResponse(undefined, 204);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const addStudentToCourse = async (req, res, next) => {
  try {
    //第一步：通过学生id查找学生docunment
    const { studentId, courseId } = req.params;
    const student = await Student.findById(studentId).exec();
    //第二步：查找课程的document
    const course = await Course.findById(courseId).exec();
    //如果学生或者课程不存在，这个请求就不成立
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }
    //如果都成立，给学生添加课程信息，给课程添加学生信息
    student.courses.addToSet(courseId);
    course.students.addToSet(studentId);
    //保存学生和课程，更新数据库
    await student.save();
    await course.save();
    res.formatResponse(student, 200);
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};

const removeStudentToCourse = async (req, res, next) => {
  try {
    //第一步：通过学生id查找学生docunment
    const { studentId, courseId } = req.params;
    const student = await Student.findById(studentId).exec();
    //第二步：查找课程的document
    const course = await Course.findById(courseId).exec();
    //如果学生或者课程不存在，这个请求就不成立
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }
    //如果都成立，给学生删除课程信息，给课程删除学生信息
    student.courses.pull(courseId);
    course.students.pull(studentId);
    //保存学生和课程，更新数据库
    await student.save();
    await course.save();
    res.formatResponse(undefined, 204);
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};
module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentToCourse,
};
