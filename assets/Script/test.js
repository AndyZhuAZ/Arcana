var CardMakerJS = require('CardMaker');
var CardJS = require('Card');
cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            type: cc.Prefab,
            default: null
        },
        cardPile: [],
        card: {
            default: null,
            id: 0,
            type: null,
            value: 0,
            attributes: null,
            description: null,
            ex: null,
        },
        playerDiv: {
            type: cc.Layout,
            default: null
        },
        button: {
            type: cc.Button,
            default: null
        },
        // CardMaker:CardMakerJS
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.pool = new cc.NodePool();
        this.arrCard = [];
        for (let i = 0; i < 3; i++) {
            let card = cc.instantiate(this.cardPrefab);
            this.cardChange(card, CardMakerJS.cardPile[i]);
            this.arrCard.push(card);
            this.pool.put(card);

            card.on(cc.Node.EventType.TOUCH_START, this.onTouchCard, this);
        }
    },

    onTouchCard(event){
        let target = event.target;
        if(target.getComponent('Card').isTouched){
            let act1 = cc.moveTo(0.5, cc.v2(0, 250));
            let act2 = cc.fadeTo(2, 0);
            let seq = cc.sequence(act1,act2);
            target.runAction(seq);

            this.scheduleOnce(function(){
                target.removeFromParent();
            },2.2);
        }else{
            target.runAction(cc.moveBy(0.2,0,30));
            target.getComponent('Card').isTouched = true;
        }
    },

    start() {
        // this.addCard('magic',1,'ice','魔法攻击',null);
        // console.log(CardMakerJS.getCardPile());
        // let arr = [];

        // let card = cc.instantiate(this.cardPrefab);
        // this.cardChange(card, CardMakerJS.cardPile[6]);
        // arr.push(card);
        for (let i = 0; i < 3; i++) {
            let card = this.pool.get();
            card.x += 100*i;
            this.playerDiv.node.addChild(card);
        }
        // this.playerDiv.node.addChild(this.pool.get());

        // var a = cc.instantiate(this.cardPrefab);
        // this.cardChange(a,CardMakerJS.getCardPile()[10]);
        // a.getChildByName('No').getComponent(cc.Label).string = '111';
        // this.node.addChild();
        // var b = cc.instantiate(this.cardPrefab);
        // this.playerDiv.node.addChild(b);

        //test
        // CardJS.showCard(CardMakerJS.cardPile[6]);
        let cardNode = cc.instantiate(this.cardPrefab);
        let cardjs = cardNode.getComponent(CardJS);
        cardjs.showCard(CardMakerJS.cardPile[6]);
        cardNode.x -= 200;
        this.node.addChild(cardNode);
    },
    PLAYclik() {
        let act1 = cc.moveTo(0.5, cc.v2(0, 250));
        // let t = cc.delayTime(1000);
        let act2 = cc.fadeTo(2, 0);
        let seq = cc.sequence(act1,act2);
        // if (this.playerDiv.node.getChildByName('Card').getComponent(isChoosed) === true){
        //     this.playerDiv.node.getChildByName('Card').runAction(seq);
        // }
        this.playerDiv.node.getChildByName('Card').runAction(seq);

    },
    CLEARclik(){
        this.playerDiv.node.getChildByName('Card').removeFromParent();
    },
    cardChange(card, cardInfo) {
        card.getChildByName('ID').getComponent(cc.Label).string = cardInfo.id;
        card.getChildByName('Inner').getComponent(cc.Label).string = CardMakerJS.trans(cardInfo);
        card.getChildByName('Title').getComponent(cc.Label).string = cardInfo.description;
        cc.loader.loadRes('Card/CardIMG', cc.SpriteAtlas, function (err, atlas) {
            card.getChildByName('Img').getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(CardMakerJS.getCardIMG(cardInfo));
        });
    },
    update (dt) {},
});
