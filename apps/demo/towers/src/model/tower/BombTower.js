towers.model.base.BombTower = towers.model.base.Tower.extend({
    configBullet: function() {
        var bullet = new towers.model.bullet.BombBullet(
            this,
            this.enemy,
            this.enemyList
        );
        return bullet;
    },

    configColor: function() {
        return cc.color('#FFDF00');
    }
});
