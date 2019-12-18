class CheckCollision{
	distBetweenPoints = (x1, y1, x2, y2)=>{
 		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
 	}
	checkCollide = (firstBody, secondBody, pointer)=>{
		if(this.distBetweenPoints(firstBody.xPosition - pointer.x , firstBody.yPosition - pointer.y , secondBody.xPosition, secondBody.yPosition) < PLAYER_SIZE/2){
	 		return true;
	 	}
	}
	 checkEnemyBulletCollide = (firstBody, secondBody)=>{
	 	if(this.distBetweenPoints(firstBody.xPosition  , firstBody.yPosition  , secondBody.xPosition, secondBody.yPosition) < PLAYER_SIZE/2 ){
	 		return true;
	 	} 
	}
	isCollidingWithObject = (player, object, pointer)=>{
		let distX = Math.abs(player.xPosition-pointer.x  - object.xPosition-object.width/2);
    	let distY = Math.abs(player.yPosition-pointer.y  - object.yPosition-object.height/2);
    	if (distX > (object.width/2 + player.size/2)||distY > (object.height/2 + player.size/2)) { return false; }
    	if (distX <= (object.width/2)||distY <= (object.height/2)) { return true; } 
	}
}

var checkCollision = new CheckCollision();