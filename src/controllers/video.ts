import db from "../config/db.config";
import express from "express";
import { isEmpty } from "lodash";

export const createVideo = async (
  req: express.Request,
  res: express.Response
) => {
  const message: {
    video_title?: string;
    video_url?: string;
    course_id?: number;
  } = {};

  const body = req.body as {
    video_title?: string;
    video_url?: string;
    course_id?: number;
  };

  const { video_title, video_url, course_id } = body;

  const sqlStatement =
    "INSERT INTO `videos` (video_title, video_url, course_id) VALUES (?,?,?);";

  if (isEmpty(video_title)) {
    message.video_title = "Please input video title!";
  }
  if (isEmpty(video_url)) {
    message.video_url = "Please input video url!";
  }

  if (Object.keys(message).length > 0) {
    return res.status(401).json({
      error: true,
      detail: message,
    });
  }

  const params = [video_title, video_url, course_id];

  db.query(sqlStatement, params, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: true,
        detail: message,
      });
    } else {
      const createdVideo = {
        video_title,
        video_url,
        course_id,
      };

      return res.json({
        error: false,
        message: "Video Posted",
        video: createdVideo,
      });
    }
  });
};
