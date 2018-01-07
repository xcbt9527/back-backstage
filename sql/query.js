/**
 * Created by baird on 17/11/20.
 */
let mysql = require('mysql')
let models = require('./db')
var util = require('util');
let conn = mysql.createConnection(models.mysql);  //连接数据库
let prefix = 'shop.';
let json = require("../public/public");
conn.connect();
class mysqlquery {
    //使用的是Promise异步返回
    /**
     * 直接sql查询
     * @param sql
     * @returns {Promise}
     */
    sql(sql) {
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

    /**
     * 查找一条记录
     * @param table
     * @param where
     * @returns {Promise}
     */
    findOne(table, where) {
        // whre is arr; [{id:1},{username:admin}];
        let _WHERE = '';
        //判断是否对象，如果不是直接执行
        if (util.isObject(where)) {
            _WHERE += 'WHERE ';
            //循环获取查询条件
            for (let k in where) {
                _WHERE += k + "='" + where[k] + "' AND ";
            }
            _WHERE = _WHERE.slice(0, -4);
        } else if (typeof where == 'string') {
            _WHERE = 'WHERE ' + where;
        }
        let sql = "SELECT * FROM " + prefix + table + ' ' + _WHERE + ' LIMIT 1';
        //异步请求
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

    /**
     * 查找所有记录
     * @param table
     * @param where
     * @param or
     * @returns {Promise}
     */
    //查找所有
    findall(table, where, or) {
        let _WHERE = '';
        //判断是否对象，如果不是直接执行
        if (util.isObject(where)) {
            _WHERE += 'WHERE ';
            //循环获取查询条件
            for (let k in where) {
                _WHERE += k + "='" + where[k] + "' AND ";
            }
            _WHERE = _WHERE.slice(0, -4);
        } else if (typeof where == 'string') {
            _WHERE = 'WHERE ' + where;
        }
        let sql = "SELECT * FROM " + prefix + table + ' ' + _WHERE + or;
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

    /**
     * 更改数据
     * @param table
     * @param sets
     * @param where
     * @returns {Promise}
     */
    update(table, sets, where) {
        let _SETS = ''; //需要更改的
        let _WHERE = '';//更改条件
        //循环获取更改条件
        for (let k in sets) {
            _SETS += k + "='" + sets[k] + "',";
        }
        _SETS = _SETS.slice(0, -1);
        //判断是否对象，不是直接插入
        if (util.isObject(where)) {
            _WHERE += 'WHERE ';
            //循环获取查询条件
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
    };

    /**
     * 新增信息
     * @param table
     * @param sets
     * @param where
     * @returns {Promise}
     */
    adddate(table, sets, where) {
        let _SETS = ''; //需要更改的
        let _WHERE = '';//更改条件
        //循环获取更改条件
        for (let k in sets) {
            _SETS += k  + ",";
        }
        _SETS = _SETS.slice(0, -1);
        //判断是否对象，不是直接插入
        for (let k in sets) {
            _WHERE += '"' + sets[k] + '"' + ",";
        }
        _WHERE = _WHERE.slice(0, -1);
        let sql = "INSERT INTO " + prefix + table + '(' + _SETS + ')' + 'VALUES' + '(' + _WHERE + ')';
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
