/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function() {
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //    var failCount = 0;
    //    var maxFailCount = 3;   //最大错误重试次数
    //
    //
    //    /**
    //     * 自动更新js和资源
    //     */
    //    var AssetsManagerLoaderScene = cc.Scene.extend({
    //    	_am:null,
    //    	_progress:null,
    //    	_percent:0,
    //    	run:function(){
    //    		if (!cc.sys.isNative) {
    //    			this.loadGame();
    //    			return;
    //    		}
    //
    //    		var layer = new cc.Layer();
    //    		this.addChild(layer);
    //    		this._progress = new cc.LabelTTF.create("update 0%", "Arial", 12);
    //    		this._progress.x = cc.winSize.width / 2;
    //    		this._progress.y = cc.winSize.height / 2 + 50;
    //    		layer.addChild(this._progress);
    //
    //    		var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
    //
    //    		this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
    //    		this._am.retain();
    //
    //    		if (!this._am.getLocalManifest().isLoaded())
    //    		{
    //    			cc.log("Fail to update assets, step skipped.");
    //    			this.loadGame();
    //    		}
    //    		else
    //    		{
    //    			var that = this;
    //    			var listener = new cc.EventListenerAssetsManager(this._am, function(event) {
    //    				switch (event.getEventCode()){
    //    				case cc.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
    //    					cc.log("No local manifest file found, skip assets update.");
    //    					that.loadGame();
    //    					break;
    //    				case cc.EventAssetsManager.UPDATE_PROGRESSION:
    //    					that._percent = event.getPercent();
    //    					cc.log(that._percent + "%");
    //    					var msg = event.getMessage();
    //    					if (msg) {
    //    						cc.log(msg);
    //    					}
    //    					break;
    //    				case cc.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
    //    				case cc.EventAssetsManager.ERROR_PARSE_MANIFEST:
    //    					cc.log("Fail to download manifest file, update skipped.");
    //    					that.loadGame();
    //    					break;
    //    				case cc.EventAssetsManager.ALREADY_UP_TO_DATE:
    //    					cc.log("ALREADY_UP_TO_DATE.");
    //    					that.loadGame();
    //    					break;
    //    				case cc.EventAssetsManager.UPDATE_FINISHED:
    //    					cc.log("Update finished.");
    //    					that.loadGame();
    //    					break;
    //    				case cc.EventAssetsManager.UPDATE_FAILED:
    //    					cc.log("Update failed. " + event.getMessage());
    //    					failCount++;
    //    					if (failCount < maxFailCount)
    //    					{
    //    						that._am.downloadFailedAssets();
    //    					}
    //    					else
    //    					{
    //    						cc.log("Reach maximum fail count, exit update process");
    //    						failCount = 0;
    //    						that.loadGame();
    //    					}
    //    					break;
    //    				case cc.EventAssetsManager.ERROR_UPDATING:
    //    					cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
    //    					that.loadGame();
    //    					break;
    //    				case cc.EventAssetsManager.ERROR_DECOMPRESS:
    //    					cc.log(event.getMessage());
    //    					that.loadGame();
    //    					break;
    //    				default:
    //    					break;
    //    				}
    //    			});
    //
    //    			cc.eventManager.addListener(listener, 1);
    //    			this._am.update();
    //    			cc.director.runScene(this);
    //    		}
    //
    //    		this.schedule(this.updateProgress, 0.5);
    //    	},
    //
    //    	loadGame:function(){
    //    		//jsList是jsList.js的变量，记录全部js。
    //    		cc.loader.loadJs(["src/jsList.js"], function(){
    //    			cc.loader.loadJs(jsList, function(){
    //    				cc.director.runScene(new PlayScene());
    //    			});
    //    		});
    //    	},
    //
    //    	updateProgress:function(dt){
    //    		this._progress.string = "update" + this._percent + "%";
    //    	},
    //
    //    	onExit:function(){
    //    		cc.log("AssetsManager::onExit");
    //
    //    		this._am.release();
    //    		this._super();
    //    	}
    //    });
    //
    //
    //
    //
    //
    //
    //
    //
    //    //load resources
    //    cc.LoaderScene.preload(g_resources, function () {
    ////        cc.director.runScene(new HelloWorldScene());
    ////    	cc.director.runScene(new PlayScene());
    //
    //
    //    	var scene = new AssetsManagerLoaderScene();
    //    	scene.run();
    //
    //    }, this);

    //load resources
    cc.LoaderScene.preload(
        g_resources,
        function() {
            //    	cc.director.runScene(new PlayScene());
            //    	cc.director.runScene(new TestScene());

            // 实例化游戏控制器
            cc.gameController = new GameController(cc.director);
            cc.gameController.runScnene(EnumType.SCENE.PLAY);
            //    	cc.gameController.runScnene(EnumType.SCENE.MAIN);
            //    	cc.gameController.runScnene(EnumType.SCENE.RESULT);
        },
        this
    );
};
cc.game.run();
