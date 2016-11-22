//プレイヤークラス
var Terrain = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持

   ctor: function(parent, posX, posY, tag) { // コンストラクタ


     this.spriteSheet = new cc.SpriteBatchNode(res.terrain_png);
     // ランニングアクションを初期化
     var animFrames = [];
     for (var i = 0; i < 4; i++) {
        var spriteFrame = new cc.SpriteFrame(res.terrain_png, cc.rect(24 * i, 0, 24, 24));
          var str = "terrain" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
      //  var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //animFrames.push(frame);
      }
      // var animation = new cc.Animation(animFrames, 0.1);
      // this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

      this.sprite = cc.Sprite.create('#terrain0');
    //  this.sprite.runAction(this.runningAction);
      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
    var body = new cp.Body(Infinity, Infinity);
    //var body = new cp.StaticBody();
      body.setPos(cp.v(posX, posY));
      parent.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);

     //space.addBody(body);
      var shape = new cp.BoxShape(body, size.width, size.height);
      shape.setFriction(1);
      shape.setElasticity(0);
      shape.tag = tag;
      shape.setCollisionType(shape.tag);
      shape.image =   this.sprite;
      //space.addShape(shape);
          space.addStaticShape(shape);

      shapeArray.push(shape);

   },


   update: function(dt) {

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
