class Tree {
  tree = new Image();
  height = 200;
  width = 200;
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }
  init = () => {
    this.tree.src = 'images/tree.png';
  }
  render = (ctx, pointer) => {
    ctx.drawImage(this.tree, this.xPosition + pointer.x, this.yPosition + pointer.y,this.height,this.width);
  }
}