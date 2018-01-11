const newSlideBtn = document.querySelector('.new-slide');
const previewPanel = document.querySelector('.preview-panel .container');
const editor = document.querySelector('.editor');
let slideCounter = 1

let initialHeight = previewPanel.offsetHeight-10 + 'px';

newSlideBtn.addEventListener("click", function() {
	slideCounter++;
	document.querySelector('.preview.active').classList.toggle('active');
	const preview = document.createElement('div');
		preview.classList.add('preview', 'active');
		preview.id = slideCounter + 'p';
	previewPanel.appendChild(preview);
	
	document.querySelector('.slide.active').classList.toggle('active');
	const slide = document.createElement('div');
		slide.classList.add('slide', 'active');
		slide.id = slideCounter + 's';
		slide.innerHTML = `<div class='content'>${slideCounter}</div>`;
	editor.appendChild(slide);

	// setting height for some elements
	previewPanel.style.height = initialHeight;
});