const inputs = document.querySelectorAll('input');

const check = document.querySelector('.submit__button')
check.addEventListener('click', function (){
	//
	let score = 0;
	//
	inputs.forEach (function (elements) {
		// console.log (elements.value)
		if (elements.checked){
			score = score + elements.value*1
		}
	})
	check.innerHTML = "check / score: "+score
})
