import express from 'express'
import {deleteUser, getOneUser, getUsers } from '../controllers/user';

export default (router: express.Router) => {
    router.get("/users", getUsers);
    router.delete("/delete-user/:id", deleteUser);
    router.get("/get-one-user/:id", getOneUser)
    router.get("/auth/user")
}