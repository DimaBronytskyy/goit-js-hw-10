import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchCatsBreed, fetchCatBreed } from './jshelp/cat-api';
import { createMarkupSelect } from './jshelp/murkup';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  contCatInfo: document.querySelector('.cat-info'),
};

let isInitialSelection = true;

async function init() {
  refs.loader.classList.replace('loader', 'hidden');
  refs.error.classList.add('hidden');
  refs.contCatInfo.classList.add('hidden');
  refs.select.addEventListener('change', selectBreed);

  try {
    const data = await fetchCatsBreed();
    const selectArr = data.map(element => ({
      text: element.name,
      value: element.id,
    }));

    new SlimSelect({
      select: refs.select,
      data: selectArr,
    });
    isInitialSelection = false; 
  } catch (error) {
    onError();
  }
}

async function selectBreed(evt) {
  if (!isInitialSelection) {
    const selectedOptionId = evt.target.value;

    refs.loader.classList.replace('hidden', 'loader');
    refs.select.classList.add('hidden');
    refs.contCatInfo.classList.add('hidden');

    try {
      const data = await fetchCatBreed(selectedOptionId);

      refs.loader.classList.replace('loader', 'hidden');
      refs.select.classList.remove('hidden');

      const { url, breeds } = data[0];

      refs.contCatInfo.innerHTML = `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p class="name-temp">Temperament: <span class="text-temp">${breeds[0].temperament}</span></p>
        </div>`;

      refs.contCatInfo.classList.remove('hidden');
    } catch (error) {
      onError();
    }
  }
}

function onError() {
  refs.select.classList.remove('hidden');
  refs.loader.classList.replace('loader', 'hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or do it later!',
    {
      position: 'center-center',
      timeout: 4000,
      width: '800px',
      fontSize: '50px',
    }
  );
}

document.addEventListener('DOMContentLoaded', init);
