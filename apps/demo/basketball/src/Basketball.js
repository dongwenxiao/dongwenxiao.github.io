var Basketball = cc.PhysicsSprite.extend({
  lastAction: null,
  _justGetScore: false,

  ctor: function (space, getScoreCallback) {
    this._super(g_resSheet.GameScene.img_basketball_default_png);

    // basketball curtom propties
    this.attr({
      anchorX: 0.5,
      anchorY: 0.5,
      width: 30,
      height: 30,
    });

    if (getScoreCallback) this.getScoreCallback = getScoreCallback;
  },

  onEnter: function () {
    this._super();

    this.scheduleUpdate();
    // this.trunRight();
    // this.trunLeft();
  },

  // 顺时针旋转
  trunRight: function () {
    if (this.lastAction) this.stopAction(this.lastAction);

    var action = cc.rotateBy(5, 360);
    var forever = cc.repeatForever(action);
    this.lastAction = this.runAction(forever);
  },

  // 逆时针旋转
  trunLeft: function () {
    this.body.setAngVel(10);

    if (this.lastAction) this.stopAction(this.lastAction);

    var action = cc.rotateBy(5, -360);
    var forever = cc.repeatForever(action);
    this.lastAction = this.runAction(forever);
  },

  checkIsGetScore: function () {
    if (this.x < GET_SCORE_POINT.x - 50 || this.x > GET_SCORE_POINT.x + 50)
      return;
    if (this.y < GET_SCORE_POINT.y - 50 || this.y > GET_SCORE_POINT.y + 50)
      return;

    var rect = this.getBoundingBox();
    if (cc.rectContainsPoint(rect, GET_SCORE_POINT)) {
      // 得分
      this._justGetScore = true;

      this.getScoreCallback && this.getScoreCallback();

      cc.log("get score");
    }
  },

  update: function (dt) {
    if (this._justGetScore) {
      if (this.y < 100) {
        this._justGetScore = false;
      }
      return;
    }
    this.checkIsGetScore();
  },
});
