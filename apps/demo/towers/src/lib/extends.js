(function(window, undefined) {
    // replace by cc.pDistance();
    // window.Math.getDistance = function(pos1, pos2){
    // 	var x = Math.abs(pos1.x - pos2.x),
    // 		y = Math.abs(pos1.y - pos2.y);
    // 	var z = Math.sqrt(x * x + y * y);
    // 	return z;
    // }

    window.Array.prototype.removeObj = function(obj) {
        if (undefined == obj) return this;
        var count = this.length;
        if (count == 0) return this;
        for (var i = 0; i < count; i++) {
            if (this[i] == obj) {
                return this.slice(0, i).concat(this.slice(i + 1, this.length));
            }
        }
    };
})(window, undefined);
