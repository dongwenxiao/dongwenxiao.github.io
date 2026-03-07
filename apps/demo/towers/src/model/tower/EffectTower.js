towers.model.base.EffectTower = towers.model.base.Tower.extend({
    configBullet: function() {
        var bullet = new towers.model.bullet.DecelerateBullet(this, this.enemy);
        return bullet;
    },

    configColor: function() {
        return cc.color('#9291D2');
    }
});
