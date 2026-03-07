var GameController = cc.Node.extend({
    ctor: function() {
        this._super();

        // this.scheduleUpdate();
    },

    initEvent: function(bg, hero) {
        var me = this;
        this.hero = hero;

        var listener = cc.EventListener.create({
            swallowTouches: true,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                return true;
            },
            onTouchesEnded: function(touches, event) {
                //				event.getCurrentTarget().moveSprite(touches[0].getLocation());
                me.doSth(touches[0].getLocation());
                return true;
            }
        });

        var listener1 = {
            event: cc.EventListener.MOUSE,
            onMouseUp: function(event) {
                //					event.getCurrentTarget().moveSprite(event.getLocation());
                me.doSth(event.getLocation());
            }
        };

        var listener2 = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(e) {
                if (e == 32) {
                    // 空格
                    me.doShoot();
                }

                if (e == 37) {
                    // 左
                    me.moveTo('left');
                }
                if (e == 38) {
                    // 上
                    me.moveTo('top');
                }
                if (e == 39) {
                    // 右
                    me.moveTo('right');
                }
                if (e == 40) {
                    // 下
                    me.moveTo('bottom');
                }
            }
        };

        cc.eventManager.addListener(listener, 10);

        // if( 'touches' in cc.sys.capabilities )
        // 	cc.eventManager.addListener(listener, bg);
        // else if ('mouse' in cc.sys.capabilities )
        // 	// cc.eventManager.addListener(listener1, bg);

        cc.eventManager.addListener(listener2, bg);
    },

    doSth: function(pos) {
        // var joypad = this._joypad;
        // var me = this;
        // this.hero.getView().oneStepAction(45,50,function(){
        // });
        // this.hero.getView().moveSequence(pos);
        //		this.hero.getView().rotationAnimation(pos);
        //		this.hero.getView().jumpAnimation(pos);
    },
    doShoot: function() {
        this.hero.getController().doShoot();
    },

    moveTo: function(direction) {
        var pos = this.hero.getPosition();
        var step = 5;

        switch (direction) {
            case 'left':
                pos.x -= 5;
                break;
            case 'top':
                pos.y += 5;
                break;
            case 'right':
                pos.x += 5;
                break;
            case 'bottom':
                pos.y -= 5;
                break;
        }

        this.hero.setPosition(pos);
    },

    update: function(dt) {
        var me = this;

        this.checkCollison(function(obj1, obj2) {
            if (obj1.collisionType == 'bullet') {
                me._collisonArr = me._collisonArr.removeItem(obj1);
            } else {
                obj2.setPosition(100, 100);
            }

            if (obj2.collisionType == 'bullet') {
                me._collisonArr = me._collisonArr.removeItem(obj2);
            } else {
                obj1.setPosition(100, 100);
            }
        });
    },

    _collisonArr: [],
    addCollisionArr: function(obj) {
        this._collisonArr.push(obj);
    },
    checkCollison: function(callback) {
        var count = this._collisonArr.length;
        if (count < 2) return;

        for (var i = 0; i < count; i++) {
            var obj1 = this._collisonArr[i];

            for (var j = 0; j < count; j++) {
                if (i >= j) continue; // 不能是自己

                var obj2 = this._collisonArr[j];
                var isCollision = this.isCollision(obj1, obj2);
                if (isCollision) {
                    callback(obj1, obj2);
                }
            }
        }
    },
    isCollision: function(obj1, obj2) {
        var distance = Math.distance(obj1.getPosition(), obj2.getPosition());
        if (distance < 30) {
            return true;
        }
        return false;
    }
});
