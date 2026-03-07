var BGLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var bg = new cc.Sprite(res.bg_png);

        var action = cc.scaleTo(0, 2, 2);
        bg.runAction(action);

        this.addChild(bg);
    }
});

var HelloWorldLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },

    init: function() {
        this.initWorld();

        this.initTeam1(1, 5);
        this.initTeam2(1, 5);

        cc.gameLayer = this;

        //	this.initTeam1(1,0);
    },

    initWorld: function() {
        winSize = cc.winSize;

        // Create the initial space
        this.space = new cp.Space();

        // debug only
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = true;
        this.addChild(this._debugNode);

        var space = this.space;
        var staticBody = space.staticBody;

        // Gravity
        //	space.gravity = cp.v(0, -100);

        // Walls
        var walls = [
            new cp.SegmentShape(
                staticBody,
                cp.v(0, 0),
                cp.v(winSize.width, 0),
                0
            ), // bottom
            new cp.SegmentShape(
                staticBody,
                cp.v(0, winSize.height),
                cp.v(winSize.width, winSize.height),
                0
            ), // top
            new cp.SegmentShape(
                staticBody,
                cp.v(0, 0),
                cp.v(0, winSize.height),
                0
            ), // left
            new cp.SegmentShape(
                staticBody,
                cp.v(winSize.width, 0),
                cp.v(winSize.width, winSize.height),
                0
            ) // right
        ];
        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape(shape);
        }

        var _w = winSize.width;
        var _h = winSize.height;

        // Waters
        //	var waters = [
        //	new cp.SegmentShape( staticBody, cp.v(_w*1/4,_h*1/2), cp.v(_w*1/2,_h*1/5), 0 ), 	// top left
        //	new cp.SegmentShape( staticBody, cp.v(_w*1/2,_h*1/5), cp.v(_w*3/4,_h*1/2), 0),   	// top right
        //	new cp.SegmentShape( staticBody, cp.v(_w*3/4,_h*1/2), cp.v(_w*1/2,_h*4/5), 0), 	// bottom right
        //	new cp.SegmentShape( staticBody, cp.v(_w*1/2,_h*4/5), cp.v(_w*1/4,_h*1/2), 0) 		// bottom left
        //	];

        var bx = 50;

        // 下面4个点
        var a = cp.v(300 + bx, 0),
            b = cp.v(300 + bx, 160),
            c = cp.v(500 + bx, 160),
            d = cp.v(500 + bx, 0);

        // 上面4个点
        var e = cp.v(300 + bx, 450),
            f = cp.v(300 + bx, 450 - 160),
            g = cp.v(500 + bx, 450 - 160),
            h = cp.v(500 + bx, 450);

        var waters = [
            new cp.SegmentShape(staticBody, a, b, 0), // top left
            new cp.SegmentShape(staticBody, b, c, 0), // top right
            new cp.SegmentShape(staticBody, c, d, 0), // bottom right

            new cp.SegmentShape(staticBody, e, f, 0), // bottom left
            new cp.SegmentShape(staticBody, f, g, 0),
            new cp.SegmentShape(staticBody, g, h, 0)
        ];
        for (var i = 0; i < waters.length; i++) {
            var shape = waters[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape(shape);
        }

        var river1 = new cc.Sprite(res.river_png);
        river1.setAnchorPoint(0, 0);
        river1.setPosition(cc.p(340, 0));
        river1.runAction(new cc.scaleTo(0, 0.66, 0.55));
        this.addChild(river1);
        window.river1 = river1;

        var river2 = new cc.Sprite(res.river_png);
        river2.setAnchorPoint(0, 1);
        river2.setPosition(cc.p(340, 450));
        river2.runAction(new cc.scaleTo(0, 0.66, 0.6));
        this.addChild(river2);
        window.river2 = river2;

        this.initCollisionHandler();
    },

    initCollisionHandler: function() {
        this.space.addCollisionHandler(
            EnumType.TEAM_TYPE.TEAM_1,
            EnumType.TEAM_TYPE.TEAM_2,
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
        );
    },

    collisionBegin: function(arbiter, space) {
        if (!this.messageDisplayed) {
            //	    var label = new cc.LabelBMFont("Collision Detected", s_bitmapFontTest5_fnt);
            //	    this.addChild( label );
            //	    label.x = winSize.width/2;
            //	    label.y = winSize.height/2 ;
            //	    this.messageDisplayed = true;
        }
        //	cc.log('collision begin');
        var shapes = arbiter.getShapes();
        var collTypeA = shapes[0].collision_type;
        var collTypeB = shapes[1].collision_type;
        //	cc.log( 'Collision Type A:' + collTypeA );
        //	cc.log( 'Collision Type B:' + collTypeB );
        return true;
    },

    collisionPre: function(arbiter, space) {
        //	cc.log('collision pre');
        return true;
    },

    _tempdt: 0,
    collisionPost: function(arbiter, space) {
        //	cc.log('collision post');
        //	cc.log(space.curr_dt);

        this._tempdt += space.curr_dt;
        if (this._tempdt >= 1) {
            this._tempdt = 0;

            var ss = arbiter.getShapes();
            var s1 = ss[0];
            var s2 = ss[1];

            var m1 = s1.parentModel;
            var m2 = s2.parentModel;

            //	    cc.log(m1)
            //	    cc.log(m2)

            // m1 攻击 m2
            if (m1.controller.enemy != null) {
                if (m1.controller.enemy.__instanceId == m2.__instanceId) {
                    //		    cc.log("attack");

                    m2.blood =
                        m2.blood - m1.attack >= 0 ? m2.blood - m1.attack : 0;
                }
            }

            // m2 攻击 m1
            if (m2.controller.enemy != null) {
                if (m2.controller.enemy.__instanceId == m1.__instanceId) {
                    //		    cc.log("attack");

                    m1.blood =
                        m1.blood - m2.attack >= 0 ? m1.blood - m2.attack : 0;
                }
            }
        }
    },

    collisionSeparate: function(arbiter, space) {
        //	cc.log('collision separate');
    },

    initDeviceEvent: function() {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesEnded: function(touches, event) {
                //		    var target = event.getCurrentTarget();

                cc.gameController.setCommandPoint(
                    cc.gameController.team2List,
                    touches[0].getLocation(),
                    cc.gameController.controlType
                );
            }
        });
        cc.eventManager.addListener(listener, this);

        //	if( 'touches' in cc.sys.capabilities ){
        //	    cc.eventManager.addListener({
        //		event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //		swallowTouches: true,
        //		onTouchesEnded: function(touches, event){
        ////		    var l = touches.length, target = event.getCurrentTarget();
        ////		    for( var i=0; i < l; i++) {
        ////			target.addModel( touches[i].getLocation() );
        ////		    }
        //
        //		    cc.gameController.setCommandPoint(cc.gameController.team2List, touches[0].getLocation());
        //
        //		}
        //	    }, this);
        //	} else if( 'mouse' in cc.sys.capabilities )
        //	    cc.eventManager.addListener({
        //		swallowTouches: true,
        //		event: cc.EventListener.MOUSE,
        //		onMouseDown: function(event){
        ////		    event.getCurrentTarget().addModel(event.getLocation());
        //		    cc.gameController.setCommandPoint(cc.gameController.team2List, event.getLocation());
        //		}
        //	    }, this);
    },

    onEnter: function() {
        cc.Layer.prototype.onEnter.call(this); // 这是为了继承父类的方法，而不是重写了该方法

        cc.sys.dumpRoot();
        cc.sys.garbageCollect();

        //	this.initControlButton();

        this.initDeviceEvent();

        this.scheduleUpdate();
    },

    update: function(delta) {
        this.space.step(delta);

        if (this.hero1.blood <= 0) {
            // 游戏胜利
            //	    alert('success');
            cc.director.runScene(new ResultScene('游戏胜利'));
            cc.gameController.clearTeam();
        }

        if (this.hero2.blood <= 0) {
            // 游戏失败
            //	    alert('fail');
            cc.director.runScene(new ResultScene('游戏失败'));
            cc.gameController.clearTeam();
        }
    },

    addModel: function(pos) {
        var hero = new HeroModel(this.space);
        hero.initPhysicsSprite(pos);
        this.addChild(hero.sprite);
    },

    // 敌军
    initTeam1: function(heroCount, armyCount) {
        for (var i = 0; i < heroCount; i++) {
            var hero = new SoldierModel(this.space);
            hero.initPhysicsSprite(cp.v(50, 200), 20, res.red_jiang_png); // 位置
            //	    hero.setCollisionType(EnumType.COLLISION_TYPE.RED_HERO);
            hero.setCollisionType(EnumType.TEAM_TYPE.TEAM_1);
            hero.setTeamType(EnumType.TEAM_TYPE.TEAM_1);
            hero.initController();
            hero.blood = 5;

            this.addChild(hero);
            this.addChild(hero.sprite);

            cc.gameController.addTeam1Obj(hero);

            this.hero1 = hero;
        }

        for (var i = 0; i < armyCount; i++) {
            var soldier = new SoldierModel(this.space);
            soldier.initPhysicsSprite(
                cp.v(150, 150 + i * 50),
                15,
                res.red_bing_png
            ); // 位置
            //	    soldier.setCollisionType(EnumType.COLLISION_TYPE.RED_SOLDIER);
            soldier.setCollisionType(EnumType.TEAM_TYPE.TEAM_1);
            soldier.setTeamType(EnumType.TEAM_TYPE.TEAM_1);
            soldier.initController();

            this.addChild(soldier);
            this.addChild(soldier.sprite);

            cc.gameController.addTeam1Obj(soldier);
        }
    },

    // 我军
    initTeam2: function(heroCount, armyCount) {
        for (var i = 0; i < heroCount; i++) {
            var hero = new HeroModel(this.space);
            hero.initPhysicsSprite(cp.v(750, 200), 20, res.blue_jiang_png); // 位置
            //	    hero.setCollisionType(EnumType.COLLISION_TYPE.BLUE_HERO);
            hero.setCollisionType(EnumType.TEAM_TYPE.TEAM_2);
            hero.setTeamType(EnumType.TEAM_TYPE.TEAM_2);
            hero.initController();
            hero.setSpeed(80);
            hero.blood = 5;
            hero.iid = '2_1_' + i;

            hero.ttype = 'jiang';

            this.addChild(hero);
            this.addChild(hero.sprite);

            cc.gameController.addTeam2Obj(hero);

            this.hero2 = hero;
        }

        for (var i = 0; i < armyCount; i++) {
            var soldier = new SoldierModel(this.space);
            soldier.initPhysicsSprite(
                cp.v(650, 150 + i * 50),
                15,
                res.blue_bing_png
            ); // 位置
            //	    soldier.setCollisionType(EnumType.COLLISION_TYPE.BLUE_SOLDIER);
            soldier.setCollisionType(EnumType.TEAM_TYPE.TEAM_2);
            soldier.setTeamType(EnumType.TEAM_TYPE.TEAM_2);
            soldier.initController();

            soldier.iid = '2_2_' + i;
            soldier.ttype = 'bing';

            this.addChild(soldier);
            this.addChild(soldier.sprite);

            cc.gameController.addTeam2Obj(soldier);
        }
    }
});

var ControlLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        // Create the button - 将
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(
            'res/animationbuttonnormal.png',
            'res/animationbuttonpressed.png',
            ''
        );
        button.x = cc.winSize.width / 2.0;
        button.y = cc.winSize.height / 2.0;
        button.addTouchEventListener(this.touchEvent, this);
        button.setPosition(620, 60);
        button.ttype = 'jiang';

        button.runAction(cc.scaleTo(0, 1.5, 1.5));

        var fontDef = new cc.FontDefinition();
        fontDef.fontName = 'Arial';
        fontDef.fontSize = '16';
        var label = new cc.LabelTTF('将', fontDef);
        label.setPosition(40, 20);
        button.addChild(label);

        this.addChild(button);

        // Create the button - 兵
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(
            'res/animationbuttonnormal.png',
            'res/animationbuttonpressed.png',
            ''
        );
        button.x = cc.winSize.width / 2.0;
        button.y = cc.winSize.height / 2.0;
        button.addTouchEventListener(this.touchEvent, this);
        button.setPosition(740, 60);
        button.ttype = 'bing';

        button.runAction(cc.scaleTo(0, 1.5, 1.5));

        var fontDef = new cc.FontDefinition();
        fontDef.fontName = 'Arial';
        fontDef.fontSize = '16';
        var label = new cc.LabelTTF('兵', fontDef);
        label.setPosition(40, 20);
        button.addChild(label);

        this.addChild(button);
    },

    touchEvent: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //	    cc.log("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                //	    cc.log("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                //	    cc.log("Touch Up");
                cc.gameController.controlType = sender.ttype;
                break;

            case ccui.Widget.TOUCH_CANCELED:
                //	    cc.log("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});

var FogLayer = cc.Layer.extend({
    fogList: [],

    ctor: function() {
        this._super();

        //	var fog = new cc.Sprite(res.HelloWorld_png);
        //	fog.setAnchorPoint(0,0);
        //	fog.setTextureRect(new cc.Rect(0,0,50,50));
        //	fog.setPosition(0, 0);
        //	this.addChild(fog);

        var fogW = 50,
            fogH = 50,
            colCount =
                cc.winSize.width % fogW > 0
                    ? cc.winSize.width / fogW + 1
                    : cc.winSize.width / fogW,
            rowCount =
                cc.winSize.height % fogH > 0
                    ? cc.winSize.height / fogH + 1
                    : cc.winSize.height / fogH;
        var myPartX = 540;

        // 添加顺序   ↑  →
        for (var col = 0; col < colCount; col++) {
            for (var row = 0; row < rowCount; row++) {
                if (fogW * col > myPartX) {
                    continue;
                }
                var fog = this.addFog(fogW * col, fogH * row, fogW, fogH);
                fog.isClear = false;

                if (hasFog) {
                    fog.setVisible(false);
                }

                this.fogList.push(fog);
            }
        }
    },

    addFog: function(x, y, w, h) {
        var fog = new cc.Sprite(res.HelloWorld_png);
        fog.setAnchorPoint(0, 0);
        fog.setTextureRect(new cc.Rect(0, 0, w, h));
        fog.setPosition(x, y);
        this.addChild(fog);
        return fog;
    }
});

var HelloWorldScene = BaseScene.extend({
    onEnter: function() {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer, 1);

        var bg = new BGLayer();
        this.addChild(bg, 0);

        var control = new ControlLayer();
        this.addChild(control, 10);

        var fogLayer = new FogLayer();
        this.addChild(fogLayer, 100);
        cc.gameController.fogLayer = fogLayer;
    }
});
