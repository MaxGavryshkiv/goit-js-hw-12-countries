export default fetchCountries;
const BASE_URL = 'https://restcountries.eu/rest/v2';

async function fetchCountries(searchQuery) {
  const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
  const answer = await response.json();
  return answer;
}
