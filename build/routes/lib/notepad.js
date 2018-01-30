"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/21.
 */
var express_1 = require("express");
var notepad_1 = require("../../Controller/notepad/notepad");
var src = new notepad_1.notepad();
var router = express_1.default.Router();
router.post('/getAllnotepad', function (req, res, next) {
    src.getAll(req, res, next);
});
router.post('/getnotepad', function (req, res, next) {
    src.getOne(req, res, next);
});
router.post('/Delectnotepad', function (req, res, next) {
    src.Delect(req, res, next);
});
router.post('/Savenotepad', function (req, res, next) {
    src.Save(req, res, next);
});
module.exports = router;
