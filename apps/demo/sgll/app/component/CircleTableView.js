var CircleTableView = TableView.extend({
    init: function() {
        var tableView = new cc.TableView(this, cc.size(540, 132));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        tableView.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        tableView.setDelegate(this);
        this.addChild(tableView);
        tableView.reloadData();
    },

    tableCellSizeForIndex: function(table, idx) {
        return cc.size(94 + 6, 90);
    },

    tableCellAtIndex: function(table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();

            var circleBtn = new Button(
                '',
                res.img_taskranking_png,
                res.img_taskrankingdown_png,
                null,
                cc.EventListener.TOUCH_ALL_AT_ONCE
            );
            circleBtn.attr({
                x: 3
            });

            cell.addChild(circleBtn);
        } else {
            // label = cell.getChildByTag(123);
            // label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView: function(table) {
        return 9;
    },

    scrollViewDidScroll: function(view) {
        // 滚动回调
        // console.log(view.getContentOffset())
        var offsetX = view.getContentOffset().x;

        // 最左边
        if (offsetX >= -1) {
            if (this.leftCallback != null) {
                this.leftCallback();
            }
        } else {
            if (this.noLeftCallback != null) {
                this.noLeftCallback();
            }
        }

        // 最右边
        if (offsetX <= -360) {
            if (this.rightCallback != null) {
                this.rightCallback();
            }
        } else {
            if (this.noRightCallback != null) {
                this.noRightCallback();
            }
        }
    }
});
