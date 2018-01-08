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
        sql.findall("cart").then(data => {
            let userlogin = plugins.objdelete(['password', 'token'], data);
            res.json(plugins.write(1, userlogin, null));
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
                let userlogin = plugins.hasboj(data, new cartmodel());
                res.json(plugins.write(1, userlogin, null));
            } else {
                res.json(plugins.write(0, null, '没有此人信息'));
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
            res.json(plugins.write(1, null, '添加购物车'));
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
        let psd = plugins.md5(req.body.password);
        if (req.body.AutoId < 1) {
            sql.adddate('cart', {
                name: req.body.name,
                state: req.body.state,
                password: psd
            }).then(data => {
                res.json(plugins.write(1, null, '新增成功'));
            })
        } else {
            sql.update("cart", {
                name: req.body.name,
                state: req.body.state
            }, {AutoId: req.body.AutoId}).then(data => {
                res.json(plugins.write(1, null, '修改成功'));
            })
        }
    }
}
