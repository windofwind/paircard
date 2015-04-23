/**
 * Created by Wind on 4/19/15.
 */
// TODO : 2가지 상태의 버튼을 4가지 상태로 변환.
var Button = cc.Node.extend({
    _buttonImageCount:3,
    _buttonImageHeight:0,
    _button:null,
    _text:null,

    _clickCallback:null,

    ctor:function(buttonImage, name) {
        this._super();

        this._button = new cc.Sprite(buttonImage);
        this._buttonImageHeight = this._button.height / this._buttonImageCount;
        this._text = new cc.LabelTTF("0", "Arial", 12);

        this.addChild(this._button);
        this.addChild(this._text);

        this.setContentSize(this._button.width, this._buttonImageHeight);
        this._button.setTextureRect(new cc.Rect(0, 0, this.getContentSize().width, this.getContentSize().height) );
        this._button.setPosition(this.width / 2, this.height / 2);
        this._text.setPosition(this.width / 2, this.height / 2);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this._onMouseDown.bind(this),
            onMouseUp:this._onMouseUp.bind(this)
        }, this);

        if (name) {
            this.setName(name);
            this.setText(name);
        }
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

    setOnClick:function(callback) {
        this._clickCallback = callback;
    },

    _onMouseDown:function(event) {
        if (this._checkMousePosition(event)) {
            this._button.setTextureRect(new cc.Rect(0, this.getContentSize().height * 1, this.getContentSize().width, this.getContentSize().height))
        }
    },
    _onMouseUp:function(event) {
        this._button.setTextureRect(new cc.Rect(0, this.getContentSize().height * 0, this.getContentSize().width, this.getContentSize().height))

        if (this._checkMousePosition(event) && this._clickCallback) {
            this._clickCallback();
        }
    },

    setText:function(text) {
        this._text.string = text;
    },
    setFontName:function(fontName) {
        this._text.fontName = fontName;
    },
    setFontSize:function(fontSize) {
        this._text.setFontSize = setFontSize;
    }
});