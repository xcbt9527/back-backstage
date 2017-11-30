/**
 * Created by momo on 2017/11/26.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import {articlemodel} from "../../model/article";
const sql = new query();
module.exports = {
    //根据作者获取所有文章
    articleall(req, res, next){
        sql.findall("Article", {userid: req.body.id}, "AND state>0").then(data => {
            let deleteobj = ['content', 'article_link'];
            let arr = plugins.objdelete(deleteobj, data);
            res.json(plugins.write(1, arr, null));
        })
    },
    //获取此条文章信息
    getRecord(req, res, next){
        sql.findOne("Article", {id: req.body.id}).then(data => {
            if (data) {
                res.json(plugins.write(1, data, null));
            } else {
                res.json(plugins.write(0, null, '没有找到此条信息'));
            }
        })
    },
    //保存
    SaveRecord(req, res, next){
        sql.update("Article", req.body, {id: req.body.id}).then(data => {
            console.log(data);
            res.json(plugins.write(1, data, null));
        })
    },

    //删除
    delectRecord(req, res, next){
        sql.update("Article", {state: -1}, {id: req.body.id}).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        })
    }
}
