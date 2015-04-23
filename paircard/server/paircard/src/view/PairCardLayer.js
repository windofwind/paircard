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

    ctor:function () {
        this._super();
        this.__cards = [];

        return true;
    },

    onEnter:function() {
        this._super();
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

//        var btn = new Button(res.ButtonBlack_png, "Card In");
//        btn.setPosition(500, 420);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "Card Out");
//        btn.setPosition(500, 420 - btn.height - 10);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "Card Flip");
//        btn.setPosition(500, 420 - btn.height * 2 - 20);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "Card Shuffle");
//        btn.setPosition(500, 420 - btn.height * 3 - 30);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "test1");
//        btn.setPosition(500, 420 - btn.height * 4 - 40);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "test2");
//        btn.setPosition(600, 420);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
//
//        var btn = new Button(res.ButtonBlack_png, "test3");
//        btn.setPosition(600, 420 - btn.height - 10);
//        btn.setOnClick(this.onButtionClick(btn.getName()).bind(this));
//        this.addChild(btn);
    },

    // Opened two card check
    onOpenCardBefore:function(card) {
        return function() {
            Connection.openCard(card.getName());
        }
    },

    onButtionClick:function(buttonID) {
        return function() {
            switch(buttonID) {
                case "Card In":
                    this.cardIn();
                    break;

                case "Card Out":
                    this.__cards.forEach(function(data, index, array) {
                        data.animationOut();
                    });
                    break;

                case "Card Flip":
                    this.__cards.forEach(function(data, index, array) {
                        data.animationFlip(true);
                    });
                    break;

                case "Card Shuffle":
                    var holder;
                    var dl = this.__cards.length;
                    var nt1, nt2;
                    for (var i = 0; i < 3*dl; i++) {
                        nt1 = Math.floor(Math.random()*dl);
                        nt2 = Math.floor(Math.random()*dl);
                        holder = this.__cards[nt1].getCardNum() % (dl / 2);
                        this.__cards[nt1].setCardNum(this.__cards[nt2].getCardNum() % (dl / 2));
                        this.__cards[nt2].setCardNum(holder);
                    }
                    break;

                default:
                    console.error(buttonID, "undefined Button Actions!");
                    break;
            }
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