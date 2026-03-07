var TableView = cc.Layer.extend({
    cellSize: null,
    tableViewData: null,
    leftCallback: null,
    noLeftCallback: null,
    rightCallback: null,
    noRightCallback: null,

    ctor: function() {
        this._super();
        this.init();
    },

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

    setLeftCallback: function(callback) {
        this.leftCallback = callback;
    },

    setRightCallback: function(callback) {
        this.rightCallback = callback;
    },

    setNoLeftCallback: function(callback) {
        this.noLeftCallback = callback;
    },

    setNoRightCallback: function(callback) {
        this.noRightCallback = callback;
    },

    tableCellTouched: function(table, cell) {
        alert('index: ' + cell.getIdx());
    },

    tableCellSizeForIndex: function(table, idx) {
        return cc.size(124, 132);
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
        if (offsetX <= -2187) {
            if (this.rightCallback != null) {
                this.rightCallback();
            }
        } else {
            if (this.noRightCallback != null) {
                this.noRightCallback();
            }
        }
    },
    scrollViewDidZoom: function(view) {},

    tableCellAtIndex: function(table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();
            var headBox = new HeadBox();
            headBox.attr({
                x: 10
            });
            cell.addChild(headBox);
        } else {
            // label = cell.getChildByTag(123);
            // label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView: function(table) {
        return 22;
    }
});

var CustomTableViewCell = cc.TableViewCell.extend({
    draw: function(ctx) {
        this._super(ctx);
    }
});
