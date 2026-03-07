towers.model.base.Enemy = cc.LayerColor.extend({
    parentLayer: null,

    blood: 0,
    speed: 0,
    money: 0,
    waypoints: [],
    virtualRadius: null,

    isAway: false, // 是否已跑到终点

    displayBlood: null,
    // isPause: false,

    defaultColor: cc.color.RED,
    effectColor: cc.color('#9291D2'),

    ctor: function(parent) {
        this._super(cc.color.RED);

        this.parentLayer = parent;

        this.attr({
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.width = 30;
        this.height = 30;
    },

    init: function(config) {
        // enable anchor
        this.ignoreAnchorPointForPosition(false);

        if (undefined == config) return;

        this.x = config.x;
        this.y = config.y;

        this.name = config.name;

        this.blood = config.blood;
        this.speed = config.speed;
        this.money = config.money;
        this.waypoints = config.waypoints;

        // init move point
        this._movePoint = config.waypoints[0];
        this._movePointIndex = 0;

        this.displayBlood();

        this.virtualRadius = this.getBoundingBox().width / 2;
    },

    onEnter: function() {
        cc.LayerColor.prototype.onEnter.call(this);

        // this.scheduleUpdate();
        // cc.director.getScheduler().scheduleUpdateForTarget(this, 0, false);
    },

    // run: function(){
    // this.scheduleUpdate();
    // cc.director.getScheduler().scheduleUpdateForTarget(this, 0, false);
    // },

    _movePoint: null,
    _movePointIndex: 0,
    _nextPoint: function() {
        this._movePointIndex++;
        this._movePoint = this.waypoints[this._movePointIndex];
        // return undefined == this._movePoint;	// return true 表示没有下一点了
    },
    move: function(dt) {
        if (undefined == this._movePoint) return;
        //
        var speed = this.speed;
        // 目标点
        var mx = this._movePoint.x;
        var my = this._movePoint.y;
        // 当前对象点
        var x = this.x;
        var y = this.y;
        // 向量距离
        var distanceX = mx - x;
        var distanceY = my - y;
        // 向量方向
        var flagX = distanceX > 0 ? 1 : -1;
        var flagY = distanceY > 0 ? 1 : -1;
        // 路程
        var pathX = dt * speed;
        var pathY = dt * speed;
        // 判断移动距离
        var absDistanceX = Math.abs(distanceX);
        if (pathX > absDistanceX) {
            pathX = absDistanceX;
        }
        var absDistanceY = Math.abs(distanceY);
        if (pathY > absDistanceY) {
            pathY = absDistanceY;
        }
        // 设置移动后的位置
        this.x += flagX * pathX;
        this.y += flagY * pathY;
    },

    onBeated: function(attack) {
        if (this.blood >= attack) {
            this.blood -= attack;
        } else {
            this.blood = 0;
        }

        this.updateBlood();

        if (this.blood <= 0) {
            if (undefined != this.parent) this.parent.removeChild(this);
        }
    },

    // 被减速
    _preSpeed: 0,
    _surplusSustain: 0,
    _hasEffect: false,
    onDecelerate: function(cutRate, sustain) {
        // cutRate减少百分比速度，sustain 持续时间s
        this._preSpeed != 0 || (this._preSpeed = this.speed);
        if (!this._hasEffect) {
            this.speed = (this.speed * (1 - cutRate)).toFixed(2);
            this._hasEffect = true;
            this.setColor(this.effectColor);
        }
        this._surplusSustain = sustain;
    },
    _tmpEffectTime: 0,
    _updateDecelerateEffect: function(dt) {
        this._tmpEffectTime += dt;
        if (this._tmpEffectTime >= this._surplusSustain) {
            this.speed = this._preSpeed;
            this._hasEffect = false;
            this.setColor(this.defaultColor);
            this._tmpEffectTime = 0;
        }
    },

    displayBlood: function() {
        var me = this;
        var label = new cc.LabelTTF(this.blood, 'Arial', 15);
        label.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: me.width / 2,
            y: me.height / 2,
            fillStyle: cc.color.WHITE
        });
        this.displayBlood = label;
        this.addChild(label);
    },
    updateBlood: function() {
        this.displayBlood.string = this.blood;
    },

    away: function() {
        this.parentLayer.parentScene.gameInfo.blood--;
        this.parentLayer.parentScene.updateSceneBlood();
        this.isAway = true;
    },

    ai: function(dt) {
        // 走到头 或者 死了
        if (this.isAway || this.blood <= 0) return;

        // 移动
        // 如果到达，取出下一个点
        if (undefined == this._movePoint) {
            // 走到头了
            this.away();
            return;
        }
        if (this.x == this._movePoint.x && this.y == this._movePoint.y) {
            if (this._nextPoint()) return;
        }

        // 减速特效
        if (this._hasEffect) {
            this._updateDecelerateEffect(dt);
        }

        this.move(dt);
    }
});
