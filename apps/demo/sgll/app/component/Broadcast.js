var Broadcast = cc.Layer.extend({
    onEnter: function() {
        this._super();

        this.initBroadcast();
    },

    initBroadcast: function() {
        var cast = new cc.Sprite(res.img_broadcast_png);
        cast.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height,
            scaleX: Math.convertCCWS(cc.winSize.width),
            scaleY: Math.convertCCHS(cc.winSize.height)
        });

        this.addChild(cast);
    }
});
