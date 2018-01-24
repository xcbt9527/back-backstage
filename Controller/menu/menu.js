/**
 * Created by momo on 2018/1/21.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { fail } from "assert";
const uuid = require("uuid/v1");
const sql = new query();
export class menuclass {
    /**
      * 获取所有分类
      * @param req
      * @param res
      * @param next
      */
    getAll(req, res, next) {
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
    }
    getTree(req, res, next) {
        sql.findall("sys_menu", { status: 1 }).then(data => {
            let menumodel = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
            if (Number(req.body.showarrroles) === 1) {
                let tree = plugins.ArrConversionTree(menumodel, 'AutoId', 'upperlevel');
                res.json(plugins.write(0, tree, null));
                return;
            }
            let account_Roles = req.body.account_Roles.replace(/"/g, "");
            sql.findOne("sys_roles", { Uid: account_Roles }).then(roles => {
                let rolesmenu = [];
                if (data.length > 0) {
                    roles.menu_roles = roles.menu_roles.replace(/"/g, "");
                    roles.menu_roles = roles.menu_roles.split(",");
                    roles.menu_roles.forEach(m => {
                        menumodel.forEach(mm => {
                            if (m === mm.Uid) {
                                rolesmenu.push(mm);
                                menumodel.forEach(mmm => {
                                    if (mm.upperlevel === mmm.AutoId) {
                                        rolesmenu.push(mmm);
                                    }
                                })
                            }
                        });
                    })
                    rolesmenu = Array.from(new Set(rolesmenu));
                    let tree = plugins.ArrConversionTree(rolesmenu, 'AutoId', 'upperlevel');
                    res.json(plugins.write(0, tree, null));
                } else {
                    res.json(plugins.write(0, [], null));
                }
            }).catch(e => {
                res.json(e);
            })
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
    getOne(req, res, next) {
        sql.findOne("sys_menu", { AutoId: req.body.AutoId, status: 1 }).then(data => {
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
    Delect(req, res, next) {
        sql.update("sys_menu", {
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
    Save(req, res, next) {
        if (req.body.AutoId < 1) {
            sql.adddate('sys_menu', {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Uid: req.body.Uid,
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
                Uid: req.body.Uid,
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
