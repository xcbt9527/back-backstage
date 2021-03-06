/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { shopmodel } from "../../model/shop";
const sql = new query();
export class shopclass {
    /**
       * 获取所有商品信息
       * @param req
       * @param res
       * @param next
       */
    getAll(req, res, next) {
        sql.findall("shop", { state: 1 }).then(data => {
            data.forEach(e => {
                e.picture = plugins.getImg(e.picture);
            });
            res.json(plugins.write(0, data, null));
        }).catch(e => {
            res.json(e);
        })
    }
    /**
   * 获取单条商品信息
   * @param req
   * @param res
   * @param next
   */
    getOne(req, res, next) {
        sql.findOne("shop", { AutoId: req.body.AutoId }).then(data => {
            if (data) {
                let userlogin = plugins.hasboj(data, new shopmodel());
                res.json(plugins.write(0, userlogin, null));
            } else {
                res.json(plugins.write(1, null, '没有此人信息'));
            }
        }).catch(e => {
            res.json(e);
        })
    }
    /**
    * 更改商品状态
    * @param req
    * @param res
    * @param next
    * @constructor
    */
    Delete(req, res, next) {
        sql.update("shop", { state: 0 }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '更改状态成功'));
        }).catch(e => {
            res.json(e);
        })
    }
    /**
    * 保存
    * @param req
    * @param res
    * @param next
    * @constructor
    */
    Save(req, res, next) {
        let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
        let imgname = plugins.md5(newtime + 'picture');
        let imgname1 = plugins.md5(newtime + 'details');
        let picture = plugins.upload('shop', imgname, req.body.picture);
        plugins.upload('shop', imgname, req.body.picture).then(upload => {
            if (req.body.AutoId < 1) {
                sql.adddate('shop', {
                    title: req.body.title,
                    picture: upload,
                    details: req.body.details,
                    state: 1,
                    lastmodifytime: newtime
                }).then(data => {
                    res.json(plugins.write(1, null, '新增成功'));
                }).catch(e => {
                    res.json(e);
                })
            } else {
                sql.update("shop", {
                    title: req.body.title,
                    picture: upload,
                    details: req.body.details,
                    state: req.body.state,
                    lastmodifytime: newtime
                }, { AutoId: req.body.AutoId }).then(data => {
                    res.json(plugins.write(1, null, '修改成功'));
                }).catch(e => {
                    res.json(e);
                })
            }
        })
    }
}
