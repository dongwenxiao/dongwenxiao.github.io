towers.model.base.Bullet = cc.Sprite.extend({
    level: null,

    attack: null,
    speed: null,
    // fireRate: 1,	// 1发/秒

    tower: null,
    enemy: null,

    ctor: function(tower, enemy) {
        this._super();

        this.tower = tower;
        this.enemy = enemy;

        this.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            width: 10,
            height: 10,
            x: tower.x,
            y: tower.y
        });

        this.init();
    },

    init: function() {
        (this.level = 0), (this.attack = 1), (this.speed = 400);

        this.drawCircle();
    },

    drawCircle: function() {
        var x = 5,
            y = 5,
            r = 1;
        var circle = new cc.DrawNode();

        var center = cc.p(x, y),
            radius = r,
            angle = cc.degreesToRadians(90),
            segments = 10,
            drawLineToCenter = false,
            lineWidth = 5,
            color = cc.color(255, 255, 255, 255);

        circle.drawCircle(
            center,
            radius,
            angle,
            segments,
            drawLineToCenter,
            lineWidth,
            color
        );

        this.addChild(circle);
    },

    destory: function() {
        this.parent.removeChildInAnimationLayer(this);
    },

    doAttack: function() {
        this.enemy.onBeated(this.attack);
    },

    ai: function(dt) {
        var me = this;

        if (!this.enemy || this.enemy.blood <= 0) {
            this.destory();
            return;
        }

        var pStart = this.getPosition(), //向量-箭尾
            pEnd = this.enemy.getPosition(); // 向量-箭头
        this.move(pStart, pEnd, dt, function() {
            me.moveResult();
        });
    },

    _hasCallback: false,
    move: function(pStart, pEnd, dt, callback) {
        // callback 是达到目标点的回调
        var dtSpeed = dt * this.speed;
        var sp = cc.pSub(pEnd, pStart); // 第一个点是箭头点， 第二个点是箭尾点
        var angle = cc.pToAngle(sp); // 弧度(水平向右是0度)
        // var angle1 = angle * 180/Math.PI;	// 角度
        // console.log(angle1)
        var speedX = Math.cos(angle) * dtSpeed;
        var speedY = Math.sin(angle) * dtSpeed;

        var distance = cc.pDistance(pStart, pEnd);
        if (distance <= dtSpeed) {
            if (!this._hasCallback) {
                this._hasCallback = true;
                undefined == callback || callback();
            }
        } else {
            this.x += speedX;
            this.y += speedY;
        }
    },

    moveResult: function() {
        this.setPosition(this.enemy.getPosition());

        this.destory();
        this.doAttack();
    }
});
