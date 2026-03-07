var g_res_path = 'src/res/';
var g_resSheet = {
    FightingScene: {
        img_closeSelected_png: g_res_path + 'CloseSelected.png',
        img_closeNormal_png: g_res_path + 'CloseNormal.png'
    },
    MapScene: {}
};

var g_resources = [];
for (var scene in g_resSheet) {
    for (var res in scene) {
        g_resources.push[scene[res]];
    }
}
