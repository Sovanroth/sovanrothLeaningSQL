import express from "express";
import db from "../config/db.config";

export const createCourse = async (
  req: express.Request,
  res: express.Response
) => {
  const message: {
    courseTitle?: string;
    courseDescription?: string;
    category?: string;
    courseImage?: string;
    coursePrice?: string;
    courseResource?: string;
    active?: number;
  } = {};

  const body = req.body as {
    courseTitle: string;
    courseDescription: string;
    category: string;
    courseImage: string;
    coursePrice: string;
    courseResource: string;
    active: number;
  };

  const {
    courseTitle,
    courseDescription,
    category,
    courseImage,
    coursePrice,
    courseResource,
    active,
  } = body;

  const sqlStatement =
    "INSERT INTO `courses` (courseTitle, courseDescription, category, courseImage, coursePrice, courseResource, active) VALUES (?, ?, ?, ?, ?, ?, ?)";

  if (courseTitle == null || courseTitle === "") {
    message.courseTitle = "Please input course title!";
  }

  if (courseDescription == null || courseDescription === "") {
    message.courseDescription = "Please input course description!";
  }

  if (category == null || category === "") {
    message.category = "Please input course category!";
  }

  if (courseImage == null || courseImage === "") {
    message.courseImage = "Please input course image!";
  }

  if (coursePrice == null || coursePrice === "") {
    message.coursePrice = "Please input course price!";
  }

  if (courseResource == null || courseResource === "") {
    message.courseResource = "Please input course resource!";
  }

  if (Object.keys(message).length > 0) {
    return res.status(401).json({
      error: true,
      message: "Validation error",
      details: message,
    });
  }

  const params = [
    courseTitle,
    courseDescription,
    category,
    courseImage,
    courseResource,
    active,
  ];

  db.query(sqlStatement, params, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong with the database!",
        details: error,
      });
    } else {
      const createdCourse = {
        courseTitle,
        courseDescription,
        category,
        courseImage,
        coursePrice,
        courseResource,
        active,
      };
      return res.json({
        error: false,
        message: "Course Created!",
        course: createdCourse,
        result,
      });
    }
  });
};
