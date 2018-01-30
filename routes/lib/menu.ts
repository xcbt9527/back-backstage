/**
 * Created by momo on 2018/1/21.
 */
import express from "express";
import {menuclass} from "../../Controller/menu/menu";
const menu = new menuclass();
let router = express.Router();
router.post('/getAllmenu', (req, res, next) => {
    menu.getAll(req, res, next);
});

router.post('/getTreemenu', (req, res, next) => {
    menu.getTree(req, res, next);
});
router.post('/getmenu', (req, res, next) => {
    menu.getOne(req, res, next);
});
router.post('/Delectmenu', (req, res, next) => {
    menu.Delect(req, res, next);
});
router.post('/Savemenu', (req, res, next) => {
    menu.Save(req, res, next);
});
module.exports = router;
