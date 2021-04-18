import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});

export default 'fetch';
import aboutCountry from '../templates/about-country.hbs';
import countryList from '../templates/country-list.hbs';

const debounce = require('lodash.debounce');

const aboutCountryBoxRef = document.querySelector('.about-country-box');
const countryListBoxRef = document.querySelector('.country-list-box');
const countryInput = document.querySelector('.country-input');

countryInput.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  const inputValue = event.target.value;
  fetchCountry(inputValue)
    .then(renderCountrys)
    .catch(error => console.log(error));
}

function fetchCountry(CountryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${CountryName}`).then(
    response => {
      return response.json();
    },
  );
}

function renderCountrys(country) {
  if (country.length === 1) {
    countryMarkupFunc(country);
    listMarkupFunc('');
  } else if (country.length >= 2 && country.length <= 10) {
    listMarkupFunc(country);
    countryMarkupFunc('');
  } else if (country.length > 10) {
    alertFunc('Too many matches found. Please enter a more specific query!');
    listMarkupFunc('');
  }
}

function countryMarkupFunc(country) {
  const countryMarkup = aboutCountry(country);
  aboutCountryBoxRef.innerHTML = countryMarkup;
}
function listMarkupFunc(country) {
  const listMarkup = countryList(country);
  countryListBoxRef.innerHTML = listMarkup;
}
function alertFunc(message) {
  alert({
    text: message,
  });
}
