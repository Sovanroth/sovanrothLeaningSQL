import { createCourse } from '../controllers/course';
import express from 'express';


export default (router: express.Router) => {
    router.post("/course/create-course", createCourse)
}