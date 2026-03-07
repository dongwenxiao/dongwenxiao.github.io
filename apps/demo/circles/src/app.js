var HelloWorldLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.winSize;

        this.attr({
            color: cc.color.WHITE,
            anchorX: 0,
            anchorY: 0
        });
        this.setColor(cc.color.BLUE);

        var bg = new cc.Sprite('res/HelloWorld.png');
        bg.attr({
            x: 0,
            y: 0,
            anchorX: 0,
            anchorY: 0
        });
        this.addChild(bg, 0);

        // 英雄
        var model = new HeroModel();
        this.addChild(model, 1);
        model.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 400,
            y: size.height / 2,
            width: 100,
            height: 100
        });
        model.init();
        // model.openDebug();

        // 装备
        var s = new cc.Sprite(res.CloseSelected_png);
        model.getView().addEquipLayerChild(s);
        s.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: s.parent.width / 2,
            y: s.parent.height / 2
            //        	rotation:90
        });

        // 敌人
        var enemy = new EnemyModel();
        this.addChild(enemy, 1);
        enemy.attr({
            x: 600,
            y: 300
        });
        cc.gameController.addCollisionArr(enemy);

        cc.gameController.initEvent(this, model);
        this.model = model;

        // var follerAction = new cc.Follow(model);

        // model.getView().setFollow(true);
        // this.runAction(cc.follow(model));
    }
});

var HelloWorldScene = cc.Scene.extend({
    ctor: function() {
        this._super();
        // this.scheduleUpdate();
    },

    onEnter: function() {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

        var joypad = new Joypad();
        joypad.init(layer.model);
        this.addChild(joypad, 10);

        var autojoypad = new AutoJoypad();
        autojoypad.init(layer.model);
        this.addChild(autojoypad);

        this.addChild(cc.gameController);
    }
});
