towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.AnimationLayer = cc.Layer.extend({
    parentScene: null,

    allWavesData: null, // 全部敌人数据（波-敌人数据）
    currentEnemies: null, // 当前的敌人对象集合
    currentEnemiesData: null, // 当前的敌人数据集合

    ctor: function(parent) {
        this._super();

        this.parentScene = parent;
        this.allWavesData = [];
        this.currentEnemies = [];
        this.currentEnemiesData = [];
    },

    cleanData: function() {
        this.allWavesData = [];
        this.currentEnemiesData = [];
        this.currentEnemies = [];
    },

    testTower: function(enemyList) {
        // var tower = new towers.model.base.Tower(this.parentScene);
        // var tower = new towers.model.base.EffectTower(this.parentScene);
        var tower = new towers.model.base.BombTower(this.parentScene);
        tower.name = 'tower';
        var config = {
            x: 482.5,
            y: 197.5,
            enemyList: enemyList
        };
        tower.init(config);
        this.parentScene.addChildInAnimationLayer(tower);
    },

    testEnemy: function() {
        var enemyDataList = [];
        for (var i = 0; i < 10; i++) {
            var path = [
                { x: 42.5, y: 142.5 },
                { x: 97.5, y: 142.5 },
                { x: 152.5, y: 142.5 },
                { x: 152.5, y: 87.5 },
                { x: 207.5, y: 87.5 },
                { x: 262.5, y: 87.5 },
                { x: 317.5, y: 87.5 },
                { x: 317.5, y: 142.5 },
                { x: 372.5, y: 142.5 },
                { x: 427.5, y: 142.5 },
                { x: 482.5, y: 142.5 },
                { x: 537.5, y: 142.5 },
                { x: 592.5, y: 142.5 },
                { x: 592.5, y: 197.5 },
                { x: 592.5, y: 252.5 },
                { x: 592.5, y: 307.5 },
                { x: 537.5, y: 307.5 },
                { x: 482.5, y: 307.5 },
                { x: 427.5, y: 307.5 },
                { x: 372.5, y: 307.5 },
                { x: 372.5, y: 362.5 },
                { x: 372.5, y: 417.5 }
            ];
            var config = {
                x: path[0].x,
                y: path[0].y,
                blood: 10,
                speed: 60,
                money: 2,
                waypoints: path,
                name: 'enemy' + i
            };

            enemyDataList.push(config);
        }
        return enemyDataList;
    },

    // 向场景中添加1个敌人
    addEnemy: function(enemyConfig) {
        var enemy = new towers.model.base.Enemy(this);
        enemy.init(enemyConfig);
        this.currentEnemies.push(enemy);
        this.parentScene.addChildInAnimationLayer(enemy);
    },

    // 添加1波敌人数据
    addOneWaveData: function(enemyList) {
        this.allWavesData.push(enemyList);
    },

    // 获取1波敌人数据
    getOneWaveData: function() {
        if (this.allWavesData.length > 0) {
            var waveData = this.allWavesData.shift();
            this.currentEnemiesData = waveData;
            return waveData;
        }
        return null;
    },

    // 获取1个敌人数据
    getOneEnemyData: function() {
        if (this.currentEnemiesData.length > 0) {
            var enemyData = this.currentEnemiesData.shift();
            return enemyData;
        }
        return null;
    },

    // 自动获取敌人数据并创建敌人然后添加到场景中
    createEnemey: function() {
        var config = this.getOneEnemyData();
        if (!config) return;
        this.addEnemy(config);
    }
});
