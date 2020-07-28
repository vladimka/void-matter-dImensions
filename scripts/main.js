let mps = new Decimal(0);
let mainInerval, saveInterval;

Decimal.prototype.format = function(placesUnder1000, places){
	if(this.e < 3)
		return (this.m*Math.pow(10, this.e)).toFixed(placesUnder1000);
	return this.m.toFixed(places)+'e'+this.e
}

function init(){
	load();
	save.dimensions.forEach((d, i) => {
		dimensions.innerHTML += '<my-dimension i="' + i + '"></my-dimension>'
	});
	mainInterval = setInterval(() => {
		draw();
		logic();
	}, 50);
	saveInterval = setInterval(saveFunction, 1000);
	console.log('CLOSE THE CONSOLE, CHEATER!');
}

function draw(){
	matter.innerText = save.balance.format(0, 2);
	mpsText.innerText = mps.format(0, 2);
	prestigePoints.innerText = save.prestigePoints.format(0, 2);
	prestigeToGain.innerText = countPrestigePoints().format(0, 2);
	pup1cost.innerText = save.pup1cost.format(0, 2);
	pup1multiplier.innerText = save.pup1multiplier.format(0, 2);
	updateDimensions();
}

function logic(){
	let zeroDimension = save.dimensions[0];
	save.dimensions.forEach((d, i) => {
		if(i == 0)
			return;
		let dimension = save.dimensions[i];
		zeroDimension.value = zeroDimension.value.plus(dimension.value.mul(dimension.multiplier));
	});
	mps = zeroDimension.value.mul(zeroDimension.multiplier);
	save.balance = save.balance.plus(mps.div(20));
}

init();