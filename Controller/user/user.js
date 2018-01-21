/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { Usermodel } from "../../model/user";
const sql = new query();
module.exports = {
    islogin(req, res, next) {
        let token = req.headers['key'];
        if (!token) {
            res.json(plugins.write(-1, null));
        } else {
            sql.findOne('sys_user', { token: token }).then(data => {
                if (data) {
                    req.body.account = data.AutoId;
                    next();
                } else {
                    res.json(plugins.write(-1, null));
                }
            }).catch(e=>{
                res.json(e);
            })
        }
    },
    login(req, res, next) {
        let psd = plugins.md5(req.body.password);
        sql.findOne('sys_user', { name: req.body.name }).then(data => {
            if (!data) {
                res.json(plugins.write(1, null, '没有此人信息'));
            } else {
                if (psd === data.password) {
                    if (data.state === -1) {
                        res.json(plugins.write(1, null, '账号已冻结，请联系管理员'));
                    } else {
                        let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
                        let lock = plugins.md5(req.body.name + moment().format('YYYYMMDD'));
                        sql.update('sys_user', {
                            token: lock,
                            logintime: newtime
                        }, { name: req.body.name }).then(data1 => {
                            let userlogin = plugins.hasboj(data, new Usermodel());
                            res.json(plugins.write(10000, userlogin, '登录成功'));
                        }).catch(msg => {
                            res.json(msg);
                        });
                    }
                } else {
                    res.json(plugins.write(1, null, '密码错误'));
                }
            }
        }).catch(msg => {
            res.json(msg);
        });
    },
    //获取所有系统管理员
    getAlluser(req, res, next) {
        sql.findall("sys_user").then(data => {
            let userlogin = plugins.objdelete(['password', 'token'], data);
            res.json(plugins.write(0, userlogin, null));
        }).catch(e=>{
            res.json(e);
        })
    },
    //获取所有系统管理员
    getuser(req, res, next) {
        //SELECT * FROM shop.sys_user where name = 'momo'
        sql.findOne("sys_user", { AutoId: req.body.AutoId }).then(data => {
            if (data) {
                let userlogin = plugins.hasboj(data, new Usermodel());
                res.json(plugins.write(0, userlogin, null));
            } else {
                res.json(plugins.write(1, null, '没有此人信息'));
            }
        }).catch(e=>{
            res.json(e);
        })
    },
    /**
     * 删除
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    DeleteRecord(req, res, next) {
        sql.update("sys_user", { state: 0 }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '修改成功'));
        }).catch(e=>{
            res.json(e);
        })
    },
    /**
     * 修改密码
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    ModifyRecord(req, res, next) {
        let psd = plugins.md5(req.body.password);
        sql.update("sys_user", { state: 0 }, { password: psd }).then(data => {
            res.json(plugins.write(1, null, '密码修改成功'));
        }).catch(e=>{
            res.json(e);
        });
    },
    /**
     * 注册
     * @param req
     * @param res
     * @param next
     */
    register(req, res, next) {
        let psd = plugins.md5(req.body.password);
        sql.adddate('sys_user', {
            name: req.body.name,
            state: 1,
            password: psd
        }).then(data => {
            res.json(plugins.write(1, null, '新增成功'));
        }).catch(e=>{
            res.json(e);
        })
    },
    /**
     * 保存
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    SaveRecord(req, res, next) {
        let psd = plugins.md5(req.body.password);
        if (req.body.AutoId < 1) {
            sql.adddate('sys_user', {
                name: req.body.name,
                state: req.body.state,
                password: psd
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            }).catch(e=>{
                res.json(e);
            })
        } else {
            sql.update("sys_user", {
                name: req.body.name,
                state: req.body.state
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e=>{
                res.json(e);
            })
        }
    }
}
