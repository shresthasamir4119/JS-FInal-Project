class EnemyGun extends Gun {
  constructor(xPosition, yPosition) {
    super(xPosition, yPosition);
  }
  init = () => {
    this.gun.src = 'images/enemygun.png';
  }
  fireInterval = 1000;
  update(playerXPosition, playerYPosition, xPointer, yPointer, angle) {
    this.xPosition = playerXPosition;
    this.yPosition = playerYPosition;
    this.rotationAngle = angle;
  }
  render = (ctx, pointer) => {
    ctx.save();
    ctx.translate(this.xPosition + pointer.x, this.yPosition + pointer.y);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-this.xPosition, -this.yPosition);
    ctx.drawImage(this.gun, this.xPosition+25, this.yPosition, 30, 10);
    ctx.restore();
  }
}