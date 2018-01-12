const newSlideBtn  = document.querySelector('#new-slide');
const previewPanel = document.querySelector('.preview-panel .container');
const editor 	   = document.querySelector('.editor');
const slides   	   = editor.children;
const previews 	   = previewPanel.children;
let slideCounter   = 0;
let slideCurrIndex = 0;

// setting height for some items
let initialHeight = previewPanel.offsetHeight-2 + 'px';
previewPanel.style.height = initialHeight;

previews[0].addEventListener('click', function() {
	return selectSlide(0)
});

function selectSlide(next) {
	previews[slideCurrIndex].classList.toggle('active');
	slides[slideCurrIndex]  .classList.toggle('active');
	previews[next].classList.toggle('active');
	slides[next]  .classList.toggle('active');
	slideCurrIndex = next;
}

function FullScreen() {
	let width  = document.querySelector('.slide.active').offsetWidth;
	editor.style.transform = 'scale(1.43)';
	editor.style.width  = width + 'px';
	screenfull.request(editor);
}

screenfull.on('change', () => {
	if (!screenfull.isFullscreen) {
		editor.style.width  = '100%';
		editor.style.transform = 'scale(1)';
	}
})

document.querySelector('#fullscr').addEventListener('click', FullScreen);

newSlideBtn.addEventListener("click", function() {
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
			</div>`;
	editor.appendChild(slide);
});

document.addEventListener('keydown', function(e) {
	if (e.keyCode == 38) {
		if (slideCurrIndex == 0)
			return;	
		selectSlide(slideCurrIndex-1);
	}
	if (e.keyCode == 40) {
		if (slideCurrIndex == previews.length-1)
			return;
		selectSlide(slideCurrIndex+1);
	}
});

feather.replace();