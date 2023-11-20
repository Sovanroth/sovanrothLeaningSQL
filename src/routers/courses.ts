import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseByIdWithVideo,
  getOneCourse,
  updateCourse,
} from "../controllers/course";
import express from "express";

export default (router: express.Router) => {
  router.post("/course/create-course", createCourse);
  router.get("/course/get-all-courses", getAllCourses);
  router.get("/course/get-one-course/:id", getOneCourse);
  router.delete("/course/delete-course/:id", deleteCourse);
  router.get("/course/get-course-with-video/:id", getCourseByIdWithVideo)
  router.patch("/course/update-course/:id", updateCourse)
};
