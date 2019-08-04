cc.Class({
    extends: cc.Component,

    properties: {
        // controler_img: {
        //     type: cc.SpriteFrame,
        //     default: [],
        // },
        // controler: {
        //     type: cc.Node,
        //     default: null
        // },
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
    // getDir(){
    //     return this.dir;
    // },
    onLoad() {
        // this.sprite = this.node.addComponent(cc.Sprite);
        //
        // this.sprite.spriteFrame = this.controler_img[0];

        this.playerJs = this.playerN.getComponent('Player');
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

    },
    up_walker() {
        this.dir = 1;
        this.playerJs.changeState(this.dir);
    },
    right_walker() {
        // this.dir = 2;
        // this.playerJs.changeState(this.dir);
    },
    down_walker() {
        // this.dir = 3;
        // this.playerJs.changeState(this.dir);
    },
    left_walker() {
        // this.dir = 4;
        // this.playerJs.changeState(this.dir);
    },
    start() {
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
        // function change_ctrl_img(e, t) {
        //     let screen_pos = e.getLocation();
        //     let pos = t.node.convertToNodeSpaceAR(screen_pos);
        //     if (pos.x <= 3 && pos.x >= -3) {
        //         if (pos.y <= 8 && pos.y >= 2) {
        //             t.sprite.spriteFrame = t.controler_img[t.dir = 1];
        //         } else if (pos.y <= -2 && pos.y >= -8) {
        //             t.sprite.spriteFrame = t.controler_img[t.dir = 3];
        //         }
        //     } else if (pos.y <= 3 && pos.y >= -3) {
        //         if (pos.x <= 8 && pos.x >= 2) {
        //             t.sprite.spriteFrame = t.controler_img[t.dir = 2];
        //         } else if (pos.x <= -2 && pos.x >= -8) {
        //             t.sprite.spriteFrame = t.controler_img[t.dir = 4];
        //         }
        //     } else {
        //         t.sprite.spriteFrame = t.controler_img[t.dir = 0];
        //     }
        //     t.playerJs.changeState(t.dir);
        // }
        //
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
        //     console.log('TOUCH_MOVE')
        //     change_ctrl_img(e, this);
        // }, this);
        // this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
        //     console.log('TOUCH_START')
        //     change_ctrl_img(e, this);
        // }, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
        //     console.log('TOUCH_END')
        //     this.sprite.spriteFrame = this.controler_img[0];
        //     this.dir = 0;
        //     this.playerJs.changeState(this.dir);
        // }, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
        //     console.log('TOUCH_CANCEL')
        //     this.sprite.spriteFrame = this.controler_img[0];
        //     this.dir = 0;
        //     this.playerJs.changeState(this.dir);
        // }, this);

    },
    onKeyPressed: function (event) {
        let keyCode = event.keyCode;
        switch (keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                // this.sprite.spriteFrame = this.controler_img[this.dir = 1];
                this.dir = 1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // this.sprite.spriteFrame = this.controler_img[this.dir = 2];
                this.dir = 2;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                // this.sprite.spriteFrame = this.controler_img[this.dir = 3];
                this.dir = 3;
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                // this.sprite.spriteFrame = this.controler_img[this.dir = 4];
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
                // this.sprite.spriteFrame = this.controler_img[0];
                this.dir = 0;
                this.playerJs.changeState(this.dir);
                break;
        }
    },
    update(dt) {
        // this.node.setPosition(cc.v2(this.node.parent.convertToNodeSpaceAR(cc.v2(-700,-300))));
    },
});
