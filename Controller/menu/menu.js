/**
 * Created by momo on 2018/1/21.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { fail } from "assert";
const uuid = require("uuid/v1");
const sql = new query();
module.exports = {
    /**
     * 获取所有分类
     * @param req
     * @param res
     * @param next
     */
    getAllmenu(req, res, next) {
        sql.findall("sys_menu", { status: 1 }).then(data => {
            if (data.length > 0) {
                data.sort((a, b) => {
                    return a.upperlevel - b.upperlevel;
                });
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    },
    getTreemenu(req, res, next) {
        sql.findall("sys_menu", { status: 1 }).then(data => {
            if (data.length > 0) {
                let menumodel = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
                let tree = plugins.ArrConversionTree(menumodel, 'AutoId', 'upperlevel');
                res.json(plugins.write(0, tree, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    },
    /**
     * 获取单条菜单
     * @param req
     * @param res
     * @param next
     */
    getmenu(req, res, next) {
        sql.findOne("sys_menu", { AutoId: req.body.AutoId, status: 1 }).then(data => {
            if (data) {
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(1, null, '无此菜单栏'));
            }
        }).catch(e => {
            res.json(e);
        })
    },
    /**
     * 删除分类
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Delectmenu(req, res, next) {
        sql.update("sys_menu", {
            status: 0,
            lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            Modifier: req.body.account
        }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        }).catch(e => {
            res.json(e);
        })
    },
    /**
     * 添加菜单栏
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Savemenu(req, res, next) {
        let Uid = uuid();
        if (req.body.AutoId < 1) {
            sql.adddate('sys_menu', {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Uid: Uid,
                link: req.body.link,
                icon: req.body.icon,
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            }).catch(e => {
                res.json(e);
            })
        } else {
            sql.update("sys_menu", {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Uid: Uid,
                link: req.body.link,
                icon: req.body.icon,
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e => {
                res.json(e);
            })
        }
    }
}
