var BaseSceneController = cc.Node.extend({
    /**
     * 当前场景
     */
    _scene: null,
    getScene: function() {
        return this._scene;
    },

    ctor: function(scene) {
        this._super();

        this._scene = scene;
    }
});
