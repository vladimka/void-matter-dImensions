class DimensionElement extends HTMLElement{
	constructor(){
		super();
		this.dimensionIndex = parseInt(this.getAttribute('i'));
		this.dimension = save.dimensions[this.dimensionIndex];

		this.innerHTML = `
			<div class="dimension">
				<p>${this.dimension.name}. Value: <span id="level">${this.dimension.value.format(0, 2)}</span>. Multiplier: <span id="multiplier">${this.dimension.multiplier.format(1, 2)}x</span></p><br>
				<div class="buttons">
					<button onclick="buyDimension(${this.dimensionIndex})">Buy - <span id="cost">${this.dimension.cost.format(0, 2)}</span></button>
					<button onclick="buyMaxDimensions(${this.dimensionIndex})">Buy Max</button>
				</div>
			</div>
		`;
	}
}

function buyDimension(dimensionIndex){
	let dimension = save.dimensions[dimensionIndex];
	if(save.balance.lt(dimension.cost))
		return;
	save.balance = save.balance.minus(dimension.cost);
	dimension.value = dimension.value.plus(1);
}

function buyMaxDimensions(dimensionIndex){
	let dimension = save.dimensions[dimensionIndex];
	if(save.balance.lt(dimension.cost))
		return;
	let canBuy = save.balance.div(dimension.cost);
	save.balance = save.balance.minus(dimension.cost.mul(canBuy));
	dimension.value = dimension.value.plus(canBuy);
}

function updateDimensions(){
	save.dimensions.forEach((d, i) => {
		let dimension = document.querySelector(`my-dimension[i="${i}"]`);
		dimension.querySelector('#level').innerText = d.value.format(0, 2);
		dimension.querySelector('#multiplier').innerText = d.multiplier.format(2, 2)+'x';
	});
}

customElements.define('my-dimension', DimensionElement);