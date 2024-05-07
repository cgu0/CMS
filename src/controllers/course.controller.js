const getLogger = require("../common/logger");
const Course = require("../models/course.model");

const logger = getLogger(__filename);

const getAllCourses = async (req, res) => {
  const courses = await Course.find().exec(); //querry
  res.formatResponse(courses);
};

const addCourse = async (req, res) => {
  const { code, name, description } = req.body;
  const course = await Course.create({ code, name, description });
  res.formatResponse(course, 201);
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).exec();
    if (!course) {
      return res.formatResponse(`course with id ${id} not found`, 404);
      //throw new NotFoundException(`course with id ${id} not found`);
    }
    res.formatResponse(course);
  } catch (error) {
    logger.error(error.message);
    res.formatResponse(`Something went wrong, please try again later`, 500);
  }
};

const updateCourseById = async (req, res) => {
  const { id } = req.params;
  const { code, name, description} = req.body;
  const course = await Course
    .findByIdAndUpdate(
      id,
      {
        code,
        name,
        description,
      },
      {
        new: true,
      }
    )
    .exec();
  if (!course) {
    return res.formatResponse(`course with id ${id} not found`, 404);
  }
  res.formatResponse(course);
};

const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.formatResponse(`course with id ${id} not found`, 404);
  }
  res.formatResponse(undefined, 204);
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
