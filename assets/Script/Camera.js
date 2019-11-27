
cc.Class({
    extends: cc.Component,

    properties: {
        target:{
            type: cc.Node,
            default:null
        },
        top:1270,
        left:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.view.enableAntiAlias(false);

    },

    start () {
        cc.view.enableAntiAlias(false);

    },

    update (dt) {
        if (!this.target){
            return;
        }
        let w_pos = this.target.convertToWorldSpaceAR(cc.v2(0,0));
        let c_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        if (c_pos.y > this.top){
            this.node.setPosition(cc.v2(c_pos.x,this.top));
            return;
        }
        if (c_pos.x < this.left){
            this.node.setPosition(cc.v2(this.left,c_pos.y));
            return;
        }
        this.node.setPosition(cc.v2(c_pos));
    },
});
