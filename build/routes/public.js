"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../Controller/public/index");
var src = new index_1.publiclib();
var router = express_1.default.Router();
router.post('/getuid', function (req, res, next) {
    src.getuid(req, res, next);
});
module.exports = router;
