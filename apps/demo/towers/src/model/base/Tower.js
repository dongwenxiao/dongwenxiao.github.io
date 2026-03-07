towers.model.base.Tower = cc.Sprite.extend({
    parentScene: null,

    bullet: null,
    range: 120,
    fireRate: 1, // 1发/秒

    enemy: null,
    // enemyVirtualRadius :0,
    enemyList: [],

    circle: null,
    line: null,

    ctor: function(parent) {
        this._super();

        this.parentScene = parent;
    },

    init: function(config) {
        if (undefined == config) return;

        this.x = config.x;
        this.y = config.y;
        this.enemyList = config.enemyList;

        // cc.director.getScheduler().scheduleUpdateForTarget(this, 0, false);
        // this.scheduleUpdate();

        this.drawCircle();
        this.drawRange();
    },

    configBullet: function() {
        var bullet = new towers.model.base.Bullet(this, this.enemy);
        return bullet;
    },

    configColor: function() {
        return cc.color.RED;
    },

    drawCircle: function() {
        var x = 0,
            y = 0,
            r = 20;
        var circle = new cc.DrawNode();

        var center = cc.p(x, y),
            radius = r,
            angle = cc.degreesToRadians(0),
            segments = 50,
            drawLineToCenter = true,
            lineWidth = 1,
            color = this.configColor();

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

    // update: function(dt){

    // 	this.ai(dt);

    // 	//
    // },

    ai: function(dt) {
        // 当前没有目标or目标死亡
        if (!(null != this.enemy && this.enemy.blood > 0)) {
            // 搜索找敌人
            // TODO 根据情况，可以反转，敌人找炮塔
            this.search(this.enemyList);
        } else {
            this.shoot(dt);

            // 旋转跟随敌人
            this.rotationByEnemy();

            // 检查是否还在射程范围
            this.rangeCheck();
        }
    },

    search: function(enemyList) {
        var enemyCount = enemyList.length;
        if (enemyCount == 0) return;
        for (var i = 0; i < enemyCount; i++) {
            var enemy = enemyList[i];

            if (enemy.blood <= 0) {
                continue;
            }

            var pos1 = this.getPosition(),
                pos2 = enemy.getPosition();
            var distance = cc.pDistance(pos1, pos2);
            // this.enemyVirtualRadius = enemy.gnding.vox().width / 2; // 虚拟半径，碰撞更逼真
            if (this.range >= distance - enemy.virtualRadius) {
                this.enemy = enemy;
                // this.shoot(enemy);
                // console.log('fund enemy!'+ enemy.name);
                return;
            }
        }
    },

    rangeCheck: function() {
        var pos1 = this.getPosition(),
            pos2 = this.enemy.getPosition();
        var distance = cc.pDistance(pos1, pos2);

        if (this.range < distance - this.enemy.virtualRadius) {
            // console.log('lost enemy!'+ this.enemy.name);
            this.enemy = null;
        }
    },

    drawRange: function() {
        var x = 0,
            y = 0,
            r = 20;
        var circle = new cc.DrawNode();

        var center = cc.p(x, y),
            radius = this.range,
            angle = cc.degreesToRadians(90),
            segments = 50,
            drawLineToCenter = false,
            lineWidth = 1,
            color = cc.color(228, 228, 228, 30);

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

    rotationByEnemy: function() {
        var ePos = this.enemy.getPosition();
        var sp = cc.pSub(ePos, this.getPosition());
        var angle = cc.pToAngle(sp); // 弧度
        var rotation = angle * -57.29577951; // 角度
        rotation = rotation < 0 ? 360 + rotation : rotation;

        this.setTowerRotation(rotation);
    },

    setTowerRotation: function(angle) {
        // TODO 延迟旋转
        this.setRotation(angle);
    },

    tmpFireRate: 0,
    shoot: function(dt) {
        if (this.enemy != null) {
            this.tmpFireRate += dt;
            if (this.tmpFireRate >= this.fireRate) {
                // var bullet = new towers.model.base.Bullet(this, this.enemy);
                // var bullet = new towers.model.bullet.DecelerateBullet(this, this.enemy);
                // var bullet = new towers.model.bullet.BombBullet(this, this.enemy, this.enemyList);
                var bullet = this.configBullet(
                    this,
                    this.enemy,
                    this.enemyList
                );
                this.parentScene.addChildInAnimationLayer(bullet);
                this.tmpFireRate = 0;
            }
        }
    }
});
