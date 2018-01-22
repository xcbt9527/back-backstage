/**
 * Created by momo on 2018/1/21.
 */
import express from "express";
import menu from "../../Controller/menu/menu";
let router = express.Router();
router.post('/getAllmenu', (req, res, next) => {
    menu.getAllmenu(req, res, next);
});

router.post('/getTreemenu', (req, res, next) => {
    menu.getTreemenu(req, res, next);
});
router.post('/getmenu', (req, res, next) => {
    menu.getmenu(req, res, next);
});
router.post('/Delectmenu', (req, res, next) => {
    menu.Delectmenu(req, res, next);
});
router.post('/Savemenu', (req, res, next) => {
    menu.Savemenu(req, res, next);
});
module.exports = router;
