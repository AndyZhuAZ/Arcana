var CardMakerJS = require('CardMaker');
var CardJS = require('Card');
let mainJS = require('Main');

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            type: cc.Prefab,
            default: null
        },
        cardBackPrefab: {
            type: cc.Prefab,
            default: null
        },
        cardPile: [],
        dealCardNum: 3,
        fullHP: 20,

        enemyName: {
            type: cc.Label,
            default: null
        },
        enemyHP: {
            type: cc.Label,
            default: null
        },
        playerName: {
            type: cc.Label,
            default: null
        },
        playerHP: {
            type: cc.Label,
            default: null
        },
        playerDiv: {
            type: cc.Layout,
            default: null
        },
        enemyDiv: {
            type: cc.Layout,
            default: null
        },
        log: {
            type: cc.Label,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    // 卡牌生成，动态加载卡牌图片
    cardChange(card, cardInfo) {
        card.getChildByName('ID').getComponent(cc.Label).string = cardInfo.id;
        card.getChildByName('Inner').getComponent(cc.Label).string = CardMakerJS.trans(cardInfo);
        card.getChildByName('Title').getComponent(cc.Label).string = cardInfo.description;
        cc.loader.loadRes('Card/CardIMG', cc.SpriteAtlas, function (err, atlas) {
            card.getChildByName('Img').getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(CardMakerJS.getCardIMG(cardInfo));
        });
    },
    // 出牌事件点击监控和处理
    onTouchCard(event) {
        if (this.player.movePoint <= 0)
            return;
        let target = event.target;
        let flag = false;
        if (target.getComponent('Card').isTouched) {
            if (this.oneMore === true) {
                this.oneMore = false;
                flag = true;
            }
            this.player.movePoint--;
            let act1 = cc.moveTo(0.5, cc.v2(0, 250));
            let act2 = cc.fadeTo(2, 0);
            let seq = cc.sequence(act1, act2);
            target.runAction(seq);
            this.card = target.getComponent('Card').CardInfo;
            this.settleAccounts(this.player, this.enemy, this.card);
            this.scheduleOnce(function () {
                target.removeFromParent();
                this.playerCards.splice(this.playerCards.indexOf(this.card), 1);
            }, 2);
            if (flag === true)
                this.roundInitCC();
        } else {
            target.runAction(cc.moveBy(0.2, 0, 30));
            target.getComponent('Card').isTouched = true;
        }
    },


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    },
    // 回合数据初始化
    roundInit(enemyCards, playerCards) {
        this.player.movePoint = 1;
        this.enemy.movePoint = 1;
        console.log(this.player);
        console.log(this.enemy);
        for (let i = 0; i < this.dealCardNum; i++) {
            enemyCards.push(this.enemyCardPile[this.getRandomInt(this.enemyCardPile.length)]);
            playerCards.push(this.cardPile[this.getRandomInt(this.cardPile.length)]);
        }

        for (let i of playerCards) {
            let card = cc.instantiate(this.cardPrefab);
            let cardJS = card.getComponent(CardJS);
            cardJS.showCard(i);
            this.arrCard.push(card);
            this.pool.put(card);
            card.on(cc.Node.EventType.TOUCH_START, this.onTouchCard, this);
        }
        for (let i of enemyCards) {
            let card = cc.instantiate(this.cardBackPrefab);
            card.removeAllChildren();
            this.enemyPool.put(card);
        }
        console.log(enemyCards);
    },

    onLoad() {
        cc.view.enableAntiAlias(false);

        this.card = {
            id: 0,
            type: null,
            value: 0,
            attributes: null,
            description: null,
            ex: null,
        };
        this.enemy = {
            hp: null,
            name: null,
            item: null,
            defense: null,
            status: null,
            weak: []
        };
        this.player = {
            hp: null,
            name: null,
            item: null,
            defense: null,
            status: null,
            weak: []
        };
        this.cardPile = CardMakerJS.cardPile;
        this.enemyCardPile = CardMakerJS.enemyCardPile;
        this.enemy.hp = this.fullHP;
        this.enemy.weak.push('fire');
        this.enemy.weak.push('light');
        this.enemy.name = 'Slime';
        this.enemyName.string = this.enemy.name;
        this.enemyHP.string = this.enemy.hp;
        this.player.hp = this.fullHP;
        this.player.name = 'Rookie';
        this.playerName.string = this.player.name;
        this.playerHP.string = this.player.hp;
        this.logMessage = '';
        this.oneMore = false;//额外攻击


    },
    // 行动结算
    settleAccounts(source, target, card) {
        if (card === null) {
            console.log(source.name + '放弃了出牌');
            this.logMess(source.name + '放弃了出牌');
            return;
        }
        let damageAmount = 0;
        console.log('[ ' + source.name + '打出手牌：' + CardMakerJS.trans(card) + ']');
        this.logMess('[ ' + source.name + '打出手牌：' + CardMakerJS.trans(card) + ']');
        switch (card.type) {
            case 'atk':
                if (source.item !== null && source.item.attributes === 'weapon')
                    card.value++;
                if (target.defense >= card.value)
                    damageAmount = 0;
                else damageAmount = target.defense - card.value;
                target.defense = 0;
                break;
            case 'magic':
                if (target.item !== null) {
                    if (target.item.attributes === 'magicBarrier')
                        card.value = 0;
                }
                // else target.status = 'debuff';
                damageAmount = -card.value;
                break;
            case 'cure':
                target = source;
                damageAmount = card.value;
                break;
            case 'def':
                target = source;
                target.defense = card.value;
                break;
            case 'item':
                source.item = card;
        }
        target.hp += damageAmount;
        switch (card.type) {
            case 'atk':
            case 'magic':
                if (target.weak.indexOf(card.attributes) in target.weak) {
                    this.oneMore = true;
                    source.movePoint = 1;
                    target.status = 'debuff';
                }
                console.log('造成' + -damageAmount + '点伤害');
                break;
            case 'cure':
                console.log('恢复' + damageAmount + '点HP');
                break;
            case 'def':
                console.log('下回合抵消' + card.value + '点伤害')
        }

        console.log(this.player);
        console.log(this.enemy);
        this.roundCheck();
    },
    // 回合初始化
    roundInitCC() {
        this.cleanDiv();
        this.enemyCards = [];
        this.playerCards = [];
        this.pool = new cc.NodePool();
        this.enemyPool = new cc.NodePool();
        this.arrCard = [];
        this.roundInit(this.enemyCards, this.playerCards);
        for (let i in this.playerCards) {
            let card = this.pool.get();
            card.x = -170;
            card.x += 170 * i;
            this.playerDiv.node.addChild(card);
        }
        for (let i in this.enemyCards) {
            let card = this.enemyPool.get();
            card.x = -170;
            card.x += 170 * i;
            this.enemyDiv.node.addChild(card);
        }
    },
    // 回合结算
    roundCheck() {
        if (this.player.movePoint === 0) {
            if (this.enemy.movePoint === 0) {
                this.roundInitCC();
            } else if (this.oneMore === false) {
                this.settleAccounts(this.enemy, this.player, this.botMove());
                this.roundInitCC();
                // this.botMove();
            }
        }
        if (this.player.hp <= 0) {
            this.logMess('YOU DEAD');
            this.scheduleOnce(function () {
                cc.director.loadScene('start');
            }, 2);
        }
        if (this.enemy.hp <= 0) {
            this.logMess('YOU WIN');
            this.scheduleOnce(function () {
                cc.director.loadScene('end');
            }, 2);

        }

    },
    // bot行动逻辑
    botMove() {
        // let movePoint = 1;
        let cardSelect = [];
        let cardValue = [];
        for (let i of this.enemyCards) {
            if (this.enemy.hp < this.fullHP * 0.4) {
                if (i.type === 'cure') {
                    cardSelect.push(i);
                    cardValue.push(i.value);
                }
            } else {
                if (i.type === 'atk' || i.type === 'magic') {
                    cardSelect.push(i);
                    cardValue.push(i.value);
                }
            }
        }
        if (cardSelect.length === 0)
            return null;
        if (this.enemy.movePoint) {
            this.enemy.movePoint = 0;
            let index = cardValue.indexOf(this.getMaxOfArray(cardValue));
            let card = cc.instantiate(this.cardPrefab);
            let cardJS = card.getComponent(CardJS);
            cardJS.showCard(cardSelect[index]);
            card.setPosition(cc.v2(580, 530));
            this.node.addChild(card);
            // this.enemyDiv.node.getChildByName('Card').removeFromParent();
            console.log(cardSelect[index]);
            return cardSelect[index];
        }
    },

    end() {

    },
    // 清理牌桌
    cleanDiv() {
        this.playerDiv.node.removeAllChildren();
        this.enemyDiv.node.removeAllChildren();
        console.log(this.card);
    },

    start() {
        cc.view.enableAntiAlias(false);

        this.roundInitCC();

    },
    logMess(str) {
        this.logMessage += '\n' + str;
    },
    update(dt) {
        this.log.string = this.logMessage;
        this.playerHP.string = this.player.hp;
        this.enemyHP.string = this.enemy.hp;
    },
});
