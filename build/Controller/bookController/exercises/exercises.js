/**
 * Created by baird on 18/1/30.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_js_1 = require("../../../sql/query.js");
var public_js_1 = require("../../../public/public.js");
var moment_1 = require("moment");
var sql = new query_js_1.default();
var exercusesclass = (function () {
    function exercusesclass() {
    }
    /**
     * 获取所有
     * @param req
     * @param res
     * @param next
     */
    exercusesclass.prototype.getAll = function (req, res, next) {
        sql.findall("exercuses", { status: 1 }).then(function (data) {
            if (data.length > 0) {
                var Arr = public_js_1.default.objdelete(['createId', 'createtime'], data);
                Arr.sort(public_js_1.default.compareUp('order'));
                res.json(public_js_1.default.write(0, Arr, null));
            }
            else {
                res.json(public_js_1.default.write(0, [], null));
            }
        }).catch(function (e) {
            res.json(e);
        });
    };
    exercusesclass.prototype.getTree = function (req, res, next) {
        sql.findall("exercuses", { status: 1 }).then(function (data) {
            if (data.length > 0) {
                var Arr = public_js_1.default.objdelete(['createId', 'createtime'], data);
                Arr.sort(public_js_1.default.compareUp('order'));
                var tree = public_js_1.default.ArrConversionTree(Arr, 'AutoId', 'upperlevel');
                res.json(public_js_1.default.write(0, tree, null));
            }
            else {
                res.json(public_js_1.default.write(0, [], null));
            }
        }).catch(function (e) {
            res.json(e);
        });
    };
    /**
     * 获取单条
     * @param req
     * @param res
     * @param next
     */
    exercusesclass.prototype.getOne = function (req, res, next) {
        sql.findOne("exercuses", { AutoId: req.body.AutoId, status: 1 }).then(function (data) {
            if (data) {
                res.json(public_js_1.default.write(0, data, null));
            }
            else {
                res.json(public_js_1.default.write(1, null, '无此章节'));
            }
        }).catch(function (e) {
            res.json(e);
        });
    };
    /**
     * 删除
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    exercusesclass.prototype.Delect = function (req, res, next) {
        sql.update("exercuses", {
            status: 0,
            Modifier: req.body.account,
            modificationtime: moment_1.default().format('YYYY-MM-DD hh:mm:ss')
        }, { AutoId: req.body.AutoId }).then(function (data) {
            res.json(public_js_1.default.write(1, null, '删除成功'));
        }).catch(function (e) {
            res.json(e);
        });
    };
    /**
     * 添加
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    exercusesclass.prototype.Save = function (req, res, next) {
        if (req.body.AutoId < 1) {
            sql.adddate('exercuses', {
                status: 1,
                title: req.body.title,
                subject: req.body.subject,
                score: req.body.score,
                content: req.body.content,
                upperlevel: req.body.upperlevel,
                createtime: moment_1.default().format('YYYY-MM-DD hh:mm:ss'),
                createId: req.body.account,
                order: req.body.order,
            }).then(function (data) {
                res.json(public_js_1.default.write(1, null, '添加成功'));
            }).catch(function (e) {
                res.json(e);
            });
        }
        else {
            sql.update("exercuses", {
                status: 1,
                title: req.body.title,
                subject: req.body.subject,
                content: req.body.content,
                score: req.body.score,
                upperlevel: req.body.upperlevel,
                modificationtime: moment_1.default().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account,
                order: req.body.order,
            }, { AutoId: req.body.AutoId }).then(function (data) {
                res.json(public_js_1.default.write(1, null, '修改成功'));
            }).catch(function (e) {
                res.json(e);
            });
        }
    };
    return exercusesclass;
}());
exports.exercusesclass = exercusesclass;
