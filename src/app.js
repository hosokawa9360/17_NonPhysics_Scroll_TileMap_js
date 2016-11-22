var objectArray = [];

if (typeof SpriteTag == "undefined") {
   var SpriteTag = {};
   SpriteTag.terrain = 1;

   SpriteTag.bomb = 2;
   SpriteTag.koban = 4;
   SpriteTag.food = 8;
   SpriteTag.monster1 = 16;
   SpriteTag.monster2 = 32;

   SpriteTag.player = 128;

};

var callbacks = [];
var PlayerStar_X = 140;



var gameLayer;
var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
      this.addChild(backgroundLayer);

      gameLayer = new game();
      gameLayer.init();
      this.addChild(gameLayer);
   }
});

var game = cc.Layer.extend({
   player: null,
   scroll_gb: null,
   tiledmap: null,

   init: function() {
      this._super();

      this.scroll_gb = new Scroll_BG();
      this.addChild(this.scroll_gb, 0);
      this.tiledmap = new Tiledmap();
      this.addChild(this.tiledmap, 0);

      this.player = new Player(PlayerStar_X, 188);
      this.addChild(this.player, 0);

      this.scheduleUpdate();

      cc.eventManager.addListener({
         event: cc.EventListener.KEYBOARD,
         //キー入力したとき
         onKeyPressed: function(keyCode, event) {
            console.log(keyCode);

            if (keyCode == 37) { //左
               this.player.goLeft();
            } else if (keyCode == 38) { //上
                this.player.jump();
            } else if (keyCode == 39) { //右
               this.player.goRight();
            } else if (keyCode == 40) { //下

            }
         }.bind(this),
         //キーを離したとき
         onKeyReleased: function(keyCode, event) {
            this.player.goStop();
            console.log("onKeyReleased");
         }.bind(this),
      }, this);


   },
   addCallback: function(callback) {
      callbacks.push(callback);
   },
   update: function(dt) {

      // for (var i = shapeArray.length - 1; i >= 0; i--) {
      //    shapeArray[i].image.x = shapeArray[i].body.p.x
      //    shapeArray[i].image.y = shapeArray[i].body.p.y
      //       //   var angle = Math.atan2(-shapeArray[i].body.rot.y, shapeArray[i].body.rot.x);
      //       //   shapeArray[i].image.rotation = angle * 57.2957795;
      // }

      // var dX = this.player.getDistanceX();
      // this.setPosition(cc.p(-dX, 0));
      // this.scroll_gb.checkAndReload(this.player.sprite.x );


      //addCallback関数に登録された処理を順番に実行する
      for (var i = 0; i < callbacks.length; ++i) {
         callbacks[i]();
      }
      callbacks = [];

   },

   collisionBegin: function(arbiter, space) {

      if (arbiter.a.tag == SpriteTag.terrain && arbiter.b.tag == SpriteTag.terrain) {
         if (this.player.status == PlayerStatus.landing) {
            cc.audioEngine.playEffect(res.landing_mp3);
            this.player.status = PlayerStatus.idling;
         }
      } else {

         if (arbiter.a.tag == SpriteTag.koban || arbiter.b.tag == SpriteTag.koban) {
            cc.audioEngine.playEffect(res.pickup_coin_mp3);
         }
         if (arbiter.a.tag == SpriteTag.food || arbiter.b.tag == SpriteTag.food) {
            cc.audioEngine.playEffect(res.food_mp3);
         }
         if (arbiter.a.tag == SpriteTag.bomb || arbiter.b.tag == SpriteTag.bomb) {
            cc.audioEngine.playEffect(res.explode_mp3);
         }
         if (arbiter.a.tag == SpriteTag.monster1 || arbiter.b.tag == SpriteTag.monster1) {
            cc.audioEngine.playEffect(res.decide_mp3);
         }
         if (arbiter.a.tag == SpriteTag.monster2 || arbiter.b.tag == SpriteTag.monster2) {
            cc.audioEngine.playEffect(res.decide_mp3);
         }
         console.log()
         if (arbiter.a.tag == SpriteTag.player) {
            var collision_obj = arbiter.b; // 衝突したShapeの取得
         } else {
            var collision_obj = arbiter.a; // 衝突したShapeの取得
         }
         //衝突したオブジェクトを消すのは、update関数で定期的に行う
         this.addCallback(function() {
            for (var int = 0; int < objectArray.length; int++) { // 衝突したコインを探す
               var object = objectArray[int]; // 配置済みオブジェクトの取得
               if (object.shape == collision_obj) { // 衝突したコインの場合
                  console.log("hit");
                  object.removeFromParent();
                  break; // 処理を抜ける
               }
            }
         }.bind(this));
      }

      return true;
   },


});


var listener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   //キー入力したとき
   onKeyPressed: function(keyCode, event) {
      console.log(keyCode);

      if (keyCode == 37) { //左
         this.player.goLeft();
      } else if (keyCode == 38) { //上

      } else if (keyCode == 39) { //右
         this.player.goRight();
      } else if (keyCode == 40) { //下

      }
   }.bind(this),
   //キーを離したとき
   onKeyReleased: function(keyCode, event) {
      //  console.log("onKeyReleased");
   }
}, this);
