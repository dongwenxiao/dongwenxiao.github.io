/**
 *	整个游戏的控制器,在程序启动时候实例化
 */
var GameController = cc.Node.extend({
    /**
     * 全局导演
     */
    _director: null,

    /**
     * 当前场景
     */
    _currentScene: null,
    setCurrentScene: function(scene) {
        this._currentScene = scene;
    },
    getCurrentScene: function() {
        return this._currentScene;
    },

    ctor: function(director) {
        this._director = director;
    },

    runScnene: function(sceneType, msg) {
        var scene = null;

        switch (sceneType) {
            case EnumType.SCENE.MAIN:
                scene = new MainScene();
                scene.init();
                break;
            case EnumType.SCENE.MISSION:
                scene = new MissionScene();
                scene.init();
                break;
            case EnumType.SCENE.TEAM_SET:
                scene = new TeamSetScene();
                scene.init();
                break;
            case EnumType.SCENE.PLAY:
                scene = new PlayScene();
                scene.init();
                scene.getController().init();
                scene.getController().initResource();
                //				scene.getController().test();
                scene.getController().setTeams();
                scene.getController().beginFight();
                break;
            case EnumType.SCENE.RESULT:
                scene = new ResultScene();
                scene.init(msg);
        }

        scene = new cc.TransitionProgressRadialCCW(0.5, scene);
        //		scene.scheduleUpdate(); // todo 设置了为毛不好用，在类里设置就好使~靠
        this._director.runScene(scene);

        this._currentScene = scene;
    }
});
