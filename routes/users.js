import express from "express";
import user from "../Controller/user/user";
let router = express.Router();
router.post('/login', (req, res, next) => {
    user.login(req, res, next);
});
router.post('/getAlluser', (req, res, next) => {
    user.getAlluser(req, res, next);
});
router.post('/SaveRecord', (req, res, next) => {
    user.SaveRecord(req, res, next);
});
router.post('/DeleteRecord', (req, res, next) => {
    user.DeleteRecord(req, res, next);
});
router.post('/ModifyRecord', (req, res, next) => {
    user.ModifyRecord(req, res, next);
});
module.exports = router;
