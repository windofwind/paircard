/**
 * Created by Wind on 4/20/15.
 */
/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

qx.Class.define("gamepaircard.game.util.CardDeck", {
    type:"singleton",
    extend: qx.core.Object,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        CARD_MAX_COUNT:8
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function () {
        this.base(arguments);
    },

    /*
     *****************************************************************************
     EVENTS
     *****************************************************************************
     */
    events: {
    },

    /*
     *****************************************************************************
     PROPERTY
     *****************************************************************************
     */
    properties: {
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _cards:function() {
            var card = [];

            for(var i = 0; i < 16; i++) {
                card.push(i % this.self(arguments).CARD_MAX_COUNT + 1 );
            }

            return card;
        },

        _cardsShuffle:function() {
            var holder,
                deck,
                dl,
                nt1, nt2;

            try {
                deck = this._cards();

                return deck;
                for (var i = 0; i < 3 * deck.length; i++) {
                    nt1 = Math.floor(Math.random()*deck.length);
                    nt2 = Math.floor(Math.random()*deck.length);
                    holder = deck[nt1];
                    deck[nt1] = deck[nt2];
                    deck[nt2] = holder;
                }
            }
            catch(e) {
                this.error(e.message);
            }

            return deck;
        },

        getCardDeck:function() {
            return this._cardsShuffle();
        }
    },

    destruct: function () {
        this.removeAllUsers();
    }
});