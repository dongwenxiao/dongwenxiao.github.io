var BaseProcess = cc.Layer.extend({
    left2right: true, // 从左到右显示

    percent: 0, // 百分比
    borderSprrite: null,
    bgSprite: null, // 背景
    processSprite: null, // 上面显示的进度
    processSprite_top: null,
    processSprite_bottom: null,
    textSprite: null, // 中间显示的文字

    init: function(width, height, bgImg) {
        this._super();

        // set container
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            width: width,
            height: height
        });

        // init bg
        this.bgSprite = new cc.LayerColor(cc.color('#693400'));
        this.bgSprite.attr({
            anchorX: 0,
            anchorY: 0,
            x: 10,
            y: 2,
            width: width - 20,
            height: height - 4
        });
        this.addChild(this.bgSprite, 0);

        // init border
        this.borderSprrite = new cc.Sprite(bgImg);
        this.borderSprrite.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this.addChild(this.borderSprrite, 11);

        // init process
        this.initProcessGradient(width, height);

        // init txt
        this.textSprite = cc.LabelTTF.create('1097/1154', 'Arial', 24);
        this.textSprite.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: width / 2,
            y: height / 2 - 1
        });
        this.addChild(this.textSprite, 20);
    },

    initProcessGradient: function(width, height) {
        this.processSprite = new cc.Layer();

        var start = cc.color('#FF6600'),
            end = cc.color('#ffa468'),
            v = cc.p(0, -1),
            x = 10,
            y = 18;

        // 上一半
        var processTop = new cc.LayerGradient(start, end, v);
        processTop.attr({
            anchorX: 0,
            anchorY: 0,
            x: x,
            y: y,
            width: width - 20,
            height: 13
        });

        this.processSprite.addChild(processTop);
        this.processSprite_top = processTop;

        // 下一半
        var processBottom = new cc.LayerGradient(end, start, v);
        processBottom.attr({
            anchorX: 0,
            anchorY: 0,
            x: x,
            y: y - 13,
            width: width - 20,
            height: 13
        });

        this.processSprite.addChild(processBottom);
        this.processSprite_bottom = processBottom;

        // 加入容器
        this.addChild(this.processSprite, 10);
        return this.processSprite;
    },

    setPercent: function(percent) {
        this.processSprite_top.setScaleX(percent / 100);
        this.processSprite_bottom.setScaleX(percent / 100);
    },

    setText: function(string) {
        this.textSprite.setString(string);
    }
});

var LongProcess = BaseProcess.extend({
    displayW: 224,
    displayH: 36,

    init: function() {
        this._super(this.displayW, this.displayH, res.img_longprocess_png);
    }
});

var MiddleProcess = BaseProcess.extend({
    displayW: 181,
    displayH: 36,

    init: function() {
        this._super(this.displayW, this.displayH, res.img_middleprocess_png);
    }
});
