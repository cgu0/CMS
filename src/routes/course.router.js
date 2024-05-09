const { Router } = require("express");
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course.controller");
const adminGuardMiddleware = require("../middleware/adminGuard.middleware");

const courseRouter = Router();

courseRouter.get("/", getAllCourses);

courseRouter.get("/:id", getCourseById);

courseRouter.post("/", addCourse);

courseRouter.put("/:id", updateCourseById);

courseRouter.delete("/:id", adminGuardMiddleware, deleteCourseById);

module.exports = courseRouter;
