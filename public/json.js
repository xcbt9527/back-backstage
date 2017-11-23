/**
 * Created by baird on 17/11/23.
 */


module.exports = {
    write(status, data, msg){
        switch (status) {
            case -1:
                msg = '请联络管理员';
                data = null;
                break;
            case 0:
                msg = '登录超时';
                break;
            case 10001:
                msg = '操作成功';
                break;
            case 10000:
                msg = '登录成功';
                break;
            case 10002:
                msg = '删除成功';
                break;
        }
        return {status: status, msg: msg, data: data};
    }
}
