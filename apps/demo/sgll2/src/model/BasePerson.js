var BasePerson = BaseModel.extend({
    //---------------------------------------------------------------------------

    attackMin: 0, // 最小攻击
    attackMax: 0, // 最大攻击
    defenceMin: 0, // 最小防御
    defenceMax: 0, // 最大防御

    speed: 0,

    direction: true, // ture：向右 false：向左

    /**
     * 动画对象，一般包含如下
     * loading 		站立
     * run  		跑
     * attack		攻击
     * smitten		被打
     * death		死亡
     */

    animation: null,
    animationTime: 0, // 播放时长
    animationDelay: 0, // 间隔时长
    animationResourcePng: null,
    animationResourcePlist: null,
    animationResourceJson: null,
    animationName: null,

    /**
     * 重写方法
     */

    init: function(
        attackMin,
        attackMax,
        defenceMin,
        defenceMax,
        positionX,
        positionY,
        direction,
        animationPng,
        animationPlist,
        animationJson,
        animationName
    ) {
        this._super();

        this.attackMin = attackMin;
        this.attackMax = attackMax;
        this.defenceMin = defenceMin;
        this.defenceMax = defenceMax;
        //		this.positionX = positionX;
        //		this.positionY = positionY;
        this.direction = direction;

        this.speed = 100;

        // 创建精灵对象
        this.initSprite(positionX, positionY);

        // 初始化动画
        this.animationResourcePng = animationPng;
        this.animationResourcePlist = animationPlist;
        this.animationResourceJson = animationJson;
        this.animationName = animationName;
        this.initAnimation(
            animationPng,
            animationPlist,
            animationJson,
            animationName
        );

        // 初始化控制器
        this.controller = new HeroController(this);
        this.scheduleUpdate();
    },

    initSprite: function(positionX, positionY) {
        this.sprite = new cc.Sprite();
        this.sprite.setPositionX(positionX);
        this.sprite.setPositionY(positionY);
        this.sprite.setScale(0.5, 0.5);

        // 是否反转
        if (!this.direction) {
            var reverse = cc.scaleTo(0, -1, 1);
            this.sprite.runAction(reverse);
        }

        this.addChild(this.sprite);
    },

    initAnimation: function(png, plist, json, name) {
        ccs.armatureDataManager.addArmatureFileInfo(png, plist, json);
        this.animation = ccs.Armature.create(name);

        // 动画添加到精灵上
        this.sprite.addChild(this.animation);

        // 设置默认状态
        this.setAnimationStatus(EnumType.PERSON_STATUS.LOADING);
    },

    /**
     * 自定义方法
     */

    // 改变当前人物状态动画
    // status  是个枚举  EnumType.PERSON_STATUS
    setAnimationStatus: function(status) {
        var a = this.animation.getAnimation().play(status);

        //		var delay = cc.delayTime(0.25);
        //		var action = cc.sequence(a, delay).repeatForever();
        //		this.animation.runAction(action);

        //		switch(status){
        //			case EnumType.PERSON_STATUS.LOADING:
        //				animate.play("loading");
        //				break;
        //			case EnumType.PERSON_STATUS.RUN:
        //				animate.play("run");
        //				break;
        //			case EnumType.PERSON_STATUS.ATTACK:
        //				animate.play("run");
        //				break;
        //			case EnumType.PERSON_STATUS.RUN:
        //				animate.play("run");
        //				break;
        //			default:
        //				animate.play("loading");
        //				break;
        //		}
    },

    update: function(dt) {
        this.controller.update(dt);
    }
});
