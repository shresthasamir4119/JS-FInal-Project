class AWM extends Gun {
  constructor(xPosition, yPosition) {
    super(xPosition, yPosition);
  }
  width = 50;
  height = 50;
  fireInterval = 200;
  damage = 1;
  gunRange = 50;
  bulletCapacity = 0;
  speed = 2;
  name = 'awm';
  init = () => {
    this.gun.src = 'images/awm.png';  
  }
}