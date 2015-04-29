/**
 * Created by Wind on 4/25/15.
 */
qx.Class.define("gamepaircard.game.Object", {
    extend: qx.core.Object,

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

        this.__users = [];
        this.__opendCardsIndex = [];
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

            if (user) {
                this.addUser(user);
            }

            if (this.getUsers().length !== 2) {
                return;
            }

            console.log("Start Game!!!!!");
        },

        getAvailableJoinRoom:function() {
            return this.getUsers().length < this.self(arguments).JOIN_USER_COUNT + 1;
        },

        addUser:function(user) {
            this.__users.push(user);
        },

        removeUser:function(user) {
            var index = this.__users.indexOf(user);

            if (index != -1) {
                this.__users.splice(index, 1);
                return user;
            }
            return this.getGameObject().removeUser(user);
        },

        getUsers:function() {
            return this.__users;
        }
    },

    destruct: function () {
        while(this.__users.length > 0) {
            this.__users.pop();
        }
    }
});