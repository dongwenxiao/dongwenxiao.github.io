(function(w) {
    // extension 计算按640 缩放成450 的等比宽度

    w.Math.convertCCW = function(width) {
        return (450 / 640) * width;
    };

    // 计算按1136 缩放成800 的等比宽度
    w.Math.convertCCH = function(height) {
        return (800 / 1136) * height;
    };

    // 缩放比例
    w.Math.convertCCWS = function(width) {
        return 450 / 640;
    };

    // 缩放比例
    w.Math.convertCCHS = function(height) {
        return 800 / 1136;
    };
})(window);
