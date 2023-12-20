import express from "express";
import { createUser, login, udpateUser } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/signup", createUser);
  router.post("/auth/login", login);
  router.patch("/auth/update-user/:id", udpateUser)
};
