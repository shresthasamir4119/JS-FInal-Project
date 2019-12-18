class Wall {
  wall = new Image();
  height = 100;
  width = 100;
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }
  init = () => {
    this.wall.src = 'images/wall.png';
  }
  render = (ctx, pointer) => {
    ctx.drawImage(this.wall, this.xPosition + pointer.x, this.yPosition + pointer.y,this.height,this.width);
  }
}