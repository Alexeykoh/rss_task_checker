//
"use strict"

let jsonData  = [];
const fetchURL = 'base.json';
const task = document.querySelector('ol.test__list')

fetch (fetchURL)
	.then (resp => {
		return resp.json ();
	})
	.then (data => jsonData = data)
	.then (function rec (key) {

		// loading JSON database
		loadSelector()
	})



//
let jsonDataKeys = [];
const selector = document.querySelector('.selector')

function loadSelector(){
	//
	for (let i = 0; i < jsonData.length; i++){
		//
		const option = document.createElement ("option");
		option.setAttribute ('value', `${jsonData[i].list}`);
		option.innerHTML = jsonData[i].description
		selector.appendChild (option);
	}
	document.querySelector('.selector__btn').classList.add('active')
}

const selector__btn = document.querySelector('.selector__btn')
selector__btn.addEventListener('click', function (){
	removeAll()
	loadBases(selector.value)

})

function loadBases (value) {
	for (let a = 0; a < jsonData.length; a++){
		if(value === jsonData[a].list){

			for (let i = 0; i < jsonData[a].include.length; i++) {
				const l1_main = document.createElement ("li");
				l1_main.classList.add (`test__item`);
				task.appendChild (l1_main);
				//

				if(jsonData[a].include[i].include){
					console.log (jsonData[a].include[i].arr)
					//
					const h3 = document.createElement ("h3");
					h3.classList.add (`test__item--h3`);
					h3.innerHTML = jsonData[a].include[i].description
					l1_main.appendChild (h3);
					//
					const ul = document.createElement ("ul");
					ul.classList.add (`item__list--include`);
					l1_main.appendChild (ul);
					//

					for (let k = 0; k < jsonData[a].include[i].arr.length; k++) {
						const l1_second = document.createElement ("li");
						l1_second.classList.add (`item__list--include__item`);
						ul.appendChild (l1_second);
						//
						const formSecond = document.createElement ("form");
						formSecond.classList.add (`test__item--form`);
						formSecond.setAttribute ('action', "");
						l1_second.appendChild (formSecond);
						//

						const doneSecond = document.createElement ("img");
						doneSecond.classList.add (`done`);
						doneSecond.setAttribute ('alt', "done-img");
						doneSecond.setAttribute ('src', "assets/ico/done.svg");
						doneSecond.setAttribute ('id', `img-id_${i}_${k}`);
						formSecond.appendChild (doneSecond);

						//
						const labelSecond = document.createElement ("label");
						labelSecond.classList.add (`test__item--label`);
						labelSecond.classList.add (`ol`);
						labelSecond.setAttribute ('for', `label_${i}_${k}`);
						labelSecond.innerHTML = jsonData[a].include[i].arr[k].description
						formSecond.appendChild (labelSecond);
						//
						const inputSecond = document.createElement ("input");
						inputSecond.classList.add (`input__class`);
						inputSecond.setAttribute ('type', `checkbox`);
						inputSecond.setAttribute ('id', `label_${i}_${k}`);
						inputSecond.setAttribute ('name', `input_${i}_${k}`);
						inputSecond.setAttribute ('value', `${jsonData[a].include[i].arr[k].value}`);
						formSecond.appendChild (inputSecond);
						//
					}
				}
				else
				{
					const form = document.createElement ("form");
					form.classList.add (`test__item--form`);
					form.setAttribute ('action', "");
					l1_main.appendChild (form);
					//

					const done = document.createElement ("img");
					done.classList.add (`done`);
					done.setAttribute ('alt', "done-img");
					done.setAttribute ('src', "assets/ico/done.svg");
					done.setAttribute ('id', `img-id_${i}`);
					form.appendChild (done);
					//

					const label = document.createElement ("label");
					label.classList.add (`test__item--label`);
					label.classList.add (`ul`);
					label.setAttribute ('for', `label_${i}`);
					label.innerHTML = jsonData[a].include[i].description
					form.appendChild (label);
					//
					const input = document.createElement ("input");
					input.classList.add (`input__class`);
					input.setAttribute ('type', `checkbox`);
					input.setAttribute ('id', `label_${i}`);
					input.setAttribute ('name', `input_${i}`);
					input.setAttribute ('value', `${jsonData[a].include[i].value}`);
					form.appendChild (input);
					//
				}

			}
			//
			const inputs = document.querySelectorAll('input');
			const description = document.querySelector('.description')
			inputs.forEach(function (elem){
				elem.addEventListener('click',function (kek){
					const labelCont = document.getElementById(this.id).previousSibling
					let getID = this.id.slice(5,this.id.length);
					console.log (`img-id${getID}`)
					const done = document.getElementById(  `img-id${getID}`)
					if (this.checked){
						labelCont.classList.add('checked')
						done.classList.add('active')
					} else{
						labelCont.classList.remove('checked')
						done.classList.remove('active')
					}
				})
			})

			const check = document.querySelector('.submit__button')
			check.addEventListener('click', function (){
				//
				let score = 0;
				removeDescriptions();
				//
				inputs.forEach (function (elements) {

					//
					const description__p = document.getElementById('description__p')
					let text = elements.previousSibling
					if (elements.checked){
						score = score + elements.value*1
						description__p.innerHTML += '- ' + text.innerHTML + ' +' + elements.value + '<br>';
					} else {
						description__p.innerHTML += '<span class="red">Не выполнено </span> - ' + text.innerHTML + ' +' + elements.value + '<br>';
					}
				})
				check.innerHTML = "check / score: "+score
				//
				window.scrollTo(0, document.body.scrollHeight)
			})
		}
	}

}



// ======  // ======  // ======  // ======  // ======  // ======  // ======  // ======




function removeDescriptions () {
	const description = document.getElementById('description__p')
	description.innerHTML = '';
}
function removeAll () {
	let removeAll = document.querySelectorAll('li')
	removeAll.forEach (function (elements) {
		elements.remove()
	})
	removeDescriptions()
	document.querySelector('.submit__button').innerHTML = "check"
}

document.querySelector('.header__tittle').addEventListener('click', function (){
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
})

document.querySelector('.clipboard__btn').addEventListener('click', function (){
	const description = document.getElementById('description__p')
	// let clipboardArr = [];
	// description.forEach(function (elements){
	// 	clipboardArr.push(elements.innerHTML+'\n')
	// })
	// console.log (clipboardArr)
	navigator.clipboard.writeText(description.innerText)
})
