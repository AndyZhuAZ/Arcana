cc.Class({
    extends: cc.Component,

    properties: {
        target:{
            type: cc.Node,
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if (!this.target){
            return;
        }
        let w_pos = this.target.convertToWorldSpaceAR(cc.v2(0,0));
        let c_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        // console.log(c_pos);
        if (c_pos.y > 1370){
            this.node.setPosition(cc.v2(c_pos.x,1370));
            return;
        }

        this.node.setPosition(cc.v2(c_pos));
    },
});
