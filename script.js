//
"use strict"

// scroll to anchor


let jsonData   = [];
const fetchURL = 'base.json';
const task     = document.querySelector ('ol.test__list')

fetch (fetchURL)
	.then (resp => {
		return resp.json ();
	})
	.then (data => jsonData = data)
	.then (function rec (key) {

		// loading JSON database
		loadSelector ()
	})


//
let jsonDataKeys = [];
const selector   = document.querySelector ('.selector')

function loadSelector () {
	//
	for (let i = 0; i < jsonData.length; i++) {
		//
		const option = document.createElement ("option");
		option.setAttribute ('value', `${jsonData[i].list}`);
		option.innerHTML = jsonData[i].description
		selector.appendChild (option);
	}
	document.querySelector ('.selector__btn').classList.add ('active')
	//
}

const selector__btn = document.querySelector ('.reload__btn')

selector__btn.addEventListener ('click', function () {
	loader ()
})
//
selector.addEventListener ('change', function (a) {
	loader ()

});

function loader () {
	// document.querySelector ('.selected__task').innerHTML = selector.value
	removeAll ()
	loadBases (selector.value)
	scrollToTop ()
}


function loadBases (value) {
	const score__input     = document.querySelector ('.score__input')
	score__input.innerHTML = 0;
	let maxScore           = 0;
	// document.querySelector('.test__list--img__arrow').classList.add('active')
	for (let a = 0; a < jsonData.length; a++) {
		if (value === jsonData[a].list) {
			//
			document.querySelector ('.selected__task').innerHTML = jsonData[a].description
			//
			for (let i = 0; i < jsonData[a].include.length; i++) {
				const l1_main = document.createElement ("li");
				l1_main.classList.add (`test__item`);
				task.appendChild (l1_main);
				//

				if (jsonData[a].include[i].include) {
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
						labelSecond.innerText = jsonData[a].include[i].arr[k].description
						formSecond.appendChild (labelSecond);
						//
						const inputSecond = document.createElement ("input");
						inputSecond.classList.add (`input__class`);
						inputSecond.setAttribute ('type', `checkbox`);
						inputSecond.setAttribute ('id', `label_${i}_${k}`);
						inputSecond.setAttribute ('name', `input_${i}_${k}`);
						inputSecond.setAttribute ('value', `${jsonData[a].include[i].arr[k].value}`);
						maxScore += jsonData[a].include[i].arr[k].value
						formSecond.appendChild (inputSecond);
						//
						const scoreLabelSecond = document.createElement ("p");
						scoreLabelSecond.classList.add (`score__label`);
						scoreLabelSecond.setAttribute ('id', `score_${i}_${k}`);
						scoreLabelSecond.innerText = '+' + jsonData[a].include[i].arr[k].value
						formSecond.appendChild (scoreLabelSecond);
					}
				} else {
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
					label.innerText = jsonData[a].include[i].description
					form.appendChild (label);
					//
					const input = document.createElement ("input");
					input.classList.add (`input__class`);
					input.setAttribute ('type', `checkbox`);
					input.setAttribute ('id', `label_${i}`);
					input.setAttribute ('name', `input_${i}`);
					input.setAttribute ('value', `${jsonData[a].include[i].value}`);
					maxScore += jsonData[a].include[i].value
					form.appendChild (input);
					//
					const scoreLabel = document.createElement ("p");
					scoreLabel.classList.add (`score__label`);
					scoreLabel.setAttribute ('id', `score_${i}`);
					scoreLabel.innerText = '+' + jsonData[a].include[i].value
					form.appendChild (scoreLabel);
					//
				}
			}
			//
			document.querySelector ('.score__input--max').innerHTML = maxScore;
			//
			const inputs                                            = document.querySelectorAll ('input');
			const description                                       = document.querySelector ('.description')
			inputs.forEach (function (elem) {
				elem.addEventListener ('click', function (kek) {
					const labelCont   = document.getElementById (this.id).previousSibling
					let getID         = this.id.slice (5, this.id.length);
					const done        = document.getElementById (`img-id${getID}`)
					const scoreCheck  = document.getElementById (`score${getID}`)
					const scoreScreen = document.querySelector ('.score')
					//
					writeResult ()
					//
					if (this.checked) {
						labelCont.classList.add ('checked') //not-active
						done.classList.add ('active')
						scoreCheck.classList.add ('active')
						//
						scoreScreen.classList.add ('green')
						setTimeout (function () {
							scoreScreen.classList.remove ('green')
						}, 220);
						//
					} else {
						labelCont.classList.remove ('checked')
						done.classList.remove ('active')
						scoreCheck.classList.remove ('active')
						//
						scoreScreen.classList.add ('red')
						setTimeout (function () {
							scoreScreen.classList.remove ('red')
						}, 220);
					}
					//
					labelCont.classList.add ('first--click')
					//

				})
			})
		}
	}

}


// ======  // ======  // ======  // ======  // ======  // ======  // ======  // ======
let comment = [];

function writeResult () {
	//
	let score = 0;
	removeDescriptions ();
	//
	const inputs = document.querySelectorAll ('input');
	inputs.forEach (function (elements) {

		//
		const description__p = document.getElementById ('description__p')
		let text             = elements.previousSibling
		if (elements.checked) {
			score = score + elements.value * 1
			comment.push ('- ' + text.innerHTML + ' +' + elements.value + '<br>');
		} else {
			comment.push ('- ~~' + text.innerHTML + ' +' + elements.value + '<span class="red">~~ [ Не выполнено ] </span>' + '<br>');
		}
	})
	//
	const score__input     = document.querySelector ('.score__input')
	score__input.innerHTML = score
	//
	clipReset ()
}

// ======  // ======  // ======  // ======  // ======  // ======  // ======  // ======


function removeDescriptions () {
	comment = [];
}

function removeAll () {
	let removeAll = document.querySelectorAll ('li')
	removeAll.forEach (function (elements) {
		elements.remove ()
	})
	removeDescriptions ()
}

document.querySelector ('.header__tittle').addEventListener ('click', function () {
	scrollToTop ()
})


// clipboard
const clipBefore = document.getElementById ('clip__before')
const clipAfter  = document.getElementById ('clip__after')
//
const clip_btn   = document.querySelector ('.click');
const clip_p     = document.querySelector ('.clipboard__p');
clip_btn.addEventListener ('click', function () {
	const description = document.getElementById ('description__p')
	navigator.clipboard.writeText (comment.join (''))
	//
	clip_p.innerText = 'in clipboard'
	//
	// clipBefore.classList.remove ('active')
	clipBefore.classList.add ('hidden')
	clipAfter.classList.remove ('hidden')
	//
	clipAfter.classList.add ('active')
})

function clipReset () {
	clip_p.innerText = 'copy all'
	//
	clipBefore.classList.remove ('hidden')
	clipAfter.classList.add ('hidden')
	//
	clipAfter.classList.remove ('active')
}

function scrollToTop () {
	window.scrollTo ({
		top:      0,
		behavior: "smooth"
	});
}

const score__extra__element = document.querySelector('.score')
score__extra__element.addEventListener('click',function (value){
	scrollToTop()
})

// сообщение о прокрутку наверх

const score__item = document.querySelector('.score__input__container')
const toTop__button = document.querySelector('.toTop__button')
let score__item__Toggle = true;

function showToTop(){
	const defaultPos = 24;
	const finalPos = -24;
	//
	score__item.style.transform = `translateY(${finalPos}px)`
	toTop__button.style.transform = `translateY(${finalPos}px)`
	//
	if (score__item__Toggle){
		score__item__Toggle = false;
		setTimeout(function () {
			score__item.style.transform = `translateY(${defaultPos}px)`
			toTop__button.style.transform = `translateY(${defaultPos}px)`
			score__item__Toggle = true;
			console.log ('final')
		}, 3500);
	}
}
function showToTopDefault(){
	score__item.style.transform = `translateY(0px)`
	toTop__button.style.transform = `translateY(0px)`
}

let lastScroll = 0;
const defaultOffset = 200;
// const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;


window.addEventListener('scroll', () => {
	if(scrollPosition() < lastScroll && score__item__Toggle && scrollPosition() < defaultOffset) {
		if (window.innerWidth>=685){
			showToTopDefault()
		}
	}
	else if(scrollPosition() > lastScroll && score__item__Toggle){
		if (window.innerWidth>=685){
			showToTopDefault()
		} else {
			console.log ('to top')
			showToTop()
		}
	}

	lastScroll = scrollPosition();
})
