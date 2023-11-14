import express from 'express'
import { createUser, getUsers } from '../controllers/user';

export default (router: express.Router) => {
    router.get("/users", getUsers);
    router.post("/signup", createUser)
}