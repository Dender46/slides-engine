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
document.querySelector('.header').addEventListener('keyup', updatePreviewHeader);
document.querySelector('.body')  .addEventListener('keyup', updatePreviewBody);

function selectSlide(next) {
	previews[slideCurrIndex].classList.toggle('active');
	slides[slideCurrIndex]  .classList.toggle('active');
	previews[next].classList.toggle('active');
	slides[next]  .classList.toggle('active');
	slideCurrIndex = next;

	previews[slideCurrIndex].scrollIntoView();
	slides[slideCurrIndex].querySelector('input').focus();

	setPageNumber(next+1);
}

function addSlide() {
	slideCounter++;
	
	const preview = document.createElement('div');
		preview.classList.add('preview');
		preview.dataset.index = slideCounter;
		preview.innerHTML =`
			<div class="pgnum">${slideCounter+1}</div>
			<h5></h5>
			<p></p>`;
		preview.addEventListener('click', function() {
			return selectSlide(parseInt(this.dataset.index));
		});
	previewPanel.appendChild(preview);
	
	const slide = document.createElement('div');
		slide.classList.add('slide');
		slide.dataset.index = slideCounter;
		slide.innerHTML = 
			`<div class="content">
				<input class="header" type="text" placeholder="I'm header!">
				<hr>
				<textarea class="body" type="text" placeholder="I'm text!"></textarea>
				<footer></footer>
			</div>`;
	editor.appendChild(slide);

	slide.querySelector('.header').addEventListener('keyup', updatePreviewHeader);
	slide.querySelector('.body')  .addEventListener('keyup', updatePreviewBody);

	preview.scrollIntoView();
	setPageNumber(slideCounter+1);
	selectSlide(slideCounter);
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

	previews[slideCurrIndex].scrollIntoView();
	updatePreviewCounter();
}

function updatePreviewHeader() {
	let header = previews[slideCurrIndex].querySelector('h5');
	header.textContent = document.querySelector('.slide.active input').value;
}

function updatePreviewBody() {
	let body = previews[slideCurrIndex].querySelector('p');
	body.textContent = document.querySelector('.slide.active textarea').value;
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

function updatePreviewCounter() {
	[].forEach.call(previews, preview => {
		preview.querySelector('.pgnum').textContent = parseInt(preview.dataset.index)+1;
	})
}

screenfull.on('change', () => {
	if (!screenfull.isFullscreen) {
		editor.style.width  = '100%';
		editor.style.transform = 'scale(1)';
	}
})

newSlideBtn.addEventListener('click', addSlide);

document.querySelector('#fullscr').addEventListener('click', FullScreen);

document.addEventListener('keydown', function(e) {
	if (e.keyCode == 38 && slideCurrIndex !== 0) { // up key
		selectSlide(slideCurrIndex-1);
		previews[slideCurrIndex].scrollIntoView();
	}

	if (e.keyCode == 40 && slideCurrIndex !== previews.length-1) { // down key
		selectSlide(slideCurrIndex+1);
		previews[slideCurrIndex].scrollIntoView();
	}

	if (e.keyCode == 46) // del key
		deleteSlide();
	
});

updatePreviewCounter();
feather.replace();