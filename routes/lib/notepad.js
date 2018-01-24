/**
 * Created by momo on 2018/1/21.
 */
import express from "express";
import {notepad} from "../../Controller/notepad/notepad";
const src = new notepad();
let router = express.Router();
router.post('/getAllnotepad', (req, res, next) => {
    src.getAll(req, res, next);
});
router.post('/getnotepad', (req, res, next) => {
    src.getOne(req, res, next);
});
router.post('/Delectnotepad', (req, res, next) => {
    src.Delect(req, res, next);
});
router.post('/Savenotepad', (req, res, next) => {
    src.Save(req, res, next);
});
module.exports = router;
