
export class rolesnmodel {
    /**
     * 自增长id
     */
    AutoId = 0;
    /**
     * 菜单栏名称
     */
    label = null;
    /**
     * 唯一ID
     */
    Uid = null;
    /**
     * 菜单栏权限
     */
    menu_roles = null;
    /**
     * 上一级
     */
    upperlevel = 0;
    /**
     * 最后修改人
     */
    Modifier = 0;
    /**
     * 最后修改时间
     */
    lastTime = null;

    /**
     * 状态： 0为删除，1为使用
     */
    status = 0;
    }