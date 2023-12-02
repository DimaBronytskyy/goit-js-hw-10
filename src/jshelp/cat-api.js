import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY ='live_B2dnbVetIbfqrOmkwbIofxL3FcS5ZV6lkYI8KzbOQGJOeY6aDAik0EF6NHEOzNUF';

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
export { fetchCatsBreed, fetchCatBreed };
