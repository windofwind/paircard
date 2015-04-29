/**
 * Created by Wind on 4/19/15.
 */
// TODO : 버튼레이어를 만들어서 테스트 버튼을 옮기자.
var PairCardLayer = cc.Layer.extend({
    __turn:null,
    __cards:null,
    __firstCardX:100,
    __firstCardY:450,
    __cols:4,
    __rows:4,
    __title:null,

    ctor:function () {
        this._super();
        this.__cards = [];

        return true;
    },

    onEnter:function() {
        this._super();

        this.__title = new cc.LabelTTF("0", "Arial", 28);
        this.__title.setString("짝맞추기 게임");
        this.__title.setPosition(this.width / 2, this.height - this.__title.height / 2);
        this.addChild(this.__title);


        for (var i = 0; i < this.__rows; ++i) {
            for (var j = 0; j < this.__cols; ++j) {
                var card = new Card(i * this.__rows + j + "");
                this.__cards.push(card);
                this.addChild(card);

                card.setPosition(cc.p(-50, 600));
                card.setInitInPosition(cc.p(this.__firstCardX + (j * (card.width + 10)), this.__firstCardY - (i * (card.height + 10))));
                card.setInitOutPosition(cc.p(-50, 600));
                card.setOpenCallback(this.onOpenCardBefore(card).bind(this));
            }
        }
    },

    // Opened two card check
    onOpenCardBefore:function(card) {
        return function() {
            Connection.openCard(card.getName());
        }
    },

    cardIn:function(cardDeck) {
        this.__cards.forEach(function(data, index, array) {
            if (array) {
                data.setCardNum(cardDeck[index]);
            }
            data.close();
            data.animationIn();
        });
    },

    cardOpen:function(cardIndex) {
        this.__cards[cardIndex].open(true, true);
    },

    cardOut:function(cardIndex) {
        this.__cards[cardIndex].animationOut();
    },

    cardClose:function(cardIndex) {
        this.__cards[cardIndex].close(true);
    },

    cardRestore:function(cardIndex) {
        this.__cards[cardIndex].open(true);
    }
});