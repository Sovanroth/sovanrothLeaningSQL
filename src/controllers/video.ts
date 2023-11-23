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

export const deleteVideo = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const sqlStatement = "DELETE FROM videos WHERE video_id = ?";
  const param = [id];

  db.query(
    "SELECT * FROM  videos WHERE video_id = ?",
    param,
    (error, result) => {
      if (!error) {
        if (result.length > 0) {
          db.query(sqlStatement, param, (error) => {
            if (error) {
              return res.json({
                error: true,
                message: "Something went wrong!",
              });
            } else {
              return res.json({
                message: "Video Deleted!",
              });
            }
          });
        }
      } else {
        return res.json({
          message: "Course not found!",
        });
      }
    }
  );
};

export const getAllVideo = async (
  req: express.Request,
  res: express.Response
) => {
  db.query("SELECT * FROM videos", (error, result) => {
    if (error) {
      return res.send("Something went wrong!");
    } else {
      const data = { status: res.statusCode, data: result };
      return res.status(200).json(data);
    }
  });
};
