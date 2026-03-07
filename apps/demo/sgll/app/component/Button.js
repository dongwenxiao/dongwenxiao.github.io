var Button = cc.Layer.extend({
    displayText: '',
    bg: null,
    bgDown: null,
    tapCallback: null,

    txtSprite: null,
    bgSprite: null,
    bgDownSprite: null,

    btnWidth: 0,
    btnHeight: 0,

    ctor: function(txt, bg, bgDown, callback, lisenerType) {
        this._super();

        // default value
        if (txt != undefined) {
            if (typeof txt === 'string') {
                this.displayText = txt;
            } else {
                this.txtSprite = txt;
            }
        }

        if (bg == undefined) this.bg = res.img_bigbtnbg_png;
        else this.bg = bg;
        if (bgDown == undefined) this.bgDown = res.img_bigbtnbgdown_png;
        else this.bgDown = bgDown;

        if (callback) this.tapCallback = callback;

        if (lisenerType) this.lisenerType = lisenerType;
        else this.lisenerType = cc.EventListener.TOUCH_ONE_BY_ONE;
        // this.btnWidth = 164;
        // this.btnHeight = 100;

        this.init();
    },

    init: function() {
        this.bgSprite = new cc.Sprite(this.bg);
        this.bgSprite.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        // 根据按钮图大小设置按钮尺寸
        var contentSize = this.bgSprite.getContentSize();
        this.btnWidth = contentSize.width;
        this.btnHeight = contentSize.height;

        //
        this.attr({
            width: this.btnWidth,
            height: this.btnHeight
        });

        this.bgSprite.attr({
            width: this.btnWidth,
            height: this.btnHeight
        });

        this.addChild(this.bgSprite);

        this.bgDownSprite = new cc.Sprite(this.bgDown);
        this.bgDownSprite.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            width: this.btnWidth,
            height: this.btnHeight
        });
        this.bgDownSprite.setVisible(false);
        this.addChild(this.bgDownSprite);

        // 文字
        if (this.txtSprite == null) {
            this.txtSprite = cc.LabelTTF.create(this.displayText, 'SimHei', 50);
            this.txtSprite.enableStroke(cc.color('623508'), 2);
            this.txtSprite.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this.btnWidth / 2,
                y: this.btnHeight / 2
            });
        }

        this.addChild(this.txtSprite, 20);
    },

    onEnter: function() {
        this._super();
        this.initEvent();
    },

    // 自定义文字对象
    setTextSprite: function(sprite) {
        this.txtSprite = sprite;
    },

    setDisplayUp: function() {
        this.bgSprite.setVisible(true);
        this.bgDownSprite.setVisible(false);
    },

    setDisplayDown: function() {
        this.bgSprite.setVisible(false);
        this.bgDownSprite.setVisible(true);
    },

    setTapCallback: function(callback) {
        // !!!! 由于用了  TOUCH_ALL_AT_ONCE 事件，使用tableview的索引回调实现方法，此回调无法到达
        this.tapCallback = callback;
    },

    initEvent: function() {
        var me = this;
        var listener = null;

        if (this.lisenerType == cc.EventListener.TOUCH_ONE_BY_ONE) {
            listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(
                        touch.getLocation()
                    );
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        target.setDisplayDown();
                        return true; // 不再向下传递
                    }
                    return false; // 继续向下传递
                },
                onTouchMoved: function(touch, event) {
                    // console.log("move")
                    // return false;	// 继续向下传递
                    // return true; 	// 不再向下传递
                },
                onTouchEnded: function(touch, event) {
                    // console.log("end")
                    var target = event.getCurrentTarget();
                    target.setDisplayUp();
                    if (target.tapCallback != null) {
                        target.tapCallback(touch, event);
                    }
                },
                onTouchCancelled: function(touch, event) {
                    // console.log("cancel")
                    var target = event.getCurrentTarget();
                    target.setDisplayUp();
                }
            });
        }

        if (this.lisenerType == cc.EventListener.TOUCH_ALL_AT_ONCE) {
            listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                swallowTouches: true,
                onTouchesBegan: function(touches, event) {
                    var touch = touches[0];

                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(
                        touch.getLocation()
                    );
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        target.setDisplayDown();
                        // return true;	// 不再向下传递
                    }
                    return false; // 继续向下传递
                },
                onTouchesMoved: function(touches, event) {
                    // console.log("move")
                    return false; // 继续向下传递
                    // return true; 	// 不再向下传递
                },
                onTouchesEnded: function(touches, event) {
                    // console.log("end")
                    var target = event.getCurrentTarget();
                    target.setDisplayUp();
                    if (target.tapCallback != null) {
                        target.tapCallback(touches, event);
                    }
                },
                onTouchesCancelled: function(touches, event) {
                    // console.log("cancel")
                    var target = event.getCurrentTarget();
                    target.setDisplayUp();
                }
            });
        }

        if (listener != null) cc.eventManager.addListener(listener, this);
    }
});
