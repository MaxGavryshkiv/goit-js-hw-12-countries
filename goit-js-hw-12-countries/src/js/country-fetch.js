import { info, alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
// defaultModules.set(PNotifyMobile, {});
import fetchCountries from './fetchCountries';
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
  if (inputValue.trim() === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(renderCountrys)
    .catch(error => console.log(error));
}

function renderCountrys(country) {
  if (country.length === 1) {
    countryMarkupFunc(country);
    listMarkupFunc('');
  } else if (country.length >= 2 && country.length <= 10) {
    listMarkupFunc(country);
    countryMarkupFunc('');
    messagePnotify(
      'Too many matches found. Please enter a more specific query!',
    );
  } else if (country.length > 10) {
    messagePnotify(
      'Too many matches found. Please enter a more specific query!',
    );
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

function messagePnotify(message) {
  new alert({
    title: 'Search problem',
    text: message,
  });
}
