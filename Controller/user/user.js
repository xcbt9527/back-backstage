/**
 * Created by baird on 17/11/23.
 */

let query = require('../../sql/query');
let public = require("../../public/public");
let moment = require("moment");
const sql = new query();
module.exports = {
    islogin(req, res, next){
        let token = req.headers['token'];
        if (!token) {
            return res.json(public.write(-1, null));
        } else {
            sql.findOne('user', {session_store: token}).then(data => {
                let newdata = Date.parse(new Date(newtime)) / 1000;
                let lastlogintime = Date.parse(new Date(data.lastlogintime)) / 1000;
                console.log(newdata - lastlogintime);
                if ((newdata - lastlogintime) > 86400) {
                    res.json(public.write(-1, null));
                } else {
                    next();
                }
            })
        }
    },
    login(req, res, next){
        let psd = public.md5(req.body.password);
        sql.findOne('user', {loginname: req.body.username}).then(data => {
            if (!data) {
                res.json(public.write(0, null, '没有此人信息'));
            } else {
                if (psd === data.password) {
                    if (data.state === -1) {
                        res.json(public.write(0, null, '账号已冻结，请联系管理员'));
                    } else {
                        let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
                        let lock = public.md5(req.body.username + moment().format('YYYYMMDD'));
                        sql.update('user', {
                            session_store: lock,
                            lastlogintime: newtime
                        }, {loginname: req.body.username}).then(data1 => {
                            let userlogin = {
                                lock: lock,
                                loginname: data.name,
                                sex: data.sex,
                                jurisdiction: data.jurisdiction
                            };
                            res.json(public.write(10000, userlogin,'登录成功'));
                        }).catch(msg => {
                            res.json(msg);
                        });
                    }
                } else {
                    res.json(public.write(0, null, '密码错误'));
                }
            }
        }).catch(msg => {
            res.json(msg);
        });
    }
}
