// define enum for runner status
var FloorHeight = 26;
var GravityForce = -0.45;
var GroundResponsiveness = 1.35;
var JumpPower = 11.0;
var AirborneTime = 0.15; //空挺時間

if (typeof PlayerStatus == "undefined") {
   var PlayerStatus = {};

   PlayerStatus.idling = 0;
   PlayerStatus.running = 1;
   PlayerStatus.jumpUp = 2;
   PlayerStatus.jumpDown = 3;


};

//プレイヤークラス
var Player = cc.Node.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   runningAction: null,
   startPos: null,
   status: null,
   vx: 0,
   vy: 0,
   firstlanding: false,

   ctor: function(posX, posY) {
      this._super();
      this.init(posX, posY);

      this.status = PlayerStatus.idling;
   },

   init: function(posX, posY) {
      this._super();
      this.vy += GravityForce;
      this.startPos = cc.p(posX, posY);

      this.spriteSheet = new cc.SpriteBatchNode(res.player_png);
      // ランニングアクションを初期化
      var animFrames = [];
      for (var i = 0; i < 4; i++) {
         var spriteFrame = new cc.SpriteFrame(res.player_png, cc.rect(70 * i, 0, 70, 90));
         var str = "player" + i;
         cc.spriteFrameCache.addSpriteFrame(spriteFrame, str);
         var frame = cc.spriteFrameCache.getSpriteFrame(str);
         animFrames.push(frame);
      }
      var animation = new cc.Animation(animFrames, 0.1);

      this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

      this.sprite = cc.Sprite.create('#player0');
      var size = this.sprite.getContentSize(); // スプライトのサイズを取得
      this.sprite.setScale(35 / size.width, 45 / size.height);
      this.sprite.setContentSize(cc.size(35, 45));
      //this.sprite.setScale(0.5,0.5)
      this.sprite.runAction(this.runningAction);
      var size = this.sprite.getContentSize(); // スプライトのサイズを取得
      this.sprite.tag = SpriteTag.player;
      //スプライトをこのノードの中央におく
      this.sprite.setPosition(this.sprite.width / 2, this.sprite.height / 2);

      this.setPosition(posX, posY);
      this.addChild(this.sprite, 0);

      this.scheduleUpdate();
      return true;

   },

   clamp: function(val, min, max) {
      return Math.max(min, Math.min(max, val))
   },

   update: function(dt) {

     console.log("befor update status:",this.status);
     console.log("befor update vy:",this.vy);

  if (this.y > FloorHeight)
      this.vy += GravityForce;

  if( this.vy < 0 ) {
    this.status = PlayerStatus.jumpDown;
    AirborneTime += dt;
  }
      this.x += this.vx;
      this.y += this.vy;

      this.x = this.clamp(this.x, 0.0, 1030.0);
      this.y = Math.max(this.y, FloorHeight);

      if (Math.abs(this.vx) < 0.0001) this.vx = 0.0;
      if (Math.abs(this.vy) < 0.0001) this.vy = 0.0;
    //  if(this.vx == 0.0 && this.vy == 0.0) this.status = PlayerStatus.idling;

      if (this.y <= FloorHeight &&  this.status == PlayerStatus.jumpDown) {
         AirborneTime = 0.0;
         this.status = PlayerStatus.idling;
         this.vy = Math.max(this.vy, 0.0);
      }

      //  console.log("this.x:", this.x);

      // ground control (to major tom)
      if (AirborneTime == 0.0) {

      } else { // air control

      }



   },

   LeftRightAxis: function(axis) {

 console.log("status:", this.status);
      if (this.status == PlayerStatus.idling
        || this.status == PlayerStatus.running
        || this.status == PlayerStatus.jumpUp
      ) {


         this.vx += GroundResponsiveness * axis;

         this.vx = this.clamp(this.vx, -3.0, 3.0);
         if (this.vx < -0.1)
            this.sprite.setFlippedX(true);
         if (this.vx > 0.1)
            this.sprite.setFlippedX(false);

          if(this.status != PlayerStatus.jumpUp)  this.status == PlayerStatus.running;

      }

},

goLeft: function(axis) {
   var _axis = axis || -1.0; // axis が渡されていなかったらデフォルト
   this.LeftRightAxis(_axis);
},

goRight: function(axis) {
   var _axis = axis || 1.0; // axis が渡されていなかったらデフォルト
   this.LeftRightAxis(_axis);
},

goStop: function(axis) {
   var _axis = axis || 0.0; // axis が渡されていなかったらデフォルト
   this.vx = 0;
},

getDistanceX: function() {
   return this.sprite.getPositionX() - this.startPos.x;
},
getDistanceY: function() {
   return this.sprite.getPositionY() - this.startPos.y;
},

jump: function() {
   console.log("jump:status:", this.status);
   if (this.status == PlayerStatus.idling  || this.status == PlayerStatus.running) {
      this.vy += JumpPower;

    //  this.sprite.stopAllActions();
      //   this.sprite.runAction(this.jumpUpAction);

      cc.audioEngine.playEffect(res.jump_mp3);

      this.status = PlayerStatus.jumpUp;

   }
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
