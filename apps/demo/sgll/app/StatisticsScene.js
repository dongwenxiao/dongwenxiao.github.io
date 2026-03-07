var StatisticsScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });

        // var layer = new StatisticsLayer();
        // this.addChild(layer);
    },

    onEnter: function() {
        this._super();

        // 广播初始化
        var broadcast = new Broadcast();
        this.addChild(broadcast);

        // 背景
        var bg = new cc.Sprite(res.img_temp1_jpg);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: Math.convertCCWS(640)
        });
        this.addChild(bg, 0);

        // 底部导航
        var nav = new BottomNav();
        nav.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: Math.convertCCWS(640)
        });
        this.addChild(nav, 100);
    }
});

// var StatisticsLayer = cc.LayerColor.extend({

// 	ctor:function(){
// 		this._super(cc.color.RED);

// 		this.attr({
// 			anchorX:0,
// 			anchorY:0,
// 			x:0,
// 			y:0,
// 			width:cc.winSize.width,
// 			height:cc.winSize.height
// 		})
// 	},

// 	onEnter:function(){
// 		var bg = new cc.Sprite(res.img_temp1_jpg);
// 		bg.attr({
// 			anchorX:0,
// 			anchorY:0,
// 			x:0,
// 			y:0,
// 			scale:Math.convertCCWS(640)
// 		})
// 		this.addChild(bg,0);
// 	}
// })
