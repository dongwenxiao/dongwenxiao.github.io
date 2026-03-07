towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.MenuLayer = cc.Layer.extend({
    parentScene: null,

    layer: null, // 菜单表现层
    layerIsAdd: false,

    ctor: function(parent) {
        this._super();

        this.parentScene = parent;
    },

    init: function() {
        // enable anchor
        this.layer.ignoreAnchorPointForPosition(false);

        var winSize = cc.winSize;
        this.layer.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: winSize.width / 2,
            y: winSize.height / 2,
            width: 300,
            height: 200
        });

        this.initEvent();
        this.initButton();
    },

    showUI: function() {
        if (!this.layerIsAdd) {
            this.layerIsAdd = true;

            this.layer = new cc.LayerColor(cc.color.YELLOW);
            this.init();

            this.parentScene.addChildMenuLayer(this.layer);
        }
    },
    hideUI: function() {
        if (this.layerIsAdd) {
            this.parentScene.removeChildInMenuLayer(this.layer);
            this.layerIsAdd = false;
        }
    },

    initButton: function() {
        var me = this;

        var callback = function() {
            me.parentScene.hideMenu();
        };
        var continueButton = new towers.component.Button(
            undefined,
            undefined,
            '继续',
            undefined,
            undefined,
            callback,
            this.parentScene
        );
        continueButton.attr({
            x: me.layer.width / 2,
            y: me.layer.height / 2 + 35
        });
        this.layer.addChild(continueButton);

        var callback = function() {
            // towers.controller.scene.restartFightingScene();
            me.parentScene.gameRestart();
        };
        var againButton = new towers.component.Button(
            undefined,
            undefined,
            '重玩',
            undefined,
            undefined,
            callback,
            this.parentScene
        );
        againButton.attr({
            x: me.layer.width / 2,
            y: me.layer.height / 2 - 35
        });
        this.layer.addChild(againButton);
    },

    initEvent: function() {
        var me = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                // console.log('MenuLayer start');
                return true;
            },
            onTouchMoved: function(touch, event) {
                // console.log('move');
            },
            onTouchEnded: function(touch, event) {
                //console.log('end');
            },
            onTouchCancelled: function(touch, event) {
                //console.log('cancel');
            }
        });

        this.parentScene.addEvent(listener, this.layer);
        // cc.eventManager.addListener(listener, this.layer);
    }
});
