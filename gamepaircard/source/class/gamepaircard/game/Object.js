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
        STATUS:{
            NOTRUNNING:0,
            READY:1,
            RUNNING:999
        }
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function () {
        this.base(arguments);

        this.__user = [];
        this.__result = {};
        this.__status = this.self(arguments).STATUS.NOTRUNNING;
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
        __result:null,
        __status:null,
        start:function(user) {
            // start Game Check;
        },

        addUser:function() {},
        removeUser:function() {},

        getResult:function() {
            return this.__result;
        }
    },

    destruct: function () {
        this.removeAllUsers();
    }
});