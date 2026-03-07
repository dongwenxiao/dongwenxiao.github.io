//  此文件没有用到，日后可以用他扩展，有layout实现

var ScrollView = cc.Layer.extend({
    ctor: function() {
        this._super();
        // Create the list view
        var listView = new ccui.ListView();

        // set list view ex direction
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setBackGroundImage(res.img_mainbg_jpg);
        listView.setBackGroundImageScale9Enabled(true);
        listView.setContentSize(cc.size(300, 530));
        listView.x = 100;
        listView.y = 100;
        listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(listView);

        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(cc.size(300, 20));
        default_item.width = listView.width;
        //default_item.addChild(default_button);

        // set model
        listView.setItemModel(default_item);

        for (var i = 0; i < 20; ++i) {
            listView.pushBackDefaultItem(); //注意这一行，相当重要！！！内部占坑用的，我就奇怪设计api的时候直接让传个参数进去内部调用不也行么？官方二不兮兮的这么封装我也是醉了
        }

        for (var i = 0; i < 20; i++) {
            var lblMenu = cc.LabelTTF.create('170', 'Times New Roman', 32);
            var lblLayer = new ccui.Layout();
            lblLayer.attr({
                anchorX: 0,
                anchorY: 0
            });
            lblMenu.setContentSize(cc.size(100, 20));
            lblMenu.width = 80;
            lblMenu.x = 50;
            lblMenu.y = 20 * -1 * i;
            lblLayer.addChild(lblMenu);

            var circleBtn = new Button(
                '',
                res.img_taskranking_png,
                res.img_taskrankingdown_png
            );
            circleBtn.attr({
                x: 0,
                y: i * -80
            });
            lblLayer.addChild(circleBtn);
            listView.insertCustomItem(lblLayer);
        }
        // set all items layout gravity
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
    },
    selectedItemEvent: function(sender, type) {
        cc.log('selectedItemEvent');
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                cc.log(
                    'select child index = ' + listViewEx.getCurSelectedIndex()
                );
                break;

            default:
                break;
        }
    }
});
