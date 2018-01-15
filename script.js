const newSlideBtn  = document.querySelector('#new-slide');
const previewPanel = document.querySelector('.preview-panel .container');
const editor 	   = document.querySelector('.editor');
const slides   	   = editor.children;
const previews 	   = previewPanel.children;
let slideCounter   = 0;
let slideCurrIndex = 0;

previews[0].addEventListener('click', function() {
	return selectSlide(0)
});

function selectSlide(next) {
	previews[slideCurrIndex].classList.toggle('active');
	slides[slideCurrIndex]  .classList.toggle('active');
	previews[next].classList.toggle('active');
	slides[next]  .classList.toggle('active');
	slideCurrIndex = next;

	setPageNumber(next+1);
}

function addSlide() {
	slideCounter++;
	slideCurrIndex = slideCounter;
	
	document.querySelector('.preview.active').classList.toggle('active');
	const preview = document.createElement('div');
		preview.classList.add('preview', 'active');
		preview.dataset.index = slideCounter;
		preview.addEventListener('click', function() {
			return selectSlide(parseInt(this.dataset.index));
		});
	previewPanel.appendChild(preview);
	
	document.querySelector('.slide.active').classList.toggle('active');
	const slide = document.createElement('div');
		slide.classList.add('slide', 'active');
		slide.dataset.index = slideCounter;
		slide.innerHTML = 
			`<div class="content">
				<input class="header" type="text" placeholder="I'm header!">
				<hr>
				<textarea class="body" type="text" placeholder="I'm text!"></textarea>
				<footer></footer>
			</div>`;
	editor.appendChild(slide);
	setPageNumber(slideCurrIndex+1);
}

function deleteSlide() {
	let index = slideCurrIndex;
	if (index != 0)
		selectSlide(index-1);
	else if (index != slideCounter) {
		selectSlide(index+1);
		slideCurrIndex = 0;
		setPageNumber(1);
	} else 
		return;
	previews[index].remove();
	slides[index].remove();
	slideCounter--;
	for (let i = index; i < previews.length; i++) {
		previews[i].dataset.index -= 1;
		slides[i]  .dataset.index -= 1;
	}
}

function FullScreen() {
	let width  = document.querySelector('.slide.active').offsetWidth;
	editor.style.transform = 'scale(1.43)';
	editor.style.width  = width + 'px';
	screenfull.request(editor);
}

function setPageNumber(num) {
	document.querySelector('.slide.active footer').textContent = num; 
}
 
function addHeader() { 
	let header = document.querySelector('.preview.active p'); 
	if (!header) {
		header = document.createElement('p');
		header.classList.add('header');
		document.querySelector('.preview.active').appendChild(header);
	}
	header.textContent = this.value;
}

function addBody() {
	const body = document.createElement('p');
	header = document.textContent = this.value;	
}

screenfull.on('change', () => {
	if (!screenfull.isFullscreen) {
		editor.style.width  = '100%';
		editor.style.transform = 'scale(1)';
	}
})

document.querySelector('#fullscr').addEventListener('click', FullScreen);

document.querySelector('.slide.active input').addEventListener('keyup', addHeader);

newSlideBtn.addEventListener("click", addSlide);

document.addEventListener('keydown', function(e) {
	if (e.keyCode == 38) { // up key
		if (slideCurrIndex == 0)
			return;	
		selectSlide(slideCurrIndex-1);
	}
	if (e.keyCode == 40) { // down key
		if (slideCurrIndex == previews.length-1)
			return;
		selectSlide(slideCurrIndex+1);
	}
	if (e.keyCode == 46) // del key
		deleteSlide();
	if (e.keyCode == 107) // plus key
		addSlide();
	
});

document.addEventListener('keydown', e => {
});

feather.replace();