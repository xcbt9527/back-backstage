/**
 * Created by baird on 17/11/20.
 */
let mysql = require('mysql')
let models = require('./db')
var util = require('util');
let conn = mysql.createConnection(models.mysql);  //连接数据库
let prefix = 'momo.';
let json = require("../public/public");
conn.connect();
class mysqlquery {
    findOne(table, where, callback) { //查找一条；
        // whre is arr; [{id:1},{username:admin}];
        let _WHERE = '';
        if (util.isObject(where)) {
            _WHERE += 'WHERE ';
            for (let k in where) {
                _WHERE += k + "='" + where[k] + "' AND ";
            }

            _WHERE = _WHERE.slice(0, -4);
        } else if (typeof where == 'string') {
            _WHERE = 'WHERE ' + where;
        }
        let sql = "SELECT * FROM " + prefix + table + ' ' + _WHERE + ' LIMIT 1';
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, data) {
                if (err) {
                    reject(json.write(-1, null));
                } else {
                    resolve(data[0]);
                }
            });
        })
    };

    findall(table, callback) {  //查找所有
        let sql = "SELECT * FROM " + prefix + table;
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, data) {
                if (err) {
                    reject(json.write(-1, null, msg));
                } else {
                    resolve(data);
                }
            });
        })
    };

    update(table, sets, where) {
        let _SETS = '';
        let _WHERE = '';
        let keys = '';
        let values = '';
        for (let k in sets) {
            _SETS += k + "='" + sets[k] + "',";
        }
        _SETS = _SETS.slice(0, -1);
        if (util.isObject(where)) {
            _WHERE += 'WHERE ';
            for (let k2 in where) {
                _WHERE += k2 + "='" + where[k2] + "'";
                if (where[k2 + 1]) {
                    _WHERE += "' AND ";
                }
            }
        } else if (typeof where == 'string') {
            _WHERE = 'WHERE ' + where;
        }
        let sql = "UPDATE " + prefix + table + ' SET ' + _SETS + ' ' + _WHERE;
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, data) {
                if (err) {
                    reject(json.write(-1, null));
                } else {
                    resolve(data);
                }
            });
        })
    }
}
module.exports = mysqlquery;
