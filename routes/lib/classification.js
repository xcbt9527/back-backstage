/**
 * Created by momo on 2018/1/8.
 */
import express from "express";
import {classificationclass} from "../../Controller/classification/classification";
const classification = new classificationclass();
let router = express.Router();
router.post('/getAllclassification', (req, res, next) => {
    classification.getAllclassification(req, res, next);
});
router.post('/getnextclassification', (req, res, next) => {
    classification.getnextclassification(req, res, next);
});
router.post('/getclassification', (req, res, next) => {
    classification.getclassification(req, res, next);
});
router.post('/Delectclassification', (req, res, next) => {
    classification.Delectclassification(req, res, next);
});
router.post('/Saveclassification', (req, res, next) => {
    classification.Saveclassification(req, res, next);
});
module.exports = router;
