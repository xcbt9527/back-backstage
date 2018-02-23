/**
 * Created by baird on 18/1/30.
 */

import query from "../../../sql/query.js";
import plugins from "../../../public/public.js";
import moment from "moment";
import { resolve } from "dns";
const sql = new query();
export class chapterclass {
    /**
     * 根据章节ID返回所有数据
     * @param bookId 
     */
    getchapter(rows) {
        return new Promise((resolve, reject) => {
            let arr = rows.map(e => {
                return e.AutoId;
            })
            arr = arr.join(',');
            rows.forEach(e => {
                sql.findall("chapter", { bookId: arr }).then(data => {
                    if (data.length) {
                        let Arr = plugins.objdelete(['createId', 'createtime', 'modificationtime', 'Modifier', 'chapterId', 'exercisesId'], data);
                        let tree = plugins.ArrConversionTree(Arr, 'AutoId', 'upperlevel');
                        resolve(tree);
                    }
                }).catch(e => {
                    reject(e);
                })
            });
        })
    }
    /**
     * 获取所有书本架构
     * @param req
     * @param res
     * @param next
     */
    getAll(req, res, next) {
        sql.findall("chapter", { status: 1 }).then(data => {
            if (data.length > 0) {
                let Arr = plugins.objdelete(['createId', 'createtime', 'modificationtime', 'Modifier', 'chapterId', 'exercisesId'], data);
                res.json(plugins.write(0, Arr, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }

    getTree(req, res, next) {
        sql.findall("chapter", { status: 1 }).then(data => {
            if (data.length > 0) {
                let Arr = plugins.objdelete(['createId', 'createtime', 'modificationtime', 'Modifier', 'chapterId', 'exercisesId'], data);
                let tree = plugins.ArrConversionTree(Arr, 'AutoId', 'upperlevel');
                res.json(plugins.write(0, tree, null));
            } else {
                res.json(plugins.write(0, [], null));
            }
        }).catch(e => {
            res.json(e);
        })
    }

    /**
     * 获取单条
     * @param req
     * @param res
     * @param next
     */
    getOne(req, res, next) {
        sql.findOne("chapter", { AutoId: req.body.AutoId, status: 1 }).then(data => {
            if (data) {
                res.json(plugins.write(0, data, null));
            } else {
                res.json(plugins.write(1, null, '无此章节'));
            }
        }).catch(e => {
            res.json(e);
        })
    }

    /**
     * 删除
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Delect(req, res, next) {
        sql.update("chapter", {
            status: 0,
            Modifier: req.body.account,
            modificationtime: moment().format('YYYY-MM-DD hh:mm:ss')
        }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        }).catch(e => {
            res.json(e);
        })
    }

    /**
     * 添加
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Save(req, res, next) {
        if (req.body.AutoId < 1) {
            sql.adddate('chapter', {
                status: 1,
                title: req.body.title,
                upperlevel: req.body.upperlevel > 0 ? req.body.upperlevel : 0,
                createtime: moment().format('YYYY-MM-DD hh:mm:ss'),
                createId: req.body.account,
                content: req.body.content,
                modificationtime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                bookId: req.body.bookId,
                orderId: req.body.order > 0 ? req.body.order : 0,
            }).then(data => {
                res.json(plugins.write(1, null, '添加成功'));
            }).catch(e => {
                res.json(e);
            })
        } else {
            sql.update("chapter", {
                status: 1,
                title: req.body.title,
                upperlevel: req.body.upperlevel > 0 ? req.body.upperlevel : 0,
                modificationtime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                content: req.body.content,
                bookId: req.body.bookId,
                orderId: req.body.order > 0 ? req.body.order : 0,

            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            }).catch(e => {
                res.json(e);
            })
        }
    }
}
