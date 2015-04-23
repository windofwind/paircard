/**
 * Created by Wind on 4/20/15.
 */

/**
 * @ignore(process.*)
 * @ignore(require)
 * @ignore(global.*)
 * @ignore(Application.*)
 */

// TODO : 게임관련 오브젝트 server.game.GameObject 로 이동
// TODO : 중복된 로직 제거.

qx.Class.define("server.game.rooms.Room", {
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

        this.setInfo({
            id:this.toHashCode()
        });
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
        info:{
            check:"Object",
            nullable:false
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        __game:null,
        __users:null,
        __turnUser:null,
        __winUser:null,
        __gameCard : null,
        __opendCardsIndex: null,
        __tounCount:null,
        __cardSeletCount:null,
        __userResult:null,
        getAvailableJoinRoom:function() {
            return this.__users.length < this.self(arguments).JOIN_USER_COUNT + 1;
        },

        addUser:function(user) {
            this.__users.push(user);
            user.addListener("message", qx.lang.Function.bind(this._onMessage(user), this));
            user.addListener("disconnect", qx.lang.Function.bind(this._onDisconnect(user), this));

            this._start();

        },

        removeUser:function(user) {
            var index = this.__users.indexOf(user);

            if (index != -1) {
                this.__users.splice(index, 1);
                return user;
            }
        },

        _onMessage:function(user) {
            return function(event) {
                var message = event.getData();
                console.log("message", message);
                switch (message.id) {
                    case "openCard":
                        this.__opendCardsIndex.push(parseInt(message.data.index));

                        console.log(this.__opendCardsIndex);

                        this._sendMessageNotTurnUser({
                            id:"openCard",
                            data:{
                                index:message.data.index
                            }
                        });

                        if (this.__opendCardsIndex.length === 2) {
                            this._sendTurn(false);
                            setTimeout(this._pairCardResult(this.__opendCardsIndex.slice()), 400);
                            this.__opendCardsIndex = [];
                        }
                        break;
                }
            }
        },

        _onDisconnect:function() {
            return function(event) {
                this._userOut();
            }
        },

        _start:function() {
            if (this.__users.length !== 2) {
                return;
            }

            this.__gameCard = null;
            this.__userResult = null;

            setTimeout(qx.lang.Function.bind(function() {
                this.__gameCard = server.game.util.CardDeck.getInstance().getCardDeck();
                this.__opendCardsIndex = [];

                this._checkTurn();
                this._sendTurn();
                this._sendMessageAllUser({
                    id:"start",
                    data:{
                        cardDeck:this.__gameCard
                    }
                });

                var selfPointer = this;
                this.__userResult = {};
                this.__users.forEach(function(data, index, array) {
                    selfPointer.__userResult[data.getSocket().id] = {
                        turnCount:0,
                        rightCard:[],
                        select8:false,
                        selectCount:0,
                        isWin:0
                    }
                });

                selfPointer.__userResult[selfPointer.getTurnUser().getSocket().id].turnCount++;
            }, this), 2000);
        },

        _pairCardResult:function(cards) {
            return qx.lang.Function.bind(function() {
                if (this.__gameCard[cards[0]] === this.__gameCard[cards[1]]
                    && cards[0] !== cards[1]) {
                    this._sendMessageAllUser({
                        id:"cardOut",
                        data:{
                            indexs:cards
                        }
                    });

                    this.__userResult[this.getTurnUser().getSocket().id].selectCount++
                    this.__userResult[this.getTurnUser().getSocket().id].rightCard.push(this.__gameCard[cards[0]]);
                    if (this.__gameCard[cards[0]] === 8) {
                        this.__userResult[this.getTurnUser().getSocket().id].select8 = true;
                    }
                    this._sendTurn();
                }
                else {
                    this._sendMessageAllUser({
                        id:"cardRestore",
                        data:{
                            indexs:cards
                        }
                    });
                    this.__userResult[this.getNotTurnUser().getSocket().id].turnCount++;
                    this.__userResult[this.getTurnUser().getSocket().id].selectCount++;
                    this._nextTurn();
                }

                var totalCount = 0;
                for (var id in this.__userResult) {
                    totalCount += this.__userResult[id].rightCard.length;
                }

                if (server.game.rooms.Room.SELECT_MAX_PAIRCARD_COUNT === totalCount) {
                    console.log(this.__userResult);
                    this._end();
                }
            }, this);
        },

        _sendMessageAllUser:function(message) {
            this.__users.forEach(qx.lang.Function.bind(function(user, index, array) {
                user.sendMessage(message);
            }, this));
        },
        _sendMessageTurnUser:function(message) {
            try {
                this.getTurnUser().sendMessage(message);
            }
            catch(e) {
                console.error(e.message);
            }
        },
        _sendMessageNotTurnUser:function(message) {
            try {
                this.getNotTurnUser().sendMessage(message);
            }
            catch(e) {
                console.error(e.message);
            }
        },

        getTurnUser:function() {
            return this.__turnUser;
        },

        getNotTurnUser:function() {
            var index;

            try {
                index = this.__users.indexOf(this.__turnUser);

                if (index != -1) {
                    return this.__users[++index % 2];
                }
            }
            catch(e) {
                console.error(e.message);
            }
        },

        _end:function() {
            // 게임 결과 보내기.
            this._sendGameResult();

            setTimeout(qx.lang.Function.bind(function(){
                this._start();
            }, this), 10000);

            this._sendTurn(false);
        },

        _sendGameResult:function() {
            console.log(this.__userResult[this.getTurnUser().getSocket().id].rightCard.length);
            console.log(this.__userResult[this.getNotTurnUser().getSocket().id].rightCard.length);

            if (this.__userResult[this.getTurnUser().getSocket().id].rightCard.length > this.__userResult[this.getNotTurnUser().getSocket().id].rightCard.length) {
                this.__userResult[this.getTurnUser().getSocket().id].isWin = 1;
                this.__userResult[this.getNotTurnUser().getSocket().id].isWin = -1;
            }
            else if (this.__userResult[this.getTurnUser().getSocket().id].rightCard.length < this.__userResult[this.getNotTurnUser().getSocket().id].rightCard.length) {
                this.__userResult[this.getTurnUser().getSocket().id].isWin = -1;
                this.__userResult[this.getNotTurnUser().getSocket().id].isWin = 1;
            }

            this._sendMessageTurnUser({id:"gameResult", data:{
                result:[this.__userResult[this.getTurnUser().getSocket().id], this.__userResult[this.getNotTurnUser().getSocket().id]]
            }});

            this._sendMessageNotTurnUser({id:"gameResult", data:{
                result:[this.__userResult[this.getNotTurnUser().getSocket().id], this.__userResult[this.getTurnUser().getSocket().id]]
            }});
        },

        _abnormalEnd:function() {
            // 비정상종료.
            this._sendMessageAllUser({
                id:"abnormalEnd",
                data:{}
            });
        },

        _userOut:function() {
            this._sendMessageAllUser({
                id:"userOut",
                data:{}
            });

            this._abnormalEnd();
        },

        _checkTurn:function() {
            if (!this.__winUser) {
                this.__turnUser = this.__users[0];
            }
            else {
                this.__turnUser = this.__winUser;
            }
        },
        _nextTurn:function() {
            var index = this.__users.indexOf(this.__turnUser);

            if (index != -1) {
                this.__turnUser = this.__users[++index % 2];
            }

            this._sendTurn();
        },

        _sendTurn:function(noTurn) {
            this._sendMessageTurnUser({
                id:"turn",
                data:{
                    result:noTurn === undefined
                }
            });

            this._sendMessageNotTurnUser({
                id:"turn",
                data:{
                    result:false
                }
            });
        },

        getUserCount:function() {
            return this.__users.length;
        }
    },

    destruct: function () {
        this.__turnUser = null;
        this.__gameCard = null;
        this.__winUser = null;
        this.__gameCard = null;
        this.__userResult = null;

        while(this.__users.length > 0) {
            this.__users.pop();
        }
    }
});