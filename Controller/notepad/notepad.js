/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { notepadclass } from "../../model/notepad.js";
import { fail } from "assert";
const sql = new query();
export class notepad {
    /**
        * 获取所有文章
        * @param req
        * @param res
        * @param next
        */
    getAll(req, res, next) {
        sql.findall("notepad", { status:'>0' }).then(data => {
            if (data.length > 0) {
                let model = plugins.objdelete(['creationtime', 'Modifier','readingtime'], data);
                res.json(plugins.write(0, model, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 获取单条信息
     * @param req
     * @param res
     * @param next
     */
    getOne(req, res, next) {
        sql.findOne("notepad", { AutoId: req.body.AutoId, status:'>0'  }).then(data => {
            if (data) {
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(1, null, '无此信息'));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 更改状态
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Delect(req, res, next) {
        sql.update("notepad", {
            status: req.body.status,
            lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            Modifier: req.body.account
        }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '更改成功'));
        }).catch(e => {
            res.json(e);
        })
    }
    /**
     * 添加文章
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Save(req, res, next) {
        if (req.body.AutoId < 1) {
            sql.adddate('notepad', {
                status: 1,
                label: req.body.label,
                remindingtime: moment(req.body.remindingtime).format('YYYY-MM-DD hh:mm:ss'),
                creationtime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                content:req.body.content
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            }).catch(e => {
                res.json(e);
            })
        } else {
            sql.update("notepad", {
                status: 1,
                label: req.body.label,
                remindingtime: req.body.remindingtime,
                creationtime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                content:req.body.content
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e => {
                res.json(e);
            })
        }
    }
}
