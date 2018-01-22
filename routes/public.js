import express from "express";
import index from "../Controller/public/index";
let router = express.Router();
router.post('/getuid', (req, res, next) => {
    index.getuid(req, res, next);
});
module.exports = router;
