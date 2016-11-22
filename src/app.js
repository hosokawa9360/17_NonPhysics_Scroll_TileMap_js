var space;
var shapeArray = [];
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

      space = new cp.Space();
      space.gravity = cp.v(0, -100);
      var debugDraw = cc.PhysicsDebugNode.create(space);
      debugDraw.setVisible(true);
      this.addChild(debugDraw, 100);

      var wallBottom = new cp.SegmentShape(space.staticBody,
         cp.v(-4294967294, 1), // start point
         cp.v(4294967295, 1), // MAX INT:4294967295
         0); // thickness of wall
      space.addStaticShape(wallBottom);

      gameLayer = new game();
      gameLayer.init();
      this.addChild(gameLayer);
   }
});

var game = cc.Layer.extend({
   player: null,
   scroll_gb: null,

   init: function() {
      this._super();

       this.scroll_gb = new Scroll_BG(this);
      var tiledmap = new Tiledmap(this);

      this.player = new Player(this, PlayerStar_X, 188, SpriteTag.player);
      //   var terrain  = new Terrain(this, 100,30,SpriteTag.terrain);
      //   var koban  = new Objects(this, 250,30,SpriteTag.koban);


      this.scheduleUpdate();

      cc.eventManager.addListener({
         event: cc.EventListener.KEYBOARD,
         //キー入力したとき
         onKeyPressed: function(keyCode, event) {
            //    console.log(keyCode);

            if (keyCode == 37) { //左
               this.player.body.applyImpulse(cp.v(-10, 0), cp.v(0, 0)); //run speed
               //var pos =   this.player.body.p;
               //  player.body.setPos(cp.v(pos.x + 1, pos.y));

            } else if (keyCode == 38) { //上
               this.player.body.applyImpulse(cp.v(0, 10), cp.v(0, 0)); //run speed

            } else if (keyCode == 39) { //右
               this.player.body.applyImpulse(cp.v(10, 0), cp.v(0, 0)); //run speed
            } else if (keyCode == 40) { //下

            }
         }.bind(this),
         //キーを離したとき
         onKeyReleased: function(keyCode, event) {
            //  console.log("onKeyReleased");
         }
      }, this);


      //this.collisionBegin.bind(this) bind(this)を付けると、イベントリスナーでthisが使えるようになる
      space.setDefaultCollisionHandler(this.collisionBegin.bind(this), null, null, null);

   },
   addCallback: function(callback) {
      callbacks.push(callback);
   },
   update: function(dt) {
      space.step(dt);
      for (var i = shapeArray.length - 1; i >= 0; i--) {
         shapeArray[i].image.x = shapeArray[i].body.p.x
         shapeArray[i].image.y = shapeArray[i].body.p.y
            //   var angle = Math.atan2(-shapeArray[i].body.rot.y, shapeArray[i].body.rot.x);
            //   shapeArray[i].image.rotation = angle * 57.2957795;
      }

      var dX = this.player.getDistanceX();
      this.setPosition(cc.p(-dX, 0));
      this.scroll_gb.checkAndReload(this.player.sprite.x );


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

// this.addPostStepCallback(function() { // ステップ処理終了時に実行
//    for (var int = 0; int < this.shapeArray.length; int++) { // 衝突したコインを探す
//       var shape = this.shapeArray[int]; // 配置済みオブジェクトの取得
//       if (shape == shapes[1]) { // 衝突したコインの場合
//          shape.removeFromParent(); // 削除処理を実行
//          this.shapeArray.splice(int, 1); // 配列から削除
//          break; // 処理を抜ける
//       }
//    }
// }.bind(this)); // レイヤーのthisを使えるようにする

/*

var touchListener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
   swallowTouches: false, // 以降のノードにタッチイベントを渡す
   onTouchBegan: function(touch, event) { // タッチ開始時
      var pos = touch.getLocation();

      console.log("shapeArray.length:", shapeArray.length)
         // すべてのshapをチェックする
      for (var i = 0; i < shapeArray.length; i++) {
         var shape = shapeArray[i];
         console.log("shape.type:", i, shape.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
         if (shape.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
            console.log("hit ")
            if (shape.name == SpriteTag.destroyable) {
               //ブロックをタップしたときは、消去する
               space.removeBody(shape.getBody());
               space.removeShape(shape);
               gameLayer.removeChild(shape.image);
               shapeArray.splice(i, 1);
               console.log("remove block")
               return;
            } else if (shape.name == SpriteTag.totem) {
               // トーテムをタップしたときは、衝撃を与える
               shape.body.applyImpulse(cp.v(500, 0), cp.v(0, -20))
               return;
            }
         }
      }
      // 何も無い場所をタップしたときは箱を追加する
      gameLayer.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
      return;

   }

});
*/


//  addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {
//     if (isDynamic) {
//        var body = new cp.Body(1, cp.momentForBox(1, width, height));
//     } else {
//        var body = new cp.Body(Infinity, Infinity);
//     }
//     body.setPos(cp.v(posX, posY));
//     var bodySprite = cc.Sprite.create(spriteImage);
//     gameLayer.addChild(bodySprite, 0);
//     bodySprite.setPosition(posX, posY);
//     if (isDynamic) {
//        space.addBody(body);
//     }
//     var shape = new cp.BoxShape(body, width, height);
//     shape.setFriction(1);
//     shape.setElasticity(0);
//     shape.name = type;
//     shape.setCollisionType(type);
//     shape.image = bodySprite;
//     space.addShape(shape);
//     shapeArray.push(shape);
//  },
