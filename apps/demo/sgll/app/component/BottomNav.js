var BottomNav = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.init();
    },

    init: function() {
        this.attr({
            x: 0,
            y: -338
        });
        this.initBg();
        this.initButtons();
        this.initPressedStyle();
    },

    initBg: function() {
        var bottomBg = new cc.Sprite(res.img_bottombg_png);
        bottomBg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        this.addChild(bottomBg, 1);
    },

    initButtons: function() {
        var me = this;

        var home = new Button(
            '',
            res.img_mainhonebtn_png,
            res.img_mainhonebtn_png
        );
        home.setTapCallback(function() {
            //alert("首页");
            cc.director.runScene(new MainScene());
            me.setButtonPressed(0);
        });
        this.addChild(home, 10);

        var mission = new Button(
            '',
            res.img_mainmissionbtn_png,
            res.img_mainmissionbtn_png
        );
        mission.attr({
            x: 106
        });
        mission.setTapCallback(function() {
            //alert("任务");
            me.setButtonPressed(1);
        });
        this.addChild(mission, 10);

        var rob = new Button(
            '',
            res.img_mainrobbtn_png,
            res.img_mainrobbtn_png
        );
        rob.attr({
            x: 106 * 2
        });
        rob.setTapCallback(function() {
            //alert("征讨");
            me.setButtonPressed(2);
        });
        this.addChild(rob, 10);

        var chat = new Button(
            '',
            res.img_mainchatbtn_png,
            res.img_mainchatbtn_png
        );
        chat.attr({
            x: 106 * 3
        });
        chat.setTapCallback(function() {
            //alert("聊天");
            me.setButtonPressed(3);
        });
        this.addChild(chat, 10);

        var team = new Button(
            '',
            res.img_mainpackagebtn_png,
            res.img_mainpackagebtn_png
        );
        team.attr({
            x: 106 * 4
        });
        team.setTapCallback(function() {
            //alert("阵容");
            me.setButtonPressed(4);
        });
        this.addChild(team, 10);

        var mall = new Button(
            '',
            res.img_mainmallbtn_png,
            res.img_mainmallbtn_png
        );
        mall.attr({
            x: 106 * 5
        });
        mall.setTapCallback(function() {
            //alert("商城");
            me.setButtonPressed(5);
        });
        this.addChild(mall, 10);
    },

    initPressedStyle: function() {
        var pressed = new cc.Sprite(res.img_mainbtnpress_png);
        pressed.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this.addChild(pressed, 5);
        this.pressedSprite = pressed;
    },

    setButtonPressed: function(index) {
        this.pressedSprite.setPositionX(index * 106);
    }
});
