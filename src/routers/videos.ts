import express from "express"
import { createVideo } from "../controllers/video"


export default (router: express.Router) => {
    router.post("/video/post-video", createVideo)
}