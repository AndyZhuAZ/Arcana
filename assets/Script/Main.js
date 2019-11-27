cc.view.enableAntiAlias(false);
cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {
        cc.view.enableAntiAlias(false);
        // 像素风格，关闭抗锯齿
    },

    playTouchAudio() {
        cc.loader.load(cc.url.raw('resources/Tap.wav?useDom=1'), function (err, audio) {
            cc.audioEngine.play(audio, false, 1);
        });
    },

    startpage() {
        cc.director.loadScene('start')
    },

    worldmap() {
        cc.director.loadScene('worldmap')
    },

    jungle() {
        cc.director.loadScene('jungle')
    },

    battle() {
        cc.director.loadScene('battle')
    },

    end(){
        cc.director.loadScene('end')
    },

    start: function(){

    },
    // called every frame
    update: function (dt) {

    },
});
