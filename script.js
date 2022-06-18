const inputs = document.querySelectorAll('input');
const description = document.querySelector('.description')

const check = document.querySelector('.submit__button')
check.addEventListener('click', function (){
	//
	let score = 0;
	removeDescriptions();
	//
	inputs.forEach (function (elements) {
		// console.log (elements.value)
		if (elements.checked){
			score = score + elements.value*1
			//
			const paragraph = document.createElement ("div");
			paragraph.classList.add (`paragraph`);
			let text = elements.previousSibling
			paragraph.innerHTML = '- '+ text.innerHTML+' +'+elements.value;
			description.appendChild (paragraph);
		}
	})
	check.innerHTML = "check / score: "+score
	//
	window.scrollTo(0, document.body.scrollHeight);
})

function removeDescriptions () {
	let remObj = document.querySelectorAll('.paragraph')
	remObj.forEach (function (elements) {
		elements.remove()
	})
}
