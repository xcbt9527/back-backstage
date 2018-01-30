import express from "express";
import {publiclib} from "../Controller/public/index";
const src = new publiclib();
let router = express.Router();
router.post('/getuid', (req, res, next) => {
    src.getuid(req, res, next);
});
module.exports = router;
