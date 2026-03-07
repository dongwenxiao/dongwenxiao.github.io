var Hero = BaseModel.extend({
    /**
     * 基本属性
     */

    _heroName: '',
    getHeroName: function() {
        return this._heroName;
    },
    setHeroName: function(name) {
        this._heroName = name;
    },

    _attackMin: 0, // 最小攻击
    getAttackMin: function() {
        return this._attackMin;
    },
    _attackMax: 0, // 最大攻击
    getAttackMax: function() {
        return this._attackMax;
    },
    _attackSkill: 0, // 技能攻击
    getAttackSkill: function() {
        return this._attackSkill;
    },
    setAttackSkill: function(attack) {
        return (this._attackSkill = attack);
    },

    _defenceMin: 0, // 最小防御
    getDefenceMin: function() {
        return this._defenceMin;
    },
    _defenceMax: 0, // 最大防御
    getDefenceMax: function() {
        return this._defenceMax;
    },

    _agile: 0, // 敏捷值
    getAgile: function() {
        return this._agile;
    },
    _direction: null, // 朝向
    _moveDuration: 0.5, // 移动时间

    _scale: 0.3, // 缩放比例

    /**
     * 攻击距离
     */
    _attackDistance: 90,
    setAttackDistance: function(distance) {
        this._attackDistance = distance;
    },
    getAttackDistance: function() {
        return this._attackDistance;
    },

    getMoveDuration: function() {
        return this._moveDuration;
    },
    getDirection: function() {
        return this._direction;
    },
    getAgile: function() {
        return this._agile;
    },

    /**
     * 获取攻击动画时间
     * @returns {Number}
     */
    getAttackDuration: function() {
        return 0; // todo ===============================================================
    },

    /**
     * 血条精灵
     */
    _bloodSprite: null,
    getBloodSprite: function() {
        return this._bloodSprite;
    },

    init: function(
        blood,
        attackMin,
        attackMax,
        defenceMin,
        defenceMax,
        agile,
        direction,
        moveDuration
    ) {
        this._super(blood);

        // 初始化基本属性
        (this._attackMin = attackMin),
            (this._attackMax = attackMax),
            (this._defenceMin = defenceMin),
            (this._defenceMax = defenceMax),
            (this._agile = agile),
            (this._direction = direction);
        this._moveDuration = moveDuration;

        if (direction == undefined)
            this._direction = EnumType.DIRECTION2D.RIGHT;

        // 初始化控制器
        this._controller = new HeroController(this);
        this.addChild(this._controller);

        this.scheduleUpdate();
    },

    initAnimation: function(name, png, plist, json) {
        if (png && plist && json) {
            ccs.armatureDataManager.addArmatureFileInfo(png, plist, json);
        }
        this._sprite = ccs.Armature.create(name);
        this._sprite.setAnchorPoint(0, 0);
        this._sprite.setPosition(0, 0);
        this.addChild(this._sprite);

        this.setScale();
        this.setDirectionFront();

        // 初始化血
        this.initBloodSprite();

        return this._sprite;
    },

    /**
     * 获取某个动画的帧数
     * 用于计算动画时间
     * @param animationName
     */
    getAnimationFrameCount: function(animationName) {
        return this._sprite
            .getAnimation()
            .getAnimationData()
            .getMovement(animationName).duration;
    },

    initBloodSprite: function() {
        var ui = ccs.uiReader.widgetFromJsonFile(res.blood_json);
        //		ui.setPosition(-120, 460);
        ui.runAction(cc.scaleTo(0, 1.5, 1));
        ui.bloodBar = ccui.helper.seekWidgetByName(ui, 'blood-progress');
        ui.bloodBar.setPercent(100);

        ui.originalBlood = this._blood; // 设定原始血量

        this._bloodSprite = ui;
        this.addChild(ui);
    },
    setBloodSpritePosition: function(x, y) {
        this._bloodSprite.setPosition(x, y);
    },
    setBloodScale: function(scaleX, scaleY) {
        this._bloodSprite.runAction(cc.scaleTo(0, scaleX, scaleY));
    },

    setScale: function(scale) {
        if (scale !== undefined) {
            this._scale = scale;
            this.runAction(cc.scaleTo(0, this._scale, this._scale));
        }
        this.runAction(cc.scaleTo(0, this._scale, this._scale));
    },

    setDirectionFront: function() {
        var sprite = this.getSprite();
        var front = 1,
            x = 0;

        if (this._direction == EnumType.DIRECTION2D.LEFT) {
            front = -1;
            x = sprite.width;
        }

        var cb = cc.sequence(
            cc.scaleTo(0, front, 1),
            cc.callFunc(function() {
                sprite.setPositionX(x);
            }, this)
        );
        sprite.runAction(cb);
    },

    setDirectionReverse: function() {
        var sprite = this.getSprite();
        var reverse = -1,
            x = sprite.width;

        if (this._direction == EnumType.DIRECTION2D.LEFT) {
            reverse = 1;
            x = -sprite.width;
        }

        var cb = cc.sequence(
            cc.scaleTo(0, reverse, 1),
            cc.callFunc(function() {
                sprite.setPositionX(sprite.getPositionX() + x);
            }, this)
        );
        sprite.runAction(cb);
    },

    update: function(dt) {
        this._controller.update(dt);
    }
});
