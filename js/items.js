class Items{

 	item = new Image();
 	constructor(xPosition, yPosition){
 		this.xPosition = xPosition;
 		this.yPosition = yPosition;
 	}



 	update = ()=>{


 	}
 	
 	render = (ctx, pointer)=>{
 		// ctx.fillText("Press F to use "+ this.name, this.xPosition+pointer.x -30, this.yPosition + pointer.y);
 		ctx.drawImage(this.item, this.xPosition + pointer.x, this.yPosition+pointer.y,this.width,this.height);
 	}
}

