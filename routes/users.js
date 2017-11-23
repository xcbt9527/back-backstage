let express = require('express');
let router = express.Router();
let user = require("../Controller/user/user");
router.get('/', function (req, res, next) {
    console.log(req.url);
    if (req.url === '/api/user/login') {
        next();
    } else {
        //验证是否已登录
        user.islogin(req, res, next);
    }
});
router.post('/login', (req, res, next) => {
    user.login(req, res, next);
});
module.exports = router;
