import { createCourse, getAllCourses } from '../controllers/course';
import express from 'express';


export default (router: express.Router) => {
    router.post("/course/create-course", createCourse);
    router.get("/course/get-all-courses", getAllCourses)
}