towers.model.bullet.BombBullet = towers.model.base.Bullet.extend({
    range: null,
    endPoint: null,
    enemyList: null,

    ctor: function(tower, enemy, enemyList) {
        this._super(tower, enemy);
        this.enemyList = enemyList;
    },

    init: function() {
        (this.level = 0), (this.attack = 1), (this.speed = 200);

        this.range = 50;
        this.endPoint = this.enemy.getPosition();

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
            segments = 5,
            drawLineToCenter = false,
            lineWidth = 5,
            color = cc.color('#FFDF00');

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

    drawRange: function() {
        var x = 5,
            y = 5,
            r = this.range;
        var circle = new cc.DrawNode();

        var center = cc.p(x, y),
            radius = this.range,
            angle = cc.degreesToRadians(90),
            segments = 50,
            drawLineToCenter = false,
            lineWidth = 0.5,
            color = cc.color(255, 223, 0, 50);

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

    doAttack: function() {
        var enemyCount = this.enemyList.length;
        for (var i = 0; i < enemyCount; i++) {
            var enemy = this.enemyList[i];
            var distance = cc.pDistance(
                this.getPosition(),
                enemy.getPosition()
            );
            if (this.range >= distance - enemy.virtualRadius) {
                enemy.onBeated(this.attack);
            }
        }
    },

    ai: function(dt) {
        var me = this;

        // if(!this.enemy || this.enemy.blood <= 0){
        // 	this.destory();
        // 	return;
        // }

        var pStart = this.getPosition(), // 向量-箭尾
            pEnd = this.endPoint; // 向量-箭头
        this.move(pStart, pEnd, dt, function() {
            me.moveResult(dt);
        });

        if (this._openLater) {
            this.laterDistory(dt);
        }
    },

    moveResult: function(dt) {
        this.drawRange();
        this.doAttack();

        this._openLater = true;
        // this.destory();
        // this.laterDistory(dt);
    },

    _later: 1,
    _tmpLater: 0,
    _openLater: false,
    laterDistory: function(dt) {
        this._tmpLater += dt;
        if (this._later <= this._tmpLater) {
            this.destory();
        }
    }
});
