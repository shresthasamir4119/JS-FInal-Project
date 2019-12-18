class Gun {
  gun = new Image();
  name = 'pistol';
  rotationAngle = 0;
  fireInterval = 1000; // default fire speed
  damage = 1;
  bulletCapacity = 1000;
  width = 30;
  height = 10;
  gunRange = 40;
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }
  init = () => {
  }
  update(playerXPosition, playerYPosition) {
    this.xPosition = playerXPosition;
    this.yPosition = playerYPosition;
    this.updateRotation();
  }
  updateRotation = () => {
    var opposite = mouse.mouse.y - this.yPosition;
    var adjacent = mouse.mouse.x - this.xPosition;
    this.rotationAngle = Math.atan2(opposite, adjacent);
  }
  render = (ctx) => {
    ctx.save();
    ctx.translate(this.xPosition, this.yPosition);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-this.xPosition, -this.yPosition);
    ctx.drawImage(this.gun, this.xPosition + 5, this.yPosition - 3, this.width, this.height);
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(this.xPosition, this.yPosition);
    ctx.stroke();
  }
}