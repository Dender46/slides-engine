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

function setPageNumber(num) {
	document.querySelector('.slide.active footer').textContent = num; 
}

function deleteSlide() {
	let index = parseInt(document.querySelector('.slide.active').dataset.index);
	if (index != 0)
		selectSlide(index-1);
	else if (index != slideCounter)
		selectSlide(index+1);
	previews[index].remove();
	slides[index].remove();
	slideCounter--;
	for (let i = index; i < previews.length; i++) {
		previews[i].dataset.index -= 1;
		slides[i]  .dataset.index -= 1;
	}
}

document.addEventListener('keydown', e => {
	if (e.keyCode == 46) // del key
		deleteSlide();
});

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
				<footer></footer>
			</div>`;
	editor.appendChild(slide);
	setPageNumber(slideCurrIndex+1);
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