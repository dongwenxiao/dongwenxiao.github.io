(function(win, undefined) {
    // namespace : codemonkey/game/basketball
    var codemonkey = (win.codemonkey = {});
    codemonkey.game = {};
    var game = (win.bb = codemonkey.game.basketball = {});

    // base function
    game.init = function() {
        var gameScene = new GameScene();
        cc.director.runScene(gameScene);
    };

    game.start = function() {};

    game.restart = function() {};

    game.pause = function() {};

    game.over = function() {};
})(window, undefined);
