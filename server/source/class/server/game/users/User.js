/**
 * Created by wind on 3/26/15.
 */
/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

qx.Class.define("server.game.users.User", {
    extend: qx.core.Object,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        formatter:new qx.util.format.NumberFormat()
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function (socket) {
        this.base(arguments);

        if (socket) {
            this.setSocket(socket);
        }

        this.__increaseMoneyAfterConnect = 0;
        this.__name = [];
    },

    /*
     *****************************************************************************
     EVENTS
     *****************************************************************************
     */
    events :{
        /** socket.io connect event */
        "connect"           : "qx.event.type.Event",
        /** socket.io connecting event */
        "connecting"        : "qx.event.type.Data",
        /** socket.io connect_failed event */
        "connect_failed"    : "qx.event.type.Event",
        /** socket.io message event */
        "message"           : "qx.event.type.Data",
        /** socket.io close event */
        "close"             : "qx.event.type.Data",
        /** socket.io disconnect event */
        "disconnect"        : "qx.event.type.Event",
        /** socket.io reconnect event */
        "reconnect"         : "qx.event.type.Data",
        /** socket.io reconnecting event */
        "reconnecting"      : "qx.event.type.Data",
        /** socket.io reconnect_failed event */
        "reconnect_failed"  : "qx.event.type.Event",
        /** socket.io error event */
        "error"             : "qx.event.type.Data"
    },

    /*
     *****************************************************************************
     PROPERTY
     *****************************************************************************
     */
    properties: {
        socket:{
            nullable:   true,
            init:       null,
            check:      "Object",
            apply:      "applySocket"
        },
        socketID:{
            init:       "",
            nullable:	false,
            check:		"String"
        },
        id:{
            init:       "",
            nullable:	false,
            check:		"String"
        },
        name:{
            init:       "",
            nullable:	false,
            check:		"String",
            apply:      "_applyName"

        },
        money:{
            init:       0,
            nullable:	false,
            check:		"Number",
            apply:      "_applyMoney"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        //The name store an array of events
        __name : null,

        /**
         * Trying to using socket.io to connect and plug every event from socket.io to qooxdoo one
         */
        connect:function(){
            this.on("connect",          function(){     this.fireEvent("connect");                  }, this);
            this.on("connecting",       function(e){    this.fireDataEvent("connecting", e);        }, this);
            this.on("connect_failed",   function(){     this.fireEvent("connect_failed");           }, this);
            this.on("message",          function(e){    this.fireDataEvent("message", e);           }, this);
            this.on("close",            function(e){    this.fireDataEvent("close", e);             }, this);
            this.on("disconnect",       function(){     this.fireEvent("disconnect");               }, this);
            this.on("reconnect",        function(e){    this.fireDataEvent("reconnect", e);         }, this);
            this.on("reconnecting",     function(e){    this.fireDataEvent("reconnecting", e);      }, this);
            this.on("reconnect_failed", function(){     this.fireEvent("reconnect_failed");         }, this);
            this.on("error",            function(e){    this.fireDataEvent("error", e);             }, this);
        },
        /**
         * Emit an event using socket.io
         *
         * @param name {string} The event name to send to Node.JS
         * @param jsonObject {object} The JSON object to send to socket.io as parameters
         */
        emit:function(name, jsonObject){
            this.getSocket().emit(name, jsonObject);
        },

        /**
         * Connect and event from socket.io like qooxdoo event
         *
         * @param name {string} The event name to watch
         * @param fn {function} The function wich will catch event response
         * @param that {mixed} A link to this
         */
        on:function(name, fn, that){
            this.__name.push(name);
            if(typeof(that) !== "undefined" && that !== null){
                this.getSocket().on(name, qx.lang.Function.bind(fn, that));
            }else{
                this.getSocket().on(name, fn);
            }
        },
        __increaseMoneyAfterConnect:null,
        getMoneyString:function() {
            return this.self(arguments).formatter.format(this.getMoney());
        },
        sendMessage:function(message) {
            this.emit("message", message);
        },
        sendWhisper:function() {
            return false;
        },
        setPassword:function() {
            return false;
        },
        applySocket:function(value, old) {

        },
        _applyName:function(value, old) {

        },
        _applyMoney:function(value, old) {
            // todo : 접속 후 자금 증가량 표기.
            this.__increaseMoneyAfterConnect += value - old;
        }
    },

    destruct: function () {
        if(this.getSocket() != null){
            //Deleting listeners
            if(this.__name !== null && this.__name.length >= 1){
                for(var i=0; i<this.__name.length; ++i){
                    this.getSocket().removeAllListeners(this.__name[i]);
                }
            }
            this.__name = null;

            this.removeAllBindings();

            //Disconnecting socket.io
            try {
                this.getSocket().socket.disconnect();
            } catch(e) {}

            try {
                this.getSocket().disconnect();
            } catch(e) {}

            this.getSocket().removeAllListeners("connect");
            this.getSocket().removeAllListeners("connecting");
            this.getSocket().removeAllListeners("connect_failed");
            this.getSocket().removeAllListeners("message");
            this.getSocket().removeAllListeners("close");
            this.getSocket().removeAllListeners("disconnect");
            this.getSocket().removeAllListeners("reconnect");
            this.getSocket().removeAllListeners("reconnecting");
            this.getSocket().removeAllListeners("reconnect_failed");
            this.getSocket().removeAllListeners("error");
        }
    }
});