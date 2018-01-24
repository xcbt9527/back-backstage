/**
 * Created by momo on 2018/1/21.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { fail } from "assert";
const uuid = require("uuid/v1");
const sql = new query();
export class rolesclass{
 /**
     * 获取所有分类
     * @param req
     * @param res
     * @param next
     */
    getAllroles(req, res, next) {
        sql.findall("sys_roles", { status: 1 }).then(data => {
            if (data.length > 0) {
                let rolesnmodel = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
                rolesnmodel = rolesnmodel.map(e=>{
                    let  menu_roles = e.menu_roles.replace(/"/g, "");
                       return Object.assign({},e,{menu_roles:menu_roles.split(",")});
                     })
                res.json(plugins.write(0, rolesnmodel, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    getTreeroles(req, res, next) {
        sql.findall("sys_roles", { status: 1 }).then(data => {
            if (data.length > 0) {
                let rolesnmodel = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
                let tree = plugins.ArrConversionTree(rolesnmodel, 'AutoId', 'upperlevel');
                res.json(plugins.write(0, tree, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 获取单条菜单
     * @param req
     * @param res
     * @param next
     */
    getroles(req, res, next) {
        sql.findOne("sys_roles", { AutoId: req.body.AutoId, status: 1 }).then(data => {
            if (data) {
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(1, null, '无此菜单栏'));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 删除分类
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Delectroles(req, res, next) {
        sql.update("sys_roles", {
            status: 0,
            lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            Modifier: req.body.account
        }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 添加菜单栏
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Saveroles(req, res, next) {
        let model = JSON.stringify(req.body.menu_roles);
        console.log(model);
        if (req.body.AutoId < 1) {
            sql.adddate('sys_roles', {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Uid: req.body.Uid,
                menu_roles: model,
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            }).catch(e => {
                res.json(e);
            })
        } else {
            sql.update("sys_roles", {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Uid: req.body.Uid,
                menu_roles: model,
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e => {
                res.json(e);
            })
        }
    }
}
