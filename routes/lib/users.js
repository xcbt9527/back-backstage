import express from "express";
import { userclass } from "../../Controller/user/user";
const user = new userclass();
let router = express.Router();
router.post('/login', (req, res, next) => {
    user.login(req, res, next);
});
router.post('/getAlluser', (req, res, next) => {
    user.getAll(req, res, next);
});
router.post('/SaveRecord', (req, res, next) => {
    user.Save(req, res, next);
});
router.post('/DeleteRecord', (req, res, next) => {
    user.Delete(req, res, next);
});
router.post('/ModifyRecord', (req, res, next) => {
    user.ModifyRecord(req, res, next);
});
router.post('/register', (req, res, next) => {
    user.register(req, res, next);
});
module.exports = router;
