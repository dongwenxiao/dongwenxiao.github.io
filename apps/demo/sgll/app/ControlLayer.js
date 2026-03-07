var ControlLayer = cc.Layer.extend({
    profile: null,

    onEnter: function() {
        this._super();

        this.initProfile();
        this.initButtons();
        this.initHeadBoxPart();
        this.initRectButtons();
        this.initBottomCircleButton();
        this.initBottomNav();
    },

    initProfile: function() {
        this.profile = new Profile();
        this.addChild(this.profile);
    },

    initButtons: function() {
        var marginTop = cc.winSize.height - 48 - 110 - 280;

        var activityBtn = new cc.Sprite(res.img_activitybtn_png);
        activityBtn.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 30,
            y: marginTop
        });
        this.addChild(activityBtn);

        var noticeBtn = new cc.Sprite(res.img_noticebtn_png);
        noticeBtn.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 500,
            y: marginTop
        });
        this.addChild(noticeBtn);
    },

    initHeadBoxPart: function() {
        var marginTop = cc.winSize.height - 48 - 110 - 160;

        // bg
        var bg = new cc.LayerColor(cc.color(0, 0, 0, 76.5));
        // var bg = new cc.LayerColor(cc.color(164,131,58,255));
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: marginTop,
            width: 640,
            height: 132
        });
        this.addChild(bg, 0);

        // table view
        var headBox = new TableView();
        headBox.attr({
            anchorX: 0,
            anchorY: 0,
            x: 50,
            y: marginTop + 15
        });
        this.addChild(headBox);

        // left button
        var leftBtn = new cc.Sprite(res.img_btnleft_png);
        leftBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: 10,
            y: marginTop + 30
        });
        leftBtn.setVisible(false);
        this.addChild(leftBtn, 10);

        var leftBtnDisabled = new cc.Sprite(res.img_btnleftdisable_png);
        leftBtnDisabled.attr({
            anchorX: 0,
            anchorY: 0,
            x: 10,
            y: marginTop + 30
        });
        this.addChild(leftBtnDisabled, 10);

        // right button
        var rightBtn = new cc.Sprite(res.img_btnright_png);
        rightBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: cc.winSize.width + 150,
            y: marginTop + 30
        });
        this.addChild(rightBtn, 10);

        var rightBtnDisabled = new cc.Sprite(res.img_btnrightdisable_png);
        rightBtnDisabled.attr({
            anchorX: 0,
            anchorY: 0,
            x: cc.winSize.width + 150,
            y: marginTop + 30
        });
        rightBtnDisabled.setVisible(false);
        this.addChild(rightBtnDisabled, 10);

        // 处理
        headBox.setLeftCallback(function() {
            leftBtn.setVisible(false);
            leftBtnDisabled.setVisible(true);
        });

        headBox.setNoLeftCallback(function() {
            leftBtn.setVisible(true);
            leftBtnDisabled.setVisible(false);
        });

        headBox.setRightCallback(function() {
            rightBtnDisabled.setVisible(true);
            rightBtn.setVisible(false);
        });

        headBox.setNoRightCallback(function() {
            rightBtnDisabled.setVisible(false);
            rightBtn.setVisible(true);
        });
    },

    initRectButtons: function() {
        var marginTop = cc.winSize.height - 48 - 110 - 660;
        var distance = 24;

        var shili = new Button('势力');
        shili.attr({
            anchorX: 0,
            anchorY: 0,
            x: distance,
            y: marginTop,
            scaleX: 0.8,
            scaleY: 0.9
        });
        shili.setTapCallback(function() {
            //alert('势力');
        });
        this.addChild(shili);

        var chuangguan = new Button('闯关');
        chuangguan.attr({
            anchorX: 0,
            anchorY: 0,
            x: shili.x + 130 + distance,
            y: marginTop,
            scaleX: 0.8,
            scaleY: 0.9
        });
        chuangguan.setTapCallback(function() {
            //alert('闯关');
        });
        this.addChild(chuangguan);

        var zhanchang = new Button('战场');
        zhanchang.attr({
            anchorX: 0,
            anchorY: 0,
            x: chuangguan.x + 130 + distance,
            y: marginTop,
            scaleX: 0.8,
            scaleY: 0.9
        });
        zhanchang.setTapCallback(function() {
            //alert('战场');
        });
        this.addChild(zhanchang);

        var zudui = new Button('组队');
        zudui.attr({
            anchorX: 0,
            anchorY: 0,
            x: zhanchang.x + 130 + distance,
            y: marginTop,
            scaleX: 0.8,
            scaleY: 0.9
        });
        zudui.setTapCallback(function() {
            //alert('组队');
        });
        this.addChild(zudui);
    },

    initBottomCircleButton: function() {
        var container = new cc.Layer();
        container.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: -336
        });
        this.addChild(container);

        var marginTop = 90;

        // bg
        var bg = new cc.LayerColor(cc.color(0, 0, 0, 76.5));

        // var bg = new cc.LayerColor(cc.color(164,131,58,255));
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 80,
            width: 640,
            height: 142
        });
        container.addChild(bg, 0);

        var circleTableView = new CircleTableView();
        circleTableView.attr({
            anchorX: 0,
            anchorY: 0,
            x: 50,
            y: 108
        });
        container.addChild(circleTableView);

        // left button
        var leftBtn = new cc.Sprite(res.img_btnleft_png);
        leftBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: 10,
            y: marginTop + 30
        });
        leftBtn.setVisible(false);
        container.addChild(leftBtn, 10);

        var leftBtnDisabled = new cc.Sprite(res.img_btnleftdisable_png);
        leftBtnDisabled.attr({
            anchorX: 0,
            anchorY: 0,
            x: 10,
            y: marginTop + 30
        });
        container.addChild(leftBtnDisabled, 10);

        // right button
        var rightBtn = new cc.Sprite(res.img_btnright_png);
        rightBtn.attr({
            anchorX: 0,
            anchorY: 0,
            x: cc.winSize.width + 150,
            y: marginTop + 30
        });
        container.addChild(rightBtn, 10);

        var rightBtnDisabled = new cc.Sprite(res.img_btnrightdisable_png);
        rightBtnDisabled.attr({
            anchorX: 0,
            anchorY: 0,
            x: cc.winSize.width + 150,
            y: marginTop + 30
        });
        rightBtnDisabled.setVisible(false);
        container.addChild(rightBtnDisabled, 10);

        // 处理
        circleTableView.setLeftCallback(function() {
            leftBtn.setVisible(false);
            leftBtnDisabled.setVisible(true);
        });

        circleTableView.setNoLeftCallback(function() {
            leftBtn.setVisible(true);
            leftBtnDisabled.setVisible(false);
        });

        circleTableView.setRightCallback(function() {
            rightBtnDisabled.setVisible(true);
            rightBtn.setVisible(false);
        });

        circleTableView.setNoRightCallback(function() {
            rightBtnDisabled.setVisible(false);
            rightBtn.setVisible(true);
        });
    },

    initBottomNav: function() {
        var nav = new BottomNav();
        this.addChild(nav, 100);
    }
});
