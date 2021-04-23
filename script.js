const piano = document.querySelector('.piano');
const pianoKey = document.querySelectorAll('.pianoKey');

function playSound(e) {
  console.log(e);
  let note;
  let pianoButton;
  if (e.type === 'click' || e.type === ('mousedown' && 'mouseover')) {
    pianoButton = e.target;
    note = e.target.dataset['key'];
  } else {
    const letter = String.fromCharCode(e.keyCode).toUpperCase();
    pianoButton = document.querySelector(`.pianoKey[data-letter="${letter}"]`);
    note = pianoButton.dataset['key'];
  }

  const audio = document.querySelector(`audio[data-key="${note}"]`);


  if (!audio) return;
  
  pianoButton.classList.add('piano-key-active');

  audio.currentTime = 0;
  audio.play();
};

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('piano-key-active');
};

pianoKey.forEach(pKey => pKey.addEventListener('transitionend', removeTransition))


window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', () => {
  pianoKey.forEach(e => {
    e.addEventListener('mouseover', playSound);
  });
});
window.addEventListener('mouseup', () => {
  pianoKey.forEach(e => {
    e.removeEventListener('mouseover', playSound);
  });
});
pianoKey.forEach(e => {
  console.log(e);
  e.addEventListener('click', playSound);
  /* e.addEventListener('mousedown' && 'mouseover', playSound); */
});

document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', (e) => {
  let pressedBtn = e.target;
  if (pressedBtn.classList.contains('btn-notes')) {
    pressedBtn.classList.add('btn-active');
    pianoKey.forEach(note => note.classList.remove('letter'));
    document.querySelector('.btn-letters').classList.remove('btn-active');
  } else if (pressedBtn.classList.contains('btn-letters')) {
    pressedBtn.classList.add('btn-active');
    pianoKey.forEach(note => note.classList.add('letter'));
    document.querySelector('.btn-notes').classList.remove('btn-active');
  };
}));


document.querySelector('.fullscreen').addEventListener('click', (event) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
});
