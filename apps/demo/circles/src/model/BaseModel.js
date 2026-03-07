var BaseModel = cc.Node.extend({
    /**
     * 当前模型ID
     */
    _id: 0,
    getId: function() {
        return this._id;
    },
    setId: function(id) {
        this._id = id;
    },

    /**
     * 当前模型的血量
     */
    _blood: 0,
    getBlood: function() {
        return this._blood;
    },
    setBlood: function(blood) {
        this._blood = blood;
    },

    /**
     * 可重写的部分，配置不同的的controller
     * @returns {BaseController}
     */
    __configControllerClass: function() {
        return BaseController;
    },
    /**
     * 可重写的部分，配置不同的的view
     * @returns {BaseView}
     */
    __configViewClass: function() {
        return BaseView;
    },

    /**
     * 控制器
     */
    _controller: null,
    getController: function() {
        return this._controller;
    },

    /**
     * 显示层
     */
    _view: null,
    getView: function() {
        return this._view;
    },

    /**
     * 调试用的节点
     * 精灵的边框
     */
    _debugNode: null,
    _isDebug: false,
    openDebug: function() {
        this._isDebug = true;
    },
    closeDebug: function() {
        this._isDebug = false;
    },

    /**
     * 是否死亡
     * 死亡：true
     * 活着：false
     */
    isDeath: function() {
        if (this._blood <= 0) {
            this._blood = 0;
            return true;
        }
        return false;
    },

    /**
     * 构造方法
     */
    ctor: function() {
        this._super();
    },

    /**
     * 初始化方法
     * 在实例后调用，初始化基本属性
     */
    init: function() {
        this._super();

        this.initDebugNode();
        this.initController();
        this.initView();
    },

    /**
     * 初始化控制器
     * @param controller
     * @returns {BaseController}
     */
    initController: function(controller) {
        if (this._controller == null) {
            if (controller != undefined) this._controller = controller;
            else {
                var _class = this.__configControllerClass();
                this._controller = new _class(this);
            }
        }

        this._controller.init();

        this._controller.retain(); // use for jsb

        return this._controller;
    },

    /**
     * 初始化视图
     * @param view
     */
    initView: function(view) {
        if (this._view == null) {
            if (view != undefined) this._view = view;
            else {
                var _class = this.__configViewClass();
                this._view = new _class(this);
                this._view.init();
            }
        }

        this._view.retain(); // use for jsb

        return this._view;
    },

    initDebugNode: function() {
        this._debugNode = new cc.DrawNode();
        this._debugNode.setDrawColor(cc.color(100, 100, 100, 255));
        this.addChild(this._debugNode);
    },
    updateDebugNode: function() {
        this._debugNode.clear();
        this._debugNode.drawRect(cc.p(0, 0), cc.p(this.width, this.height));
        //		var rect = this.getBoundingBox();
        //		this._debugNode.drawRect(cc.p(0,0),cc.p(rect.width,rect.height));
    },

    /**
     * 事件 - 进入场景
     */
    onEnter: function() {
        this._super();

        this.scheduleUpdate(); // 开启刷新
    },

    /**
     * 每帧刷新
     */
    update: function() {
        if (this._isDebug) {
            this.updateDebugNode();
        }
    },

    /**
     * 释放资源，用于jsb
     */
    dispose: function() {
        this._view.release();
        this._controller.release();
    }
});
