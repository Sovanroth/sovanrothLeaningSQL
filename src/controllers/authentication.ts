import express from "express";
import db from "../config/db.config";
import bycript from "bcrypt";


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
            const createdUser = { username, email, role };
            res.json({
              error: false,
              message: "Accout Created!",
              user: createdUser,
            });
          }
        });
      }
    }
  });
};

export const Login = async (req: express.Request, res: express.Response) => {
  const message: { email?: string; password?: string } = {};
  const body = req.body as {
    email: string;
    password: string;
  };

  const { email, password } = body;

  if (email == null || email == "") {
    message.email = "Email is needed!";
  }

  if (password == null || password == "") {
    message.password = "Password is needed!";
  }

  if (Object.keys(message).length > 0) {
    res.status(401).json({
      error: true,
      message: "Something went wrong!",
    });
  }

  db.query("SELECT * FROM users WHERE email == ?", [email], (error, row) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Something went wrong when fetching user!",
      });
      return;
    }

    if (row.length == 0) {
      res.status(401).json({
        error: true,
        message: "Login Failed, User does not existed!",
      });
    } else {
      const user = row[0];
      const userPassword = user.password;
      const comparePassword = bycript.compareSync(password, userPassword);
      if (comparePassword) {
      }
    }
  });
};

export const udpateUser = (req: express.Request, res: express.Response) => {
  const body = req.body as {
    email: string;
    password: string;
    username: string;
  };

  const { email, username } = body;
  const password = bycript.hashSync(body.password, 10);
  const param = [body.email, body.password, body.username];

  const sqlStatement =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id";

  db.query(sqlStatement, param, (error, row) => {
    if(error) {
      return res.json({
        error: true,
        message: "Something Went Wrong!"
      })
    } else {
      return res.json({
        status: res.statusCode,
        message: "Updated Successfully",
        user: row,
      })
    }
  });
};
