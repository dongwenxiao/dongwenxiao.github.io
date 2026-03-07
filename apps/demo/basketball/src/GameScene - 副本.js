var GameScene = cc.Scene.extend({

    basketballs: null,
    space: null,
    shootButton: null,
    player: null,
    lastShootImpulse: null,
    _lastShootIsFinish: true,

    ctor: function() {
        this._super();

        this.basketballs = [];
    },

    onEnter: function() {
        this._super();
        cc.log('enter GameScene')

        this.scheduleUpdate();
        this.initShootButton();
        this.initPlayer();

        this.initEvent();


        // physics world.
        this.initPhysicsWorld();
        this.addGround();
        this.addBackboard();

    },

    onExit: function() {
        this._super();
        cc.log('onExit');

        this.removeEvent();
    },

    initEvent: function() {
        var gameScene = this;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: onTouchBegan,
            onTouchMoved: onTouchMoved,
            onTouchEnded: onTouchEnded
        }, this.shootButton);

        function onTouchBegan(touch, event) {
            cc.log('onTouchBegan');
            var target = event.getCurrentTarget();
            var location = touch.getLocation();
            var locationInNode = target.convertToNodeSpace(location);
            var contentSize = target.getContentSize();
            var checkRect = cc.rect(0, 0, contentSize.width, contentSize.height);
            if (cc.rectContainsPoint(checkRect, locationInNode)) {
                gameScene.resetShootButton();
                gameScene.pressShootButton();
                return true;
            }
            return false;
        }

        function onTouchMoved(touch, event) {
            cc.log('onTouchMoved')
        }

        function onTouchEnded(touch, event) {
            cc.log('onTouchEnded')

            // 上次投篮没结束的情况下
            if(!gameScene._lastShootIsFinish){
                return;
            }

            gameScene.getShootImpulse();
            gameScene.resetShootButton();


            gameScene.player.shoot(shootCallback, shootFinishCallback);
            gameScene._lastShootIsFinish = false;

            function shootCallback() {
                gameScene.mockShoot(cc.p(400, 200), gameScene.lastShootImpulse);
            }
            function shootFinishCallback(){
                gameScene._lastShootIsFinish = true;
            }

        }
        // function onTouchCancel(touch, event){
        //     cc.log('onTouchCancel')
        // }
    },

    initPlayer: function() {
        var player = new cc.Sprite(g_resSheet.GameScene.img_player_defalut_png);
        player.attr({
            x: 400,
            y: 100,
            anchorX: 0,
            anchorY: 1
        });
        this.addChild(player);

        this.player = player;

        this.player.shoot = function(shootCallback, finishCallback) {
            var jump = cc.moveBy(.5, cc.p(0, 100)).easing(cc.easeSineOut()),
                down = jump.reverse();
            var seq = cc.sequence(
                jump,
                cc.callFunc(function() {
                    shootCallback && shootCallback();
                }),
                down,
                cc.callFunc(function(){
                    finishCallback && finishCallback();
                })
            );
            this.runAction(seq);
        }
    },

    initShootButton: function() {
        var button = new cc.Sprite(g_resSheet.GameScene.img_button_default_png);
        button.attr({
            x: cc.winSize.width - 100,
            y: 100,
            anchorX: .5,
            anchorY: .5,
            width: 70,
            height: 70,
            scale: 1.5
        });
        this.addChild(button);
        this.shootButton = button;
        kkk = button;
    },

    pressShootButton: function() {
        this._isPressedShootButton = true;
    },
    resetShootButton: function() {
        this._isPressedShootButton = false;
        this._updateShootButtonCount = 0;
        this.shootButton.color = cc.color(255, 255, 255);
    },
    getShootImpulse: function() {
        var rate = (255 - this.shootButton.color.g) / 255;
        this.lastShootImpulse = Math.round(rate * MAX_IMPULSE);
        cc.log('getShootImpulse: ' + this.lastShootImpulse);
    },
    updateShootButton: function() {
        if (this._isPressedShootButton) {

            if (this._updateShootButtonCount > 126) {
                return;
            }
            console.log('updateShootButton')
            var g = this.shootButton.color.g,
                b = this.shootButton.color.b;
            this.shootButton.color = cc.color(255, g - 2, b - 2);
            this._updateShootButtonCount++;
        }
    },

    removeEvent: function() {
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    },


    initPhysicsWorld: function() {
        var space = this.space = new cp.Space();
        this.setupDebugNode();
        space.gravity = cp.v(0, -100); // 重力
    },

    setupDebugNode: function() {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },

    addGround: function() {
        var ground = new cp.SegmentShape(
            this.space.staticBody,
            cp.v(0, 0),
            cp.v(cc.winSize.width, 0),
            10
        );

        ground.setElasticity(1); // 弹性
        ground.setFriction(1); // 摩擦
        this.space.addStaticShape(ground);
    },

    addBackboard: function() {
        // 篮板
        var backboard = new cp.SegmentShape(
            this.space.staticBody,
            cp.v(50, 250),
            cp.v(50, 150),
            5
        );

        backboard.setElasticity(.5);
        backboard.setFriction(1);
        this.space.addStaticShape(backboard);

        // 篮筐
        var basket = new cp.SegmentShape(
            this.space.staticBody,
            cp.v(90, 200),
            cp.v(90, 190),
            3
        );

        basket.setElasticity(.5);
        basket.setFriction(1);
        this.space.addStaticShape(basket);

        // 篮网
        var basketline = new cc.Sprite(g_resSheet.GameScene.img_basketline_default_png);
        basketline.attr({
            x: 48,
            y: 162,
            anchorX: 0,
            anchorY: 0
        });
        this.addChild(basketline);
    },

    addBasketball: function(pos) {

        cc.log('addBasketball')

        // add body
        var body = new cp.Body(1, cp.momentForBox(1, 30, 30));
        body.setPos(pos);
        this.space.addBody(body);

        // shape
        var circle = this.space.addShape(new cp.CircleShape(body, 15, cc.p(0, 0)));
        circle.setElasticity(0.6);
        circle.setFriction(1);

        // sprite
        var ball = new Basketball(this.space);
        ball.setBody(body);
        ball.setPosition(pos);

        // add
        this.addChild(ball);
        this.basketballs.push(ball);

        return ball;
    },

    update: function(dt) {
        var timeStep = .03;
        this.space.step(timeStep);

        this.updateShootButton();

        // this.space.step(dt);
    },

    mockShoot: function(pos, impulse) {
        cc.log('mockShoot')

        if (!impulse) {
            impulse = 100;
        }

        var ball = this.addBasketball(pos);
        ball.body.applyImpulse(cp.v(-impulse, impulse), cp.v(0, 0));
        // ball.body.applyImpulse(cp.v(-100, 100), cp.v(0, 0));
    }
});
