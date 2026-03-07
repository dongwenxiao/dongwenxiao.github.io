var BaseView = cc.Layer.extend({
    /**
     * 当前模型
     */
    _model: null,
    getModel: function() {
        return this._model;
    },

    /**
     * 当前控制器
     */
    //	_controller:null,
    getController: function() {
        return this._model.getController();
    },

    /**
     * 当前配置的主角
     * @param idol
     */
    ctor: function(model) {
        this._super();

        this._model = model;
    }
});
