let mainJS = require('Main');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
        controllerN: cc.Node,
        debug: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.view.enableAntiAlias(false);

        this.ctrlJs = this.controllerN.getComponent('Controller');
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function (other, self) {
        this.speed = 0;
        switch (this.ctrlJs.dir) {
            case 1:
                this.node.y -= 1;
                break;
            case 2:
                this.node.x -= 1;
                break;
            case 3:
                this.node.y += 1;
                break;
            case 4:
                this.node.x += 1;
                break;
            default:
                break;
        }
    },
    onCollisionExit: function (other, self) {
        this.speed = 200;
    },
    onCollisionStay: function (other, self) {
        switch (this.ctrlJs.dir) {
            case 1:
                this.node.y -= 1;
                break;
            case 2:
                this.node.x -= 1;
                break;
            case 3:
                this.node.y += 1;
                break;
            case 4:
                this.node.x += 1;
                break;
            default:
                break;
        }
    },

    showPos() {
        console.log(this.node.getPosition());
    },
    start() {
        cc.view.enableAntiAlias(false);

    },
    changeState(state) {
        if (this.state === state) {
            return;
        }
        this.state = state;
        var anim = this.getComponent(cc.Animation);
        switch (state) {
            case 0:
                anim.play('run_down');
                anim.pause();
                break;
            case 1:
                anim.play('run_up');
                break;
            case 2:
                anim.play('run_right');
                break;
            case 3:
                anim.play('run_down');
                break;
            case 4:
                anim.play('run_left');
                break;
            default:
                break;
        }
        if (this.debug === true)
            console.log(this.node.getPosition());
    },
    update(dt) {
        switch (this.ctrlJs.dir) {
            case 1:
                this.node.y += this.speed * dt;
                break;
            case 2:
                this.node.x += this.speed * dt;
                break;
            case 3:
                this.node.y += -this.speed * dt;
                break;
            case 4:
                this.node.x += -this.speed * dt;
                break;
            default:
                break;
        }
    },
});
