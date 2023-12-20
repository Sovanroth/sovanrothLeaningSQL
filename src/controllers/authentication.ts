import express from "express";
import db from "../config/db.config";
import bycript from "bcrypt";
import jwt from 'jsonwebtoken';

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

export const login = async (
  req: express.Request,
  res: express.Response
) => {
  const message: { username?: string, password?: string } = {};
  const body = req.body as {
    username: string;
    email: string;
    password: string;
  };

  const { username, email } = body;
  const password = body.password; // Don't hash the password for comparison

  if ((username == null || username === "") && (email == null || email === "")) {
    message.username = "Please input username or email";
  }

  if (password == null || password === "") {
    message.password = "Please input password";
  }

  if (Object.keys(message).length > 0) {
    res.status(401).json({
      error: true,
      message: message,
    });
    return;
  }

  // Check if the user exists in the database
  const query = "SELECT * FROM `users` WHERE username = ? OR email = ?";
  db.query(query, [username, email], (error, rows) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    } else {
      if (rows.length === 0) {
        res.status(404).json({
          error: true,
          message: "User not found",
        });
      } else {
        const storedPassword = rows[0].password;

        // Compare the provided password with the stored hashed password
        bycript.compare(password, storedPassword, (err, result) => {
          if (result) {
            // Generate JWT token
            const token = jwt.sign(
              {
                userId: rows[0].id,
                username: rows[0].username,
                email: rows[0].email,
                role: rows[0].role,
              },
              'your-secret-key', // Replace with a secure secret key
              { expiresIn: '1h' } // Token expiration time
            );

            const loginUser = {
              username: rows[0].username,
              email: rows[0].email,
              role: rows[0].role,
              token: token,
            };

            res.json({
              error: false,
              message: "Login successful",
              user: loginUser,
            });
          } else {
            res.status(403).json({
              error: true,
              message: "Invalid password",
            });
          }
        });
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
