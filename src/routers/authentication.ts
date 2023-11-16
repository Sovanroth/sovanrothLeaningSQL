import express from "express";
import { createUser, udpateUser } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/signup", createUser);
  router.post("/auth/login");
  router.patch("/auth/update-user/:id", udpateUser)
};
