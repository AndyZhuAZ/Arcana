let CardMaker = {};
CardMaker.cardPile = [];
const card = {
    id: 0,
    type: null,
    value: 0,
    attributes: null,
    description: null,
    ex: null,
};
CardMaker.fullHP = 20;
CardMaker.enemyCardPile = [];

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

//添加卡牌的函数，输入类型数值属性描述
function addCard(type, value, attributes, description, ex) {
    let c = Object.create(card);
    c.id = CardMaker.cardPile.length;
    c.type = type;
    c.value = value;
    c.attributes = attributes;
    c.description = description;
    c.ex = ex;
    CardMaker.cardPile.push(c);
}

let type = ['atk', 'def', 'item', 'magic', 'cure'];
let value = [1, 3, 5];
let att = ['fire', 'ice', 'wind', 'light', 'dark'];

for (let i of type) {
    switch (i) {
        case 'magic':
            for (let j of value)
                for (let k of att)
                    addCard(i, j, k, '魔法攻击', null);
            break;
        case 'item':
            addCard(i, 0, 'weapon', '火之高兴', 'fire');
            addCard(i, 0, 'weapon', '霜之哀伤', 'ice');
            addCard(i, 1, 'weapon', '牙签', 'physical');
            addCard(i, 3, 'weapon', '大宝剑', 'physical');
            addCard(i, null, 'magicBarrier', '魔法屏障', null);
            break;
        case 'atk':
            for (let j of value)
                addCard(i, j, 'physical', '物理攻击', null);
            break;
        case 'def':
            for (let j of value)
                addCard(i, j, 'physical', '防御', null);
            break;
        case 'cure':
            for (let j of value)
                addCard(i, j, 'cure', '治疗', null);
            break;
    }
}
for (let i of CardMaker.cardPile) {
    switch (i.type) {
        case 'atk':
        case 'magic':
        case 'cure':
            CardMaker.enemyCardPile.push(i);
            break;
        default:break;
    }
}

CardMaker.trans = function (card) {
    let str = '';
    switch (card.type) {
        case 'magic':
            str = '法术攻击' + card.value + '点';
            switch (card.attributes) {
                case 'fire':
                    str += '火';
                    break;
                case 'ice':
                    str += '冰';
                    break;
                case 'wind':
                    str += '风';
                    break;
                case 'light':
                    str += '光';
                    break;
                case 'dark':
                    str += '暗';
                    break;
            }
            str += '属性伤害';
            break;
        case 'item':
            str = '装备卡';
            if (card.attributes === 'weapon') {
                str += '武器' + card.description;
                switch (card.ex) {
                    case 'fire':
                    case 'ice':
                        str += '使普通攻击变为' + card.ex + '属性';
                        break;
                    case 'physical':
                        str += '物理伤害+' + card.value;
                        break;
                }
            } else if (card.attributes === 'magicBarrier') {
                str += '魔法屏障，装备期间无视魔法攻击';
            }
            break;
        case 'atk':
            str += '物理攻击' + card.value + '点物理伤害' + '' + '';
            break;
        case 'def':
            str += '下一次攻击时抵消' + card.value + '点物理伤害';
            break;
        case 'cure':
            str += '恢复' + card.value + '点HP';
            break;
    }
    return str;
};
CardMaker.getCardIMG = function (card) {
    let str = '';
    switch (card.type) {
        case 'magic':
        case 'atk':
            str += card.attributes;
            break;
        case 'item':
            if (card.attributes === 'weapon') {
                switch (card.ex) {
                    case 'fire':
                    case 'ice':
                        str += card.ex + 'Sword';
                        break;
                    case 'physical':
                        if (card.value === 1)
                            str += 'TinySword';
                        else str+='BigSword';
                        break;
                }
            } else if (card.attributes === 'magicBarrier') {
                str += 'magicbarrier';
            }
            break;
        case 'def':
        case 'cure':
            str += card.type;
            break;
    }
    return str;
};
// console.log(CardMaker.cardPile);
const character = {
    hp: CardMaker.fullHP,
    name: null,
    item: null,
    defense: null,
    status: null
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function roundInit(enemyCards, playerCards) {
    for (let i = 0; i < 2; i++) {
        enemyCards.push(CardMaker.cardPile[getRandomInt(CardMaker.cardPile.length)]);
        playerCards.push(CardMaker.cardPile[getRandomInt(CardMaker.cardPile.length)]);
    }
}

function printCard(cards) {
    console.log('手牌:');
    let count = 0;
    for (let i of cards) {
        console.log('[ 卡号：' + count++ + trans(i) + ']')
    }
}

function printHP(e, p) {
    console.log(p.name + '你的剩余HP为：' + p.hp);
    console.log('敌人:' + e.name + '剩余HP为：' + e.hp);
}

//结算
function settleAccounts(source, target, card) {
    if (card === null) {
        console.log(source.name + '放弃了出牌');
        return;
    }
    let damageAmount = 0;
    console.log('[ ' + source.name + '打出手牌：' + trans(card) + ']');
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
            if (target.item !== null)
                if (target.item.attributes === 'magicBarrier')
                    card.value = 0;
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
            console.log('造成' + -damageAmount + '点伤害');
            break;
        case 'cure':
            console.log('恢复' + damageAmount + '点HP');
            break;
        case 'def':
            console.log('下回合抵消' + card.value + '点伤害')
    }
}

function botMove() {
    let movePoint = 1;
    let cardSelect = [];
    let cardValue = [];
    for (let i of enemyCards) {
        if (enemy.hp < CardMaker.fullHP * 0.4) {
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
    if (movePoint) {
        let index = cardValue.indexOf(getMaxOfArray(cardValue));
        return cardSelect[index];
    }

}

function getCardPile() {
    return CardMaker.cardPile;
}

console.log(getCardPile());
CardMaker.getCardPile = function () {
    return CardMaker.cardPile;
};
// CardMaker.load();
module.exports = CardMaker;
// module.exports = {
//
// }
// const enemy = Object.create(character);
// enemy.hp = CardMaker.fullHP;
// enemy.name = 'test';
// const player = Object.create(character);
// player.hp = CardMaker.fullHP;
// player.name = 'rookie';
// const enemyCards = [];
// const playerCards = [];
// let flag;
// while (enemy.hp > 0 && player.hp > 0) {
//     roundInit(enemyCards, playerCards);
//     printCard(playerCards);
//     printHP(enemy, player);
//     let answer = prompt();
//     if (answer !== '') {
//         settleAccounts(player, enemy, playerCards[answer]);
//         playerCards.splice(answer, 1);
//     }
//     else settleAccounts(player, enemy, null);
//     settleAccounts(enemy, player, flag = botMove());
//     if (flag !== null) enemyCards.splice(enemyCards.indexOf(flag), 1);
// }
