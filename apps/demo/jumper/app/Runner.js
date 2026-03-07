cm.Runner = cc.Sprite.extend({
    circle: null,

    ctor: function(x, y) {
        this._super();

        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: x,
            y: y
        });

        this.initCircle();
    },

    initCircle: function() {
        var x = 15,
            y = 15,
            r = 0.1;
        var circle = new cc.DrawNode();
        circle.attr({
            anchorX: 0,
            anchorY: 0
        });

        var center = cc.p(x, y),
            radius = r,
            angle = cc.degreesToRadians(90),
            segments = 100,
            drawLineToCenter = false,
            lineWidth = 30,
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

    jump: function(type, duration, pos, callback) {
        var actions = [];
        var easeRate = 2;
        var startPos = this.getPosition();
        var dis = {
            x: pos.x - startPos.x,
            y: pos.y - startPos.y
        };

        // jump
        var halfDuration = duration / 2;
        var jumpUp, jumpDown;
        if (type == 'default') {
            jumpUp = cc.moveTo(
                halfDuration,
                cc.p(pos.x - dis.x / 2, pos.y + 20)
            );
            jumpDown = cc.moveTo(halfDuration, pos);
        } else if (type == 'up') {
            jumpUp = cc.moveTo(
                halfDuration,
                cc.p(pos.x - dis.x / 2, pos.y + 20)
            );
            jumpDown = cc.moveTo(halfDuration, pos);
        } else if (type == 'down') {
            jumpUp = cc.moveTo(
                halfDuration,
                cc.p(pos.x - dis.x / 2, startPos.y + 20)
            );
            jumpDown = cc.moveTo(halfDuration, pos);
        } else if (type == 'cross') {
            jumpUp = cc.moveTo(
                halfDuration,
                cc.p(pos.x - dis.x / 2, startPos.y + 20)
            );
            jumpDown = cc.moveTo(halfDuration, pos);
        }

        var jump = cc.sequence([jumpUp, jumpDown]);
        jump.easing(cc.easeOut(easeRate));
        actions.push(jump);

        // callback
        var callbackAction = cc.callFunc(function() {
            callback && callback();
        });
        actions.push(callbackAction);

        // run actions
        var seq = cc.sequence(actions);
        this.runAction(seq);
    },
    jumpDefault: function() {},
    jumpDown: function() {},
    jumpUp: function() {},
    jumpCross: function() {}
});
