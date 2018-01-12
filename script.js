const newSlideBtn  = document.querySelector('.new-slide');
const previewPanel = document.querySelector('.preview-panel .container');
const editor 	   = document.querySelector('.editor');
const previews = previewPanel.children;
const slides   = editor.children;
let slideCounter   = 0;
let slideCurrIndex = 0;

// setting height for some items
let initialHeight = previewPanel.offsetHeight-2 + 'px';
previewPanel.style.height = initialHeight;

function selectSlide() {
	previews[slideCurrIndex]    .classList.toggle('active');
	previews[this.dataset.index].classList.toggle('active');
	slides[slideCurrIndex]    .classList.toggle('active');
	slides[this.dataset.index].classList.toggle('active');
	slideCurrIndex = parseInt(this.dataset.index);
}

previews[0].addEventListener('click', selectSlide);

newSlideBtn.addEventListener("click", function() {
	slideCounter++;
	slideCurrIndex = slideCounter;
	document.querySelector('.preview.active').classList.toggle('active');
	const preview = document.createElement('div');
		preview.classList.add('preview', 'active');
		preview.dataset.index = slideCounter;
		preview.addEventListener('click', selectSlide);
	previewPanel.appendChild(preview);

	
	document.querySelector('.slide.active').classList.toggle('active');
	const slide = document.createElement('div');
		slide.classList.add('slide', 'active');
		slide.dataset.index = slideCounter;
		slide.innerHTML = `<div class='content'>${slideCounter}</div>`;
	editor.appendChild(slide);
});



document.addEventListener('keydown', function(e) {
	if (e.keyCode == 38) {
		if (slideCurrIndex == 0)
			return;	
		previews[slideCurrIndex]  .classList.toggle('active');
		previews[slideCurrIndex-1].classList.toggle('active');
		slides[slideCurrIndex]  .classList.toggle('active');
		slides[slideCurrIndex-1].classList.toggle('active');
		slideCurrIndex--;
	}
	if (e.keyCode == 40) {
		if (slideCurrIndex == previews.length-1)
			return;	
		previews[slideCurrIndex]  .classList.toggle('active');
		previews[slideCurrIndex+1].classList.toggle('active');
		slides[slideCurrIndex]  .classList.toggle('active');
		slides[slideCurrIndex+1].classList.toggle('active');
		slideCurrIndex++;
	}
});