var HeroView = BaseView.extend({
    _heroLayer: null,
    _infoLayer: null,
    _equipLayer: null,
    getEquipLayer: function() {
        return this._equipLayer;
    },

    _lastMoveAction: null, // 最后一次移动动作
    _lastEquipLayerAngle: null, // 最后的装备层角度
    getLastEquipLayerAngle: function() {
        return this._lastEquipLayerAngle;
    },
    setLastEquipLayerAngle: function(angle) {
        this._lastEquipLayerAngle = angle;
    },

    _isFollow: false, // 视窗是否跟随英雄
    setFollow: function(isFollow) {
        this._isFollow = isFollow;
    },

    init: function() {
        this._super();

        this.initLayers();
    },

    /**
     * 初始化3个基本层
     * 英雄层
     * 信息层
     * 装备层
     */
    initLayers: function() {
        var w = this._model.width;
        var h = this._model.height;

        this._heroLayer = new cc.LayerColor(cc.color(0, 0, 0, 0), w, h);
        this._infoLayer = new cc.LayerColor(cc.color(0, 0, 0, 0), w, h);
        this._equipLayer = new cc.LayerColor(cc.color(0, 0, 0, 0), w, h);

        this._model.addChild(this._heroLayer, 0);
        this._model.addChild(this._infoLayer, 10);
        this._model.addChild(this._equipLayer, 100);
    },

    /**
     * 向英雄、信息、装备层添加显示元素
     * @param child
     * @param localZOrder
     * @param tag
     */
    addHeroLayerChild: function(child, localZOrder, tag) {
        this._heroLayer.addChild(child, localZOrder, tag);
    },
    addInfoLayerChild: function(child, localZOrder, tag) {
        this._infoLayer.addChild(child, localZOrder, tag);
    },
    addEquipLayerChild: function(child, localZOrder, tag) {
        this._equipLayer.addChild(child, localZOrder, tag);
    },

    /**
     * 动画 - 移动+跳跃
     * @param direction 方向
     * @param angle	角度
     * @returns
     */
    jumpAnimation: function(stepPos, callback) {
        if (stepPos == undefined) {
            cc.error("stepPos can't be null.");
            return;
        }

        var obj = this._model;

        // default value
        var easeJumpRate = 4,
            easeMoveRate = 1.5,
            sizeRate = 1.2,
            duration = 0.3;

        // action define
        var jump = cc
                .scaleTo(duration, sizeRate, sizeRate)
                .easing(cc.easeInOut(easeJumpRate)),
            down = cc
                .scaleTo(duration, 1, 1)
                .easing(cc.easeInOut(easeJumpRate));

        var jumpAndDown = cc.sequence(jump, down),
            move = cc
                .moveBy(duration * 2, stepPos)
                .easing(cc.easeInOut(easeMoveRate));

        var spawn = cc.spawn(jumpAndDown, move);

        var actionArr = [];
        actionArr.push(spawn);

        if (callback) {
            actionArr.push(cc.callFunc(callback));
        }
        var seq = cc.sequence(actionArr);
        //    	obj.runAction(seq);

        return seq;
    },

    /**
     * 动画 - 向指定点旋转
     */
    rotationAnimation: function(pos) {
        var obj = this._model;

        var distanceX = pos.x - obj.getPositionX(),
            distanceY = pos.y - obj.getPositionY(),
            distance = Math.distance(obj.getPosition(), pos);

        // 旋转角度
        var angle = Math.getAngle(distanceX, distanceY, distance);
        this._lastEquipLayerAngle = angle;

        var rotateTo = new cc.RotateTo(0.2, angle);

        var seq = cc.sequence(rotateTo);

        this._equipLayer.runAction(seq);

        return seq;
    },

    rotationToAngle: function(angle) {
        this._lastEquipLayerAngle = angle;

        var rotateTo = new cc.RotateTo(0.2, angle);

        var seq = cc.sequence(rotateTo);

        this._equipLayer.runAction(seq);

        return seq;
    },

    __convertPos: function(heroPos, clickPos, winWidth, winHeight) {
        // 1.
    },

    /**
     * 动画 - 移动队列
     */
    moveSequence: function(pos) {
        if (pos == undefined) {
            cc.error("pos can't be null.");
            return;
        }

        if (this._isFollow) {
            var mpos = this._model.getPosition();
            pos.x = mpos.x - cc.winSize.width + pos.x;
            pos.y = mpos.y - cc.winSize.height + pos.y;
        }

        // cc.log(pos);

        var me = this,
            obj = this._model,
            actionArr = [];

        var radius = obj.getStepDistance();

        // 停止之前的步骤
        if (this._lastMoveAction && !this._lastMoveAction.isDone()) {
            obj.stopAction(this._lastMoveAction);
        }

        // 计算出 x y z
        var distanceX = pos.x - obj.getPositionX(),
            distanceY = pos.y - obj.getPositionY(),
            distance = Math.distance(obj.getPosition(), pos);

        // 计算出 旋转角度(弧度)
        var angle = Math.getAngle(distanceX, distanceY, distance);

        // 每步递增的x 和 y
        var stepX = Math.sin(Math.Angle2Radian(angle)) * radius,
            stepY = Math.cos(Math.Angle2Radian(angle)) * radius;

        // 步数（整步）
        var stepCount = 0;
        if (distance > radius) {
            stepCount = parseInt(distance / radius);
        }
        var lastStep = distance % radius;

        // 调整方向
        // actionArr.push(
        // 	cc.callFunc(function(){
        // 	    me.rotationAnimation(pos);
        // 	})
        // );

        // 预置步骤
        var currentObjX = obj.getPositionX(),
            currentObjY = obj.getPositionY();
        for (var i = 0; i < stepCount; i++) {
            var actionJump = me.jumpAnimation(cc.p(stepX, stepY));
            actionArr.push(actionJump);
        }

        // 如果最后一步（非整步）
        if (lastStep > 0) {
            var stepX = Math.sin((angle * 2 * Math.PI) / 360) * lastStep;
            var stepY = Math.cos((angle * 2 * Math.PI) / 360) * lastStep;
            var actionJump = me.jumpAnimation(cc.p(stepX, stepY));
            actionArr.push(actionJump);
        }

        var seq = cc.sequence(actionArr);
        this._lastMoveAction = obj.runAction(seq);

        return seq;
    },

    oneStepAction: function(angle, radius, callback) {
        // cc.log("angle:"+angle+"     radius:"+radius+"  ")

        var stepX = Math.sin(Math.Angle2Radian(angle)) * radius,
            stepY = Math.cos(Math.Angle2Radian(angle)) * radius;
        var actionJump = this.jumpAnimation(cc.p(stepX, stepY), callback);
        this._lastMoveAction = this._model.runAction(actionJump);
        return actionJump;
    }
});
