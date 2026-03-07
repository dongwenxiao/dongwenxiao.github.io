var g_resources = [];

var res = {
    //    HelloWorld_png : "res/HelloWorld.png",
    //    CloseNormal_png : "res/CloseNormal.png",
    //    CloseSelected_png : "res/CloseSelected.png",

    play_bg: 'res/playScene/bg/bg-image1.jpg',

    ani_j_huangzhong_json: 'res/animation/j_huangzhong/j_huangzhong.ExportJson',
    ani_j_huangzhong_plist: 'res/animation/j_huangzhong/j_huangzhong0.plist',
    ani_j_huangzhong_png: 'res/animation/j_huangzhong/j_huangzhong0.png',

    ani_j_guanping_json: 'res/animation/j_guanping/j_guanping.ExportJson',
    ani_j_guanping_plist: 'res/animation/j_guanping/j_guanping0.plist',
    ani_j_guanping_png: 'res/animation/j_guanping/j_guanping0.png',

    //    sg_hero_json:"res/sgHeroTest/sgAnimation.ExportJson",
    //    sg_hero_plist:"res/sgHeroTest/sgAnimation0.plist",
    //    sg_hero_png:"res/sgHeroTest/sgAnimation0.png",

    blood_json: 'res/blood/blood.ExportJson',
    blood_plist: 'res/blood/sgDemo0.plist',
    blood_png: 'res/blood/sgDemo0.png',

    //    hero_blood_plist :"res/playScene/hero/blood.plist",
    //    hero_json:"res/playScene/hero/Hero.ExportJson",
    //    hero_plist:"res/playScene/hero/Hero0.plist",
    //    hero_png:"res/playScene/hero/Hero0.png",

    main_scene_ui_json: 'res/mainScene/scene1.ExportJson',
    main_scene_ui_png0: 'res/mainScene/sgDemo0.png',
    main_scene_ui_png1: 'res/mainScene/sgDemo1.png',
    main_scene_ui_plist0: 'res/mainScene/sgDemo0.plist',
    main_scene_ui_plist1: 'res/mainScene/sgDemo1.plist',

    mission_scene_ui_json: 'res/missionScene/scene2.ExportJson',
    mission_scene_ui_png: 'res/missionScene/sgDemo0.png',
    mission_scene_ui_plist: 'res/missionScene/sgDemo0.plist',

    teamset_scene_ui_json: 'res/teamSetScene/scene3.ExportJson',
    teamset_scene_ui_png0: 'res/teamSetScene/sgDemo0.png',
    teamset_scene_ui_png1: 'res/teamSetScene/sgDemo1.png',
    teamset_scene_ui_plist0: 'res/teamSetScene/sgDemo0.plist',
    teamset_scene_ui_plist1: 'res/teamSetScene/sgDemo1.plist',

    result_scene_ui_josn: 'res/resultScene/scene4.ExportJson',
    result_scene_ui_png0: 'res/resultScene/sgDemo0.png',
    result_scene_ui_png1: 'res/resultScene/sgDemo1.png',
    result_scene_ui_plist0: 'res/resultScene/sgDemo0.plist',
    result_scene_ui_plist1: 'res/resultScene/sgDemo1.plist'

    //    login_json:"res/DemoLogin/DemoLogin.json",
    //    login_box_png:"res/DemoLogin/box.png",
    //    login_button_png:"res/DemoLogin/button.png",
    //    login_button_p_png:"res/DemoLogin/button_p.png",
    //    login_check_png:"res/DemoLogin/check.png",
    //    login_close1_png:"res/DemoLogin/close1.png",
    //    login_close2_png:"res/DemoLogin/close2.png",
    //    login_Heiti10_png:"res/DemoLogin/Heiti10.png",
    //    login_Heiti10_fnt:"res/DemoLogin/Heiti10.fnt",
    //    login_Heiti16_png:"res/DemoLogin/Heiti16.png",
    //    login_Heiti16_fnt:"res/DemoLogin/Heiti16.fnt",
    //    login_Heiti18_png:"res/DemoLogin/Heiti18.png",
    //    login_Heiti18_fnt:"res/DemoLogin/Heiti18.fnt",
    //    login_Heiti19_png:"res/DemoLogin/Heiti19.png",
    //    login_Heiti19_fnt:"res/DemoLogin/Heiti19.fnt",
    //    login_register_png:"res/DemoLogin/Register.png",
    //    login_star2_png:"res/DemoLogin/star2.png",

    //    hero_json:"res/HeroTestAnimation/HeroTestAnimation.ExportJson",
    //    hero_png:"res/HeroTestAnimation/HeroTestAnimation0.png",
    //    hero_plist:"res/HeroTestAnimation/HeroTestAnimation0.plist"
};

for (var i in res) {
    g_resources.push(res[i]);
}
