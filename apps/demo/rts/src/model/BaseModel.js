var BaseModel = cc.Node.extend({
    sprite: null,
    space: null,
    controller: null,
    teamType: 1,
    modelName: '',
    speed: 50,

    blood: 3,
    attack: 1,

    bloodSprite: null,
    shape: null,
    body: null,
    collisionType: 0,

    ctor: function(space) {
        this._super();

        this.space = space;
        this.scheduleUpdate();
    },

    initBloodSprite: function() {
        var fontDef = new cc.FontDefinition();
        fontDef.fontName = 'Arial';
        fontDef.fontSize = '12';
        this.bloodSprite = new cc.LabelTTF(this.blood, fontDef);
        this.sprite.addChild(this.bloodSprite);
        //	this.bloodSprite.setPosition(this.sprite.getPositionX(),this.sprite.getPositionY());
    },

    setTeamType: function(type) {
        this.teamType = type;
    },

    initController: function() {
        this.controller = new BaseController();
        this.controller.init(this);
    },

    setSpeed: function(speed) {
        this.speed = speed;
    },

    setAttack: function(attack) {
        this.attack = attack;
    },
    setBlood: function(blood) {
        this.blood = blood;
    },

    setCollisionType: function(type) {
        this.collisionType = type;

        this.shape.setCollisionType(type);
    },

    initPhysicsSprite: function(pos, radius, img) {
        // default value
        if (pos == undefined)
            pos = cp.v(cc.winSize.width / 2, cc.winSize.height / 2);
        if (radius == undefined) radius = 15;
        if (img == undefined) img = res.CloseNormal_png;

        var mass = 1;

        // Box
        //  var width=48,height=108;
        //  var body = new cp.Body(1, cp.momentForBox(mass, width, height) );
        //  body.setPos( pos );
        //  this.space.addBody( body );
        //  var shape = new cp.BoxShape( body, width, height);

        // Circle
        //	var radius = 15;
        var body = new cp.Body(
            mass,
            cp.momentForCircle(mass, 0, radius, cp.v(0, 0))
        );
        body.setPos(pos);
        this.body = body;
        this.space.addBody(body);
        var shape = new cp.CircleShape(body, radius, cp.v(0, 0));

        shape.setElasticity(0); // 弹性
        shape.setFriction(0); // 摩擦
        this.shape = shape;
        this.shape.parentModel = this;
        this.space.addShape(shape);

        this.sprite = new cc.PhysicsSprite(img);
        this.sprite.setBody(body);

        this.initBloodSprite();

        return this.sprite;
    },

    update: function(dt) {
        if (this.controller != null) this.controller.update(dt);

        this.bloodSprite.setString(this.blood);
    }
});
