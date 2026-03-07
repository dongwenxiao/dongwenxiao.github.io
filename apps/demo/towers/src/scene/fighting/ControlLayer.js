towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.ControlLayer = cc.Layer.extend({
    parentScene: null,

    bloodLabel: null,

    ctor: function(parent) {
        this._super();

        this.parentScene = parent;

        this.init();
    },

    init: function() {
        this.initMenuButton();
        this.initBloodLabel();
        this.initSpeedButton();
        this.initPauseButton();
    },

    initBloodLabel: function() {
        var winSize = cc.winSize;
        var label = new cc.LabelTTF(
            'Blood:' + this.parentScene.gameInfo.blood,
            'Arial',
            20
        );
        label.attr({
            anchorX: 0,
            anchorY: 1,
            x: 50,
            y: winSize.height - 50
        });
        // label.setPosition(size.width / 2, size.height / 2);
        this.parentScene.addChildInfControlLayer(label);
        this.bloodLabel = label;
    },
    updateBloodLabel: function() {
        this.bloodLabel.string = 'Blood:' + this.parentScene.gameInfo.blood;
    },

    initMenuButton: function() {
        var me = this;

        var callback = function() {
            me.parentScene.showMenu();
        };
        var menuButton = new towers.component.Button(
            undefined,
            undefined,
            '菜单',
            undefined,
            undefined,
            callback
        );
        menuButton.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width - 100,
            y: cc.winSize.height - 40
        });
        this.parentScene.addChildInfControlLayer(menuButton);
    },

    initSpeedButton: function() {
        var me = this;

        var callback = function() {
            me.parentScene.gameInfo.speed++;
            var speed = me.parentScene.gameInfo.speed;
            if (speed > 3) {
                me.parentScene.gameInfo.speed = 1;
                speed = 1;
            }
            this.setDisplayText('速度 x' + speed);
        };
        var speedButton = new towers.component.Button(
            undefined,
            undefined,
            '速度 x1',
            undefined,
            undefined,
            callback
        );
        speedButton.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width - 200,
            y: cc.winSize.height - 40
        });
        this.parentScene.addChildInfControlLayer(speedButton);
    },

    initPauseButton: function() {
        var me = this;

        var callback = function() {
            var isPause = me.parentScene.gameInfo.isPause;
            if (isPause) {
                this.setDisplayText('继续');
                me.parentScene.gameContinue();
            } else {
                this.setDisplayText('暂停');
                me.parentScene.gamePause();
            }
        };
        var speedButton = new towers.component.Button(
            undefined,
            undefined,
            '继续',
            undefined,
            undefined,
            callback
        );
        speedButton.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width - 300,
            y: cc.winSize.height - 40
        });
        this.parentScene.addChildInfControlLayer(speedButton);
    }
});
