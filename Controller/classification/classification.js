/**
 * Created by momo on 2018/1/8.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { classificationmodel } from "../../model/classification";
import { fail } from "assert";
const sql = new query();
export class classificationclass {
    /**
        * 获取所有分类
        * @param req
        * @param res
        * @param next
        */
    getAll(req, res, next) {
        sql.findall("classification", { status: 1 }).then(data => {
            if (data.length > 0) {
                let classification = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
                res.json(plugins.write(0, classification, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    getTree(req, res, next) {
        sql.findall("classification", { status: 1 }).then(data => {
            if (data.length > 0) {
                let classification = plugins.objdelete(['lastTime', 'Modifier', 'status'], data);
                let tree = plugins.ArrConversionTree(classification, 'AutoId', 'upperlevel');
                res.json(plugins.write(0, tree, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 获取单条分类
     * @param req
     * @param res
     * @param next
     */
    getOne(req, res, next) {
        //SELECT * FROM shop.sys_user where name = 'momo'
        sql.findOne("classification", { AutoId: req.body.AutoId, status: 1 }).then(data => {
            if (data) {
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(1, null, '无此分类'));
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
        sql.update("classification", {
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
     * 添加分类
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Save(req, res, next) {
        if (req.body.AutoId < 1) {
            sql.adddate('classification', {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Code: req.body.Code
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            }).catch(e => {
                res.json(e);
            })
        } else {
            sql.update("classification", {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                Code: req.body.Code
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e => {
                res.json(e);
            })
        }
    }
}
