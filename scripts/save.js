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
	pup1multiplier : new Decimal(0)
}

let save = Object.assign({}, initialSave);

function saveFunction(){
	localStorage.setItem('save', JSON.stringify(save));
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
	save = Object.assign({}, save, _save);
}

function hardReset(){
	save = initialSave;
	saveFunction();
}