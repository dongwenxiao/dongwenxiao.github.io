var HeroModel = BaseModel.extend({
    initController: function() {
        this.controller = new HeroController();
        this.controller.init(this);
    }
});
