/**
 * Created by baird on 17/11/23.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import { shopmodel } from "../../model/shop";
const sql = new query();
module.exports = {
    /**
     * 获取所有商品信息
     * @param req
     * @param res
     * @param next
     */
    getAllshop(req, res, next) {
        sql.findall("shop").then(data => {
            data.forEach(e => {
                e.details = plugins.getImg(e.details);
                e.picture = plugins.getImg(e.picture);
            });
            res.json(plugins.write(1, data, null));
        })
    },
    /**
     * 获取单条商品信息
     * @param req
     * @param res
     * @param next
     */
    getshop(req, res, next) {
        sql.findOne("shop", { AutoId: req.body.AutoId }).then(data => {
            if (data) {
                let userlogin = plugins.hasboj(data, new shopmodel());
                res.json(plugins.write(1, userlogin, null));
            } else {
                res.json(plugins.write(0, null, '没有此人信息'));
            }
        })
    },
    /**
     * 更改商品状态
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    DeleteRecord(req, res, next) {
        sql.update("shop", { state: 0 }, { AutoId: req.body.AutoId }).then(data => {
            res.json(plugins.write(1, null, '更改状态成功'));
        })
    },
    /**
     * 保存
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    SaveRecord(req, res, next) {
        let newtime = moment().format('YYYY-MM-DD hh:mm:ss');
        let imgname = plugins.md5(newtime + 'picture');
        let imgname1 = plugins.md5(newtime + 'details');
        let picture = plugins.upload('shop', imgname, req.body.picture);
        let details = plugins.upload('shop', imgname1, req.body.details);
        Promise.all([picture, details]).then(values => {
            if (req.body.AutoId < 1) {
                sql.adddate('shop', {
                    title: req.body.title,
                    picture: values[0],
                    details: values[1],
                    state: 1,
                    lastmodifytime: newtime
                }).then(data => {
                    res.json(plugins.write(1, null, '新增成功'));
                })
            } else {
                sql.findOne("shop", { AutoId: req.body.AutoId }).then(res => {
                    console.log(res);
                    let rmpicture = plugins.rmdirImg(res.picture);
                    let rmdetails = plugins.rmdirImg(res.details);
                    Promise.all([rmpicture, rmdetails]).then(pics => {
                        if (pics[0] && rmdetails[1]) {
                            sql.update("shop", {
                                title: req.body.title,
                                picture: values[0],
                                details: values[1],
                                state: req.body.state,
                                lastmodifytime: newtime
                            }, { AutoId: req.body.AutoId }).then(data => {
                                res.json(plugins.write(1, null, '修改成功'));
                            })
                        } else {
                            res.json(plugins.write(0, null, '保存失败'));
                        }
                    })
                })
            }
        });
    }
}
