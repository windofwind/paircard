/**
 * Created by Wind on 4/20/15.
 */
/**
 * Created by wind on 3/26/15.
 */
/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

qx.Class.define("server.game.rooms.RoomManager", {
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

        this._rooms = {};
        this._users = {};
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
        _rooms:null,
        _addRoom:function(user) {
            var room = new server.game.rooms.Room();
            room.addUser(user);

            this._rooms[room.toHashCode()] = room;
            this._users[user.getSocketID()] = room;
        },

        _removeRoom:function(item) {
            var index = this.__users.indexOf(item);

            if (index != -1)
            {
                this.splice(index, 1).dispose();
                return item;
            }
        },

        addUser:function(user) {
            var room;
            for (var id in this._rooms) {
                if (this._rooms[id].getAvailableJoinRoom()) {
                    room = this._rooms[id];
                }
            }

            if (room) {
                room.addUser(user);
            }
            else {
                this._addRoom(user);
            }
        },

        removeUser:function(user) {
            var room = this._users[user.getSocketID()];
            room.removeUser(user);
            delete this._users[user];

            if (room.getUserCount() === 0) {
                this._removeRoom(room);
            }
        }
    },

    destruct: function () {
        this.removeAllUsers();
    }
});