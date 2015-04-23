/**
 * Created by Wind on 4/19/15.
 */
    // 위치 선정을 위한 가이드라인.
var Guideline = cc.Layer.extend({
    __rowsWidth:50,
    __colsWidth:50,
    __alphaValue:50,
    ctor:function() {
        this._super();
    },

    onEnter:function() {
        this._super();

        var winSize = cc.director.getWinSize();
        var height, width;

        for (var i = 0; i <= winSize.height / this.__rowsWidth; ++i) {
            var draw = new cc.DrawNode();
            height = (i + 1) * this.__rowsWidth;

            draw.drawSegment(cc.p(50, height), cc.p(winSize.width, height), 0.5, cc.color(255, 255, 255, this.__alphaValue));
            this.addChild(draw);
        }

        for (var i = 0; i <= winSize.width / this.__colsWidth; ++i) {
            var draw = new cc.DrawNode();
            width = (i + 1) * this.__colsWidth;

            draw.drawSegment(cc.p(width, 0), cc.p(width, winSize.height-50), 0.5, cc.color(255, 255, 255, this.__alphaValue));
            this.addChild(draw);
        }
    }
});