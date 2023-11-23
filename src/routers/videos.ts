import express from "express"
import { createVideo, deleteVideo, getAllVideo } from "../controllers/video"


export default (router: express.Router) => {
    router.post("/video/post-video", createVideo);
    router.delete("/video/delete-video/:id", deleteVideo)
    router.get("/video/get-all-video", getAllVideo)
}