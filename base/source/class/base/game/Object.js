/**
 * Created by Wind on 4/25/15.
 */
qx.Class.define("base.game.Object", {
    //type:"",
    extend: qx.core.Object,

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

        this.__users = [];
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
        __users:null,
        start:function(user) {
        },

        addUser:function(user) {
            this.__users.push(user);
        },

        removeUser:function(user) {
            var index = this.__users.indexOf(user);

            if (index != -1) {
                return this.__users.splice(index, 1);
            }
        },

        getUsers:function() {
            return this.__users;
        },

        getAvailableJoinRoom:function() {
        }
    },

    destruct: function () {
        while(this.__users.length > 0) {
            this.__users.pop();
        }
    }
});