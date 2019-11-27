
var CardMakerJS = require('CardMaker');
cc.Class({
    extends: cc.Component,

    properties: {
        CardImg:{
            type:cc.Sprite,
            default:null
        },
        CardTile:{
            type: cc.Label,
            default: null
        },
        CardID:{
            type: cc.Label,
            default: null
        },
        CardInner:{
            type: cc.Label,
            default: null
        },
        canTouch : false,
        isTouched : false,
        CardInfo:{},
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.view.enableAntiAlias(false);
        this.handleControl();

    },

    start () {
        cc.view.enableAntiAlias(false);
    },

    showCard : function(cardInfo){
        let self = this;
        self.CardInfo = cardInfo;
        self.CardTile.string = cardInfo.description;
        self.CardID.string = cardInfo.id;
        self.CardInner.string = CardMakerJS.trans(cardInfo);
        cc.loader.loadRes('Card/CardIMG', cc.SpriteAtlas, function (err, atlas) {
            self.CardImg.spriteFrame = atlas.getSpriteFrame(CardMakerJS.getCardIMG(cardInfo));
        });
    },
    // update (dt) {},
    //监听触摸事件
    handleControl : function(){
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            if(self.canTouch){
                self.handleResponse(self.isTouched);
                // self.isTouched = (!self.isTouched);
            }
        },this);
    },
    //触摸事件处理
    handleResponse : function(isTouched){
        if(isTouched){
            this.node.runAction(cc.moveBy(0.2,0,-30));
            this.isTouched = false;
            // console.log(isTouched)
        }else{
            this.node.runAction(cc.moveBy(0.2,0,30));
            this.isTouched = true;
            // console.log(isTouched)
        }
    }
});
