//this is where game events occurs
class StartGame {
  width;
  height;
  canvas;
  ctx;
  pointer = {
    x: Math.floor( Math.random() * (700+1)) - 700,//for player spawning random position of x
    y: Math.floor( Math.random() * (700+1)) - 700//for player spawning random position of y
  };
  constructor(gameWorld) {
    this.gameWorld = gameWorld;
  }

  init = () => {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.gameWorld.init();
    this.initGameObjects();

    this.player.x = this.width / 2;
    this.player.y = this.height / 2;
    this.enemyNumber = this.enemies.length;
    this.zoneRadius = this.map.getWidth() / 2 + 300;
    this.currentTime = time.getTime();
    this.zoneDelayTime = 100;
    this.lastTimeZoneMove = 0;
    this.startBtn = document.createElement('button');
    this.startBtn.classList.add("startButton");
    this.restart = document.createElement('button');
    this.restart.classList.add("restart");

    this.map.init();
    this.player.init();
    this.initGuns();
    this.initEnemy();
    this.initTrees();
    this.initWall();
    this.initItems();
  }

  initGameObjects = () => {
    this.map = this.gameWorld.map;
    this.player = this.gameWorld.player;
    this.walls = this.gameWorld.walls;
    this.enemies = this.gameWorld.enemies;
    this.trees = this.gameWorld.trees;
    this.guns = this.gameWorld.guns;
    this.items = this.gameWorld.items;
  }

  start = () => {
    targetDiv.appendChild(this.startBtn);
    this.startBtn.innerHTML = 'START';
    targetDiv.style.background = 'url(images/background.jpg)';
    targetDiv.style.backgroundSize = 'cover';
    targetDiv.style.backgroundRepeat = 'none';
    this.startBtn.addEventListener("click", () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.startBtn.style.display = 'none';
      targetDiv.style.background = 'none';
      this.gameLoop();
    });
  }

  gameLoop = () => {

    this.animate = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.listenKey();
    this.updateGameCharacter();
    this.renderGame();
    this.isColliding();
    this.isOutOfZone();
    this.changeGun();

    if(this.playerInBush()){
      playerInRange = false;
    }
    else{
       playerInRange = true;
    }

    if(this.enemies.length == 0){
      this.gameWin();
      }
  }


  updateGameCharacter = () => {
    this.player.update();
    this.updateEnemy();
  }

  renderGame = () => {
    this.map.render(this.ctx, this.pointer);
    this.renderWall();
    this.renderEnemy();
    this.player.render(this.ctx);
    this.renderTrees();
    this.renderInfo();
    this.updateBullet();
    this.renderGuns();
    this.updateEnemyBullet();
    this.renderItems();
    this.renderZone();
  }

  isColliding = () => {
    this.checkPlayerBulletCollision();
    this.checkEnemyBulletCollision();
    this.checkEnemyPlayerBulletCollision();
    this.checkPlayerItemsCollision();
    this.checkPlayerGunCollision();
  }

  isOutOfZone = () => {

    // for enemy out of zone
    for (let i = 0; i < this.enemies.length; i++) {
      if ((checkCollision.distBetweenPoints(this.enemies[0].xPosition, this.enemies[0].yPosition, this.map.getWidth() / 2, this.map.getWidth() / 2) > (this.zoneRadius)) && (this.currentTime - this.enemies[i].lastTimePOZ >= 1000)) {
        this.enemies[i].health--;
        if (this.enemies[i].health === 0) {
          this.enemies.splice(i, 1);
          this.enemyNumber--;
          break;
        }
        this.enemies[i].lastTimePOZ = this.currentTime;
      }
    }

    // for player out of zone
    if ((checkCollision.distBetweenPoints(this.player.xPosition - this.pointer.x, this.player.yPosition - this.pointer.y, this.map.getWidth() / 2, this.map.getWidth() / 2) > (this.zoneRadius)) && (this.currentTime - this.player.lastTimePOZ >= 1000)) {
      this.player.health--;
      if (this.player.health === 0) {
        this.gameOver();
      }
      this.player.lastTimePOZ = this.currentTime;
    }

  }

  initEnemy = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].init();
    }
  }

  initGuns = () => {
    for (let i = 0; i < this.guns.length; i++) {
      this.guns[i].init();
    }
  }

  initItems = () => {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].init();
    }
  }

  initTrees = () => {
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].init();
    }
  }

  initWall = ()=> {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].init();
    }
  }

  renderGuns = () => {
    for (let i = 0; i < this.guns.length; i++) {
      this.ctx.drawImage(this.guns[i].gun, this.guns[i].xPosition + this.pointer.x, this.guns[i].yPosition + this.pointer.y,50,50);
    }
  }

  renderEnemy = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].render(this.ctx, this.pointer);
    }
  }

  renderTrees = () => {
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].render(this.ctx, this.pointer);
    }
  }

  renderWall = () => {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].render(this.ctx, this.pointer);
    }
  }

  renderInfo = () => {
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText('Enemy Alive :' + this.enemyNumber+ ' out of ' + this.gameWorld.enemiesNumber, 100, 550);
    this.ctx.fillText('Enemy Killed :' + this.player.enemyKilled, 100, 570);
    this.ctx.fillText('Health :' + this.player.health, 800, 550);
    this.ctx.fillText('Shield :' + this.player.shield, 800, 570);
    this.ctx.fillText('Bullets :' + this.player.gun.bulletCapacity, 600, 550);
    this.ctx.fillText('Gun :' + this.player.gun.name, 600, 570);
  }

  renderItems = () => {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].render(this.ctx, this.pointer);
    }
  }

  renderZone = () => {
    this.currentTime = time.getTime();
    if (this.currentTime - this.lastTimeZoneMove >= this.zoneDelayTime && this.zoneRadius > MIN_ZONE_RADIUS) {
      this.lastTimeZoneMove = this.currentTime;
      this.ctx.lineWidth = 10;
      this.zoneRadius--;
    }
    this.ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    this.ctx.arc(this.map.getWidth() / 2+this.pointer.x, this.map.getWidth()/ 2+this.pointer.y , this.zoneRadius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  updateEnemy = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(this.enemies, this.player, this.ctx, this.pointer);
    }
  }

  updateBullet = () => {
    for (let i = 0; i < this.player.bullets.length; i++) {
      this.player.bullets[i].update();
      this.player.bullets[i].render();

    }
  }

  updateEnemyBullet = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.enemies[i].bullets.length; j++) {
        this.enemies[i].bullets[j].update();
        this.enemies[i].bullets[j].render();
        this.enemies[i].destroyBullets();
      }
    }
  }
//check if player inside tree
playerInBush = () => {
  for(let i = 0; i<this.trees.length;i++){
    if(this.player.xPosition>this.trees[i].xPosition+this.pointer.x&&
      this.player.xPosition<this.trees[i].xPosition+this.pointer.x+this.trees[i].width&&
      this.player.yPosition+PLAYER_SIZE>this.trees[i].yPosition+this.pointer.y&&
      this.player.yPosition<this.trees[i].yPosition+this.pointer.y+this.trees[i].height){
      return true;
    }     
  }
}

  // player bullet collide with enemy
  checkPlayerBulletCollision = () => {
    for (let i = 0; i < this.player.bullets.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (checkCollision.checkCollide(this.player.bullets[i], this.enemies[j], this.pointer)) {
          this.player.bullets.splice(i, 1);
          this.enemies[j].health -= this.player.gun.damage;
          if (this.enemies[j].health<=0) {
            this.enemies.splice(j, 1);
            this.player.enemyKilled++;
            this.enemyNumber--;
          }
          break;


        }
      }
    }
  }


  //enemy shooting enemy
  checkEnemyBulletCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.enemies[i].bullets.length; j++) {
        for (let k = 0; k < this.enemies.length; k++) {
          if (this.enemies[k] === this.enemies[i])
            continue;
          if (checkCollision.checkCollide(this.enemies[i].bullets[j], this.enemies[k], this.pointer)) {
            this.enemies[i].bullets.splice(j,1);
            this.enemies[k].health--;
            if (this.enemies[k].health === 0) {
              this.enemies[k].bullets = [];
              this.enemies.splice(k, 1);
              this.enemyNumber--; 
            }
             break;
          }
        }
      }
    }
  }

  enemyBulletToWall = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.enemies[i].bullets.length; j++) {
        for (let k = 0; k < this.walls.length; k++) {
          if (checkCollision.checkCollide(this.enemies[i].bullets[j], this.walls[k], this.pointer)) {
            this.enemies[i].bullets.splice(j,1);
            console.log('collide');
          }
        }
      }
    }
  }

  // player bullet collide with wall
  playerBulletToWall = () => {
    for (let i = 0; i < this.player.bullets.length; i++) {
      for (let j = 0; j < this.walls.length; j++) {
        if (checkCollision.checkCollide(this.player.bullets[i], this.walls[j], this.pointer)) {
          this.player.bullets.splice(i, 1);
        }
      }
    }
  }

  // enemy to player bullet collision
  checkEnemyPlayerBulletCollision = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.enemies[i].bullets.length; j++) {
        if (checkCollision.checkEnemyBulletCollide(this.player, this.enemies[i].bullets[j])) {
          if (this.player.shield!=0) {
            this.player.shield--;
          }
          else {
            this.player.health--;
          }
          this.enemies[i].bullets.splice(j, 1);
          if (this.player.health === 0) {
            this.gameOver();
          }
        }
      }
    }
  }

  checkPlayerItemsCollision = () => {
    for (let i = 0; i < this.items.length; i++) {
      if (checkCollision.isCollidingWithObject(this.player, this.items[i], this.pointer)) {
        if (this.items[i].name === 'potion') {
          this.player.health = 10;
          this.items.splice(i, 1);
        }
        else if(this.items[i].name == 'shield'){
          this.player.shield = 5;
          this.items.splice(i,1);
        }
      }
    }
  }

  checkPlayerGunCollision = () => {
    for (let i = 0; i < this.guns.length; i++) {
      if (checkCollision.isCollidingWithObject(this.player, this.guns[i], this.pointer)) {
        if (this.guns[i].name === 'shotgun') {
          this.player.shotGun.bulletCapacity = 5;
          this.guns.splice(i, 1);
        } else if (this.guns[i].name === 'awm') {
            this.player.awm.bulletCapacity = 50;
            this.guns.splice(i, 1);
        } else if (this.guns[i].name === 'shooter') {
            this.player.shooter.bulletCapacity = 5;
            this.guns.splice(i, 1);
        }
      }
    }
  }

  changeGun = () => {
    onkeypress =(e) =>{
      let code = e.keyCode;
      if (code == 49){
        this.player.changeGun(this.player.normalGun);
        this.player.imageUrl = 'images/player-rifle.png';
        this.player.init();
      }
      else if(code == 50){
        this.player.changeGun(this.player.shotGun);
        this.player.imageUrl = 'images/player-shotgun.png';
        this.player.init();
      }
      else if(code == 51){
        this.player.changeGun(this.player.awm);
        this.player.imageUrl = 'images/player-awm.png';
        this.player.init();
      }
      else if(code == 52){
        this.player.changeGun(this.player.shooter);
        this.player.imageUrl = 'images/player-shooter.png';
        this.player.init();
      }
    }
  }

  gameOver = () => {
    window.cancelAnimationFrame(this.animate);
    this.ctx.clearRect(0,0,canvas.width,canvas.height);
    targetDiv.style.background = 'url(images/gameover.jpg)';
    targetDiv.style.backgroundSize = 'cover';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('You are '+(this.enemies.length+1) + ' in rank', screen.width / 2, screen.height / 2 - 20);
    this.ctx.fillText('Enemies Killed : '+(this.player.enemyKilled), screen.width / 2, screen.height / 2);
    targetDiv.appendChild(this.restart);
    this.restart.innerHTML = 'RESTART';
    this.restart.addEventListener("click", () => {
      targetDiv.style.background = 'none';
      this.gameOver.bind(this);
      this.gameWorld.trees = [];
      this.gameWorld.enemies = [];
      this.gameWorld.guns = [];
      this.gameWorld.walls = [];
      this.gameWorld.items = [];
      console.log(this.gameWorld);
      this.ctx.clearRect(0,0,canvas.width,canvas.height);
      this.restart.style.display = 'none';
      this.init();
      this.start();
      });
  }

  gameWin = () => {
    window.cancelAnimationFrame(this.animate);
    this.ctx.clearRect(0,0,canvas.width,canvas.height);
    targetDiv.style.background = 'url(images/victory.jpg)';
    targetDiv.style.backgroundSize = 'cover';
    targetDiv.appendChild(this.restart);
    this.restart.innerHTML = 'RESTART';
    this.restart.addEventListener("click", () => {
      targetDiv.style.background = 'none';
      this.gameOver.bind(this);
      this.gameWorld.trees = [];
      this.gameWorld.enemies = [];
      this.gameWorld.guns = [];
      this.gameWorld.walls = [];
      this.gameWorld.items = [];
      this.ctx.clearRect(0,0,canvas.width,canvas.height);
      this.restart.style.display = 'none';
      this.init();
      this.start();
      });
  }

  listenKey = () => {
    if (keyPress.keyStatus.up) {
      if (!(this.pointer.y > MAX_UP)) {
        this.pointer.y += this.player.speed;
      }
    }
    if (keyPress.keyStatus.down) {
      if ((this.pointer.y > MAX_DOWN)) {
        this.pointer.y -= this.player.speed;
      }
    }
    if (keyPress.keyStatus.left) {
      if (!(this.pointer.x > MAX_LEFT)) {
        this.pointer.x += this.player.speed;
      }
    }
    if (keyPress.keyStatus.right) {
      if (!(this.pointer.x < MAX_RIGHT)) {
        this.pointer.x -= this.player.speed;
      }
    }
  }
}
window.onkeydown = keyPress.keyDownListener;
window.onkeyup = keyPress.keyUpListener;

window.addEventListener("mousedown", () => {
  mouseClicked = true;

});

window.addEventListener("mouseup", () => {
  mouseClicked = false;

});