var g_res_path = 'assets/';
var g_resSheet = {
    GameScene: {
        img_basketball_default_png: g_res_path + 'img/basketball-default.png',
        img_player_defalut_png: g_res_path + 'img/player-default.png',
        img_basketline_default_png: g_res_path + 'img/basketline-default.png',
        img_button_default_png: g_res_path + 'img/button-shoot-default.png',
        img_bg_png: g_res_path + 'img/bg.png'
    }
};

var g_resources = [];
for (var scene in g_resSheet) {
    for (var res in g_resSheet[scene]) {
        var resPath = g_resSheet[scene][res];
        g_resources.push(resPath);
    }
}
