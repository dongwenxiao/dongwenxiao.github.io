towers.component = towers.component || {};
towers.component.Button = cc.LayerColor.extend({
    displayText: '',
    bgColor: null,
    bgPressedColor: null,
    tapCallback: null,

    txtSprite: null,
    bgSprite: null,
    bgDownSprite: null,

    btnWidth: 0,
    btnHeight: 0,

    container: null,

    ctor: function(
        width,
        height,
        displayText,
        bgColor,
        bgPressedColor,
        callback,
        container
    ) {
        this._super(cc.color.GREEN);

        if (width == undefined) width = 80;

        if (height == undefined) {
            height = 60;
        }

        if (bgColor == undefined) bgColor = cc.color.BLUE;

        if (bgPressedColor == undefined) bgPressedColor = cc.color.GREEN;

        if (callback) this.tapCallback = callback;

        if (container) this.container = container;

        this.width = width;
        this.height = height;
        this.displayText = displayText;
        this.bgColor = bgColor;
        this.bgPressedColor = bgPressedColor;

        this.init();
    },

    onExit: function() {
        cc.eventManager.removeListener(this.listener);
    },

    init: function() {
        me = this;

        // enable anchor
        this.ignoreAnchorPointForPosition(false);

        // 文字
        if (this.txtSprite == null) {
            this.txtSprite = cc.LabelTTF.create(this.displayText, 'SimHei', 16);
            // this.txtSprite.enableStroke(cc.color("623508"),2);
            this.txtSprite.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: me.width / 2,
                y: me.height / 2
            });
        }
        this.setColor(this.bgColor);
        this.addChild(this.txtSprite);

        this.initEvent();
    },

    setDisplayText: function(string) {
        this.txtSprite.string = string;
    },

    initEvent: function() {
        var me = this;
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                );

                var rect = cc.rect(0, 0, target.width, target.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.setColor(target.bgPressedColor);
                    return true; // 不再向下传递
                }
                return false; // 继续向下传递
            },
            onTouchMoved: function(touch, event) {
                // console.log("move")

                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                );

                var rect = cc.rect(0, 0, target.width, target.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.setColor(target.bgPressedColor);
                    // return true;	// 不再向下传递
                } else {
                    target.setColor(target.bgColor);
                }
                // return false;	// 继续向下传递
            },
            onTouchEnded: function(touch, event) {
                // console.log("end")

                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                );

                var rect = cc.rect(0, 0, target.width, target.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    var target = event.getCurrentTarget();
                    target.setColor(target.bgColor);
                    if (target.tapCallback != null) {
                        target.tapCallback(touch, event);
                    }
                }
            },
            onTouchCancelled: function(touch, event) {
                // console.log("cancel")
                // var target = event.getCurrentTarget();
                // target.setDisplayUp();
            }
        });

        if (this.container) {
            this.container.addEvent(this.listener, this);
        } else {
            cc.eventManager.addListener(this.listener, this);
        }
    }
});
