/**
 * Created by Wind on 4/25/15.
 */
qx.Class.define("gamepaircard.game.Object", {
    extend: base.game.Object,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        JOIN_USER_COUNT:2,
        SELECT_MAX_PAIRCARD_COUNT:8
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
        start:function(user) {
            // start Game Check;

            this.addUser(user);

            if (this.getUsers().length !== 2) {
                return;
            }

            console.log("Start Game!!!!!");
        },

        getAvailableJoinRoom:function() {
            return this.getUsers().length < this.self(arguments).JOIN_USER_COUNT + 1;
        }
    },

    destruct: function () {
        this.base(arguments);
    }
});