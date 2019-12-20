// loads all necessary images before hand, before starting game
function Preloader() {

	var view = targetDiv;	
	var loadingPercentage = document.createElement('div');

	var imageSources;
	var soundSources;

	var that = this;

	this.init = function() {
		view.appendChild(loadingPercentage);
		loadingPercentage.innerHTML = "LOADING";

		imageSource = {
			1: 'images/background.jpg',
			2: 'images/maps.png',
			3: 'images/player-awm.png',
			4: 'images/player-shooter.png',
			5: 'images/player-shotgun.png',
			6: 'images/gameover.jpg',
			7: 'images/enemy.png',
			8: 'images/tree.png',
			9: 'images/victory.jpg',
			10: 'images/wall.png',
			11: 'images/awm.png',
			12: 'images/shotgun.png',
			13: 'images/shooter.png'
		}

		that.loadImages(imageSource);
	}

	this.loadImages = function(imageSources) {
		
		var images = {};
		var loadedImages = 0;
		var totalImages = 0;
	
		for (var key in imageSources) {

			totalImages++;
		}

		for (var key in imageSources) {

			images[key] = new Image();
			images[key].src = imageSources[key];

			images[key].onload = function() {
				
				loadedImages++;
				percentage = Math.floor((loadedImages * 100) / totalImages);

				loadingPercentage.innerHTML = percentage + '%'; //displaying percentage

				if(loadedImages >= totalImages) {
					view.removeChild(loadingPercentage);
					that.initMainApp();
				}
			}
		}
	}

	this.initMainApp = function() {
	    let gameWorld = new GameWorld();
  		let game = new StartGame(gameWorld);
  		game.init();
  		game.start();
	}
}

window.onload = function() {

	var preloader = new Preloader();
	preloader.init();
}

