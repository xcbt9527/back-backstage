import express from "express";
import user from "../Controller/user/user";
let router = express.Router();
router.post('/login', (req, res, next) => {
    user.login(req, res, next);
});
module.exports = router;
