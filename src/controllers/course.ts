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
    active?: string;
  } = {};

  const body = req.body as {
    courseTitle: string;
    courseDescription: string;
    category: string;
    courseImage: string;
    coursePrice: string;
    courseResource: string;
    active: string;
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
    "INSERT INTO `courses` (courseTitle, courseDescription, category, courseImage, coursePrice, courseResource, active) VALUES (?,?,?,?,?,?,?);";

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

  if (active == null || active === "") {
    message.courseResource = "Please input course active!";
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
    coursePrice,
    courseResource,
    active,
  ];

  db.query(sqlStatement, params, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
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
      });
    }
  });
};

export const getAllCourses = async (
  req: express.Request,
  res: express.Response
) => {
  db.query("SELECT * FROM courses", (error, row) => {
    if (error) {
      return res.send("Something went wrong!");
    } else {
      const data = { status: res.statusCode, data: row };
      return res.status(200).json(data);
    }
  });
};

export const getOneCourse = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const sqlStatement = "SELECT * FROM courses WHERE course_id = ?";
  const param = [id];
  db.query(sqlStatement, param, (error, row) => {
    if (error) {
      res.json({
        error: true,
        message: "Something Went Wrong!",
      });
    } else {
      res.json({
        status: res.statusCode,
        course: row,
      });
    }
  });
};

export const deleteCourse = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const sqlStatement = "DELETE FROM courses WHERE course_id = ?";
  const param = [id];

  db.query("SELECT * FROM courses WHERE course_id =? ", param, (error, row) => {
    if (!error) {
      if (row.length > 0) {
        db.query(sqlStatement, param, (error) => {
          if (error) {
            return res.json({
              error: true,
              message: "Something went wrong!",
            });
          } else {
            return res.json({
              message: "Course Deleted!",
            });
          }
        });
      }
    } else {
      return res.json({
        message: "Course not found!",
      });
    }
  });
};
