towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.Scene = cc.Scene.extend({
    // 各层的逻辑
    backgroundLayer: null,
    layoutLayer: null,
    animationLayer: null,
    infoLayer: null,
    controlLayer: null,
    menuLayer: null,

    // 逻辑层子元素
    backgroundLayerChildren: null,
    layoutLayerChildren: null,
    animationLayerChildren: null,
    infoLayerChildren: null,
    controlLayerChildren: null,
    menuLayerChildren: null,
    sceneChildren: null,

    // 层的zOrder
    LAYER_ZORDER: {
        backgroundLayer: 1000,
        layoutLayer: 2000,
        animationLayer: 3000,
        infoLayer: 3500,
        controlLayer: 4000,
        menuLayer: 5000
    },

    listeners: null,

    // 游戏状态
    gameInfo: null,

    ctor: function() {
        this._super();
    },

    init: function(user) {
        this.gameInfo = {
            isStart: false, // 已开始
            isPause: false, // 已暂停
            speed: 1, // 游戏速度1倍
            money: 0, // 当前金钱数
            blood: 10, // 当前血量
            passTime: 0 // 过去的时间，单位 s
        };

        this.backgroundLayerChildren = [];
        this.layoutLayerChildren = [];
        this.animationLayerChildren = [];
        this.infoLayerChildren = [];
        this.controlLayerChildren = [];
        this.menuLayerChildren = [];
        this.sceneChildren = [];

        this.listeners = [];

        // init layer controllers
        this.backgroundLayer = new towers.scene.fighting.BackgroundLayer(this);
        this.layoutLayer = new towers.scene.fighting.LayoutLayer(this);
        this.addChildInLayoutLayer(this.layoutLayer);
        this.animationLayer = new towers.scene.fighting.AnimationLayer(this);
        this.infoLayer = new towers.scene.fighting.InfoLayer(this);
        this.controlLayer = new towers.scene.fighting.ControlLayer(this);
        this.menuLayer = new towers.scene.fighting.MenuLayer(this);

        this.scheduleUpdate();

        // kkk = this;
    },

    onEnter: function() {
        cc.Scene.prototype.onEnter.call(this);

        // TODO: ready go logic

        this.gameInit();
        this.gameStart();
    },

    onExit: function() {
        this.removeEvent();
    },

    update: function(dt) {
        this.gameSyncTime(dt);
    },

    ////////////////////////////////////////////////////下面是基本方法

    addEvent: function(listener, nodeOrPriority) {
        this.listeners.push(listener);
        cc.eventManager.addListener(listener, nodeOrPriority);
    },

    removeEvent: function() {
        var listenerCount = this.listeners.length;
        for (var i = 0; i < listenerCount; i++) {
            var listener = this.listeners[i];
            cc.eventManager.removeListener(listener);
        }
    },

    addChildInScene: function(child, localZOrder, tag) {
        this.sceneChildren.push(child);
        this.addChild(child, localZOrder, tag);
    },

    addChildInLayer: function(layer, child, localZOrder, tag) {
        switch (layer) {
            case 'backgroundLayer':
                this.backgroundLayerChildren.push(child);
                break;
            case 'layoutLayer':
                this.layoutLayerChildren.push(child);
                break;
            case 'animationLayer':
                this.animationLayerChildren.push(child);
                break;
            case 'infoLayer':
                this.infoLayerChildren.push(child);
                break;
            case 'controlLayer':
                this.controlLayerChildren.push(child);
                break;
            case 'menuLayer':
                this.menuLayerChildren.push(child);
                break;
        }

        this.addChildInScene(child, localZOrder, tag);
    },

    addChildInBackgroundLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.backgroundLayer
                : localZOrder + this.LAYER_ZORDER.backgroundLayer;

        this.addChildInLayer('backgroundLayer', child, localZOrder, tag);
    },

    addChildInLayoutLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.layoutLayer
                : localZOrder + this.LAYER_ZORDER.layoutLayer;

        this.addChildInLayer('layoutLayer', child, localZOrder, tag);
    },

    addChildInAnimationLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.animationLayer
                : localZOrder + this.LAYER_ZORDER.animationLayer;

        this.addChildInLayer('animationLayer', child, localZOrder, tag);
    },

    addChildInfInfoLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.infoLayer
                : localZOrder + this.LAYER_ZORDER.infoLayer;

        this.addChildInLayer('infoLayer', child, localZOrder, tag);
    },

    addChildInfControlLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.controlLayer
                : localZOrder + this.LAYER_ZORDER.controlLayer;

        this.addChildInLayer('controlLayer', child, localZOrder, tag);
    },

    addChildMenuLayer: function(child, localZOrder, tag) {
        localZOrder =
            undefined == localZOrder
                ? this.LAYER_ZORDER.menuLayer
                : localZOrder + this.LAYER_ZORDER.menuLayer;

        this.addChildInLayer('menuLayer', child, localZOrder, tag);
    },

    removeChildInAnimationLayer: function(child, cleanup) {
        this.removeChild(child, cleanup);
        this.animationLayerChildren = this.animationLayerChildren.removeObj(
            child
        );
    },

    removeChildInMenuLayer: function(child, cleanup) {
        this.removeChild(child, cleanup);
        this.menuLayerChildren = this.menuLayerChildren.removeObj(child);
    },

    initEvent: function() {
        cc.eventManager.addListener(this.layoutLayer.listener, 10);
    },

    ////////////////////////////////////////////////////下面是业务逻辑

    gameInit: function() {
        // 地图数据
        // TODO: 背景啥的

        // 敌人数据
        var testEnemyList = this.animationLayer.testEnemy();
        this.animationLayer.addOneWaveData(testEnemyList);
        this.animationLayer.getOneWaveData();

        // 炮塔数据
        // this.animationLayer.testTower(this.animationLayer.currentEnemies);
    },

    gameReady: function() {
        // TODO:callback gameStart()
    },

    gameStart: function() {
        this.gameInfo.isStart = true;
    },

    gameRestart: function() {
        // fun1 : reinit scene
        // this.animationLayer.cleanData();

        // var childCount = this.animationLayerChildren.length;
        // for(var i=0; i<childCount; i++){
        //     var child = this.animationLayerChildren[i];
        //     this.removeChildInAnimationLayer(child);
        // }

        // this.gameInit();

        // fun2 : rerun scene
        towers.controller.scene.restartFightingScene();
    },

    gamePause: function() {
        this.gameInfo.isPause = true;

        // animation 层暂停
        var aniChildCount = this.animationLayerChildren.length;
        for (var i = 0; i < aniChildCount; i++) {
            var child = this.animationLayerChildren[i];
            child.pause();
        }
    },

    gameContinue: function() {
        this.gameInfo.isPause = false;

        // animation 层继续
        var aniChildCount = this.animationLayerChildren.length;
        for (var i = 0; i < aniChildCount; i++) {
            var child = this.animationLayerChildren[i];
            child.resume();
        }
    },

    // 每帧被调用 60帧是1秒
    _tmpGameSyncFrame: 0,
    gameSyncTime: function(realDt) {
        var virtualDt = 0.016;

        if (!(this.gameInfo.isStart && !this.gameInfo.isPause)) return;

        if (this._tmpGameSyncFrame >= 60 / this.gameInfo.speed) {
            this._tmpGameSyncFrame = 0;
            this.gameInfo.passTime++;
            this._everyScendCallback();
            // console.log(this.gameInfo.passTime);
        } else {
            this._tmpGameSyncFrame++;
        }

        this._everyFrameCallback(virtualDt * this.gameInfo.speed);
    },
    _everyScendCallback: function() {
        this.animationLayer.createEnemey();
    },
    _everyFrameCallback: function(dt) {
        this.spriteAI(dt);
    },

    spriteAI: function(dt) {
        var count = this.animationLayerChildren.length;
        for (var i = 0; i < count; i++) {
            var child = this.animationLayerChildren[i];
            if (undefined == child) continue;
            child.ai(dt);
        }
    },

    ////////////////////////////////////////////////////下面是UI处理

    showMenu: function() {
        this.gamePause();
        this.menuLayer.showUI();
    },

    hideMenu: function() {
        this.gameContinue();
        this.menuLayer.hideUI();
    },

    updateSceneBlood: function() {
        this.controlLayer.updateBloodLabel();
    }
});
