/**
 * Created by momo on 2018/1/8.
 */
/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { classificationmodel } from "../../model/classification";
import { fail } from "assert";
const sql = new query();
module.exports = {
    /**
     * 获取所有分类
     * @param req
     * @param res
     * @param next
     */
    getAllclassification(req, res, next) {
        sql.findall("classification", { status: 1 }).then(data => {
            let classification = plugins.objdelete(['lastTime','Modifier','status'],data);
            let tree = plugins.ArrConversionTree(classification, 'AutoId', 'upperlevel');
            res.json(plugins.write(0, tree, null));
        })
    },
    /**
     * 获取单条分类
     * @param req
     * @param res
     * @param next
     */
    getclassification(req, res, next) {
        //SELECT * FROM shop.sys_user where name = 'momo'
        sql.findOne("classification", {AutoId: req.body.AutoId,status:1}).then(data => {
            if(data){
                res.json(plugins.write(0, data, null));
            }else{
                res.json(plugins.write(1, null, '无此分类'));
            }
        })
    },
    /**
     * 删除分类
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Delectclassification(req, res, next) {
        sql.update("classification", { status: 0,
            lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            Modifier: req.body.account }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        })
    },
    /**
     * 添加分类
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    Saveclassification(req, res, next) {
        console.log(1);
        if (req.body.AutoId < 1) {
            sql.adddate('classification', {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            })
        } else {
            sql.update("classification", {
                status: 1,
                label: req.body.label,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            })
        }
    }
}
