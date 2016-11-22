var Tiledmap = cc.Layer.extend({
   map: null,
   spriteBG: null,
   spriteBGwidth: 0,
   mapWidth: 0,
   bgIndex: 0,
   //  mapWidth: 0,
   //  mapHeight: 0,
   //  tileWidth: 0,
   //  tileHeight: 0,
   space: null,
   objects: [],


   ctor: function(parent) {
      this._super();

//      this.map = new cc.TMXTiledMap(res.map00_tmx);

    this.map = new cc.TMXTiledMap(res.map_test_tmx);
      this.init(parent);

   },

   init: function(parent) {
      this._super();

      var tileWidth = this.map.getTileSize().width;
      var tileHeight = this.map.getTileSize().height;

      // console.log("tileWidth:", tileWidth)
      // console.log("tileHeight:", tileHeight)

      this.objects = [];

      var mapWidth = this.map.getMapSize().width;
      var mapHeight = this.map.getMapSize().height;

      // console.log("mapWidth:", mapWidth)
      // console.log("mapHeight:", mapHeight)

      var TerrainLayer = this.map.getLayer("Terrain");
      // var mappa = this.map.getPropertiesForGID(  this.map.getLayer( "layerName" ).getTileGIDAt( 0,0 ) );
      // console.log("mappa",mappa);
      for (i = 0; i < mapWidth; i++) {
         for (j = 0; j < mapHeight; j++) {
            //タイルコードを取得できる
            var tileCord = new cc.Point(i, j);
            //タイルコードからgidを取得する。もしgidが存在していれば
            var gid = TerrainLayer.getTileGIDAt(tileCord);
            var properties = this.map.getPropertiesForGID(gid);
            if (gid) {
               if (properties["category"] == 1) {
                  // 当たり判定するオブジェクトがあるかどうかプロパティをチェックする
                  var tileXPositon = i * tileWidth + tileWidth / 2;
                  var tileYPosition = (mapHeight * tileHeight) - ((j + 1) * tileHeight) + tileHeight / 2;
                  var terrain = new Terrain(parent, tileXPositon, tileYPosition, SpriteTag.terrain);
               }
            }
         }
      }
    //  console.log("---------------------------")
      var CollisionObj = this.map.getLayer("CollisionObj");
      for (i = 0; i < mapWidth; i++) {
         for (j = 0; j < mapHeight; j++) {
            //タイルコードを取得できる
            var tileCord = new cc.Point(i, j);
            //タイルコードからgidを取得する。もしgidが存在していれば
            var gid = CollisionObj.getTileGIDAt(tileCord);
            if (gid) {
               var properties = this.map.getPropertiesForGID(gid);
              //  console.log("gid:", gid, properties["category"]);
               // 当たり判定するオブジェクトがあるかどうかプロパティをチェックする
               if (properties["category"] ) {
                  // console.log("tXP", tileXPositon, "tYP", tileYPosition,"category:",properties["category"]);
                  var tileXPositon = i * tileWidth + tileWidth / 2;
                  var tileYPosition = (mapHeight * tileHeight) - ((j + 1) * tileHeight) + tileHeight / 2;

                  var objects = new Objects(parent, tileXPositon, tileYPosition,Number(properties["category"])  );
               }
            }
         }
      }


      // this.loadObjects()

      //    this.scheduleUpdate();
   },

   //  loadObjects: function(map, mapIndex) {
   //     // add coins
   //     var coinGroup = map.getObjectGroup("coin");
   //     var coinArray = coinGroup.getObjects();
   //     for (var i = 0; i < coinArray.length; i++) {
   //        var coin = new Coin(this.spriteSheet,
   //           this.space,
   //           cc.p(coinArray[i]["x"] + this.mapWidth * mapIndex, coinArray[i]["y"]));
   //        coin.mapIndex = mapIndex;
   //        this.objects.push(coin);
   //     }
   //
   //     // add rock
   //     var rockGroup = map.getObjectGroup("rock");
   //     var rockArray = rockGroup.getObjects();
   //     for (var i = 0; i < rockArray.length; i++) {
   //        var rock = new Rock(this.spriteSheet,
   //           this.space,
   //           rockArray[i]["x"] + this.mapWidth * mapIndex);
   //        rock.mapIndex = mapIndex;
   //        this.objects.push(rock);
   //     }
   //  },
   //  //
   /*
   update: function(dt) {
      var playerLayer = this.getParent().getChildByTag(TagOfLayer.Player);
      var DX = playerLayer.getDistanceX(); //プレイヤーが走った距離
      this.checkAndReload(DX);
   },
/*
   checkAndReload: function(DX) {

      var newbgIndex = parseInt(DX / this.spriteBGwidth);
      if (this.bgIndex == newbgIndex) {
         return false;
      }

      if (0 == newbgIndex % 2) {
         // change bgSecond
         this.spriteBG2.setPositionX(this.spriteBGwidth * (newbgIndex + 1));
         //this.loadObjects(this.map01, newMapIndex + 1);

      } else {
         // change bgFirst 1番目の背景が完全に画面外に出たので、spriteBG2の右隣りに移動させる
         this.spriteBG1.setPositionX(this.spriteBGwidth * (newbgIndex + 1));
         //this.loadObjects(this.map00, newMapIndex + 1);

      }

      this.bgIndex = newbgIndex;

   }
   */
});
