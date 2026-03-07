var ResultScene = BaseScene.extend({
    result: '',

    ctor: function(msg) {
        this._super();

        this.result = msg;

        // label
        var fontDef = new cc.FontDefinition();
        fontDef.fontName = 'Arial';
        fontDef.fontSize = '32';
        this.txt = new cc.LabelTTF(this.result, fontDef);
        this.txt.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 80);
        this.addChild(this.txt);

        // Create the button
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(
            'res/animationbuttonnormal.png',
            'res/animationbuttonpressed.png',
            ''
        );
        button.x = cc.winSize.width / 2.0;
        button.y = cc.winSize.height / 2.0;
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);
    },

    touchEvent: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log('Touch Down');
                break;

            case ccui.Widget.TOUCH_MOVED:
                cc.log('Touch Move');
                break;

            case ccui.Widget.TOUCH_ENDED:
                cc.log('Touch Up');
                cc.director.runScene(new HelloWorldScene());
                cc.gameController = new GameController();
                break;

            case ccui.Widget.TOUCH_CANCELED:
                cc.log('Touch Cancelled');
                break;

            default:
                break;
        }
    }
});
