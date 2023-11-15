import express from "express"
import users from "./users";
import authentication from "./authentication";
import courses from "./courses";

const router = express.Router();

export default (): express.Router => {
    users(router);
    authentication(router);
    courses(router);
    
    return router;
}
