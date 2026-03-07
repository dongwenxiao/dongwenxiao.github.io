var HeroController = BasePersonController.extend({
    hero: null, // 当前操作英雄
    enemy: null, // 当前攻击敌人

    isStandByEnemy: false, // 是否站在敌人身边
    isMoving: false,
    isAttacking: false,

    defaultAction: null, // 默认状态

    ctor: function(heroObj) {
        this._super();
        this.hero = heroObj;
    },

    // 初始化 设置当前英雄
    init: function() {
        this._super();

        this.defaultAction = EnumType.PERSON_STATUS.LOADING;
    },

    // 寻找敌人 并 设置当前敌人
    lookForEnemy: function(enemyList) {},

    // 做一个动作
    doAction: function(actionType) {
        this.hero.stopAllActions();
        this.hero.animation.getAnimation().play(actionType);
        this.hero.animation
            .getAnimation()
            .setMovementEventCallFunc(this.callbackDefaultAction, this);
    },

    // 执行某个动作后回调
    callbackDefaultAction: function(armature, movementType, movementID) {
        if (movementType == 1) {
            //			this.hero.stopAllActions();
            this.hero.animation
                .getAnimation()
                .play(EnumType.PERSON_STATUS.LOADING);
        }
    },

    // 默认动画
    doDefaultAction: function() {
        this.hero.animation.getAnimation().play(EnumType.PERSON_STATUS.LOADING);
    },

    //////////-------------------------------------------------------------------------------------------------------

    doMoving: function() {
        this.hero.stopAllActions();
        this.hero.animation.getAnimation().play(EnumType.PERSON_STATUS.RUN);
    },

    doAttackEnemy: function() {
        var me = this;

        if (!this.isAttacking) {
            this.isAttacking = true;
            this.hero.stopAllActions();
            this.hero.animation
                .getAnimation()
                .play(EnumType.PERSON_STATUS.ATTACK);
            this.hero.animation
                .getAnimation()
                .setMovementEventCallFunc(this.callbackDoAttackEnemy, this);
        }
    },
    callbackDoAttackEnemy: function(armature, movementType, movementID) {
        if (movementType == 1) {
            this.isAttacking = false;
            this.hero.animation
                .getAnimation()
                .play(EnumType.PERSON_STATUS.LOADING);
        }
    },

    // 移向敌人
    doMoveToEnemy: function(dt) {
        // 检查距离
        var distance =
            this.enemy.sprite.getPositionX() - this.hero.sprite.getPositionX();
        if (Math.abs(distance) < 200) {
            this.isStandByEnemy = true;
            return;
        }

        var direction = distance > 0 ? 1 : -1;
        var actionTo = cc.moveBy(dt, cc.p(this.hero.speed * direction * dt, 0));
        this.hero.sprite.runAction(actionTo);
    },

    update: function(dt) {
        this.aiLogin(dt);
    },

    aiLogin: function(dt) {
        // 1.是否已找到攻击目标
        if (this.enemy == null) {
            this.lookForEnemy();
            return;
        }

        // 2.是否已到达攻击目标身边 远离
        if (this.enemy != null && !this.isStandByEnemy) {
            if (!this.isMoving) {
                this.isMoving = true;
                this.doMoving();
            }
            this.doMoveToEnemy(dt);
            return;
        }

        // 3.临近  攻击
        if (this.enemy != null && this.isStandByEnemy) {
            this.doAttackEnemy();
        }
    }
});
