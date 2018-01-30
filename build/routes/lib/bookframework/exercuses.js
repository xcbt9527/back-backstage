"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by baird on 18/1/30.
 */
var express_1 = require("express");
var exercises_ts_1 = require("../../../Controller/bookController/exercises/exercises.ts");
var src = new exercises_ts_1.exercusesclass();
var router = express_1.default.Router();
router.post('/getAll', function (req, res, next) {
    src.getAll(req, res, next);
});
router.post('/getOne', function (req, res, next) {
    src.getOne(req, res, next);
});
router.post('/Delect', function (req, res, next) {
    src.Delect(req, res, next);
});
router.post('/Save', function (req, res, next) {
    src.Save(req, res, next);
});
module.exports = router;
