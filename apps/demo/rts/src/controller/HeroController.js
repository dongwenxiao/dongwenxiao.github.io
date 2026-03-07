var HeroController = BaseController.extend({
    update: function(dt) {
        // 迷雾
        if (this.currentObj.teamType == EnumType.TEAM_TYPE.TEAM_2) {
            this.clearFog();
        }

        // 找敌人
        var enemyList =
            this.currentObj.teamType == EnumType.TEAM_TYPE.TEAM_1
                ? cc.gameController.team2List
                : cc.gameController.team1List;
        this.aiLookForEnemy(enemyList);
        //
        //	// 向敌人移动
        //	this.aiMoveToEnemy(dt,this.enemy);

        // 向指挥点移动
        this.aiMoveToPoint(dt, this.commandPoint);

        // 这是为了解决 血值不跟随对象移动的
        this.currentObj.bloodSprite.setPosition(0, 0);
    },
    // 向指挥地点移动
    aiMoveToPoint: function(dt, pos) {
        if (this.commandPoint == null) return;
        //	if(this.commandPoint != null && (this.enemy != null&&this.enemy.blood>0)) return;

        // 移动逻辑
        var distancX = pos.x - this.currentObj.sprite.getPositionX();
        var distancY = pos.y - this.currentObj.sprite.getPositionY();

        var flagX = distancX >= 0 ? 1 : -1;
        var flagY = distancY >= 0 ? 1 : -1;

        var moveByX =
            Math.abs(distancX) <= 10 ? 0 : this.currentObj.speed * dt * flagX;
        var moveByY =
            Math.abs(distancY) <= 10 ? 0 : this.currentObj.speed * dt * flagY;

        var moveByAction = cc.moveBy(dt, moveByX, moveByY);
        this.currentObj.sprite.runAction(moveByAction);
    }
});
