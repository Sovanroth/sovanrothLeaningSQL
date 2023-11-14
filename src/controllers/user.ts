import express from "express";
import db from "../config/db.config";
import bycript from "bcrypt";

// export const signUp = async (req: express.Request, res: express.Response) => {
//   db.query("SELECT * FROM users", (error, row) => {
//     if (error) {
//       return res.send("sadfsdf");
//     }
//     if(row.length === 0){
//         return res.status(404).json(row);
//     }
//   });
// };

export const getUsers = async (req: express.Request, res: express.Response) => {
  db.query("SELECT * FROM users", (err, row) => {
    if (err) {
      return res.send("sadfsdf");
    } else {
      return res.status(404).json(row);
    }
  });
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const message: { username?: string } = {};
  const body = req.body as {
    username: string;
    email: string;
    role: string;
    password: string;
  };

  const { username, email, role } = body;
  const password = bycript.hashSync(body.password, 10);

  const sqlStatement =
    "INSERT INTO `users` (username, email, role, password) VALUES (?,?,?,?)";

  if (username == null || username === "") {
    message.username = "Please input username";
  }

  if (email == null || email === "") {
    message.username = "Please input username";
  }

  if (password == null || password === "") {
    message.username = "Please input username";
  }

  if (Object.keys(message).length > 0) {
    res.status(401).json({
      error: true,
      message: message,
    });
    return;
  }

  db.query("SELECT * FROM `users` WHERE email = ?", [email], (error, row) => {
    if (!error) {
      if (row.length > 0) {
        res.status(403).json({
          error: true,
          message: "Email is used!",
        });
      } else {
        var param = [username, email, role, password];
        db.query(sqlStatement, param, (error, row) => {
          if (error) {
            res.status(500).json({
              error: true,
              message: "Something went Wrong",
            });
          } else {
            const createdUser = {username, email, role };
            res.json({
              error: false,
              message: {
                message: "Accout Created!",
                user: createdUser
              },
            });
          }
        });
      }
    }
  });
};
