cm.Pillar = cc.LayerColor.extend({
    ctor: function(height, type) {
        this._super();

        this.width = 30;
        this.height = height;
        this.type = type;

        if (type == 'bad') this.setColor(cc.color.RED);
        else this.setColor(cc.color('#9291D2'));

        this.ignoreAnchorPointForPosition(false);
    }
});
