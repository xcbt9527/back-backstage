/**
 * Created by baird on 18/1/30.
 */
import express from "express";
import {exercusesclass} from "../../../Controller/bookController/exercises/exercises.ts";
const src = new exercusesclass();
let router = express.Router();
router.post('/getAll', (req, res, next) => {
    src.getAll(req, res, next);
});
router.post('/getOne', (req, res, next) => {
    src.getOne(req, res, next);
});
router.post('/Delect', (req, res, next) => {
    src.Delect(req, res, next);
});
router.post('/Save', (req, res, next) => {
    src.Save(req, res, next);
});
module.exports = router;