var PlayScene = BaseScene.extend({
    init: function() {
        this._super();

        this._controller = new PlaySceneController(this);

        this._bgLayer = new PlaySceneBgLayer();
        this._animationLayer = new PlaySceneAnimationLayer();
        this._controlLayer = new PlaySceneControlLayer();

        this.addChild(this._bgLayer, 0);
        this.addChild(this._animationLayer, 1);
        this.addChild(this._controlLayer, 2);
    },

    onEnter: function() {
        this._super();

        //		this.scheduleUpdate();

        //		var interval =3;
        //		var repeat = 0;
        //		var delay = 0;
        //		this.schedule(function(){alert(1)}, interval, repeat, delay);
    },

    update: function(dt) {
        cc.log(dt);
    }
});

var PlaySceneBgLayer = BaseLayer.extend({
    ctor: function() {
        this._super();

        this.init();
    },

    init: function() {
        //		var bg = ccs.uiReader.widgetFromJsonFile(ui.playScnee_bg_json);
        //		this.addChild(bg,0);

        var bg = new cc.Sprite(res.play_bg);
        bg.setAnchorPoint(0, 0);
        bg.setPositionX(0);
        bg.setPositionY(100);
        bg._setWidth(640);
        bg._setHeight(1136);
        this.addChild(bg, 0);

        //		this.addUI();
    },

    addUI: function() {
        var ui = ccs.uiReader.widgetFromJsonFile(res.login_json);
        this.addChild(ui, 10);
    }
});

var PlaySceneAnimationLayer = BaseLayer.extend({
    hero1: null,
    hero2: null,

    ctor: function() {
        this._super();

        this.init();
    },

    init: function() {
        //		this.addHero();
        //		this.addHero1();
        //
        //		this.hero2.getController().setEnemy(this.hero1);
        //		this.hero1.getController().setEnemy(this.hero2);
        //
        //		this.hero1.getController().doAttack();
        //		this.hero2.getController().doAttack();
    },

    // 右边
    addHero: function() {
        var meleeHero = new MeleeHero();
        meleeHero.init(1, 10, 2, 5, 10, EnumType.DIRECTION2D.LEFT, 0.5);
        meleeHero.initAnimation(
            res.hero_png,
            res.hero_plist,
            res.hero_json,
            'Hero'
        );
        meleeHero.setPosition(cc.p(500, 600));
        meleeHero.getController().doStanding();

        this.hero2 = meleeHero;
        this.addChild(meleeHero);
    },

    // 左边
    addHero1: function() {
        var meleeHero = new MeleeHero();
        meleeHero.init(1, 10, 2, 5, 10, EnumType.DIRECTION2D.RIGHT, 0.6);
        meleeHero.initAnimation(
            res.hero_png,
            res.hero_plist,
            res.hero_json,
            'Hero'
        );
        meleeHero.setPosition(cc.p(0, 300));
        meleeHero.getController().doStanding();

        this.hero1 = meleeHero;
        this.addChild(meleeHero);
    }
});

var PlaySceneControlLayer = BaseLayer.extend({});
