const initialSave = {
	balance : new Decimal(10),
	prestigePoints : new Decimal(0),
	dimensions : [
		{
			cost : new Decimal(10),
			name : "Zero Void Dimension",
			multiplier : new Decimal(1),
			value : new Decimal(0)
		},
		{
			cost : new Decimal(1e10),
			name : "First Void Dimension",
			multiplier : new Decimal(1),
			value : new Decimal(0)
		}
	],
	pup1cost : new Decimal(10),
	pup1multiplier : new Decimal(0),
	last_played : new Date()
}

let save = Object.assign({}, initialSave);

function saveFunction(){
	localStorage.setItem('save', JSON.stringify(save));
}

function formatToTime(n){
	let days = parseInt(n/86400);
	n -= days * 86400;

	let hours = parseInt(n/3600);
	n -= hours * 3600;

	let minutes = parseInt(n/60);
	n -= minutes * 60;

	let str = '';

	if(days > 0)
		str += days + ' days ';
	if(hours > 0)
		str += hours + ' hours ';
	if(minutes > 0)
		str += minutes + ' minutes ';
	if(n > 0)
		str += parseInt(n) + ' seconds ';

	return {
		seconds : n,
		days, hours, minutes,
		str
	}
}

function emulateOfflineTime(timeDiff){
	let zeroDimension = _save.dimensions[0];
	_save.dimensions.forEach((d, i) => {
		if(i == 0)
			return;
		let dimension = _save.dimensions[i];
		zeroDimension.value = zeroDimension.value.plus(dimension.value.mul(dimension.multiplier).mul(timeDiff));
	});
	offlineBalance = zeroDimension.value.mul(zeroDimension.multiplier).mul(timeDiff);
	let str = `while you were away for ${formatToTime(timeDiff).seconds}seconds you earned ${offlineBalance.format(0, 2)} Void Matter`;
	document.querySelector('.offlineModal>p').innerText = str;
	openModal('offlineModal');
	console.log(str);
	_save.balance = save.balance.plus(offlineBalance);
}

function load(){
	_save = JSON.parse(localStorage.getItem('save'));
	_save.balance = new Decimal(_save.balance);
	_save.prestigePoints = new Decimal(_save.prestigePoints);
	_save.pup1cost = new Decimal(_save.pup1cost);
	_save.pup1multiplier = new Decimal(_save.pup1multiplier);
	_save.dimensions.forEach(_dimension => {
		_dimension.cost = new Decimal(_dimension.cost);
		_dimension.multiplier = new Decimal(_dimension.multiplier);
		_dimension.value = new Decimal(_dimension.value);
	});
	_save.last_played = new Date(_save.last_played);
	let timeDiff = (new Date() - _save.last_played) / 1000;
	emulateOfflineTime(timeDiff);
	save = Object.assign({}, save, _save);
}

function hardReset(){
	save = initialSave;
	saveFunction();
}