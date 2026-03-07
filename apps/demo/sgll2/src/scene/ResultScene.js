var ResultScene = BaseScene.extend({
    result: '',

    ctor: function() {
        this._super();
    },

    init: function(msg) {
        this.result = msg;

        // Create the label
        var text = new ccui.Text();
        text.attr({
            string: this.result,
            font: '30px AmericanTypewriter',
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + text.height / 4
        });
        this.addChild(text);

        // Create the button
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(
            'res/testButton/animationbuttonnormal.png',
            'res/testButton/animationbuttonpressed.png',
            ''
        );
        button.x = cc.winSize.width / 2.0;
        button.y = cc.winSize.height / 2.0 - 100;
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);
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
                //			cc.log("Touch Up");
                cc.gameController.runScnene(EnumType.SCENE.MAIN);
                break;

            case ccui.Widget.TOUCH_CANCELED:
                //			cc.log("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});
