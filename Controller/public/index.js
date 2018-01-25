/**
 * Created by momo on 2018/1/21.
 */
import plugins from "../../public/public";
const uuid = require("uuid/v1");
export class publiclib {
    /**
        * 获取Uid唯一编号
        * @param req
        * @param res
        * @param next
        */
    getuid(req, res, next) {
        console.log(2);
        res.json(plugins.write(0, uuid(), null));
    }
}
