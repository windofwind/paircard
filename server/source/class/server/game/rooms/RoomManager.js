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

        this._roomsArray = [];
        this._roomsMap = {};
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
        _roomsArray:null,
        _roomsMap:null,
        onChangeRooms:function() {
            console.log(JSON.stringify(this._roomsArray));
        },

        _addRoom:function(user) {
            var room = new server.game.rooms.Room();
            room.addUser(user);

            this._roomsArray.push(room.getInfo());
            this._roomsMap[room.toHashCode()] = room;
            this._users[user.getSocketID()] = room;

            this.onChangeRooms();
        },

        _removeRoom:function(room) {
            if (this._roomsMap[room.toHashCode()]) {
                delete this._roomsMap[room.toHashCode()];

                var index = this._roomsArray.indexOf(room.getInfo());

                if (index != -1) {
                    this._roomsArray.splice(index, 1);
                }

                room.dispose();

                this.onChangeRooms();
            }

            return room;
        },

        addUser:function(user) {
            var room;
            for (var id in this._roomsMap) {
                if (this._roomsMap[id].getAvailableJoinRoom()) {
                    room = this._roomsMap[id];
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