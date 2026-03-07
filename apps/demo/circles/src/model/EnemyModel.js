var EnemyModel = BaseModel.extend({
    ctor: function() {
        this._super();

        this.init();
    },

    init: function() {
        this._super();

        var img = new cc.Sprite(res.CloseNormal_png);
        this.addChild(img);
    },

    update: function() {
        this._super();
    }
});
