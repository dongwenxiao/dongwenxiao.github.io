var HeadBox = cc.Layer.extend({
    displayStatus: 1, // 1:显示人头，2：锁着，3：空
    headImg: null,

    ctor: function(displayStatus, headImg) {
        this._super();

        if (displayStatus === undefined) this.displayStatus = 1;
        if (headImg === undefined) this.headImg = res.img_hero1head_png;

        this.init();
    },

    init: function() {
        this._super();

        this.initHead1();
        this.initBoxBorder();
    },

    initHead1: function() {
        var hd = new cc.Sprite(this.headImg);
        hd.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this.addChild(hd);
    },

    initHead: function() {
        // 模版
        var stencil = new cc.Sprite(res.img_headboxbg_png);
        stencil.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        // 切割功能层
        var cliper = new cc.ClippingNode();
        cliper.attr({
            anchorX: 0,
            anchorY: 0,
            width: 104,
            height: 104,
            x: 0,
            y: 0
        });
        cliper.setStencil(stencil);
        cliper.setInverted(false);
        cliper.setAlphaThreshold(0);

        // 底板
        var bg = new cc.Sprite(this.headImg);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        cliper.addChild(bg);
        this.addChild(cliper);
    },

    initBoxBorder: function() {
        var border = new cc.Sprite(res.img_headboxborder_png);
        border.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        this.addChild(border, 10);
    }
});
