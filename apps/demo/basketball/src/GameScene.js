var GameScene = cc.Scene.extend({
  basketballs: null,
  space: null,
  shootButton: null,
  player: null,
  lastShootImpulse: null,
  _currentShootIsFinish: true,
  _lastShootIsFinish: true,
  score: null,
  time: null,

  ctor: function () {
    this._super();

    this.basketballs = [];
    this.score = 0;
    this.time = 30;
    this.shootCount = 0;
    this.scoreCount = 0;
  },

  onEnter: function () {
    this._super();
    cc.log("enter GameScene");

    this.scheduleUpdate();
    this.addBackground();
    this.initShootButton();
    this.initPlayer();
    this.initScoreLabel();
    this.initTimeLabel();
    this.startTime();

    this.initEvent();

    // physics world.
    this.initPhysicsWorld();
    this.addGround();
    this.addBackboard();

    // 得分点调试
    if (DEBUG_NODE_SHOW) {
      var drowNode = new cc.DrawNode();
      var points = [cc.p(GET_SCORE_POINT.x, GET_SCORE_POINT.y)];
      for (var i = 0; i < points.length; i++) {
        drowNode.drawDot(points[i], 4, cc.color(0, 255, 255, 255));
      }
      this.addChild(drowNode);
    }
  },

  onExit: function () {
    this._super();
    cc.log("onExit");

    this.removeEvent();
  },

  addBackground: function () {
    var bg = new cc.Sprite(g_resSheet.GameScene.img_bg_png);
    bg.attr({
      anchorX: 0.5,
      anchorY: 0.5,
      x: 800 / 2,
      y: 450 / 2,
    });
    this.addChild(bg, 0);
    this.bg = bg;
  },

  initEvent: function () {
    var gameScene = this;

    cc.eventManager.addListener(
      {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: onTouchBegan,
        onTouchMoved: onTouchMoved,
        onTouchEnded: onTouchEnded,
      },
      this.shootButton
    );

    function onTouchBegan(touch, event) {
      cc.log("onTouchBegan");
      var target = event.getCurrentTarget();
      var location = touch.getLocation();
      var locationInNode = target.convertToNodeSpace(location);
      var contentSize = target.getContentSize();
      var checkRect = cc.rect(0, 0, contentSize.width, contentSize.height);
      if (cc.rectContainsPoint(checkRect, locationInNode)) {
        if (!gameScene._lastShootIsFinish) {
          return false;
        }

        gameScene.player.jump(startJump, middleJump, finsihJump);

        function startJump() {
          //
          gameScene._currentShootIsFinish = false;
          gameScene._lastShootIsFinish = false;
          gameScene.player.jumpStatus = "up";
        }
        function middleJump() {
          gameScene.player.jumpStatus = "down";
        }
        function finsihJump() {
          //
          gameScene._lastShootIsFinish = true;
          gameScene._currentIsShoot = false;
        }

        return true;
      }
      return false;
    }

    function onTouchMoved(touch, event) {
      cc.log("onTouchMoved");
    }

    function onTouchEnded(touch, event) {
      cc.log("onTouchEnded");

      // 上次投篮没结束的情况下
      if (gameScene._currentShootIsFinish) {
        return;
      }

      // 当前是否已投篮1次
      if (gameScene._currentIsShoot) {
        return;
      }

      // 用player的高度投出篮球
      var playerPos = cc.p(500, gameScene.player.y);
      gameScene._currentIsShoot = true;
      var impulse = 0;
      if (Math.abs(gameScene.player.y - 200) < 2) {
        impulse = 130;
        cc.log("shoot in");
      } else {
        if (gameScene.player.jumpStatus == "up") {
          // 劲儿大了
          impulse = 135 + Math.random() * 20;
        } else if (gameScene.player.jumpStatus == "down") {
          // 劲儿小了
          impulse = 100 + Math.random() * 20;
        } else {
        }
        cc.log("shoot out");
      }

      gameScene.player.shoot(playerPos, impulse);
    }
    // function onTouchCancel(touch, event){
    //     cc.log('onTouchCancel')
    // }
  },

  initScoreLabel: function () {
    var winSize = cc.winSize;
    var label = new cc.LabelTTF("Score: 0", "Arial", 30);
    label.attr({
      anchorX: 0,
      anchorY: 1,
      x: 50,
      y: winSize.height - 50,
    });
    // label.setPosition(size.width / 2, size.height / 2);
    this.addChild(label);
    this.scoreLabel = label;
  },
  updateScoreLabel: function (score) {
    this.scoreLabel.string = "Score: " + score;
  },
  initTimeLabel: function () {
    var winSize = cc.winSize;
    var label = new cc.LabelTTF("Time: " + this.time + " s", "Arial", 30);
    label.attr({
      anchorX: 0,
      anchorY: 1,
      x: winSize.width - 150,
      y: winSize.height - 50,
    });
    // label.setPosition(size.width / 2, size.height / 2);
    this.addChild(label);
    this.timeLabel = label;
  },
  updateTimeLabel: function (time) {
    this.timeLabel.string = "Time: " + time + " s";
  },
  startTime: function () {
    var gameScene = this;
    setInterval(function () {
      if (gameScene.time == 0) {
        // game over

        var status = "";
        var score = gameScene.score;
        if (score < 10) {
          status = "进步空间挺大";
        } else if (score >= 10 && score < 30) {
          status = "够用";
        } else {
          status = "牛逼";
        }

        let rate =
          (gameScene.scoreCount / gameScene.shootCount).toFixed(2) * 100;
        alert(
          `${status}  \n得分: ${gameScene.score}, 命中率: ${rate}% \n点击确定，再来一局 💪🏻`
        );
        // reset
        gameScene.reset();
      }
      gameScene.time--;
      gameScene.updateTimeLabel(gameScene.time);
    }, 1000);
  },

  reset: function () {
    this.score = 0;
    this.time = 30;
    this.scoreCount = 0;
    this.shootCount = 0;

    this.updateScoreLabel(this.score);
    this.updateTimeLabel(this.time);
  },

  initPlayer: function () {
    var gameScene = this;

    var player = new cc.Sprite(g_resSheet.GameScene.img_player_defalut_png);
    player.attr({
      x: 500, // 2分400  3分500
      y: 140,
      anchorX: 0,
      anchorY: 1,
    });
    this.addChild(player);

    this.player = player;

    this.player.jump = function (
      startCallback,
      middleCallback,
      finishCallback
    ) {
      var jump = cc.moveBy(0.5, cc.p(0, 100)).easing(cc.easeSineOut()),
        down = jump.reverse();

      down.update = function (dt) {
        // base code ,can't modify
        dt = this._computeEaseTime(dt);
        if (this.target) {
          var x = this._positionDelta.x * dt;
          var y = this._positionDelta.y * dt;
          var locStartPosition = this._startPosition;
          if (cc.ENABLE_STACKABLE_ACTIONS) {
            var targetX = this.target.getPositionX();
            var targetY = this.target.getPositionY();
            var locPreviousPosition = this._previousPosition;
            locStartPosition.x =
              locStartPosition.x + targetX - locPreviousPosition.x;
            locStartPosition.y =
              locStartPosition.y + targetY - locPreviousPosition.y;
            x = x + locStartPosition.x;
            y = y + locStartPosition.y;
            locPreviousPosition.x = x;
            locPreviousPosition.y = y;
            this.target.setPosition(x, y);
          } else {
            this.target.setPosition(
              locStartPosition.x + x,
              locStartPosition.y + y
            );
          }
        }
      };
      var seq = cc.sequence(
        cc.callFunc(function () {
          startCallback && startCallback();
        }),
        jump,
        cc.callFunc(function () {
          middleCallback && middleCallback();
        }),
        down,
        cc.callFunc(function () {
          finishCallback && finishCallback();
        })
      );
      this.runAction(seq);
    };

    this.player.shoot = function (pos, impulse) {
      // 记录投篮次数
      gameScene.shootCount++;
      //
      gameScene.mockShoot(pos, impulse);
    };
  },

  initShootButton: function () {
    var button = new cc.Sprite(g_resSheet.GameScene.img_button_default_png);
    button.attr({
      x: cc.winSize.width - 100,
      y: 100,
      anchorX: 0.5,
      anchorY: 0.5,
      width: 70,
      height: 70,
      scale: 1.5,
    });
    this.addChild(button);
    this.shootButton = button;
  },

  pressShootButton: function () {
    this._isPressedShootButton = true;
  },
  resetShootButton: function () {
    this._isPressedShootButton = false;
    this._updateShootButtonCount = 0;
    this.shootButton.color = cc.color(255, 255, 255);
  },
  getShootImpulse: function () {
    var rate = (255 - this.shootButton.color.g) / 255;
    this.lastShootImpulse = Math.round(rate * MAX_IMPULSE);
    cc.log("getShootImpulse: " + this.lastShootImpulse);
  },
  updateShootButton: function () {
    if (this._isPressedShootButton) {
      if (this._updateShootButtonCount > 126) {
        return;
      }
      console.log("updateShootButton");
      var g = this.shootButton.color.g,
        b = this.shootButton.color.b;
      this.shootButton.color = cc.color(255, g - 2, b - 2);
      this._updateShootButtonCount++;
    }
  },

  removeEvent: function () {
    cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
  },

  initPhysicsWorld: function () {
    var space = (this.space = new cp.Space());
    this.setupDebugNode();
    space.gravity = cp.v(0, -100); // 重力
  },

  setupDebugNode: function () {
    this._debugNode = new cc.PhysicsDebugNode(this.space);
    this._debugNode.visible = DEBUG_NODE_SHOW;
    this.addChild(this._debugNode);
  },

  addGround: function () {
    var ground = new cp.SegmentShape(
      this.space.staticBody,
      cp.v(0, 35),
      cp.v(cc.winSize.width, 35),
      10
    );

    ground.setElasticity(1); // 弹性
    ground.setFriction(1); // 摩擦
    this.space.addStaticShape(ground);
  },

  addBackboard: function () {
    // 篮板
    var backboard = new cp.SegmentShape(
      this.space.staticBody,
      cp.v(168, 340),
      cp.v(165, 270),
      5
    );

    backboard.setElasticity(0.5);
    backboard.setFriction(1);
    this.space.addStaticShape(backboard);

    // 篮筐
    let xx = 218;
    let yy = 80;
    var basket = new cp.SegmentShape(
      this.space.staticBody,
      cp.v(xx, 200 + yy),
      cp.v(xx, 190 + yy),
      2
    );
    basket.setElasticity(0.5);
    basket.setFriction(1);
    this.space.addStaticShape(basket);

    let xx2 = 180;
    let yy2 = 80;
    var basket2 = new cp.SegmentShape(
      this.space.staticBody,
      cp.v(xx2, 200 + yy2),
      cp.v(xx2, 190 + yy2),
      2
    );
    basket2.setElasticity(0.5);
    basket2.setFriction(1);
    this.space.addStaticShape(basket2);

    // 篮网
    var basketline = new cc.Sprite(
      g_resSheet.GameScene.img_basketline_default_png
    );
    basketline.attr({
      x: 177,
      y: 244,
      anchorX: 0,
      anchorY: 0,
      scale: 0.9,
    });
    this.addChild(basketline);
  },

  addBasketball: function (pos) {
    cc.log("addBasketball");
    console.log(this.basketballs);
    var gameScene = this;

    if (this.basketballs.length >= 10) {
      var reuseBall = this.basketballs.shift();
      reuseBall.body.setVel({ x: 0, y: 0 });
      reuseBall.body.setPos(pos);
      this.basketballs.push(reuseBall);
      return reuseBall;
    }

    // add body
    var body = new cp.Body(1, cp.momentForBox(1, 30, 30));
    body.setPos(pos);
    this.space.addBody(body);

    // shape
    var circle = this.space.addShape(new cp.CircleShape(body, 15, cc.p(0, 0)));
    circle.setElasticity(0.6);
    circle.setFriction(1);

    // sprite
    var ball = new Basketball(this.space, function () {
      // 记录进球次数
      gameScene.scoreCount++;
      // 记录得分
      gameScene.score += 2;
      gameScene.updateScoreLabel(gameScene.score);
    });
    ball.setBody(body);
    ball.setPosition(pos);

    // add
    this.addChild(ball);
    this.basketballs.push(ball);

    return ball;
  },

  addGetScoreBody: function () {
    var getScoreSprite = new cc.PhysicsSprite();

    // var
  },

  update: function (dt) {
    var timeStep = 0.03;
    this.space.step(timeStep);

    this.updateShootButton();

    // this.space.step(dt);
  },

  mockShoot: function (pos, impulse) {
    cc.log("mockShoot");

    if (!impulse) {
      impulse = 100;
    }

    var ball = this.addBasketball(pos);
    ball.body.applyImpulse(cp.v(-impulse, impulse), cp.v(0, 0));
    // ball.body.applyImpulse(cp.v(-100, 100), cp.v(0, 0));
  },
});
