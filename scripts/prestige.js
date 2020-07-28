function countPrestigePoints(){
	return new Decimal(save.balance.e-2 <= 0 ? 0 : save.balance.e-2);
}

function prestige(){
	let nextPrestigePoints = countPrestigePoints();
	if(nextPrestigePoints <= 0)
		return;

	save.prestigePoints = save.prestigePoints.plus(nextPrestigePoints);
	save.balance = new Decimal(10);
	save.dimensions.forEach(dimension => {
		dimension.value = new Decimal(0);
		dimension.multiplier = dimension.multiplier.mul(Math.pow(2, nextPrestigePoints/100));
	});
}

function canBuyPUp(cost){
	return save.balance.gt(cost);
}

function buyPUp1(){
	let cost = save.pup1cost
	if(!canBuyPUp(cost))
		return;
	save.balance = save.balance.minus(cost);
	save.dimensions.forEach(dimension => dimension.multiplier = dimension.multiplier.mul(1.05));
	save.pup1multiplier = save.pup1multiplier.mul(1.05);
	save.pup1cost = save.pup1cost.mul(1.3);
}