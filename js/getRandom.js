const MIN_RANGE = 150;
const MAX_RANGE = 1350;
const EMEMY_MOVE_DIRECTION = 4;
class GetRandomNumber {
 	xCord;
 	yCord;
 	constructor(){
 		this.minRange = MIN_RANGE;
 		this.maxRange = MAX_RANGE;
 	}
 	getRandomNumber = ()=>{
 		this.xCord = Math.floor( Math.random() * (this.maxRange-this.minRange+1)) + this.minRange;
 		this.yCord = Math.floor( Math.random() * (this.maxRange-this.minRange+1)) + this.minRange;
  }
  	getRandomDirection = ()=>{
  		return Math.floor(Math.random() * EMEMY_MOVE_DIRECTION)+1;
  	}
}
