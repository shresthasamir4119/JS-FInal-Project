class Enemy extends Player {
  frame = 0;
  random = new GetRandomNumber();
  health = 10;
  gun = new EnemyGun()
  enemyInRange = true;
  constructor(xPosition, yPosition, direction) {
    super(xPosition, yPosition);
    this.direction = direction;
  }
  init = () => {
    this.gun.init();
    this.playerImage.src = 'images/enemy.png';
  }
  update = (enemies, player, ctx, pointer) => {
    switch (this.direction) {
      case 1: // 1 for moving upward
        this.yPosition--;
        this.frame++;
        if(this.frame%250==0){
          this.direction = this.random.getRandomDirection();
        }
        if (this.yPosition <= 150+25) {
          this.direction = 2;
        }
        break;
      case 2: // 2 for moving downward
        this.yPosition++;
        this.frame++;
        if(this.frame%250==0){
          this.direction = this.random.getRandomDirection();
        }
        if (this.yPosition >= 1350-25) {
          this.direction = 1;
        }
        break;
      case 3: // 3 for moving left
        this.xPosition--;
        this.frame++;
        if(this.frame%250==0){
          this.direction = this.random.getRandomDirection();
        }
        if (this.xPosition <= 150+25) {
          this.direction = 4;
        }
        break;
      case 4: // 4 for moving right
        this.xPosition++;
        this.frame++;
        if(this.frame%250==0){
          this.direction = this.random.getRandomDirection();
        }
        if (this.xPosition >= 1350-25) {
          this.direction = 3;
        }
        break;
      default:
        this.xPosition = this.xPosition;
        this.yPosition = this.yPosition;
    }
    for (let i = 0; i < enemies.length; i++) {
      if (this === enemies[i] && enemies.length != 1) continue;
      // enemy to enemy fight 
      if ((checkCollision.distBetweenPoints(this.xPosition, this.yPosition, enemies[i].xPosition, enemies[i].yPosition)) < this.gun.gunRange*BULLET_DISTANCE && enemies.length !== 1) {
        this.angle = angleObj.getAngle(enemies[i].yPosition, this.yPosition, enemies[i].xPosition, this.xPosition);
        this.shootBullet(ctx, pointer, this.angle);
      }
      // Enemy - player fight
      if ((checkCollision.distBetweenPoints(this.xPosition, this.yPosition, player.xPosition - pointer.x, player.yPosition - pointer.y)) < this.gun.gunRange*BULLET_DISTANCE) {
        this.angle = angleObj.getAngle(player.yPosition - pointer.y, this.yPosition, player.xPosition - pointer.x, this.xPosition);
        if(playerInRange){
          this.shootBullet(ctx, pointer, this.angle);
        } 
      }
      this.updateGun(this.angle);
    }
  }
  shootBullet = (ctx, pointer, angle) => {
    currentTime = time.getTime();
    if (currentTime - this.lastShootTime >= this.gun.fireInterval) {
      let bullet = new Bullet(this.xPosition + pointer.x, this.yPosition + pointer.y, angle, this.ctx);
      bullet.init();
      this.bullets.push(bullet);
      this.lastShootTime = currentTime;
    }
  }
  updateGun = () => {
    this.gun.update(this.xPosition, this.yPosition, this.pointer.x, this.pointer.y, this.angle);
  }
  render = (ctx, pointer) => {
    this.gun.render(ctx, pointer);
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.drawImage(this.playerImage, this.xPosition + pointer.x - 25, this.yPosition + pointer.y - 25, 50, 50);
    ctx.arc(this.xPosition+pointer.x,this.yPosition+pointer.y,this.gun.gunRange*BULLET_DISTANCE,0,2*Math.PI);
    ctx.stroke();
  }
  destroyBullets = () => {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].distanceTraveled > this.gun.gunRange) {
        this.bullets.splice(i, 1);
        break;
      }
    }
  }
}