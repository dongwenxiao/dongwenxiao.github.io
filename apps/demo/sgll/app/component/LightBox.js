var LightBox = cc.Layer.extend({
    ctor: function() {
        this._super();
    },

    onEnter: function() {
        this._super();
        var me = this;

        // 蒙版
        var mask = new cc.LayerColor(cc.color(0, 0, 0, 205));
        this.addChild(mask, 1000);

        //
        var box = new cc.Sprite(res.img_boxbg_png);
        box.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: Math.convertCCWS(640)
        });
        this.addChild(box, 1001);

        //
        var closeBtn = new Button(
            '',
            res.img_boxclose_png,
            res.img_boxclose_png
        );
        closeBtn.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: box.width - 60,
            y: box.height - 60,
            scale: Math.convertCCWS(30)
        });
        closeBtn.setTapCallback(function() {
            // click event
            me.setVisible(false);
        });
        box.addChild(closeBtn);

        //
        var txt = cc.LabelTTF.create('查看统计', 'SimHei', 40);
        txt.enableStroke(cc.color('623508'), 2);
        txt.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 125,
            y: 40
        });
        var statisticsBtn = new Button(
            txt,
            res.img_btna_png,
            res.img_btnapress_png
        );
        statisticsBtn.setTextSprite(txt);
        statisticsBtn.setTapCallback(function() {
            // click
            cc.director.runScene(new StatisticsScene());
        });
        statisticsBtn.attr({
            x: 0,
            y: 20,
            scale: Math.convertCCWS(88)
        });
        box.addChild(statisticsBtn);

        //
        var txt = cc.LabelTTF.create('关闭', 'SimHei', 40);
        txt.enableStroke(cc.color('623508'), 2);
        txt.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 125,
            y: 40
        });
        var bigCloseBtn = new Button(txt, res.img_btnb_png, res.img_btnb_png);
        bigCloseBtn.setTextSprite(txt);
        bigCloseBtn.setTapCallback(function() {
            me.setVisible(false);
            // click
        });
        bigCloseBtn.attr({
            x: 300,
            y: 20,
            scale: Math.convertCCWS(88)
        });
        box.addChild(bigCloseBtn);
    }
});
