var HeroModel = BaseModel.extend({
    /**
     * 配置
     * @returns
     */
    __configControllerClass: function() {
        return HeroController;
    },
    __configViewClass: function() {
        return HeroView;
    },

    /**
     * 属性
     */
    _stepDistance: 50,
    getStepDistance: function() {
        return this._stepDistance;
    },
    setStepDistance: function(distance) {
        this._stepDistance = distance;
    },

    init: function() {
        this._super();
    }
});
