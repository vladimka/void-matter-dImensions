function setTab(tabName){
	document.querySelector('.tab.active').classList.remove('active');
	document.querySelector('.tab.'+tabName).classList.add('active');
}

function closeModal(modalName){
	document.querySelector('.modal-back').style.display = 'none';
	document.querySelector('.modal.'+modalName).style.display = 'none';
}

function openModal(modalName){
	document.querySelector('.modal-back').style.display = 'block';
	document.querySelector('.modal.'+modalName).style.display = 'block';
}

document.querySelector('.modal-back').onclick = function(){
	document.querySelectorAll('.modal').forEach(modal => closeModal(modal.classList[1]));
}