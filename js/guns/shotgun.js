class ShotGun extends Gun {
  width = 50;
  height = 50;
  name = 'shotgun';
  fireInterval = 1000;
  damage = 10;
  bulletCapacity = 0;
  gunRange = 30;
  speed = 2;
  constructor(xPosition, yPosition) {
    super(xPosition, yPosition);
  }
  init = () => {
    this.gun.src = 'images/shotgun.png';  
  }
}