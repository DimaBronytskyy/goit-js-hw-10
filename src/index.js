import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY ='live_B2dnbVetIbfqrOmkwbIofxL3FcS5ZV6lkYI8KzbOQGJOeY6aDAik0EF6NHEOzNUF';
const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    contCatInfo: document.querySelector('.cat-info'),
  };
  refs.loader.classList.replace('loader', 'hidden');
  refs.error.classList.add('hidden');
  refs.contCatInfo.classList.add('hidden');
  refs.select.addEventListener('change', selectBreed);

  let selectArr = [];
  fetchCatsBreed()
    .then(data => {
      data.forEach(element => {
        selectArr.push({ text: element.name, value: element.id });
      });
      new SlimSelect({
        select: refs.select,
        data: selectArr,
      });
    })
    .catch(onError);

  function selectBreed(evt) {
    const selectedOptionId = evt.target.value;
    refs.loader.classList.replace('hidden', 'loader');
    refs.select.classList.add('hidden');
    refs.contCatInfo.classList.add('hidden');

    fetchCatBreed(selectedOptionId)
      .then(data => {
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
      })
      .catch(onError);
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
function fetchCatsBreed() {
  return axios
    .get(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(({ data }) => data);
}

function fetchCatBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(({ data }) => data);
}
function createMarkupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}