/**
 * Created by Wind on 4/21/15.
 */
var EndGameAnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    onEnter:function() {
        this._super();

        for (var i = 0; i < 16; ++i) {
            var card = new Card();
            this.addChild(card);
        }

        this.visible = false;
    },

    playAnimation:function() {
        var x, y;
        var size = {width:800, height:600};


        this.children.forEach(function(card, index, array) {
            x = Math.random() * size.width;
            y = Math.random() * size.height;

            card.setPosition(cc.p(x, y));
            card.setAnchorPoint(0.5, 0.5);

            card.runAction(cc.sequence(
                cc.rotateBy(1, 720)
            ).repeat(11));
            card.runAction(cc.sequence(
                cc.jumpBy(1, cc.p(100, 0), 50, 1),
                cc.jumpBy(1, cc.p(-100, 0), 50, 1)
            ).repeat(3));
            card.runAction(cc.sequence(
                cc.delayTime(6),
                cc.moveTo(0.5, cc.p(-100, 500))
            ));
        });
    }
});