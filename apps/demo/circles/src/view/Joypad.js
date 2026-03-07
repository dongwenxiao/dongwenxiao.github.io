// Joypad.js

var Joypad = cc.Layer.extend({
    _winSize: null,
    _pCenter: null,
    _pControlSprite: null,
    _pDefaultPoint: null,

    _pDefaultRotation: null,
    _pRotation: null,

    _isTouched: false, // 右侧控制射击方向的手势是否按下状态

    _model: null,

    _isLeftGestureTouched: false, // 左侧手势是否按下状态
    _gestureStartPos: null, // 手势的初始位置点
    _gestureLastAngle: null, // 上一次停顿时候的角度
    _heroStepDistance: 0,
    _heroMoveDone: true, // 英雄一次移动是否走完，走完了才能走下一步
    _isTouchMove: false,

    ctor: function() {
        this._super();
        // var color = cc.color(255,255,255,255),
        // 	width = 10,
        // 	height = 10;

        // this._super(color, 300, 300);

        _winSize = cc.director.getWinSize();
        _pCenter = cc.p(_winSize.width / 2, _winSize.height / 2);
    },
    init: function(model) {
        // this.setPosition(cc.winSize.width - 110,110);

        this._model = model;

        this.scheduleUpdate();

        var bRet = false;
        if (this._super()) {
            // cc.log("Joypad init ..");
            // 控制杆所在位置
            // this._pDefaultPoint = cc.p(cc.winSize.width - 110,110);
            this._pDefaultPoint = cc.p(-1110, 110);
            // 默认旋转角度，以使开口正对右侧
            this._pDefaultRotation = 26;
            // 实际旋转角度
            this._pRotation = 0;

            this.setPosition(this._pDefaultPoint);

            this.addChild(new cc.Sprite(res.Joypad1));
            this.addChild(new cc.Sprite(res.Joypad2));
            this._pControlSprite = new cc.Sprite(res.Joypad3);
            this.addChild(this._pControlSprite);
            this.addChild(new cc.Sprite(res.Joypad4));

            this.updateRotation();

            bRet = true;
        }
        return bRet;
    },

    onEnter: function() {
        this._super();
        var me = this;

        // var listener = cc.EventListener.create({
        // 	event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        // 	swallowTouches: true,
        // 	onTouchesBegan: function (touches, event) {
        // 		// cc.log("touch begin...");

        //          	var touch = me.getRightBottomHandlerTouch(touches);
        //          	if(!touch){
        //          		return false;
        //          	}

        //          	var target = event.getCurrentTarget();

        //          	me._isTouched = true;

        //          	me.updateTouchRotation(touch, event);
        //          	me.updateRotation();
        //          	return true;

        // 	},
        // 	onTouchesMoved:function(touches, event){

        // 		// cc.log("touch move...");

        // 		var touch = me.getRightBottomHandlerTouch(touches);
        // 		if(!touch){
        //          		return false;
        //          	}

        //          	// me._isTouched = true;

        // 		me.updateTouchRotation(touch, event);
        // 		me.updateRotation();
        // 	},
        // 	onTouchesEnded:function (touches, event) {

        // 		// cc.log("touch end...");

        // 		me._isTouched = false;

        // 		if (touches.length <= 0)
        // 			return;
        // 	},
        // 	onTouchesCancelled:function(touches, event){

        // 		// cc.log("touch canceled...");

        // 		me._isTouched = false;

        // 		return false;
        // 	}
        // });

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                // cc.log("touch begin...");

                var touchPos = touch.getLocation();

                // 左侧手势
                if (me.isLeft(touchPos)) {
                    return false; // 新新尝试

                    me._isLeftGestureTouched = true;
                    me._gestureStartPos = touchPos;
                    return true;
                }

                // 右侧手势
                if (me.isRight(touchPos)) {
                    me.showMe(touchPos);

                    me._isTouched = true;

                    me.updateTouchRotation(touch, event);
                    me.updateRotation();
                    return true;
                }

                return false;
            },
            onTouchMoved: function(touch, event) {
                // cc.log("touch move...");

                // var touch = me.getRightBottomHandlerTouch(touches);
                // if(!touch){
                //        		return false;
                //        	}

                // me._isTouched = true;

                var touchPos = touch.getLocation();

                // 右侧手势
                if (me.isRight(touchPos)) {
                    // me._isLeftGestureTouched = true;
                    me.updateTouchRotation(touch, event);
                    me.updateRotation();

                    return true;
                }

                // 左侧手势
                if (me.isLeft(touchPos)) {
                    return false; // 新新尝试

                    // 判断如果x或y 移动大于10px 则认为是有效的手势
                    var tmpPos = cc.pSub(me._gestureStartPos, touchPos);
                    if (Math.abs(tmpPos.x) > 10 || Math.abs(tmpPos.y) > 10) {
                        me._isTouchMove = true;

                        if (me._isLeftGestureTouched) {
                            // 是否按下

                            me._gestureLastAngle = me.caleAngle(
                                me._gestureStartPos,
                                touchPos
                            );
                            me._heroStepDistance = me._model.getStepDistance();
                        }

                        return true;
                    }
                }

                return false;
            },
            onTouchEnded: function(touch, event) {
                // cc.log("touch end...");

                me.hideMe();

                me._isTouched = false;
                me._isLeftGestureTouched = false;
                me._gestureStartPos = null;
                me._isTouchMove = false;
            },
            onTouchCancelled: function(touch, event) {
                // cc.log("touch canceled...");

                me._isTouched = false;
                me._isLeftGestureTouched = false;
                me._gestureStartPos = null;

                return false;
            }
        });

        cc.eventManager.addListener(listener, 1);
    },

    handlerHeroMove: function(angle, radius, callback) {
        var angle = me.caleAngle(me._gestureStartPos, touchPos);
        var radius = me._model.getStepDistance();
        me._model.getView().oneStepAction(angle, radius, function() {
            if (me._isLeftGestureTouched) {
            }
        });
    },

    onExit: function() {},

    isRightBottom: function(pos) {
        if (pos.x > cc.winSize.width / 2 && pos.y < cc.winSize.height / 2) {
            return true;
        }
        return false;
    },

    isRight: function(pos) {
        if (pos.x > cc.winSize.width / 2) {
            return true;
        }
        return false;
    },

    getRightBottomHandlerTouch: function(touches) {
        if (touches) {
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                var pos = touch.getLocation();
                if (this.isRightBottom(pos)) {
                    return touch;
                }
            }
        }
        return false;
    },

    isLeft: function(pos) {
        if (pos.x < cc.winSize.width / 2) {
            return true;
        }
        return false;
    },

    updateTouchRotation: function(touch, event) {
        var curPoint = touch.getLocation();
        var sp = cc.pSub(curPoint, this._pDefaultPoint);
        var angle = cc.pToAngle(sp); // * -57.29577951;
        var rotation = angle * -57.29577951;
        rotation = rotation < 0 ? 360 + rotation : rotation;
        this._pRotation = rotation;
    },

    caleAngle: function(startPos, endPos) {
        var distance = cc.pSub(endPos, startPos);
        var radian = cc.pToAngle(distance);
        var angle = Math.Radian2Angle(radian);
        angle = -(angle - 90); // 向上是0度

        return angle;
    },

    updateRotation: function() {
        var setAngle = this._pDefaultRotation + this._pRotation;

        // cc.log(setAngle - 296);
        this._pControlSprite.setRotation(setAngle);

        if (this._model) {
            var angle = setAngle - 296;
            // var actionR = this._model.getView().rotationToAngle(angle);
            this._model
                .getView()
                .getEquipLayer()
                .setRotation(angle);
            this._model.getView().setLastEquipLayerAngle(angle);
        }
    },

    showMe: function(pos) {
        this._pDefaultPoint = pos;
        this.setPosition(pos);
    },

    hideMe: function() {
        this.setPositionX(-1000);
    },

    _dtTemp: 0,
    update: function(dt) {
        var me = this;

        // 右侧手势逻辑
        if (this._isTouched) {
            this._dtTemp += dt;
            if (this._dtTemp >= 1) {
                this._model.getController().doShoot();
                this._dtTemp = 0;
            }
        }

        // 左侧手势逻辑
        // if(this._isLeftGestureTouched){
        // 	if(me._isTouchMove){
        // 		if(this._heroMoveDone){
        // 			this._heroMoveDone = false;
        // 			this._model.getView().oneStepAction(me._gestureLastAngle,me._heroStepDistance,function(){
        // 				me._heroMoveDone = true;
        // 			});
        // 		}
        // 	}

        // }
    }
});
