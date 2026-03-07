var MeleeHeroController = HeroController.extend({
    /**
     * 当前敌人
     */
    _enemy: null,
    getEnemy: function() {
        return this._enemy;
    },

    /**
     * 快进倍数
     */
    _speedX: 1,
    setSpeedX: function(speedX) {
        this._speedX = speedX;
    },

    _isAttacking: false,

    ctor: function(idol) {
        this._super();

        this._idol = idol;
    },

    setMovementEvent: function() {
        this._idol
            .getSprite()
            .getAnimation()
            .setMovementEventCallFunc(this.animationEvent, this);
    },

    /**
     * 站立动画
     */
    doStanding: function() {
        this._idol.getSprite().stopAllActions();
        this._idol
            .getSprite()
            .getAnimation()
            .play(EnumType.PERSON_STATUS.STANDING);
        this._idol.setDirectionFront();
    },

    /**
     * 跑的过程时间
     * 一次攻击包括2个跑过去的时间+1个攻击时间
     * @returns {Number}
     */
    runDuration: function() {
        return this._idol.getMoveDuration() / this._speedX;
    },
    /**
     * 攻击需要的时间
     * 时间=攻击帧数/屏幕刷新率
     * @returns {Number}
     */
    attackDuration: function() {
        var frameCount = this._idol.getAnimationFrameCount(
            this._currentAttackType
        );
        return frameCount / cc.game.config.frameRate / this._speedX;
    },
    _currentAttackType: EnumType.PERSON_STATUS.ATTACK, // 当前攻击动画类型，用于计算动画时间

    /**
     * 攻击动画
     * 跑过去-打一下-跑回来
     */
    doAttack: function() {
        //
        if (this._enemy == null) return;
        if (this._enemy.isDeath()) return;
        //
        this._super();
        //
        var me = this;
        var idol = me.getIdol();
        var sprite = idol.getSprite();
        var isSkillAttack = me.getAttackCount() % 2 == 0;
        var flag = idol.getDirection() == EnumType.DIRECTION2D.LEFT ? -1 : 1;
        sprite.reverseDistance = this._idol.getAttackDistance() * flag; // 人物反转x轴距离差和攻击距离
        sprite.originalPos = this._idol.getPosition(); // 记录原始位置
        sprite.getAnimation().setSpeedScale(this._speedX);

        var animationType = null;
        // 偶数次攻击是技能攻击
        if (isSkillAttack) {
            animationType = me._currentAttackType =
                EnumType.PERSON_STATUS.SKILL;
        } else {
            animationType = me._currentAttackType =
                EnumType.PERSON_STATUS.ATTACK;
        }

        //
        var attackActionSeq = cc.sequence(
            // 向敌人跑去
            cc.callFunc(function() {
                sprite.stopAllActions();
                sprite.getAnimation().play(EnumType.PERSON_STATUS.RUN);
                idol.setDirectionFront();
            }, this),
            cc.moveTo(
                this.runDuration(),
                this._enemy.getPositionX() - sprite.reverseDistance,
                this._enemy.getPositionY()
            ),
            // 打一下
            cc.callFunc(function() {
                sprite.getAnimation().play(animationType);
            }, this),
            cc.delayTime(0.4 / me._speedX),
            cc.callFunc(function() {
                me.doNotifyEnemy(isSkillAttack);
            }, this)
        );

        this._idol.runAction(attackActionSeq);
    },

    doAttack_bak: function() {
        if (this._enemy == null) return;
        if (this._enemy.isDeath()) return; // 敌人死了 则跳过

        var me = this;
        var idol = me.getIdol();
        var sprite = idol.getSprite();

        var runDuration = idol.getMoveDuration(); // 跑的过程时间
        var originalPos = this._idol.getPosition(); // 记录原始位置
        var flag = idol.getDirection() == EnumType.DIRECTION2D.LEFT ? -1 : 1;

        reverseDistance = this._idol.getAttackDistance() * flag; // 人物反转x轴距离差和攻击距离

        // 跑到敌人那里
        var moveToEnemy = cc.moveTo(
            runDuration,
            this._enemy.getPositionX() - reverseDistance,
            this._enemy.getPositionY()
        );

        // 跑回来
        var moveToBack = cc.moveTo(
            runDuration,
            originalPos.x + Math.abs(reverseDistance),
            originalPos.y
        );

        // 动作队列
        var seq = cc.sequence(
            cc.callFunc(function() {
                sprite.stopAllActions();
                sprite.getAnimation().play(EnumType.PERSON_STATUS.RUN);
                idol.setDirectionFront();
            }, this),
            moveToEnemy,
            cc.callFunc(function() {
                sprite.stopAllActions();

                var animationName = EnumType.PERSON_STATUS.ATTACK,
                    durationTo = -1, // 暂时没搞明白
                    loop = 0; // 0 不循环  1循环
                sprite.getAnimation().setSpeedScale(1);
                sprite
                    .getAnimation()
                    .play(EnumType.PERSON_STATUS.ATTACK, durationTo, loop);
            }, this),
            cc.delayTime(0.4),
            cc.callFunc(function() {
                me.doNotifyEnemy();
            }, this),
            cc.delayTime(0.6),
            cc.callFunc(function() {
                sprite.stopAllActions();
                sprite.getAnimation().play(EnumType.PERSON_STATUS.RUN);
                idol.setDirectionReverse();
                idol.setPosition(
                    idol.getPositionX() + Math.abs(reverseDistance),
                    idol.getPositionY()
                ); // 调整动画用的
            }, this),
            moveToBack,
            cc.callFunc(function() {
                idol.setPosition(originalPos); // 调整动画用的
                sprite.stopAllActions();
                sprite.getAnimation().play(EnumType.PERSON_STATUS.STANDING);
            }, this),
            cc.callFunc(function() {
                idol.setDirectionFront();
            }, this)
        );

        this._idol.runAction(seq);
    },

    /**
     * 被攻击动画
     * @param attackModel
     */
    doBeaten: function(attackModel) {
        // 被攻击动画

        var me = this;
        var idol = this._idol;
        var sprite = idol.getSprite();

        switch (attackModel.getType()) {
            case EnumType.ATTACK_TYPE.PHYSICS:
                sprite.getAnimation().play(EnumType.PERSON_STATUS.BEATEN);
                break;
            case EnumType.ATTACK_TYPE.SKILL:
                sprite.getAnimation().play(EnumType.PERSON_STATUS.BEATEN_SKILL);
                break;
        }

        // 被攻击数值变化

        var blood = idol.getBlood();
        blood -= attackModel.getValue();
        if (blood <= 0) {
            blood = 0;
            setTimeout(function() {
                me.doDeath();
            }, 500);
        }
        idol.setBlood(blood);
        var displayBlood = (blood / idol.getBloodSprite().originalBlood) * 100;
        idol.getBloodSprite().bloodBar.setPercent(displayBlood);
    },

    /**
     * 动画事件处理
     * @param armature
     * @param movementType
     * @param movementID
     */
    animationEvent: function(armature, movementType, movementID) {
        var me = this;
        var idol = me.getIdol();
        var sprite = idol.getSprite();

        if (movementType == ccs.MovementEventType.start) {
        }

        if (movementType == ccs.MovementEventType.complete) {
            switch (movementID) {
                case EnumType.PERSON_STATUS.BEATEN_SKILL:
                case EnumType.PERSON_STATUS.BEATEN:
                    this._idol
                        .getSprite()
                        .getAnimation()
                        .play(EnumType.PERSON_STATUS.STANDING);
                    break;

                case EnumType.PERSON_STATUS.SKILL:
                case EnumType.PERSON_STATUS.ATTACK:
                    var backActionSeq = cc.sequence(
                        cc.callFunc(function() {
                            idol.setDirectionReverse();
                            sprite
                                .getAnimation()
                                .play(EnumType.PERSON_STATUS.RUN);
                        }, me),
                        cc.moveTo(me.runDuration(), sprite.originalPos),
                        cc.callFunc(function() {
                            // 转正向
                            idol.setDirectionFront();
                            // 站立
                            sprite
                                .getAnimation()
                                .play(EnumType.PERSON_STATUS.STANDING);
                        }, me)
                    );

                    this._idol.runAction(backActionSeq);
                    break;
                default:
                    break;
            }
        }

        if (movementType == ccs.MovementEventType.loopComplete) {
        }
    }
});
