var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.url);
    next();
});
router.post('/login', (req, res, next) => {
    console.log(1);
    res.json({
        code: '1',
        msg: '操作成功'
    });
})
module.exports = router;
