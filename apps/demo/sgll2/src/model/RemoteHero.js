var RemoteHero = Hero.extend({
    init: function(
        blood,
        attackMin,
        attackMax,
        defenceMin,
        defenceMax,
        agile,
        direction,
        moveDuration
    ) {
        this._super(
            blood,
            attackMin,
            attackMax,
            defenceMin,
            defenceMax,
            agile,
            direction,
            moveDuration
        );
        // 初始化控制器
        this._controller = new MeleeHeroController(this);
    }
});
