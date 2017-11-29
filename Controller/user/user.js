/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import {Usermodel} from "../../model/user";
const sql = new query();
module.exports = {
    islogin(req, res, next){
        let token = req.headers['key'];
        if (!token) {
            res.json(plugins.write(-1, null));
        } else {
            sql.findOne('sys_user', {session_store: token}).then(data => {
                let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
                let newdata = Date.parse(new Date(newtime)) / 1000;
                let lastlogintime = Date.parse(new Date(data.lastlogintime)) / 1000;
                if ((newdata - lastlogintime) > 86400) {
                    res.json(plugins.write(-1, null));
                } else {
                    next();
                }
            })
        }
    },
    login(req, res, next){
        let psd = plugins.md5(req.body.password);
        sql.findOne('sys_user', {loginname: req.body.name}).then(data => {
            if (!data) {
                res.json(plugins.write(0, null, '没有此人信息'));
            } else {
                if (psd === data.password) {
                    if (data.state === -1) {
                        res.json(plugins.write(0, null, '账号已冻结，请联系管理员'));
                    } else {
                        let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
                        let lock = plugins.md5(req.body.name + moment().format('YYYYMMDD'));
                        sql.update('sys_user', {
                            session_store: lock,
                            lastlogintime: newtime
                        }, {loginname: req.body.name}).then(data1 => {
                            let userlogin = plugins.hasboj(data, new Usermodel());
                            res.json(plugins.write(10000, userlogin, '登录成功'));
                        }).catch(msg => {
                            res.json(msg);
                        });
                    }
                } else {
                    res.json(plugins.write(0, null, '密码错误'));
                }
            }
        }).catch(msg => {
            res.json(msg);
        });
    }
}
