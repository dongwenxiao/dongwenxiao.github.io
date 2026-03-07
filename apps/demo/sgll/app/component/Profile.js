var Profile = cc.Layer.extend({
    bg: null,

    onEnter: function() {
        this._super();

        this.initBg();
        this.initLevelPart();
        this.initMoneyPart();
        this.initProcessPart();
        this.initEvent();
    },

    initBg: function() {
        var profileBg = new cc.Sprite(res.img_profilebg_png);
        profileBg.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height - 48
        });

        this.addChild(profileBg, 0);
        this.bg = profileBg;
    },

    initLevelPart: function() {
        // 级数
        var levelBg = new cc.Sprite(res.img_levelbg_png);
        levelBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 60,
            y: cc.winSize.height - 103
        });

        this.addChild(levelBg, 10);

        var levelText = cc.LabelTTF.create('170', 'Times New Roman', 32);
        levelText.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 60,
            y: cc.winSize.height - 103
        });
        this.addChild(levelText, 20);

        // 进度条
        var xpProcess = new LongProcess();
        xpProcess.init();
        xpProcess.attr({
            x: 60,
            y: cc.winSize.height - 140
        });
        xpProcess.setPercent((597 / 1154) * 100);
        xpProcess.setText('597/1154');
        this.addChild(xpProcess, 1);

        // 用户名
        var playerName = cc.LabelTTF.create('凌华然', 'SimHei', 30);
        playerName.setFontFillColor(cc.color('#693400'));
        playerName.enableStroke(cc.color('#693400'), 0.5); // 描边 - 加粗
        playerName.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 180,
            y: cc.winSize.height - 85
        });
        this.addChild(playerName, 20);
    },

    initMoneyPart: function() {
        var distance = 20;
        var marginLeft = 330;

        // 元宝icon
        var goldIcon = new cc.Sprite(res.img_goldicon_png);
        goldIcon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: marginLeft,
            y: cc.winSize.height - 103 + distance
        });
        this.addChild(goldIcon, 10);

        // 元宝数量
        var goldCount = cc.LabelTTF.create('10000', 'Times New Roman', 26);
        goldCount.setFontFillColor(cc.color('#693400'));
        goldCount.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: marginLeft + 25,
            y: cc.winSize.height - 103 + distance
        });
        this.addChild(goldCount, 10);

        // 银币icon
        var silverIcon = new cc.Sprite(res.img_silvericon_png);
        silverIcon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: marginLeft,
            y: cc.winSize.height - 103 - distance
        });
        this.addChild(silverIcon, 10);

        // 银币数量
        var silverCount = cc.LabelTTF.create('10000', 'Times New Roman', 26);
        silverCount.setFontFillColor(cc.color('#693400'));
        silverCount.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: marginLeft + 25,
            y: cc.winSize.height - 103 - distance
        });
        this.addChild(silverCount, 10);
    },

    initProcessPart: function() {
        var distance = 20;
        var marginLeft = 455;

        // 体力icon
        var epIcon = new cc.Sprite(res.img_epicon_png);
        epIcon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: marginLeft + 10,
            y: cc.winSize.height - 103 + distance + 5
        });
        this.addChild(epIcon, 10);

        // 体力进度条
        var epProcess = new MiddleProcess();
        epProcess.init();
        epProcess.attr({
            x: marginLeft,
            y: cc.winSize.height - 103 + distance - 15
        });
        epProcess.setPercent((97 / 97) * 100);
        epProcess.setText('97/97');
        this.addChild(epProcess, 5);

        // 精力icon
        var spIcon = new cc.Sprite(res.img_spicon_png);
        spIcon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: marginLeft,
            y: cc.winSize.height - 103 - distance
        });
        this.addChild(spIcon, 10);

        // 精力进度条
        var spProcess = new MiddleProcess();
        spProcess.init();
        spProcess.attr({
            x: marginLeft,
            y: cc.winSize.height - 103 - distance - 15
        });
        spProcess.setPercent((7 / 11) * 100);
        spProcess.setText('7/11');
        this.addChild(spProcess, 5);
    },

    initEvent: function() {
        listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                );
                var s = target.bg.getContentSize();
                // var rect = cc.rect(0,0,s.width,s.height);
                var rect = cc.rect(0, 645, 640, 110); // 手动计算了下面积

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    // 点击逻辑
                    // cc.director.runScene(new StatisticsScene());
                    cc.MainScene.baseInfo.setVisible(true);

                    return true; // 不再向下传递
                }
                return false; // 继续向下传递
            },
            onTouchMoved: function(touch, event) {
                // console.log("move")
                // return false;	// 继续向下传递
                // return true; 	// 不再向下传递
            },
            onTouchEnded: function(touch, event) {
                // console.log("end")
                var target = event.getCurrentTarget();
                // alert(1)
            },
            onTouchCancelled: function(touch, event) {
                // console.log("cancel")
            }
        });

        cc.eventManager.addListener(listener, this);
    }
});
