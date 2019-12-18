class Shooter extends Gun {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition);
    }
    fireInterval = 2500;
    damage = 10;
    bulletCapacity = 0;
    gunRange = 75;
    speed = 3;
    name = 'shooter';
    init = () => {
        this.gun.src = 'images/shooter.png';   
    }
}
