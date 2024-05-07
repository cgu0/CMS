const NotFoundException = require("../common/exceptions/notFound.exception");
const getLogger = require("../common/logger");
const Course = require("../models/course.model");
const Student = require("../models/student.model");
const Joi = require("joi");
const addCourseSchema = require("../validations/addCourseSchema");
const logger = getLogger(__filename);

// function catchAllErrors(routeHandler) {
//   return (req, res, next) => {
//     try {
//       routeHandler(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// }
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().exec(); //querry
    res.formatResponse(courses);
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const validateBody = await addCourseSchema.validateAsync(req.body, {
      allowUnown: true,
      stripUnknown: true,
    });
    const course = await Course.create(validateBody);
    res.formatResponse(course, 201);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('student').exec();
    if (!course) {
      throw new NotFoundException(`course with id ${id} not found`);
      return res.formatResponse(`course with id ${id} not found`, 404);
      //throw new NotFoundException(`course with id ${id} not found`);
    }
    res.formatResponse(course);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, name, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        code,
        name,
        description,
      },
      {
        new: true,
      }
    ).exec();
    if (!course) {
      return res.formatResponse(`course with id ${id} not found`, 404);
    }
    res.formatResponse(course);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id).exec();
    if (!course) {
      return res.formatResponse(`course with id ${id} not found`, 404);
    }
    await Student.updateMany(
      { courses: id },
      { $pull: { courses: id } }
    ).exec(); //删除课程后对课程内的学生做更新
    res.formatResponse(undefined, 204);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
