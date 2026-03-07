var BaseController = cc.Node.extend({
    currentObj: null, // 当前控制对象
    enemy: null, // 当前敌人
    lookForRange: 150, // 发现范围
    commandPoint: null, // 指挥的点

    ctor: function() {
        this._super();
    },

    setCommandPoint: function(commandPoint) {
        this.commandPoint = commandPoint;
    },

    init: function(currentObj) {
        this._super();

        this.currentObj = currentObj;
        this.enemy = null;
        this.commandPoint = null;
    },

    // 获取两点间距离
    getDistance: function(pos1, pos2) {
        var x = Math.abs(pos1.x - pos2.x);
        var y = Math.abs(pos1.y - pos2.y);

        // 斜边值
        var z = Math.sqrt(x * x + y * y);

        return z;
    },

    // 寻找敌人，在指定视线范围内发现敌人则自动上前攻击敌人
    aiLookForEnemy: function(enemyList) {
        //	if(this.enemy != null) return;

        if (this.currentObj.iid) {
            var a = 1;
        }

        if (this.enemy != null && this.enemy.blood > 0) return;

        var tmpDistanc = 10000;
        // 搜索逻辑
        for (var i = 0; i < enemyList.length; i++) {
            var enemy = enemyList[i];
            if (enemy == null) continue;
            if (enemy.blood <= 0) continue;
            var pos2 = enemy.sprite.getPosition();
            var pos1 = this.currentObj.sprite.getPosition();
            var distanc = this.getDistance(pos1, pos2);

            //	    if(this.currentObj.teamType == EnumType.TEAM_TYPE.TEAM_2){
            //		console.log(distanc);
            //	    }
            // 是否在范围内
            if (distanc <= this.lookForRange) {
                if (tmpDistanc > distanc) {
                    tmpDistanc = distanc;
                    this.enemy = enemy;
                }
                //		this.currentObj.speed += 25;
                //		return;
            }
        }

        // 寻找最近的先当敌人
    },

    // 向敌人移动
    aiMoveToEnemy: function(dt, enemy) {
        if (this.enemy == null) return;
        if (this.enemy.blood <= 0) return;

        // 移动逻辑
        var distancX =
            enemy.sprite.getPositionX() - this.currentObj.sprite.getPositionX();
        var distancY =
            enemy.sprite.getPositionY() - this.currentObj.sprite.getPositionY();

        var flagX = distancX >= 0 ? 1 : -1;
        var flagY = distancY >= 0 ? 1 : -1;

        var moveByX =
            Math.abs(distancX) <= 5 ? 0 : this.currentObj.speed * dt * flagX;
        var moveByY =
            Math.abs(distancY) <= 5 ? 0 : this.currentObj.speed * dt * flagY;

        var moveByAction = cc.moveBy(dt, moveByX, moveByY);
        this.currentObj.sprite.runAction(moveByAction);
    },

    // 向指挥地点移动
    aiMoveToPoint: function(dt, pos) {
        if (this.commandPoint == null) return;
        if (
            this.commandPoint != null &&
            this.enemy != null &&
            this.enemy.blood > 0
        )
            return;

        // 移动逻辑
        var distancX = pos.x - this.currentObj.sprite.getPositionX();
        var distancY = pos.y - this.currentObj.sprite.getPositionY();

        var flagX = distancX >= 0 ? 1 : -1;
        var flagY = distancY >= 0 ? 1 : -1;

        var moveByX =
            Math.abs(distancX) <= 35 ? 0 : this.currentObj.speed * dt * flagX;
        var moveByY =
            Math.abs(distancY) <= 35 ? 0 : this.currentObj.speed * dt * flagY;

        var moveByAction = cc.moveBy(dt, moveByX, moveByY);
        this.currentObj.sprite.runAction(moveByAction);
    },

    clearFog: function() {
        var fogList = cc.gameController.fogLayer.fogList;
        for (var i = 0; i < fogList.length; i++) {
            var fog = fogList[i];
            var idol = this.currentObj;

            var distancX = fog.getPositionX() - idol.sprite.getPositionX();
            var distancY = fog.getPositionY() - idol.sprite.getPositionY();

            var distanc = Math.sqrt(distancX * distancX + distancY * distancY);

            if (distanc <= 150) {
                fog.setVisible(false);
                //		fogList.splice(i);
            }
        }
    },

    //
    update: function(dt) {
        // 迷雾
        if (this.currentObj.teamType == EnumType.TEAM_TYPE.TEAM_2) {
            this.clearFog();
        }

        // 死亡移除
        if (this == null) return;
        if (this.currentObj == null) return;
        if (this.currentObj.blood <= 0) {
            this.currentObj.space.removeBody(this.currentObj.body);
            this.currentObj.space.removeShape(this.currentObj.shape);

            cc.gameLayer.removeChild(this.currentObj);
            cc.gameLayer.removeChild(this.currentObj.sprite);

            this.currentObj = null;

            return;
        }

        // 找敌人
        var enemyList =
            this.currentObj.teamType == EnumType.TEAM_TYPE.TEAM_1
                ? cc.gameController.team2List
                : cc.gameController.team1List;
        this.aiLookForEnemy(enemyList);

        // 向敌人移动
        this.aiMoveToEnemy(dt, this.enemy);

        // 向指挥点移动
        this.aiMoveToPoint(dt, this.commandPoint);

        // 这是为了解决 血值不跟随对象移动的
        this.currentObj.bloodSprite.setPosition(0, 0);
    }
});
