class Angle{
	getAngle = (yFirst, ySecond, xFirst, xSecond)=>{
		let opposite = yFirst - ySecond;
		let adjacent =xFirst - xSecond;
		return Math.atan2(opposite, adjacent);
	}
}
let angleObj = new Angle();
