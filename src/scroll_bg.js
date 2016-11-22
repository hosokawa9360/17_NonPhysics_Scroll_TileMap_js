var Scroll_BG = cc.Layer.extend({
//  parent: null,
   spriteBG1: null,
   spriteBG2: null,
   spriteBGwidth: 0,

   bgIndex: 0,

   ctor: function(parent) {
      this._super();
  //    this.parent = parent;
      this.init(parent);
   },

   init: function(parent) {
      this._super();

      var winsize = cc.director.getWinSize();
      var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
      this.spriteBG1 = new cc.Sprite(res.background_png);
      this.spriteBG1.setAnchorPoint(0, 0);
      this.spriteBG1.setPosition(0, 0);
      this.addChild(this.spriteBG1);

      this.spriteBGwidth = this.spriteBG1.getContentSize().width;

      this.spriteBG2 = new cc.Sprite(res.background_png);
      this.spriteBG2.setAnchorPoint(0, 0);
      this.spriteBG2.setPosition(this.spriteBGwidth, 0);
      this.addChild(this.spriteBG2);

      parent.addChild(this, 0);
      this.scheduleUpdate();
   },

   checkAndReload: function(DX) {

      var newbgIndex = parseInt(DX / (this.spriteBGwidth+ PlayerStar_X));
      if (this.bgIndex == newbgIndex) {
         return false;
      }

      if (0 == newbgIndex % 2) {
         // change bgSecond
         this.spriteBG2.setPositionX(this.spriteBGwidth * (newbgIndex + 1));

      } else {
        console.log("spriteBG1 moded");
         // change bgFirst 1番目の背景が完全に画面外に出たので、spriteBG2の右隣りに移動させる
         this.spriteBG1.setPositionX(this.spriteBGwidth * (newbgIndex + 1));

      }

      this.bgIndex = newbgIndex;

   },

    // update: function(dt) {
    //    var player = this.parent.player;
    //    var DX = player.x; //プレイヤーが走った距離
    //    console.log(DX);
    //    this.checkAndReload(DX);
    // },


});
