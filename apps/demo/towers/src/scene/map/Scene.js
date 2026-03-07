towers.scene.map = towers.scene.map || {};
towers.scene.map.Scene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        this.width = 100;
        this.height = 100;

        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create('Map Scene', 'Arial', 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);
    }
});
