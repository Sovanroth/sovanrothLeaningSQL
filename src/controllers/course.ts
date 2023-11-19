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

// `SELECT c.course_id, c.courseTitle, c.courseDescription, c.category, c.courseImage, c.coursePrice, c.courseResource, c.active, JSON_ARRAYAGG(JSON_OBJECT('videos', videos.video_id)) as videos
// FROM courses c
// JOIN videos ON c.course_id = videos.course_id
// GROUP BY c.course_id, c.courseTitle, c.courseDescription, c.category, c.courseImage, c.coursePrice, c.courseResource, c.active;`

// const getAllProducts = (req, res) => {




export const getAllCoursesWithVideo = async (
  req: express.Request,
  res: express.Response
) => {
  const courseQuery =
    "SELECT courses.* FROM courses LEFT JOIN videos ON courses.course_id = videos.course_id GROUP BY courses.course_id";

  db.query(courseQuery, (error, row) => {
    if (error) {
      return res.send(error);
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
      const course = row.length > 0 ? row[0] : null;
      res.json({
        status: res.statusCode,
        course: course,
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
