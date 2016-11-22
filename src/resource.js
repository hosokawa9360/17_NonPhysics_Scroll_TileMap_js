var res = {
   brick1x1_png: "res/brick1x1.png",
   brick2x1_png: "res/brick2x1.png",
   brick3x1_png: "res/brick3x1.png",
   brick4x1_png: "res/brick4x1.png",
   brick4x2_png: "res/brick4x2.png",
   ground_png: "res/ground.png",
   totem_png: "res/totem.png",
   player_png: "res/player.png",
   terrain_png: "res/terrain.png",
   background_png: "res/background.png",
   map00_tmx: "res/map00.tmx",
   map_test_tmx: "res/map_test.tmx",
   object_tsx: "res/object.tsx",
   terrain_tsx: "res/terrain.tsx",
   object_png: "res/object.png",
   pickup_coin_mp3: "res/pickup_coin.mp3",
   food_mp3: "res/food.mp3",
   landing_mp3: "res/landing.mp3",
   jump_mp3: "res/jump.mp3",
   decide_mp3: "res/decide.mp3",
   complete_mp3: "res/complete.mp3",
   start_mp3: "res/start.mp3",
   explode_mp3: "res/explode.mp3",
};

var g_resources = [];
for (var i in res) {
   g_resources.push(res[i]);
}
