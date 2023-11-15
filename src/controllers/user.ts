import express from "express";
import db from "../config/db.config";

export const getUsers = async (req: express.Request, res: express.Response) => {
  db.query("SELECT * FROM users", (err, row) => {
    if (err) {
      return res.send("sadfsdf");
    } else {
      return res.status(404).json(row);
    }
  });
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const sqlStatement = "DELETE FROM users WHERE user_id = ?";
  const param = [id];

  db.query("SELECT * FROM users WHERE user_id = ?", param, (error, row) => {
    if (!error) {
      if (row.length > 0) {
        db.query(sqlStatement, param, (error, row) => {
          if (error) {
            return res.json({
              error: true,
              message: "Something went wrong!",
            });
          } else {
            return res.json({
              message: "Deleted Successfully",
            });
          }
        });
      } else {
        return res.json({
          message: "User does not exist!",
        });
      }
    }
  });
};

export const getOneUser = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const sqlStatement = "SELECT * FROM users WHERE user_id = ?";
  const param = [id];
  db.query(sqlStatement, param, (error, row) => {
    if (error) {
      res.json({
        error: true,
        message: "Something went wrong",
      });
    } else {
      res.json({
        user: row,
      });
    }
  });
};
