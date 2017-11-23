let express = require('express');
let router = express.Router();
let mysqlquery = require('../sql/query');
let json = require("../public/json");
const sql = new mysqlquery();
router.get('/', function (req, res, next) {
    console.log(req.url);
    next();
});
router.post('/login', (req, res, next) => {

    sql.findOne('user', {loginname: req.body.username}).then(data => {
        res.json(json.write(10000, data));
    });
});
module.exports = router;
