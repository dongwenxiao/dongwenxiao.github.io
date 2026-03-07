var PlaySceneController = BaseSceneController.extend({
    /**
     * 敌军英雄列表
     */
    _enemyHeroList: [],
    addEnemyHeroList: function(hero) {
        this._enemyHeroList.push(hero);
    },

    /**
     * 我军英雄列表
     */
    _armyHeroList: [],
    addArmyHero: function(hero) {
        this._armyHeroList.push(hero);
    },

    /**
     * 战斗场全部英雄列表
     * 敌军+我军
     */
    getAllHeroList: function() {
        return this._enemyHeroList.concat(this._armyHeroList);
    },

    clearAllHero: function() {
        this._armyHeroList = [];
        this._enemyHeroList = [];
    },

    /**
     * 移除死亡的英雄
     * 不做渲染和相关计算了
     * @param hero
     */
    removeDieHero: function(hero) {
        if (hero == null) return;

        // 我军
        if (hero.getDirection() == EnumType.DIRECTION2D.RIGHT) {
            this._armyHeroList = this._armyHeroList.removeItem(hero);
        }

        // 敌军
        if (hero.getDirection() == EnumType.DIRECTION2D.LEFT) {
            this._enemyHeroList = this._enemyHeroList.removeItem(hero);
        }
    },

    /**
     * 游戏速度
     */
    _speedX: 1,
    setSpeedX: function(speedX) {
        this._speedX = speedX;
    },

    init: function() {
        this._super();

        this._speedX = sg2GameConfig.speedX;
    },

    /**
     * 设置战斗英雄
     */
    setTeams: function() {
        this.clearAllHero();
        this.setTeamsForTest();

        return;

        // 左 - 我军
        for (var i = 0; i < 5; i++) {
            var meleeHero = new MeleeHero();
            var blood = 10,
                attackMin = 1,
                attackMax = 10,
                defenceMin = 2,
                defenceMax = 5,
                agile = Math.randomInt(1, 10),
                direction = EnumType.DIRECTION2D.RIGHT,
                moveDuration = 0.3;
            meleeHero.init(
                blood,
                attackMin,
                attackMax,
                defenceMin,
                defenceMax,
                agile,
                direction,
                moveDuration
            );
            meleeHero.initAnimation('j_guanping');
            meleeHero.initController();

            //			meleeHero.initAnimation("Hero");
            meleeHero.setPosition(cc.p(0, 130 + 190 * i)); // 位置
            meleeHero.getController().doStanding();

            meleeHero.setId('1' + (i + 1)); // for debug
            //
            this._scene.getAnimationLayer().addChild(meleeHero);
            this.addArmyHero(meleeHero);
        }

        // 右 - 敌军
        for (var i = 0; i < 5; i++) {
            var meleeHero = new MeleeHero();
            var blood = 10,
                attackMin = 1,
                attackMax = 10,
                defenceMin = 2,
                defenceMax = 5,
                agile = Math.randomInt(1, 10),
                direction = EnumType.DIRECTION2D.LEFT,
                moveDuration = 0.3;
            meleeHero.init(
                blood,
                attackMin,
                attackMax,
                defenceMin,
                defenceMax,
                agile,
                direction,
                moveDuration
            );
            meleeHero.initAnimation('j_guanping');
            meleeHero.initController();
            //			meleeHero.initAnimation("sgAnimation");
            meleeHero.setPosition(cc.p(500, 130 + 190 * i)); // 位置
            meleeHero.getController().doStanding();

            meleeHero.setId('2' + (i + 1)); // for debug

            //
            this._scene.getAnimationLayer().addChild(meleeHero);
            this.addEnemyHeroList(meleeHero);
        }
    },

    setTeamsForTest: function() {
        // 左 - 我军
        for (var i = 0; i < armyHeros.length; i++) {
            var heroProp = armyHeros[i];

            var meleeHero = new MeleeHero();
            //
            var name = heroProp.name,
                blood = heroProp.blood,
                attackMin = heroProp.attackMin,
                attackMax = heroProp.attackMax,
                attackSkill = heroProp.attackSkill,
                defenceMin = heroProp.defenceMin,
                defenceMax = heroProp.defenceMax,
                agile = heroProp.agile,
                direction = EnumType.DIRECTION2D.RIGHT,
                moveDuration = heroProp.moveDuration,
                scale = heroProp.scale,
                animation = heroProp.animation,
                attackDistance = heroProp.attackDistance,
                positionX = heroProp.positionX,
                positionY = heroProp.positionY,
                bloodPositionX = heroProp.blood_positionX,
                bloodPositionY = heroProp.blood_positionY;
            (bloodScaleX = heroProp.blood_scaleX),
                (bloodScaleY = heroProp.blood_scaleY);
            //
            meleeHero.setId('1' + (i + 1)); // for debug
            meleeHero.setHeroName(name);
            meleeHero.setAttackSkill(attackSkill);
            meleeHero.init(
                blood,
                attackMin,
                attackMax,
                defenceMin,
                defenceMax,
                agile,
                direction,
                moveDuration
            );
            meleeHero.setScale(scale);
            meleeHero.initAnimation(animation);
            meleeHero.getController().setMovementEvent();
            meleeHero.getController().setSpeedX(this._speedX);

            if (positionY == undefined) {
                positionY = 130 + 190 * i;
            }
            meleeHero.setPosition(cc.p(positionX, positionY));
            meleeHero.setBloodSpritePosition(bloodPositionX, bloodPositionY);
            meleeHero.setBloodScale(bloodScaleX, bloodScaleY);
            meleeHero.setAttackDistance(attackDistance);

            meleeHero.getController().doStanding();
            //
            this._scene.getAnimationLayer().addChild(meleeHero, 200 - i);
            this.addArmyHero(meleeHero);
        }

        // 右 - 敌军
        for (var i = 0; i < enemyHeros.length; i++) {
            var heroProp = enemyHeros[i];

            var meleeHero = new MeleeHero();
            //
            var name = heroProp.name,
                blood = heroProp.blood,
                attackMin = heroProp.attackMin,
                attackMax = heroProp.attackMax,
                attackSkill = heroProp.attackSkill,
                defenceMin = heroProp.defenceMin,
                defenceMax = heroProp.defenceMax,
                agile = heroProp.agile,
                direction = EnumType.DIRECTION2D.LEFT,
                moveDuration = heroProp.moveDuration,
                scale = heroProp.scale,
                animation = heroProp.animation,
                attackDistance = heroProp.attackDistance,
                positionX = heroProp.positionX,
                positionY = heroProp.positionY,
                bloodPositionX = heroProp.blood_positionX,
                bloodPositionY = heroProp.blood_positionY;
            (bloodScaleX = heroProp.blood_scaleX),
                (bloodScaleY = heroProp.blood_scaleY);
            //
            meleeHero.setId('1' + (i + 1)); // for debug
            meleeHero.setHeroName(name);
            meleeHero.setAttackSkill(attackSkill);
            meleeHero.init(
                blood,
                attackMin,
                attackMax,
                defenceMin,
                defenceMax,
                agile,
                direction,
                moveDuration
            );

            meleeHero.setScale(scale);
            meleeHero.initAnimation(animation);
            meleeHero.getController().setMovementEvent();
            meleeHero.getController().setSpeedX(this._speedX);

            if (positionY == undefined) {
                positionY = 130 + 190 * i;
            }
            meleeHero.setPosition(cc.p(positionX, positionY));
            meleeHero.setBloodSpritePosition(bloodPositionX, bloodPositionY);
            meleeHero.setBloodScale(bloodScaleX, bloodScaleY);
            meleeHero.setAttackDistance(attackDistance);

            meleeHero.getController().doStanding();

            //
            this._scene.getAnimationLayer().addChild(meleeHero, 100 - i);
            this.addEnemyHeroList(meleeHero);
        }
    },

    /**
     * 放回当前没死的英雄集合
     * @param heroArray 待筛选的英雄列表
     * @returns 筛选结果
     */
    __getNotDeathHero: function(heroArray) {
        var aliveArray = _.filter(heroArray, function(hero) {
            return hero.isDeath() == false; // 没死的英雄
        });
        return aliveArray;
    },

    /**
     *  返回按敏捷值排序的英雄列表
     * @param heroArray 待排序的英雄列表
     * @returns 排序结果
     */

    __sortHeroAttackByAgile: function(heroArray) {
        var heroArray = _.sortBy(heroArray, function(hero) {
            return -hero.getAgile();
        });
        return heroArray;
    },

    /**
     * 存放一次完整英雄动作队列
     * __sortHeroAttackByAgile()  此方法结果存入该队列
     */
    _actionQueue: [],
    __handlerActionQueue: function() {
        // 如果一轮攻击动作处理完成，则重新再排出一轮
        if (this._actionQueue.length == 0) {
            this.__handlerLogic();
        }

        // 拿出1个英雄做他的动作
        var hero = null;
        if (this._actionQueue.length > 0) {
            hero = this._actionQueue[0];
            this._actionQueue = this._actionQueue.slice(1);
        }

        //		cc.log("__handlerActionQueue() return hero:" + hero);

        return hero;
    },

    __handlerLogic: function() {
        // 获取场景内的英雄
        var allHeroList = this.getAllHeroList();

        // 筛选出没死的英雄
        var notDeathHeroList = this.__getNotDeathHero(allHeroList);

        // 把没死的英雄按照敏捷值排序
        var sortNotDeathHeroList = this.__sortHeroAttackByAgile(
            notDeathHeroList
        );

        // 排好顺的英雄存入待处理队列
        this._actionQueue = sortNotDeathHeroList;
    },

    beginFight: function() {
        var me = this;

        // 处理1轮队列
        this.__handlerLogic();

        // 开始战斗
        this.getScene().scheduleOnce(function() {
            me.__doAttack();
        }, 0.7);
    },

    __doAttack: function() {
        var me = this;
        var hero = this.__handlerActionQueue();
        while (hero == null || hero.getBlood() <= 0) {
            hero = this.__handlerActionQueue();
        }

        var tmpEnemyHeroList = null;
        if (hero.getDirection() == EnumType.DIRECTION2D.RIGHT) {
            // 向右的英雄表示我军英雄
            tmpEnemyHeroList = me._enemyHeroList;
        } else {
            // 向左的英雄表示敌军英雄
            tmpEnemyHeroList = me._armyHeroList;
        }

        hero.getController().doLookingForEnemy(tmpEnemyHeroList);
        hero.getController().doAttack();

        /**
         * debug log
         */
        cc.log(
            'ID:' +
                hero.getId() +
                '------------------------------------开始攻击'
        );
        cc.log('名字：' + hero.getHeroName());
        cc.log('当前血量：' + hero.getBlood());
        cc.log('攻击力：' + hero.getAttackMin() + '~' + hero.getAttackMax());
        cc.log('防御力：' + hero.getDefenceMin() + '~' + hero.getDefenceMax());
        cc.log('敏捷：' + hero.getAgile());

        if (hero.getController().getEnemy() != null) {
            cc.log(
                '目标ID：' +
                    hero
                        .getController()
                        .getEnemy()
                        .getId()
            );
            cc.log(
                '目标名字：' +
                    hero
                        .getController()
                        .getEnemy()
                        .getHeroName()
            );
            cc.log(
                '目标血量：' +
                    hero
                        .getController()
                        .getEnemy()
                        .getBlood()
            );
        } else cc.log('没有目标');

        attackDuration =
            hero.getController().runDuration() * 2 +
            hero.getController().attackDuration();
        var delay = attackDuration;
        if (delay == 0) {
            delay = 2;
            cc.warn(
                'hero ' +
                    hero.name +
                    ' need set duration, has set default val 2s'
            );
        }
        this.getScene().scheduleOnce(function() {
            me.__doAttack();
            me.__checkFightResult();
        }, delay);
    },

    __checkFightResult: function() {
        // 判断敌人是否有活着的

        var enemyList = this.__getNotDeathHero(this._enemyHeroList);
        if (enemyList.length == 0) {
            cc.gameController.runScnene(EnumType.SCENE.RESULT, '胜利');
        }

        // 判断我军是否有活着的
        var armyList = this.__getNotDeathHero(this._armyHeroList);
        if (armyList.length == 0) {
            cc.gameController.runScnene(EnumType.SCENE.RESULT, '失败');
        }
    },

    /**
     * 战斗场景逻辑
     * @returns
     */
    setGameScheduleLogic: function() {
        var me = this;

        // 按敏捷值设定所有人的出手顺序（我方和敌方）
        // 安照敏捷值倒序排序后的全部英雄列表
        var heroList = _.sortBy(this.getAllHeroList(), function(hero) {
            return -hero.getAgile();
        });

        var nextInterval = 2; // 下一个英雄动画间隔
        for (var i = 0; i < heroList.length; i++) {
            var hero = heroList[i];
            var interval = 3;
            var repeat = 0;
            var delay = 1 + nextInterval * i;

            // 安排时间表
            this.addAnimationToQueue(hero);
            this.getScene().scheduleOnce(function() {
                var hero = me.getAnimationFromQueue();
                if (hero == null) return; // 如果不存在了 跳过
                if (hero.isDeath) return; // 如果已经死了 跳过

                var tmpEnemyHeroList = null;
                if (hero.getDirection() == EnumType.DIRECTION2D.RIGHT) {
                    // 向右的英雄表示我军英雄
                    tmpEnemyHeroList = me._enemyHeroList;
                } else {
                    // 向左的英雄表示敌军英雄
                    tmpEnemyHeroList = me._armyHeroList;
                }

                hero.getController().doLookingForEnemy(tmpEnemyHeroList);
                hero.getController().doAttack();
            }, delay);
        }
    },

    /**
     * 动画队列
     * 用于计时器处理的动画队列
     * _animationQueue:[0] = hero
     */
    _animationQueue: [],
    addAnimationToQueue: function(hero) {
        this._animationQueue.push(hero);
    },
    getAnimationFromQueue: function() {
        var hero = null;
        if (this._animationQueue.length > 0) {
            hero = this._animationQueue[0];
            this._animationQueue = this._animationQueue.slice(1);
        }
        return hero;
    },

    /**
     * 加载资源
     */
    initResource: function() {
        // add demo hero
        //		ccs.armatureDataManager.addArmatureFileInfo(res.hero_png,res.hero_plist,res.hero_json);

        // add sg demo hero
        //		ccs.armatureDataManager.addArmatureFileInfo(res.sg_hero_png,res.sg_hero_plist,res.sg_hero_json);

        // add guanping
        ccs.armatureDataManager.addArmatureFileInfo(
            res.ani_j_guanping_png,
            res.ani_j_guanping_plist,
            res.ani_j_guanping_json
        );
        // add huangzhong
        ccs.armatureDataManager.addArmatureFileInfo(
            res.ani_j_huangzhong_png,
            res.ani_j_huangzhong_plist,
            res.ani_j_huangzhong_json
        );
    },

    test: function() {
        var meleeHero = new MeleeHero();
        var blood = 10,
            attackMin = 1,
            attackMax = 10,
            defenceMin = 2,
            defenceMax = 5,
            agile = Math.randomInt(1, 10),
            direction = EnumType.DIRECTION2D.RIGHT,
            moveDuration = 0.3;
        meleeHero.init(
            blood,
            attackMin,
            attackMax,
            defenceMin,
            defenceMax,
            agile,
            direction,
            moveDuration
        );
        meleeHero.initAnimation('j_guanping');
        meleeHero.initController();

        //		meleeHero.initAnimation("Hero");
        meleeHero.setPosition(cc.p(0, 130 + 190 * 1)); // 位置
        meleeHero.getController().doStanding();

        meleeHero.setId('1' + (1 + 1)); // for debug
        //
        this._scene.getAnimationLayer().addChild(meleeHero);
        this.addArmyHero(meleeHero);

        var moveToEnemyAction = cc.moveTo(1, cc.p(80, 80));

        var attackActionSeq = cc.sequence(
            moveToEnemyAction,
            cc.moveTo(1, cc.p(380, 80))
        );

        meleeHero.runAction(attackActionSeq);
    }
});
