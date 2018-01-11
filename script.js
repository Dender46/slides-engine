const newSlideBtn = document.querySelector('.new-slide');
const previewPanel = document.querySelector('.preview-panel .container');
const editor = document.querySelector('.editor');
let slideCounter = 1

let initialHeight = previewPanel.offsetHeight-2 + 'px';
previewPanel.style.height = initialHeight;

newSlideBtn.addEventListener("click", function() {
	slideCounter++;
	document.querySelector('.preview.active').classList.toggle('active');
	const preview = document.createElement('div');
		preview.classList.add('preview', 'active');
		preview.dataset.index = slideCounter;
	previewPanel.appendChild(preview);
	
	document.querySelector('.slide.active').classList.toggle('active');
	const slide = document.createElement('div');
		slide.classList.add('slide', 'active');
		slide.dataset.index = slideCounter;
		slide.innerHTML = `<div class='content'>${slideCounter}</div>`;
	editor.appendChild(slide);
});