var GameController = cc.Node.extend({
    team1List: [],
    team2List: [],

    currentScene: null,

    commandPoint: null, // 指挥的点
    controlType: null,

    addTeam1Obj: function(obj) {
        this.team1List.push(obj);
    },
    addTeam2Obj: function(obj) {
        this.team2List.push(obj);
    },

    clearTeam: function() {
        this.team1List = [];
        this.team2List = [];
    },

    setCommandPoint: function(soldierList, pos, type) {
        for (var i = 0; i < soldierList.length; i++) {
            var soldier = soldierList[i];
            if (type != null) {
                if (soldier.ttype != type) continue;
            }
            soldier.controller.setCommandPoint(pos);
        }
    },

    update: function(dt) {
        //
        //        this.doLookingForEnemy();
    }
});
