var HeroController = BaseController.extend({
    ctor: function(model) {
        this._super(model);
    },

    init: function() {
        this._super();

        // this.openAutoShoot();
    },

    createBullet: function() {
        var bullet = new BulletModel();
        bullet.init();

        // 子弹
        this._model.parent.addChild(bullet);
        bullet.owner = this._model;
        bullet.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this._model.x - 5,
            y: this._model.y - 5,
            rotation: this._model.getView().getLastEquipLayerAngle()
        });

        return bullet;
    },

    doShoot: function() {
        var bullet = this.createBullet();
        bullet.beShoot();
        bullet.collisionType = 'bullet';
        cc.gameController.addCollisionArr(bullet);
        // var angle = bullet.parent.getView().getLastEquipLayerAngle();
    },

    openAutoShoot: function() {
        var me = this;
        this._model.schedule(function() {
            var bullet = me.createBullet();
            bullet.beShoot();
        }, 1);
    },

    update: function(dt) {}
});
