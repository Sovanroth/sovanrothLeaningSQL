import express from "express";
import { createUser, login, updateUser } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/signup", createUser);
  router.post("/auth/login", login);
  router.post("/auth/update-user/:userId", updateUser);
};
