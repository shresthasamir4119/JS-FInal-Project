class GameWorld {
  getRan = new GetRandomNumber();
  enemies = [];
  trees = [];
  guns = [];
  items = [];
  walls = [];
  init = () => {
    this.itemsNumber = 10;
    this.enemiesNumber = 10;
    this.gunsNumber = 3;
    this.treesNumber = 3;
    this.wallNumber = 3;

    this.createWall();
    this.createMap();
    this.createItems();
    this.createEnemy();
    this.createGuns();
    this.createTrees();
    this.createPlayer();
  }
  createItems = () => {
    for (let i = 0; i < this.itemsNumber; i++) {
      this.getRan.getRandomNumber();
      let item;
      let xPos = Math.floor(this.getRan.xCord);
      let yPos = Math.floor(this.getRan.yCord);
      if (i != 0) {
        for (let j = 0; j < this.items.length; j++) {
          if ((checkCollision.distBetweenPoints(xPos, yPos, this.items[j].xPosition, this.items[j].yPosition)) < 100) {
            this.getRan.getRandomNumber();
            xPos = Math.floor(this.getRan.xCord);
            yPos = Math.floor(this.getRan.yCord);
            j = -1;
          }
        }
        if (i % 2 === 0) {
          item = new Potion(xPos, yPos);
        }
        else
          item = new Shield(xPos, yPos);
        this.items.push(item);
      }
    }
  }
  createEnemy = () => {
    for (let i = 0; i < this.enemiesNumber; i++) {
      this.getRan.getRandomNumber();
      let xPos = Math.floor(this.getRan.xCord);
      let yPos = Math.floor(this.getRan.yCord);
      let direction = this.getRan.getRandomDirection();
      if (i != 0) {
        for (let j = 0; j < this.enemies.length; j++) {
          if ((checkCollision.distBetweenPoints(xPos, yPos, this.enemies[j].xPosition, this.enemies[j].yPosition) - 2 * PLAYER_SIZE) < ENEMY_MIN_DISTANCE) {
            this.getRan.getRandomNumber();
            xPos = Math.floor(this.getRan.xCord);
            yPos = Math.floor(this.getRan.yCord);
            j = -1;
          }
        }
      }
      let enemy = new Enemy(xPos, yPos, direction);
      this.enemies.push(enemy);
    }
  }

  createGuns = () => {
    for (let i = 0; i < this.gunsNumber; i++) {
      let gun;
      this.getRan.getRandomNumber();
      let xPos = Math.floor(this.getRan.xCord);
      let yPos = Math.floor(this.getRan.yCord);
      if (i != 0) {
        for (let j = 0; j < this.guns.length; j++) {
          if ((checkCollision.distBetweenPoints(xPos, yPos, this.guns[j].xPosition, this.guns[j].yPosition)) < 100) {
            this.getRan.getRandomNumber();
            xPos = Math.floor(this.getRan.xCord);
            yPos = Math.floor(this.getRan.yCord);
            j = -1;
          }
        }
      }
      if (i==0) {
        gun = new ShotGun(xPos, yPos);
      } else if (i==1) {
        gun = new AWM(xPos, yPos);
      } 
      else if(i==2){
        gun = new Shooter(xPos, yPos);
      }
      this.guns.push(gun);
    }
  }
  createTrees = () => {
    for (let i = 1; i <= this.treesNumber; i++) {
      this.getRan.getRandomNumber();
      let xPos = Math.floor(this.getRan.xCord);
      let yPos = Math.floor(this.getRan.yCord);
      let tree = new Tree(xPos, yPos);
      this.trees.push(tree);
    }
  }
  createWall = () => {
    for (let i = 1; i <= this.wallNumber; i++) {
      this.getRan.getRandomNumber();
      let xPos = Math.floor(this.getRan.xCord);
      let yPos = Math.floor(this.getRan.yCord);
      let wall = new Wall(xPos, yPos);
      this.walls.push(wall);
    }
  }
  createPlayer = () => {
    this.player = new Player(canvas.width / 2, canvas.height / 2);
  }
  createMap = () => {
    this.map = new Map();
  }
}