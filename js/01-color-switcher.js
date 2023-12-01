const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let colorInterval;
refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', startColorChange);
refs.btnStop.addEventListener('click', stopColorChange);

function startColorChange() {
  toggleButtons(true, false);

  colorInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);// але так скушно
}

function stopColorChange() {
  toggleButtons(false, true);
  clearInterval(colorInterval);
}

function toggleButtons(startDisabled, stopDisabled) {
  refs.btnStart.disabled = startDisabled;
  refs.btnStop.disabled = stopDisabled;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
