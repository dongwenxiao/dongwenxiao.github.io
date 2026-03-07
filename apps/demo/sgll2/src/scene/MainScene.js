var MainScene = BaseScene.extend({
    initBlood: function() {
        var root = ccs.uiReader.widgetFromJsonFile(res.blood_json);
        this.addChild(root, 11);

        this._loadingBar_right_to_left = ccui.helper.seekWidgetByName(
            root,
            'blood-progress'
        );
        this._loadingBar_right_to_left.setPercent(50);
        window.bbb = this._loadingBar_right_to_left;
    },

    init: function() {
        this._super();

        //		this.initBlood();// for test

        var ui = ccs.uiReader.widgetFromJsonFile(res.main_scene_ui_json);
        ui.runAction(cc.scaleTo(0, 2, 2));
        this.addChild(ui, 10);

        var missionButton = ccui.helper.seekWidgetByName(ui, 'Button_2_0');
        missionButton.addTouchEventListener(this.touchEvent, this);
    },

    touchEvent: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //			cc.log("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                //			cc.log("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                cc.gameController.runScnene(EnumType.SCENE.MISSION);
                //cc.log("Touch Up");
                break;

            case ccui.Widget.TOUCH_CANCELED:
                //			cc.log("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});
