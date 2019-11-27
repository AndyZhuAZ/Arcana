let mainJS = require('Main');
cc.Class({
    extends: cc.Component,

    properties: {
        upButton: {
            type: cc.Button,
            default: null
        },
        rightButton: {
            type: cc.Button,
            default: null
        },
        downButton: {
            type: cc.Button,
            default: null
        },
        leftButton: {
            type: cc.Button,
            default: null
        },
        playerN: cc.Node,
        dir: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.view.enableAntiAlias(false);
        this.playerJs = this.playerN.getComponent('Player');
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

    },

    start() {
        cc.view.enableAntiAlias(false);

        this.upButton.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.dir = 1;
            this.playerJs.changeState(this.dir);
        }, this);
        this.upButton.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.dir = 1;
            this.playerJs.changeState(this.dir);
        }, this);
        this.upButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);
        this.upButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);

        this.rightButton.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.dir = 2;
            this.playerJs.changeState(this.dir);
        }, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.dir = 2;
            this.playerJs.changeState(this.dir);
        }, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);

        this.downButton.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.dir = 3;
            this.playerJs.changeState(this.dir);
        }, this);
        this.downButton.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.dir = 3;
            this.playerJs.changeState(this.dir);
        }, this);
        this.downButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);
        this.downButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);

        this.leftButton.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.dir = 4;
            this.playerJs.changeState(this.dir);
        }, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.dir = 4;
            this.playerJs.changeState(this.dir);
        }, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.dir = 0;
            this.playerJs.changeState(this.dir);
        }, this);
    },
    onKeyPressed: function (event) {
        let keyCode = event.keyCode;
        switch (keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.dir = 1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.dir = 2;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.dir = 3;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.dir = 4;
                break;
        }
        this.playerJs.changeState(this.dir);
    },
    onKeyReleased: function (event) {
        let keyCode = event.keyCode;
        switch (keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.dir = 0;
                this.playerJs.changeState(this.dir);
                break;
        }
    },
    update(dt) {
    },
});
