var BaseScene = cc.Scene.extend({
    /**
     * 场景控制器
     */
    _controller: null,
    getController: function() {
        return this._controller;
    },

    /**
     * 场景默认3层
     * 背景层
     * 动画层
     * 控制层
     */
    _bgLayer: null,
    getBGLayer: function() {
        return this._bgLayer;
    },
    _animationLayer: null,
    getAnimationLayer: function() {
        return this._animationLayer;
    },
    _controlLayer: null,
    getControllerLayer: function() {
        return this._controlLayer;
    }
});

var BaseLayer = cc.Layer.extend({});
