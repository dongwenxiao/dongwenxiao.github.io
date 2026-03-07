var BaseController = cc.Node.extend({
    /**
     * 当前控制主角
     */
    _model: null,
    getModel: function() {
        return this._model;
    },

    /**
     * 当前视图
     */
    //	_view:null,
    getView: function() {
        return this._model.getView();
    },

    /**
     * 当前配置的主角
     * @param idol
     */
    ctor: function(model) {
        this._model = model;
    }
});
