/**
 * Created by momo on 2018/1/4.
 */
import express from "express";
import user from "../Controller/shop/shop";
let router = express.Router();
router.post('/getAllshop', (req, res, next) => {
    user.getAllshop(req, res, next);
});
router.post('/SaveRecord', (req, res, next) => {
    user.SaveRecord(req, res, next);
});
router.post('/DeleteRecord', (req, res, next) => {
    user.DeleteRecord(req, res, next);
});
module.exports = router;
