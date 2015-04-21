/**
 * Created by Wind on 4/19/15.
 */

// TODO : 결과 위치 선정하기.
var ResultLayer = cc.Layer.extend({
    _result: null,
    _otherResult: null,

    ctor:function() {
        this._super(arguments);
    },

    onEnter:function() {
        this._super();
        this._result = new GameResult();
        this._result.setPosition(cc.p(50, 100));
        this.addChild(this._result);
        this._otherResult = new GameResult();
        this._otherResult.setPosition(cc.p(280, 100));
        this.addChild(this._otherResult);

        this._wins = new cc.LabelTTF("승리", "Arial", 50);
        this._wins.setPosition(300,350);
        this.addChild(this._wins);

        this.visible = false;
    },

    setResult:function(results) {
        console.log(results);

        this.visible = true;
        if (results[0].isWin > 0) {
            this._wins.setString("승리");
        }
        else if (results[0].isWin === 0) {
            this._wins.setString("비김");
        }
        else {
            this._wins.setString("패배");
        }

        this._result.setResult(results[0], true);
        this._otherResult.setResult(results[1]);



        var selfPointer = this;
        setTimeout(function() {
            selfPointer.visible = false;
        }, 5000);
    }
});

var GameResult = cc.Node.extend({
    _id:null,
    _turnCount:null,
    _normalcySelectCount:null,
    _normalcySelectCards:null,
    _sumSelectCount:null,
    ctor:function() {
        this._super();
    },

    onEnter:function() {
        this._super();
        // 당신의 ID 는 입니다.
        this._id = new cc.LabelTTF("_id", "Arial", 20);
        this._id.setString("상대방");
        this._id.setPosition(100,120);
        // 턴 수 ?
        this._turnCount = new cc.LabelTTF("_turnCount", "Arial", 20);
        this._turnCount.setPosition(100,100);
        // 정상선택 횟수 ?
        this._normalcySelectCount = new cc.LabelTTF("_normalcySelectCount", "Arial", 20);
        this._normalcySelectCount.setPosition(100,80);
        // 정상선택 카드 ?
        this._normalcySelectCards = new cc.LabelTTF("_normalcySelectCards", "Arial", 20);
        this._normalcySelectCards.setPosition(100,60);
        // 총 카드뒤집은 횟수?
        this._sumSelectCount = new cc.LabelTTF("_sumSelectCount", "Arial", 20);
        this._sumSelectCount.setPosition(100,40);

        this._select8 = new cc.LabelTTF("_sumSelectCount", "Arial", 20);
        this._select8.visible = false
        this._select8.setString("당신은 8을 선택하셨습니다.");
        this._select8.setPosition(100,20);

        this.addChild(this._id);
        this.addChild(this._turnCount);
        this.addChild(this._normalcySelectCount);
        this.addChild(this._normalcySelectCards);
        this.addChild(this._sumSelectCount);
        this.addChild(this._select8);
    },

    setResult:function(result, isme) {
        console.log(result);

        if (isme) {
            this._id.setString("나");
        }

        this._turnCount.setString("턴카운트 : " + result.turnCount);
        this._normalcySelectCount.setString("카드선택횟수 : " + result.selectCount);
        this._normalcySelectCards.setString("맞은카드순서 : " + JSON.stringify(result.rightCard));
        this._sumSelectCount.setString("맞은카드수 : " + result.rightCard.length);
        this._select8.visible = result.select8;
    }
});