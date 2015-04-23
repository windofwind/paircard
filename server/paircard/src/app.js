// 수정완료. (socket.io 버전 업데이트하기. v1.3.5 - cocos2d-x JS 에 포함된 버전은 v0.9.6임)
// 수정완료. (오브젝트 위치 판별을 위한 가이드라인 Layer 추가)
// TODO : 오브젝트별 아이디 관리 추가. CustomXXXX 상속으로 변경 예정.
// TODO : protect "_", private "__" 정의하기. 외부접근 함수 만들어주기.
// TODO : 짧은 시간에 만든 만큼 추후 리팩토링이 많이 필요.
// TODO : MVC 모델 적용하기. (예상 pureMVC, angulaJS(?))
// TODO : Qooxdoo sdk 에 적용할 수 있을까?
// TODO : 위젯별 접근 방식을 함수로 정의하기.
// TODO : 패킷에 따른 상황별 접근 방식 변경 하기.
// TODO : 솔로 클라이언트에 테스트한 소스 제거
// TODO : 테스트 코드 작성.
// TODO : view 별 폴더를 나눠서 관리하기.
// TODO : 블락레이어 만들기. 선택을 막거나 팝업시 띄우기

// 오브젝트 아이디 관리.
var objectNameList = {

};

var Connection; // socket.io 접근 객체 socket.io v1.35
var PairCard = cc.Scene.extend({
    onEnter:function () {
        this._super();
//        var guideLayer = new Guideline();
        var layer = new PairCardLayer();
        var result = new ResultLayer();
        var block = new BlockLayer();
        var turnLayer = new TurnLayer();
        var endLayer = new EndGameAnimationLayer();

//        this.addChild(guideLayer);
        this.addChild(layer);
        this.addChild(turnLayer);
        this.addChild(block);
        this.addChild(result);
        this.addChild(endLayer);

        Connection = {
            _con:null,
            _turn:false,
            connect:function() {
                var selfPointer = this;
                this._conn = io.connect('http://addcode.info:3000');

                this._conn.on("connect", function() {
                });

                this._conn.on("disconnect", function() {
                });

                this._conn.on("message", function(message) {
                    switch(message.id) {
                        case "start":
                            layer.cardIn(message.data.cardDeck);
                            break;

                        case "turn":
                            selfPointer._turn = message.data.result;
                            if (selfPointer._turn) {
                                turnLayer.visible = true;
                            }
                            else {
                                turnLayer.visible = false;
                            }
                            break;

                        case "openCard":
                            layer.cardOpen(message.data.index);
                            break;

                        case "cardOut":
                            message.data.indexs.forEach(function(data, index, array) {
                                layer.cardOut(data);
                            });
                            break;

                        case "cardRestore":
                            message.data.indexs.forEach(function(data, index, array) {
                                layer.cardClose(data);
                            });
                            break;

                        case "userOut":
                            turnLayer.visible = false;
                            break;

                        case "gameResult":
                            endLayer.visible = true;
                            endLayer.playAnimation();
                            result.setResult(message.data.result);
                            break;

                        case "":
                            break;
                    }
                });
            },

            getTurn:function() {
                return this._turn;
            },

            openCard:function(cardIndex) {
                if (!this._turn) {
                    return;
                }

                this._conn.emit("message", {
                    id:"openCard",
                    data:{
                        index:cardIndex
                    }
                });
            }
        };

        Connection.connect();
    }
});