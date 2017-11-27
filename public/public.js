/**
 * Created by baird on 17/11/23.
 */

import crypto from "crypto";
module.exports = {
    write(status, data, msg){
        switch (status) {
            case -100:
                msg = '请联络管理员';
                data = null;
                break;
            case -1:
                msg = '登录超时';
                data = null;
                break;
            case 10001:
                msg = '操作成功';
                break;
            case 10002:
                msg = '删除成功';
                break;
            case 10003:
                msg = '登录成功';
                break;
        }
        return {status: status, msg: msg, data: data};
    },
    md5(text){
        return crypto.createHash('md5').update(text + 'momo').digest('hex');
    },
    //替换对象数据，obj为需更改的属性，obj2为数据源
    hasboj(obj1, obj2){
        if (typeof obj1 == 'object') {  //判断是否对象
            if (typeof obj1.length == 'number') {   //判断是否数组
                let arr = [];
                let obj = {};
                obj1.forEach(res => {
                    for (let i in res) {
                        if (res.hasOwnProperty(i)) {
                            obj.i = res.i;
                            arr.push(obj);
                        }
                    }
                })
                return arr;
            } else {        //对象
                for (let i in obj2) {
                    if (obj1.hasOwnProperty(i)) {
                        obj2[i] = obj1[i];
                    }
                }
                return obj2;
            }
        } else {
            return false;
        }
    },
    //obj1是删除的字段（必需是对象或者数组），obj2是待删除字段的对象（必需是对象或数组）
    objdelete(obj1, obj2) {
        let obj = null;     //返回变量（数组或对象）
        if (typeof obj1 == 'object') {  //判断是否对象
            if (typeof obj1.length == 'number') {   //判断是否数组
                if (typeof obj2 === 'object') {
                    if (typeof obj2.length == 'number') {   //判断是否数组
                        obj1.forEach(res => {
                            obj2.forEach(ret => {
                                if (ret.hasOwnProperty(res)) {
                                    delete ret[res];
                                }
                            })
                        })
                        obj = obj2;
                    } else {
                        obj1.forEach(res => {
                            for (let k in res) {
                                if (obj2.hasOwnProperty(obj1.k)) {
                                    delete obj2[res];
                                }
                            }
                        });
                        obj = obj2;
                    }
                } else {
                    return obj;
                }
                return obj;
            } else {
                if (typeof obj2.length == 'number') {   //判断是否数组
                    obj2.forEach(res => {
                        for (let i in obj1) {
                            if (res.hasOwnProperty(obj1.i)) {
                                delete res[i];
                            }
                        }
                    })
                }
            }
            return obj;
        } else {
            return obj;
        }
    },
}
