class Bullet{	
	speed = 2;
 	velocityX = 1;
 	velocityY = 1;
 	angle = 0;
 	distanceTraveled = 0;
 	bulletSize = 5;
 	frame =0;
 	constructor(xPosition, yPosition, angle, ctx){
 		this.xPosition = xPosition;
 		this.yPosition = yPosition;
 		this.angle = angle;
 		this.ctx = ctx;	
 	}
 	init=()=>{
 		this.velocityX = this.velocityX * Math.cos(this.angle);
 		this.velocityY = this.velocityY * Math.sin(this.angle);
 	}
 	update = ()=>{
 		this.xPosition += this.velocityX * BULLET_DISTANCE * this.speed;
 		this.yPosition += this.velocityY * BULLET_DISTANCE * this.speed;
 		this.distanceTraveled+=this.speed;
 	}
 	render = ()=>{
 		ctx.save();
 		ctx.fillStyle = "red";
 		ctx.beginPath();
		ctx.arc(this.xPosition , this.yPosition, this.bulletSize,0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
 	}
}		