cm.PlayScene = cc.Scene.extend({
    pillars: [],
    lastPillarLevel: 1,
    bgLayer: null,
    distance: 0, // total distance
    nextPillarX: 0,
    isPause: false,
    isStart: false,

    ctor: function() {
        this._super();

        // reset
        (this.pillars = []),
            (this.lastPillarLevel = 1),
            (this.bgLayer = null),
            (this.distance = 0),
            (this.nextPillarX = 0),
            (this.isPause = false),
            (this.isStart = false);

        //
        this.config = {
            speed: 100,
            pillar: {
                x: 30,
                y: 130,
                width: 30,
                height: 30,
                levelHeight: 20,
                distance: 40
            }
        };

        this.nextPillarX = this.config.pillar.width / 2 + 100;
        this.initEvent();
    },

    gameStart: function() {
        // this.notify();
        // start
        if (!this.isStart) {
            this.allResume();
            this.isStart = true;
        }
        return this.isStart;
    },

    initEvent: function() {
        var me = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                if (me.isStart) {
                    me.notify();
                } else {
                    me.gameStart();
                }
                // console.log(touch)
                // console.log('MenuLayer start');
                return true;
            },
            onTouchMoved: function(touch, event) {
                // console.log('move');
            },
            onTouchEnded: function(touch, event) {
                //console.log('end');
            },
            onTouchCancelled: function(touch, event) {
                //console.log('cancel');
            }
        });

        var keyboardListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function(keyCode, event) {
                if (keyCode == cc.KEY.space) {
                    if (me.isStart) {
                        me.notify();
                    } else {
                        me.gameStart();
                    }
                }
            }
        });

        // this.parentScene.addEvent(listener, this.layer);
        cc.eventManager.addListener(keyboardListener, this);
        cc.eventManager.addListener(listener, this);
    },

    addBgLayer: function() {
        this.bgLayer = new cc.Layer();
        this.addChild(this.bgLayer);
        return this.bgLayer;
    },

    _passDistance: 0,
    bgLayerRun: function(jumpDt, step) {
        // bg run
        this.bgLayerMoveAction &&
            this.bgLayer.stopAction(this.bgLayerMoveAction);
        var disX = -this.config.pillar.distance * step;
        this.bgLayerMoveAction = this.bgLayer.runAction(
            cc.moveBy(jumpDt, cc.p(disX, 0))
        );
    },

    _lastAddPillar: null,
    addPillarLogic: function(step) {
        // TODO add pool
        for (var i = 0; i < step; i++) {
            var _level = this.randomPillarLevel();
            this._lastAddPillar = this.addPillar(
                this.nextPillarX,
                _level,
                this.randomPillarType(_level)
            );
        }

        if (this.distance > 300) {
            var needRmovePillar = this.pillars[this.pillars.length - 50];
        }
        // this.bgLayer.removeChild(needRmovePillar);
    },

    _currentIsBadType: false,
    randomPillarType: function(level) {
        if (this._currentIsBadType) {
            this._currentIsBadType = false;
            return 'default';
        }

        // 红色前一个不能低于红色的高度
        var isHigher =
            this._lastAddPillar == null
                ? true
                : this._lastAddPillar.level - level >= 0;
        // console.log(isHigher + "  "+(this._lastAddPillar && this._lastAddPillar.level - level))

        // 1~10
        var random = 1 + Math.floor(Math.random() * 10);
        if (random < 4 && isHigher) {
            // 30%
            this._currentIsBadType = true;
            return 'bad';
        }
        return 'default';
    },

    randomPillarLevel: function() {
        /**
		calculate pillar level
		*/

        var levelArr = [];

        if (this._lastAddPillar && this._lastAddPillar.type == 'bad') {
            // 上一个是坏的
            var lastLevel = this._lastAddPillar.level;
            if (lastLevel == 1) {
                levelArr = [1];
            } else if (lastLevel == 2) {
                levelArr = [1, 2];
            } else if (lastLevel == 3) {
                levelArr = [1, 2, 3];
            }
        } else {
            // 上一个是好的
            var level = 1,
                levelIndex = 0;
            if (this.lastPillarLevel == 1) {
                levelArr = [1, 2];
            } else if (this.lastPillarLevel == 2) {
                levelArr = [1, 2, 3];
            } else if (this.lastPillarLevel == 3) {
                levelArr = [1, 2, 3];
            }
        }

        levelIndex = Math.floor(Math.random() * levelArr.length);
        level = levelArr[levelIndex];

        this.lastPillarLevel = level;
        return level;
    },

    initAddPillar: function(count) {
        count = count || 1;
        var i = 0,
            level = 1;
        for (; i < count; i++) {
            this._lastAddPillar = this.addPillar(
                this.nextPillarX,
                level,
                'default'
            );
        }
        for (i = 0; i < 30; i++) {
            var _level = this.randomPillarLevel();
            this._lastAddPillar = this.addPillar(
                this.nextPillarX,
                _level,
                this.randomPillarType(_level)
            );
        }
    },

    /**
		x 柱子在x轴位置
		level 柱子的高度等级
		type 柱子的类型，是否可踩
	*/
    addPillar: function(x, level, type) {
        var baseHeight = this.config.pillar.height,
            levelHeight = this.config.pillar.levelHeight,
            y = this.config.pillar.y;
        var height = baseHeight + levelHeight * level;
        var pillar = new cm.Pillar(height, type);
        pillar.attr({
            level: level,
            x: x,
            y: y,
            anchorX: 0,
            anchorY: 0
        });
        this.bgLayer.addChild(pillar);
        this.pillars.push(pillar);

        this.nextPillarX = pillar.x + this.config.pillar.distance;
        return pillar;
    },

    notify: function() {
        this._notify = true;
    },
    notifyClear: function() {
        this._notify = false;
    },

    _currentPillarIndex: 0,
    _lastStepGameOver: false,
    ai: function(step) {
        if (this._lastStepGameOver) {
            this.gameOver(7);
            return;
        }

        var me = this;
        step = step || 1;
        var jumpDt = this.config.pillar.distance / this.config.speed;
        //
        var currentPillar = this.pillars[this._currentPillarIndex];
        var nextPillar = this.pillars[this._currentPillarIndex + step];
        var originalNextPillar = nextPillar;
        //

        if (currentPillar.type == 'bad') {
            this.gameOver(2);
            return;
        }

        var nextJump = nextPillar.level - currentPillar.level;
        var nextJumpType = 'default';
        if (this._notify) {
            this.notifyClear();
            if (nextPillar.type == 'bad') {
                // 下一个是坏的
                nextJumpType = 'cross';
                step = 2;
                nextPillar = this.pillars[this._currentPillarIndex + step];
                if (nextPillar.level - currentPillar.level > 0) {
                    this.gameOver();
                    return;
                }
            } else {
                // 下一个是好的
                var distanceLevel = nextPillar.level - currentPillar.level;
                if (distanceLevel == 0) {
                    nextJumpType = 'cross';
                    step = 2;
                    nextPillar = this.pillars[this._currentPillarIndex + step];
                    if (nextPillar.level - currentPillar.level > 0) {
                        this._lastStepGameOver = 2;
                        console.log(22);
                        // this.gameOver(1);
                        // return;
                    }
                } else if (distanceLevel == 1) {
                    nextJumpType = 'up';
                } else if (distanceLevel <= -1) {
                    nextJumpType = 'down';
                    step = 2;
                    nextPillar = this.pillars[this._currentPillarIndex + step];
                    if (nextPillar.level - currentPillar.level > 0) {
                        this.gameOver(4);
                        return;
                    }
                }
            }
        } else {
            // 无输入情况
            if (nextPillar.level - currentPillar.level > 0) {
                // this.gameOver(3);
                this._lastStepGameOver = 1;
                console.log(11);
            }
            // console.log(nextPillar.level - currentPillar.level)
            if (nextPillar.level - currentPillar.level < 0) {
                console.log('down');
                nextJumpType = 'down';
            }
        }

        var nextRunnerPos = cc.p(nextPillar.x, this.convertY(nextPillar));
        var nextPosY =
            nextJumpType == 'up' ||
            nextJumpType == 'down' ||
            nextJumpType == 'cross'
                ? nextRunnerPos.y
                : this.runner.y;
        // this.runner.jump(nextJumpType,jumpDt,cc.p(nextRunnerPos.x,nextPosY),function(){

        if (this._lastStepGameOver == 2) {
            console.log(2);
            // 撞第二个墙了
            this.runner.jump(
                nextJumpType,
                jumpDt,
                cc.p(
                    originalNextPillar.x + 15,
                    this.convertY(originalNextPillar) + 5
                ),
                function() {
                    me.ai();
                }
            );
        } else if (this._lastStepGameOver == 1) {
            console.log(1);
            // 撞第一个墙了
            this.runner.jump(
                nextJumpType,
                jumpDt,
                cc.p(currentPillar.x + 15, this.convertY(currentPillar) + 5),
                function() {
                    me.ai();
                }
            );
        } else {
            // 正常
            this.runner.jump(nextJumpType, jumpDt, nextRunnerPos, function() {
                me.ai();
            });
        }

        this.bgLayerRun(jumpDt, step);
        this.addPillarLogic(step);

        this._currentPillarIndex += step;

        // // auto run
        // if(nextJump == 0){
        // 	this.runner.jump("default",jumpDt,nextRunnerPos,function(){
        // 		me.ai();
        // 	});
        // }else
        // if(nextJump == 1){
        // 	this.runner.jump("up",jumpDt,nextRunnerPos,function(){
        // 		me.ai();
        // 	});
        // }else
        // if(nextJump < 0){
        // 	this.runner.jump("down",jumpDt,nextRunnerPos,function(){
        // 		me.ai();
        // 	});
        // }else
        // if(nextJump == 2){
        // 	this.allStop();
        // 	alert('dead');
        // }
    },

    convertY: function(pillar) {
        return (
            pillar.y +
            pillar.level * this.config.pillar.levelHeight +
            this.config.pillar.height
        );
    },

    allStop: function() {
        // this.pause();
        this.runner.pause();
        this.bgLayer.pause();
    },
    allResume: function() {
        // this.resume();
        this.runner.resume();
        this.bgLayer.resume();
    },

    gameOver: function(a) {
        this.allStop();
        // alert('game over!  ' +  parseInt(this.distance) + "米~" + a);
        alert(
            'game over!  ' + parseInt(this._currentPillarIndex) + '柱儿~' + a
        );
        console.log(a);
        cc.director.runScene(new cm.PlayScene());
    },

    onEnter: function() {
        this._super();

        // open update()
        this.scheduleUpdate();

        // init bg layer
        cm.playScene.bgLayer = this.addBgLayer();

        // add pillars
        this.initAddPillar(10);

        // init runner
        var pillar = this.pillars[0];
        this.runner = new cm.Runner(
            pillar.x,
            pillar.y +
                1 * this.config.pillar.levelHeight +
                this.config.pillar.height
        );
        this.bgLayer.addChild(this.runner, 10);

        this.ai();

        this.allStop();
        // this.allResume();
    },

    update: function(realDt) {
        // var virtualDt = 0.016;
        var pass = realDt * this.config.speed;

        // total pass distance
        this.distance += pass;
    }
});
