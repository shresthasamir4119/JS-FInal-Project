 

class Shield extends Items{
	constructor(xPosition, yPosition){
 		super(xPosition, yPosition);
 	}
 	init(){
 		this.item.src = 'images/shield.png';
 		this.width = 30;
 		this.height = 30;
 		this.name = 'shield';
 	}
}