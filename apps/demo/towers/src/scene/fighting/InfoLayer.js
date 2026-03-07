towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.InfoLayer = cc.Layer.extend({
    parentScene: null,

    ctor: function(parent) {
        this._super();

        this.parentScene = parent;

        this.init();
    }
});
