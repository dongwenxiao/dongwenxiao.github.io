towers.scene.fighting = towers.scene.fighting || {};
towers.scene.fighting.LayoutLayer = cc.Layer.extend({
    parentScene: null,

    _table: null,
    _path: null,

    listener: null,

    towerPanel: null, // 选择炮塔的面板

    ctor: function(parent) {
        this._super();
        this.parentScene = parent;

        this.init();
    },

    init: function() {
        this._path = [];

        this._table = {
            cells: [],
            cellW: 55,
            cellH: 55
        };

        this.initTowerPanel();
    },

    onEnter: function() {
        this.initTable();
        this.drawTable();
        this.initEvent();

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
        this.drawPath(path);
    },

    initTowerPanel: function() {
        var me = this;

        var panel = new cc.LayerColor(cc.color.YELLOW);
        panel.ignoreAnchorPointForPosition(false);
        panel.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: -1000,
            y: -1000,
            width: 300,
            height: 100
        });
        this.towerPanel = panel;
        this.parentScene.addChildInfInfoLayer(panel);

        // buttons
        var callback = function() {
            // me.parentScene.hideMenu();
            var pos = me._tmpTowerPos;
            me.addTower(pos.x, pos.y, me.parentScene);
            me.hideTowerPanel();
        };
        var baseTowerButton = new towers.component.Button(
            undefined,
            undefined,
            '枪塔',
            undefined,
            undefined,
            callback,
            this.parentScene
        );
        baseTowerButton.attr({
            x: panel.width / 2 - 100,
            y: panel.height / 2
        });
        panel.addChild(baseTowerButton);

        var callback = function() {
            // me.parentScene.hideMenu();
            var pos = me._tmpTowerPos;
            me.addTower(pos.x, pos.y, me.parentScene, 'effect');
            me.hideTowerPanel();
        };
        var effectTowerButton = new towers.component.Button(
            undefined,
            undefined,
            '冰塔',
            undefined,
            undefined,
            callback,
            this.parentScene
        );
        effectTowerButton.attr({
            x: panel.width / 2,
            y: panel.height / 2
        });
        panel.addChild(effectTowerButton);

        var callback = function() {
            // me.parentScene.hideMenu();
            var pos = me._tmpTowerPos;
            me.addTower(pos.x, pos.y, me.parentScene, 'bomb');
            me.hideTowerPanel();
        };
        var bombTowerButton = new towers.component.Button(
            undefined,
            undefined,
            '炮塔',
            undefined,
            undefined,
            callback,
            this.parentScene
        );
        bombTowerButton.attr({
            x: panel.width / 2 + 100,
            y: panel.height / 2
        });
        panel.addChild(bombTowerButton);
    },

    initTable: function() {
        var cells = this._table.cells,
            winW = cc.winSize.width,
            winH = cc.winSize.height,
            w = this._table.cellW,
            h = this._table.cellH;

        var startX = (winW % w) / 2,
            startY = (winH % h) / 2;

        for (var x = startX; x <= winW - w; x += w) {
            for (var y = startY; y <= winH - h; y += h) {
                cells.push({
                    x: x,
                    y: y,
                    w: w,
                    h: h
                });
            }
        }
    },

    _tmpTowerPos: null,
    showTowerPanel: function(x, y) {
        // 放炮塔用的
        // var me = this;
        // var tower = me.addTower(x, y, me.parentScene);
        // me._table.cells[i].path = tower;

        this._tmpTowerPos = cc.p(x, y);
        this.towerPanel.setPosition(cc.p(x, y));
    },
    hideTowerPanel: function() {
        this.towerPanel.setPosition(cc.p(-1000, -1000));
    },

    initEvent: function() {
        var me = this;
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                // console.log('LayoutLayer start');
                var tp = touch.getLocation();

                var cellCount = me._table.cells.length;
                for (var i = 0; i < cellCount; i++) {
                    var cell = me._table.cells[i];
                    var rect = cc.rect(cell.x, cell.y, cell.w, cell.h);

                    if (cc.rectContainsPoint(rect, tp)) {
                        if (undefined == me._table.cells[i].path) {
                            var x = cell.x + me._table.cellW / 2,
                                y = cell.y + me._table.cellH / 2,
                                r = me._table.cellW / 2;

                            // 下面是获取路径用的
                            // var circle = me.addPath(x, y, r);
                            // me._table.cells[i].path = circle;

                            // 放炮塔用的
                            // var tower = me.addTower(x, y, me.parentScene);
                            // me._table.cells[i].path = tower;

                            me.showTowerPanel(x, y);

                            return true;
                        }
                    }
                }
                return false;
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

        this.parentScene.addEvent(this.listener, this.parentScene);
    },

    addPath: function(x, y, r) {
        var circle = me.drawCircle(x, y, r);
        me._path.push({
            x: x,
            y: y
        });
        return circle;
    },

    addTower: function(x, y, scene, tower) {
        switch (tower) {
            case 'effect':
                tower = new towers.model.base.EffectTower(scene);
                break;
            case 'bomb':
                tower = new towers.model.base.BombTower(scene);
                break;
            default:
                tower = new towers.model.base.Tower(scene);
                break;
        }

        tower.name = 'tower';
        var config = {
            x: x,
            y: y,
            enemyList: scene.animationLayer.currentEnemies
        };
        tower.init(config);
        this.parentScene.addChildInAnimationLayer(tower);
        return tower;
    },

    drawPath: function(path) {
        var pathLength = path.length - 1;
        for (var i = 0; i < pathLength; i++) {
            var pointStart = path[i];
            var pointEnd = path[i + 1];

            var line = new cc.DrawNode();
            var from = pointStart,
                to = pointEnd,
                lineWidth = 10,
                color = cc.color.BLUE;
            line.drawSegment(from, to, lineWidth, color);

            this.addChild(line);
        }
    },

    drawTable: function() {
        var cells = this._table.cells;
        var cellCount = cells.length;

        for (var i = 0; i < cellCount; i++) {
            var cell = cells[i];
            this.drawCell(cell.x, cell.y, cell.w, cell.h);
        }
    },

    drawCell: function(x, y, w, h) {
        var cell = new cc.DrawNode();
        var origin = cc.p(0, 0);
        var destination = cc.p(w, h);
        var fillColor = cc.color(0, 0, 0, 0);
        var lineWidth = 1;
        var lineColor = cc.color.BLUE;
        cell.x = x;
        cell.y = y;
        cell.width = w;
        cell.height = h;
        cell.drawRect(origin, destination, fillColor, lineWidth, lineColor);
        this.addChild(cell);
        // this.addEvent(cell);

        return cell;
    },

    drawCircle: function(x, y, r) {
        var circle = new cc.DrawNode();
        circle.x = x;
        circle.y = y;
        circle.width = r;
        circle.height = r;

        var _x,
            _y = r / 2;
        var center = cc.p(_x, _y);
        var radius = r;
        var angle = cc.degreesToRadians(100);
        var segments = 100;
        var drawLineToCenter = false;
        var lineWidth = 1;
        var color = cc.color.RED;

        circle.drawCircle(
            center,
            radius,
            angle,
            segments,
            drawLineToCenter,
            lineWidth,
            color
        );
        this.addChild(circle);

        return circle;
    },

    exportPath: function() {
        // console.log(JSON.stringify(this._table.cells));
        console.log(JSON.stringify(this._path));
    }
});
