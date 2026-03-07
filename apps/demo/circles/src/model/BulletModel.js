var BulletModel = cc.LayerColor.extend({
    _attackRange: 500,

    init: function() {
        var color = cc.color(255, 255, 255, 255),
            width = 10,
            height = 10;

        this._super(color, width, height);
    },

    beShoot: function() {
        var angle = this.owner.getView().getLastEquipLayerAngle();
        // cc.log("last:"+angle);
        var x = Math.sin(Math.Angle2Radian(angle)) * this._attackRange,
            y = Math.cos(Math.Angle2Radian(angle)) * this._attackRange;
        var moveAction = cc.moveBy(0.5, x, y);

        var me = this;

        var seq = cc.sequence(
            moveAction,
            cc.callFunc(function() {
                me.destroy();
            })
        );
        this.runAction(seq);
    },

    update: function() {
        if (this._xSpeed != 0 || this._ySpeed != 0) {
            var p = this.getPosition();
            this.setPositionX(p.x + this._xSpeed);
            this.setPositionY(p.y + this._ySpeed);
        }
    },

    destroy: function() {
        this.parent.removeChild(this);
    }
});
