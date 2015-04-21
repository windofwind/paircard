/**
 * Created by Wind on 4/20/15.
 */
// 내 턴 확인용.
var TurnLayer = cc.Layer.extend({
    ctor:function() {
        this._super(arguments);

        this.visible = false;

        var draw = new cc.DrawNode();
        draw.drawSegment(cc.p(90, 520), cc.p(285, 520), 2, cc.color(255, 0, 0, 255));
        this.addChild(draw);

        var draw = new cc.DrawNode();
        draw.drawSegment(cc.p(90, 250), cc.p(285, 250), 2, cc.color(255, 0, 0, 255));
        this.addChild(draw);

        var draw = new cc.DrawNode();
        draw.drawSegment(cc.p(90, 250), cc.p(90, 520), 2, cc.color(255, 0, 0, 255));
        this.addChild(draw);

        var draw = new cc.DrawNode();
        draw.drawSegment(cc.p(285, 250), cc.p(285, 520), 2, cc.color(255, 0, 0, 255));
        this.addChild(draw);

        var turnText = new cc.LabelTTF("0", "Arial", 28);
        turnText.setString("Turn");
        turnText.setPosition(cc.p(130, 535));
        this.addChild(turnText);
    }
});