class Sound {

  gameSong;
  playerDie;
  playerPain;
  killEnemy;
  bullet;
  machineGun;
  bulletHit;
  powerUpSound;
  startSound;
  walkSound;
  // palyerDie;
  // bulletHit;
  // bulletShoot;
  // ump9;
  // awm;
  // shortGun;
  // usingHealth;
  // loadBullet;
  // gameSong;		
  // shotGunSound;

  init = () => {
    this.startSound = new Audio('sound/startMusic.wav');
    this.walkSound = new Audio('sound/walk.wav');
    // this.shotGunSound = new Audio('sound/bullet.wav')


    // gameSong = new Audio('sounds/song.wav');
    // playerDie = new Audio('sounds/player-die.wav');
    // playerPain = new Audio('sounds/player-pain.wav');
    // killEnemy = new Audio('sounds/kill-enemy.wav');
    // bullet = new Audio('sounds/bullet.wav');
    this.machineGun = new Audio('sound/machine-gun.wav');
    // bulletHit = new Audio('sounds/bullet-hit.wav');
    // powerUpSound = new Audio('sounds/oh-yeah.wav');
  }



  play = (event) => {
    switch (event) {
      case 'walk':
        this.walkSound.pause();
        this.walkSound.play();
        if (this.walkSound.ended) {
          this.walkSound.currentTime = 0;
        }
        break;
      case 'machineGun':
        this.machineGun.pause();
        this.machineGun.play();

        if (this.machineGun.ended) {
          this.machineGun.currentTime = 0;
        }
        break;


    }
  }

  playStartMusic() {
    this.startSound.play();
  }
  stopStartMusic() {
    this.startSound.pause();
  }
  playWalkSound() {
    this.walkSound.play();
  }
  stopWalkSound() {
    this.walkSound.pause();
  }

  // 	playShotGunShoot(){
  // 		this.shotGunSound.play();
  // 	}
  // 	stopShotGunShoot(){
  // 		this.shotGunSound.pause();
  // 	}

  stopMachineGunSound = () => {

    this.machineGun.pause();
  }

  stopGameSong = () => {

    this.gameSong.pause();
  }

}

let sound = new Sound();
sound.init();