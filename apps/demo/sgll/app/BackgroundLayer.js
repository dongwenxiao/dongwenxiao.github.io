var BackgroundLayer = cc.Layer.extend({
    onEnter: function() {
        this._super();

        this.initBroadcast();
        this.initBackgroundImage();
        // this.initBottomComponents();

        // this.playBgMusic();
    },

    initBroadcast: function() {
        var cast = new cc.Sprite(res.img_broadcast_png);
        cast.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height,
            width: cc.winSize.width
        });

        this.addChild(cast);
    },

    initBackgroundImage: function() {
        var bg = new cc.Sprite(res.img_mainbg_jpg);
        bg.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height - 48 - 110
        });

        this.addChild(bg, 0);
    },

    initBottomComponents: function() {
        var bottomBg = new cc.Sprite(res.img_bottombg_png);
        bottomBg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        this.addChild(bottomBg, 1);
    },

    playBgMusic: function() {
        var url = res.audio_bgmusic_mp3,
            loop = true;
        cc.audioEngine.playMusic(url, loop);
    }
});
