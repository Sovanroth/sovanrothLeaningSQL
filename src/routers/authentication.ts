import express from "express";
import { createUser } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/signup", createUser);
  router.post("/auth/login");
};
