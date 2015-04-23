/**
 * Created by wind on 3/26/15.
 */
/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

qx.Class.define("server.game.users.UserManager", {
    type:"singleton",
    extend: qx.core.Object,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function () {
        this.base(arguments);

        this.__userIDs = {};
        this.__userSockets = {};
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
        __userIDs:null,
        __userSockets:null,
        _onConnect:function(user) {
            console.log("_onConnect");

            server.game.rooms.RoomManager.getInstance().addUser(user);
        },
        _onDisconnect:function(user) {
            return function() {
                server.game.rooms.RoomManager.getInstance().removeUser(user);
                user.dispose();
            }
        },
        _onMessage:function(event) {
            console.log("UserManager _onMessage", event.getData());
        },
        _checkLoginUser:function(socketID) {
            return this.__userSockets[socketID] !== undefined;
        },

        _addEvent:function(user) {
            this._onConnect(user);
            user.addListener('disconnect', qx.lang.Function.bind(this._onDisconnect(user), this));
            user.addListener('message', this._onMessage);
        },

        _removeEvent:function(user) {
            user.removeAllListeners("connect");
            user.removeAllListeners("connecting");
            user.removeAllListeners("connect_failed");
            user.removeAllListeners("message");
            user.removeAllListeners("close");
            user.removeAllListeners("disconnect");
            user.removeAllListeners("reconnect");
            user.removeAllListeners("reconnecting");
            user.removeAllListeners("reconnect_failed");
            user.removeAllListeners("error");
        },

        addUser:function(socket) {
            var socketID = socket.id,
                user;

            this.removeUser(socketID);
            user = new server.game.users.User(socket);
            user.connect();
            this._addEvent(user);
            this.__userSockets[socketID] = user;
        },

        removeUser:function(socketID) {
            var socket,
                result= false;

            try {
                if (this._checkLoginUser(socketID)) {
                    socket = this.getUser(socketID);
                    this.__userSockets[socketID].dispose();
                    delete this.__userSockets[socketID];
                }
                result = true;
            }
            catch(e) {
                throw new Error("removeUser Error");
            }

            return result;
        },
        getUser:function(socketID) {
            return this.__userSockets[socketID] || null;
        },
        removeAllUsers:function() {
            for (var socketID in this.__userSockets) {
                this.removeUser(socketID);
            }
        }
    },

    destruct: function () {
        this.removeAllUsers();
    }
});