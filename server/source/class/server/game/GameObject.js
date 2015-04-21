/**
 * Created by Wind on 4/21/15.
 */
/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

qx.Class.define("server.game.GameObject", {
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
        getResult:function() {
            return this.__result;
        }
    },

    destruct: function () {
        this.removeAllUsers();
    }
});