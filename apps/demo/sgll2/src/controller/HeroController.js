var HeroController = BaseModelController.extend({
    /**
     * 当前敌人
     */
    _enemy: null,
    getEnemy: function() {
        return this._enemy;
    },
    setEnemy: function(enemy) {
        this._enemy = enemy;
    },

    _isAttacking: false,

    /**
     * 记录英雄的攻击次数
     */
    _attackCount: 0,
    getAttackCount: function() {
        return this._attackCount;
    },
    attackAddOne: function() {
        this._attackCount++;
    },

    ctor: function(idol) {
        this._super();

        this._idol = idol;
    },

    /**
     * 寻找敌人
     * 先找x轴在同一轴的敌人，同x轴敌人死亡后寻找上或下临近的敌人攻击
     * 即：两点间距离最近的先攻击
     */
    doLookingForEnemy: function(enemyList) {
        if (this._enemy != null && this._enemy.getBlood() > 0) return; // 敌人没死 则不寻找新敌人

        var tmpDistance = null;
        var tmpEnemy = null;

        //		cc.log("============================");
        //		cc.log("当前英雄："+this._idol.getHeroName()+"  ID:"+this._idol.getId());

        for (var i = 0; i < enemyList.length; i++) {
            var enemy = enemyList[i];

            // 排除死亡的英雄
            if (enemy.getBlood() <= 0) continue;

            // 先寻找在同一y轴
            //			if(enemy.getPositionY() == this._idol.getPositionY()){
            //				this._enemy = enemy;
            //				return;
            //			}

            // 再寻找距离最近的
            //			var _distance = Math.distance(this._idol.getPosition(),enemy.getPosition());
            var _distance = Math.distance(this._idol, enemy);

            //			cc.log("--当前敌人："+enemy.getHeroName()+"  ID:"+this._idol.getId()+"   距离："+_distance);

            if (tmpDistance == null) {
                tmpDistance = _distance;
                tmpEnemy = enemy;
            }
            if (tmpDistance > _distance) {
                tmpEnemy = enemy;
                tmpDistance = _distance;
            }
        }

        //		cc.log("============================");

        // 如果上面的循环没找到敌人,则当前无可攻击敌人
        this._enemy = tmpEnemy;
    },

    /**
     * 站立动画
     */
    doStanding: function() {
        cc.warn('doStanding() of object is not implement');
    },

    /**
     * 移动动画
     */
    doMove: function() {
        cc.warn('doMove() of object is not implement');
    },

    /**
     * 攻击动画
     */
    doAttack: function() {
        this.attackAddOne();
        //		cc.warn("doAtteck() of object is not implement");
    },

    /**
     * 通知敌人攻击
     */
    doNotifyEnemy: function(isSkill) {
        if (this._enemy != null) {
            var currentAttack = 0;
            var attackType = undefined;
            if (isSkill) {
                currentAttack = this._idol.getAttackSkill();
                attackType = EnumType.ATTACK_TYPE.SKILL;
            } else {
                currentAttack = Math.randomInt(
                    this._idol.getAttackMin(),
                    this._idol.getAttackMax()
                );
                attackType = EnumType.ATTACK_TYPE.PHYSICS;
            }

            this._enemy
                .getController()
                .doBeaten(new AttackModel(currentAttack, attackType));
        }
    },

    /**
     * 被攻击动画
     */
    doBeaten: function() {
        cc.warn('doBeaten() of object is not implement');
    },

    /**
     * 死亡
     */
    doDeath: function() {
        this._idol.getSprite().stopAllActions();
        this._idol
            .getSprite()
            .getAnimation()
            .play(EnumType.PERSON_STATUS.DEATH);
    },

    update: function(dt) {
        //		// 检查死亡
        //		if(this._idol.isDeath()){ // 如果还没死
        //			this.doDeath();
        //		}
    }
});
