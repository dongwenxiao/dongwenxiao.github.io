towers.controller.Scene = cc.Node.extend({
    // currentScene: null,
    preScene: null,

    runScene: function(sceneName) {
        var me = this;
        switch (sceneName) {
            case 'FightingScene':
                var resList = this.kvToList(g_resSheet.FightingScene);
                var callback = function() {
                    var s = new towers.scene.fighting.Scene();
                    s.init(towers.user);
                    cc.director.runScene(s);

                    // cache scene
                    me.preScene = me.currentScene;
                    me.currentScene = s;
                };
                cc.LoaderScene.preload(resList, callback);
                break;

            case 'MapScene':
                var resList = this.kvToList(g_resSheet.MapScene);
                var callback = function() {
                    cc.director.runScene(new MapScene());
                };
                cc.LoaderScene.preload(resList, callback);
                break;

            default:
                break;
        }
    },

    restartScene: function(sceneName) {
        var me = this;
        switch (sceneName) {
            case 'FightingScene':
                var s = new towers.scene.fighting.Scene();
                s.init(towers.user);
                cc.director.runScene(s);

                delete me.currentScene;

                // cache scene
                // me.preScene = me.currentScene;
                // me.currentScene = s;
                break;
        }
    },

    restartFightingScene: function() {
        this.restartScene('FightingScene');
    },

    runFightingScene: function() {
        this.runScene('FightingScene');
    },

    runMapScene: function() {
        this.runScene('MapScene');
    },

    // use to convert obj resource to array resource list.
    kvToList: function(kv) {
        var list = [];
        for (var k in kv) {
            list.push(kv[k]);
        }
        return list;
    }
});
