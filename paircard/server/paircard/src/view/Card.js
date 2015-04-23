/**
 * Created by Wind on 4/19/15.
 */

// TODO : 카드클릭시 _onClickCallback 사용으로 변경하기.
// TODO : 카드애니메이션 정리.
// TODO : 사용하지않는 변수 및 함수정리.
// TODO : card 애니메이션 클레스로 따로 뺄까?

var Card = cc.Node.extend({
    _frontFace:null,
    _cardNum:null,
    _action:null,
    _beforeX: null,
    _beforeY: null,
    _isLock:false,
    _isOpen:false,
    _isOut:false,
    __cardNumber : 0,
    _initInPosition:null,
    _initOutPosition:null,
    _onClickCallback:null,
    _openBeforeCallback:null,

    ctor:function(name) {
        this._super();

        this._frontFace = new cc.Sprite(res.CardBack_png);
        this._cardNum = new cc.LabelTTF("0", "Arial", 28);

        this.setContentSize(this._frontFace.width, this._frontFace.height);

        this._frontFace.x = this.width / 2;
        this._frontFace.y = this.height / 2;

        this._cardNum.x = this.width / 2;
        this._cardNum.y = this.height / 2;

        this._cardNum.visible = false;

        this.addChild(this._frontFace);
        this._frontFace.addChild(this._cardNum);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: this.onMouseUp.bind(this)
        }, this);

        if (name !== undefined) {
            this.setName(name);
        }
    },

    onEnter:function() {
        this._super();
    },

    setInitInPosition:function(position) {
        this._initInPosition = position;
    },
    setInitOutPosition:function(position) {
        this._initOutPosition = position;
    },

    _checkMousePosition:function(event) {
        var mousex = event.getLocationX();
        var mousey = event.getLocationY();
        var myPos = event.getCurrentTarget().getPosition();

        if( (mousex > myPos.x) && (mousex < (myPos.x+this.width) ) )
        {
            if( mousey > myPos.y && mousey < (myPos.y+this.height) )
            {
                return true;
            }
        }

        return false;
    },

    onMouseUp:function(event) {
        if (this._checkMousePosition(event)) {
            if (!this._isOpen && Connection.getTurn()) {
                if (this._onClickCallback) {
                    this._onClickCallback();
                }
                else {
                    this.open(true, true);
                }
            }
        }
    },

    setOnClick:function(callback) {
        this._onClickCallback = callback;
    },

    setCardNum:function(value) {
        this.__cardNumber = value;
        this._cardNum.setString(value);
    },

    getCardNum:function() {
        return this.__cardNumber;
    },

    open:function(isPlayAnimation, isUseCallback) {
        this._isOpen = true;

        if (isPlayAnimation) {
            this.animationFlip();
        }
        else {
            this._cardNum.visible = true;
            this._frontFace.setTexture(res.CardFront_png);
        }

        if (isUseCallback) {
            this._openBeforeCallback();
        }
    },

    close:function(isPlayAnimation) {
        this._isOpen = false;
        if (isPlayAnimation) {
            this.animationFlip();
        }
        else {
            this._cardNum.visible = false;
            this._frontFace.setTexture(res.CardBack_png);
        }
    },

    getIsOpen:function() {
        return this._isOpen;
    },

    getIsOut:function() {
        return this._isOut;
    },

    /*
        Callback.
     */
    setOpenCallback:function(beforeCallback, afterCallback) {
        if (beforeCallback)
            this._openBeforeCallback = beforeCallback;
    },

    animationFlip:function(isAllOpen) {
        this._action = cc.sequence(
            cc.scaleBy(0.2, 0.0, 1.0),
            cc.callFunc(function(){
                this._cardNum.visible = this._isOpen;
                if (this._isOpen) {
                    this._frontFace.setTexture(res.CardFront_png);
                }
                else {
                    this._frontFace.setTexture(res.CardBack_png);
                }
            }, this),
            cc.scaleTo(0.2, 1.0, 1.0),

            cc.callFunc(function(){
                this._action.release();
            }, this)
        );

        this._frontFace.runAction(this._action);
    },

    animationIn:function(x, y) {
        if (!this._isLock) {
            this._isOut = false;
            this.setPosition(this._initOutPosition);

            this._action= cc.sequence(
                cc.moveTo(0.5, this._initInPosition),
                cc.callFunc(function(){
                    this._action.release();
                }, this)
            );
            this.runAction(this._action);
        }
    },

    animationOut:function(doClose) {
        if (!this._isLock) {
            this._isOut = true;
            this.setPosition(this._initInPosition);

            this._action= cc.sequence(
                cc.delayTime(0.2),
                cc.moveTo(0.5, this._initOutPosition),
                cc.callFunc(function(){
                    this._action.release();

                    if (doClose) {
                        this.close();
                    }
                }, this)
            );

            this.runAction(this._action);
        }
    }
});