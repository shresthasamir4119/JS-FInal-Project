
window.onload = function () {
  let gameWorld = new GameWorld();
  let game = new StartGame(gameWorld);
  game.init();
  game.start();
}


