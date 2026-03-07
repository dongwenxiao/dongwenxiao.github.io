var BaseModel = cc.Node.extend({
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
     * 表现精灵
     */
    _sprite: null,
    getSprite: function() {
        return this._sprite;
    },

    /**
     * 控制器
     */
    _controller: null,
    getController: function() {
        return this._controller;
    },
    initController: function(controller) {
        if (this._controller == null) {
            if (controller != undefined) this._controller = controller;
            else this._controller = new BaseController();
        }
        return this._controller;
    },

    init: function(blood) {
        this._super();
        this._blood = blood;
    }
});
