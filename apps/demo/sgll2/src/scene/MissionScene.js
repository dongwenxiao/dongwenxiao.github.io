var MissionScene = BaseScene.extend({
    playButton: null,
    backButton: null,

    init: function() {
        this._super();

        var ui = ccs.uiReader.widgetFromJsonFile(res.mission_scene_ui_json);
        ui.runAction(cc.scaleTo(0, 2, 2));
        this.addChild(ui, 10);

        var playButton = ccui.helper.seekWidgetByName(ui, 'Button_24');
        playButton.addTouchEventListener(this.touchEvent, this);
        this.playButton = playButton;

        var backButton = ccui.helper.seekWidgetByName(ui, 'Button_24_0');
        backButton.addTouchEventListener(this.touchEvent, this);
        this.backButton = backButton;
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
                if (sender == this.playButton) {
                    cc.gameController.runScnene(EnumType.SCENE.TEAM_SET);
                }

                if (sender == this.backButton) {
                    cc.gameController.runScnene(EnumType.SCENE.MAIN);
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:
                //			cc.log("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});
