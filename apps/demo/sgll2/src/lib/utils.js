(function() {
    /**
     * 计算两点间距离
     * @param pos1 点1
     * @param pos2 点2
     * @returns 距离
     */
    window.Math.distance = function(pos1, pos2) {
        var x1 = pos1.x;
        var y1 = pos1.y;

        var x2 = pos2.x;
        var y2 = pos2.y;
        // x的2次方和y的2次方
        var xx = Math.pow(Math.abs(x1 - x2), 2);
        var yy = Math.pow(Math.abs(y1 - y2), 2);
        // 算出两点距离
        var distance = Math.sqrt(xx + yy);

        return distance;
    };

    /**
     * 生成随机整数
     */
    (window.Math.randomInt = function(min, max) {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        var range = max - min;
        var rand = Math.random();
        return min + Math.round(rand * range);
    }),
        /**
         * 移除数组中的某一项
         */
        (window.Array.prototype.removeItem = function(item) {
            var array = this;
            if (array.length == 0) return;
            for (var i = 0; i < array.length; i++) {
                var _item = array[i];
                if (_item == item) {
                    array = array
                        .slice(0, i)
                        .concat(array.slice(i + 1, this.length));
                }
            }
            return array;
        });
})();
