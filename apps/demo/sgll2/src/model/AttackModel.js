var AttackModel = cc.Node.extend({
    /**
     * 攻击类型
     * 物理、魔法
     */
    _attackType: null,
    getType: function() {
        return this._attackType;
    },

    /**
     * 攻击值
     */
    _attackValue: 0,
    getValue: function() {
        return this._attackValue;
    },

    ctor: function(value, type) {
        this._super();

        this._attackValue = value;
        if (type) {
            this._attackType = type;
        }
    }
});
