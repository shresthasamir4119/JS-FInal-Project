class Player {
  xPosition;
  yPosition;
  angle = 0;
  speed = 2;
  size = PLAYER_SIZE;
  isAlive = true;
  lastShootTime = 0;
  normalGun = new Gun();
  gun = this.normalGun;
  shotGun = new ShotGun();
  shooter = new Shooter();
  awm = new AWM();
  bullets = [];
  imageUrl = 'images/player-rifle.png'
  enemyKilled = 0;
  health = 10;
  shield = 0;
  playerImage = new Image();
  lastTimePOZ = 0; // last time player out of zone
  pointer = {
    x: 0,
    y: 0

  };
  constructor(xPos, yPos) {
    this.xPosition = xPos;
    this.yPosition = yPos;
  } 
  init = () => {
    this.playerImage.src = this.imageUrl;
  }
  update = () => {
    this.gun.update(this.xPosition, this.yPosition)
      if (keyPress.keyStatus.up && this.pointer.y < MAX_UP) {
          this.pointer.y -= this.speed;
      }
      if (keyPress.keyStatus.down && this.pointer.y > MAX_DOWN) {
          this.pointer.y += this.speed;
      }
      if (keyPress.keyStatus.left && this.pointer.x < MAX_LEFT) {
          this.pointer.x -= this.speed
      }
      if (keyPress.keyStatus.right && this.pointer.x > MAX_RIGHT) {
          this.pointer.x += this.speed;
      }
      currentTime = time.getTime();
      if ((keyPress.keyStatus.fire || mouseClicked) && currentTime - this.lastShootTime >= this.gun.fireInterval && this.gun.bulletCapacity != 0) {
        this.gun.bulletCapacity--;
        let bullet = new Bullet(this.xPosition, this.yPosition, this.angle, this.ctx);
        bullet.init();
        this.bullets.push(bullet);
        this.lastShootTime = currentTime;
      }
    this.destroyBullets();
    this.updateRotation();
  }
  changeGun = (gun) => {
    this.gun = gun;
  }
  destroyBullets = () => {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].distanceTraveled >= this.gun.gunRange) {
        this.bullets.splice(i, 1);
        break;
      }
    }
  }
  updateRotation = () => {
    this.angle = angleObj.getAngle(mouse.mouse.y, this.yPosition, mouse.mouse.x, this.xPosition);
  }
  render = (ctx) => {
    this.gun.render(ctx);
    ctx.save();
    ctx.translate(this.xPosition, this.yPosition);
    ctx.rotate(this.angle);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.translate(-this.xPosition, -this.yPosition);
    ctx.arc(this.xPosition,this.yPosition, this.gun.gunRange*BULLET_DISTANCE, 0, Math.PI*2 );
    ctx.drawImage(this.playerImage, this.xPosition - 25, this.yPosition - 25, 50, 50);
    ctx.stroke();
    ctx.restore();
  }
}