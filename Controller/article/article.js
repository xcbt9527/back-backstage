/**
 * Created by momo on 2017/11/26.
 */

import query from "../../sql/query";
import plugins from "../../public/public";
import moment from "moment";
import {articlemodel} from "../../model/article";
const sql = new query();
module.exports = {
    articleall(req, res, next){
        sql.findall("Article", {userid: req.body.id}).then(data => {
            res.json(plugins.write(1, data, null));

        })
    }
}