var MainScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        cc.MainScene = this;

        var backgroundLayer = new BackgroundLayer();
        backgroundLayer.attr({
            anchorX: 0,
            ahchorY: 0,
            x: 0,
            y: 119,
            scale: 0.703
        });
        this.addChild(backgroundLayer, 0);

        var controlLayer = new ControlLayer();
        controlLayer.attr({
            anchorX: 0,
            ahchorY: 0,
            x: 0,
            y: 119,
            scale: 0.703
        });
        this.addChild(controlLayer, 10);

        this.initBaseInfoLightBox();
        this.hideBaseInfoLightBox();
    },

    initBaseInfoLightBox: function() {
        this.baseInfo = new LightBox();
        this.addChild(this.baseInfo, 100);
    },

    showBaseInfoLightBox: function() {
        this.baseInfo.setVisible(true);
    },

    hideBaseInfoLightBox: function() {
        this.baseInfo.setVisible(false);
    }
});
