/**
 * Created by momo on 2018/1/8.
 */
/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { cartmodel } from "../../model/cart";
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
        console.log(req.body);
        sql.findall("classification", { status: 1 }).then(data => {
            let tree = plugins.getTree(data, 'AutoId', 'upperlevel');
            res.json(plugins.write(1, tree, null));
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
        sql.findOne("classification", { AutoId: req.body.AutoId }).then(data => {
            if (data) {
                sql.findOne('classification', { AutoId: data[0].shopId }).then(shopdata => {
                    res.json(plugins.write(1, shopdata, null));
                })
            } else {
                res.json(plugins.write(0, null, '购物车内无此条商品'));
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
        sql.update("classification", { state: 0 }, { AutoId: req.body.AutoId }).then(data => {
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
        if (req.body.AutoId < 1) {
            sql.adddate('classification', {
                level: req.body.level,
                state: 1,
                name: req.body.name,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            })
        } else {
            sql.update("classification", {
                level: req.body.level,
                state: 1,
                name: req.body.name,
                upperlevel: req.body.upperlevel,
                lastTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                Modifier: req.body.account
            }, { AutoId: req.body.AutoId }).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            })
        }
    }
}
