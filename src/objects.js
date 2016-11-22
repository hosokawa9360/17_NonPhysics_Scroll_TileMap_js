//プレイヤークラス
var Objects = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持

   ctor: function(parent, posX, posY ,tag) { // コンストラクタ


     this.spriteSheet = new cc.SpriteBatchNode("res/object.png");
     // ランニングアクションを初期化
     var animFrames = [];
     for (var i = 0; i < 5; i++) {
        var spriteFrame = new cc.SpriteFrame( "res/object.png", cc.rect(24 * i, 0, 24, 24));
          var str = "object" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
      //  var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //animFrames.push(frame);
      }
      // var animation = new cc.Animation(animFrames, 0.1);
      // this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
      var res="";
      console.log("tag:",tag)
      switch(tag) {
        case SpriteTag.bomb :
        this.sprite = cc.Sprite.create('#object0');
        console.log("object0");
      break;
        case SpriteTag.koban :
            this.sprite = cc.Sprite.create('#object1');
              console.log("#object1");
            break;
        case SpriteTag.food :
          this.sprite = cc.Sprite.create('#object2');
            console.log("#object2");
          break;
        case SpriteTag.monster1 :
          this.sprite = cc.Sprite.create('#object3');
            console.log("#object3");
          break;
        case SpriteTag.monster2 :
          this.sprite = cc.Sprite.create('#object4');
            console.log("#object4");
          break;
        defalut :
        this.sprite = cc.Sprite.create('#object0');
          console.log("#object00");
         break;
      }

      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
    var body = new cp.Body(Infinity, Infinity);
    //var body = new cp.StaticBody();
      body.setPos(cp.v(posX, posY));
      parent.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);

     //space.addBody(body);
    this.shape = new cp.BoxShape(body, size.width, size.height);
      this.shape.setFriction(1);
      this.shape.setElasticity(0);
      this.shape.tag = tag;
      this.shape.setCollisionType(this.shape.tag);
      this.shape.image =   this.sprite;
      //space.addShape(shape);
          space.addStaticShape(this.shape);

      shapeArray.push(this.shape);
      objectArray.push(this);
   },


   update: function(dt) {

   },

   removeFromParent:function () {
       space.removeStaticShape(this.shape);
       this.shape = null;
       this.sprite.removeFromParent();
       this.sprite = null;
   },

});


/*
//プレイヤークラス
var Player = cc.Class.extend({ // cc.Classを継承
   space: null, // Spaceを保持
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持
   mapIndex: 0, // 配置したマップのIndexを保持

   ctor: function(parent, space, posX, posY, mapIndex) { // コンストラクタ

      this.space = space; // Spaceを取得
      this.spriteSheet = new cc.SpriteBatchNode(res.player_png);
      for (var i = 0; i < 4; i++) {
         var spriteFrame = new cc.SpriteFrame(res.player_png, cc.rect(70 * i, 0, 70, 90));
         cc.spriteFrameCache.addSpriteFrame(spriteFrame, 'walk' + i);
      }
      this.sprite = new cc.PhysicsSprite.create('#walk0');
    //NG  this.sprite.setPosition(posX, posY); // スプライトの位置を設定

      // ランニングアクションを初期化
      var animFrames = [];
      for (var i = 0; i < 4; i++) {
         var str = "walk" + i;
         var frame = cc.spriteFrameCache.getSpriteFrame(str);
         animFrames.push(frame);
      }
      var animation = new cc.Animation(animFrames, 0.1);
      this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

      var contentSize = this.sprite.getContentSize(); // スプライトのサイズを取得
      this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height)); // 動的ボディを作成
      this.body.setPos(cp.v(posX, posY)); // ボティの位置を設定

      // var pos = cp.v(posX, posY);
      // this.body.p = pos; // ボティの位置を設定
      this.shape = new cp.BoxShape(body, contentSize.width, contentSize.height); // 四角形状のShapeを作成
      this.shape.image = this.sprite;
      this.shape.setFriction(1);
      this.shape.setElasticity(0);
      this.shape.tag = SpriteTag.runner;
      this.shape.setCollisionType(SpriteTag.rock); // 衝突タイプ（衝突イベントの識別番号）を設定

      this.space.addShape(this.shape); // Spaceに静的ボディを追加
      this.mapIndex = mapIndex; // 配置したマップのIndexを保持

      parent.addChild(this.sprite, 0); // 親ノードに追加
   },

   update: function(dt) {

      // ランナーのスプライトとBodyの同期
      this.sprite.setPosition(this.body.p); // 位置を同期
      this.sprite.setRotation(-cc.radiansToDegrees(this.body.w)); // 角度を同期
   },

});
*/
