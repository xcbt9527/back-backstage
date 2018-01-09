/**
 * Created by momo on 2018/1/8.
 */
/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import {cartmodel} from "../../model/cart";
const sql = new query();
module.exports = {
    /**
     * 获取所有购物车商品
     * @param req
     * @param res
     * @param next
     */
    getAllCart(req, res, next){
        if (req.body.basicinfoId < 0 || req.body.basicinfoId) {
            res.json(plugins.write(0, null, '人不能为空'));
            return;
        }
        sql.findall("cart", {basicinfoId: req.body.basicinfoId}).then(data => {
            let model = {AutoId: []};
            if (data.length > 0) {
                data.forEach(res => {
                    if (res.status > 0) {
                        model.AutoId.push(res.shopId);
                    }
                })
                sql.findmore('shop', model).then(shop => {
                    res.json(plugins.write(10001, shop, null));
                })
            } else {
                res.json(plugins.write(10001, null, null));
            }
        })
    },
    /**
     * 获取单条购物车商品
     * @param req
     * @param res
     * @param next
     */
    getCart(req, res, next){
        //SELECT * FROM shop.sys_user where name = 'momo'
        sql.findOne("cart", {AutoId: req.body.AutoId}).then(data => {
            if (data) {
                sql.findOne('shop', {AutoId: data[0].shopId}).then(shopdata => {
                    res.json(plugins.write(1, shopdata, null));
                })
            } else {
                res.json(plugins.write(0, null, '购物车内无此条商品'));
            }
        })
    },
    /**
     * 修改购物车
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    DelectCart(req, res, next){
        sql.update("cart", {state: 0}, {AutoId: req.body.AutoId}).then(data => {
            res.json(plugins.write(1, null, '删除成功'));
        })
    },
    /**
     * 添加购物车
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    SaveCart(req, res, next){
        if (req.body.AutoId < 1) {
            sql.adddate('cart', {
                basicinfoId: req.body.basicinfoId,
                state: 1,
                shopId: req.body.shopId,
                num: req.body.num,
                lastmodifytime: moment().format('YYYY-MM-DD hh:mm:ss')
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            })
        } else {
            sql.update("cart", {
                num: req.body.num
            }, {AutoId: req.body.AutoId}).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            })
        }
    }
}
