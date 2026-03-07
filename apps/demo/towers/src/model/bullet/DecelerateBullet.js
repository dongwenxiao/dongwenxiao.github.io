towers.model.bullet.DecelerateBullet = towers.model.base.Bullet.extend({
    cutRate: null,
    sustain: null,

    init: function() {
        (this.level = 0), (this.attack = 0), (this.speed = 250);

        this.cutRate = 0.3; // 下降频率 50%
        this.sustain = 1.5; // 持续1.5s

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
            color = cc.color('#9291D2');

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
        this.enemy.onDecelerate(this.cutRate, this.sustain);
    }
});
