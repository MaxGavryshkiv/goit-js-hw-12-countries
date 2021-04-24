export default 'fetch';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import fetchCountries from './fetchCountries';
import aboutCountry from '../templates/about-country.hbs';
import countryList from '../templates/country-list.hbs';

// Переменные
const debounce = require('lodash.debounce');
const aboutCountryBoxRef = document.querySelector('.about-country-box');
const countryListBoxRef = document.querySelector('.country-list-box');
const countryInputRef = document.querySelector('.country-input');

countryInputRef.addEventListener('input', debounce(onInput, 500));

// Функция передает значение инпута и вызывает рендер функцию
function onInput(event) {
  const inputValue = event.target.value;
  if (inputValue.trim() === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(renderCountrys)
    .catch(error => console.log(error));
}

// Функция проверяет значение инпута и вызывает функции разметки и pnotify
function renderCountrys(country) {
  if (country.length === 1) {
    countryMarkupFunc(country);
    listMarkupFunc('');
  } else if (country.length >= 2 && country.length <= 10) {
    listMarkupFunc(country);
    countryMarkupFunc('');
    messagePnotify();
  } else if (country.length > 10) {
    messagePnotify();
    listMarkupFunc('');
  }
}
// Функция разметки карточки страны
function countryMarkupFunc(country) {
  const countryMarkup = aboutCountry(country);
  aboutCountryBoxRef.innerHTML = countryMarkup;
}
// Функция разметки списка стран
function listMarkupFunc(country) {
  const listMarkup = countryList(country);
  countryListBoxRef.innerHTML = listMarkup;
}
// Функция pnotify
function messagePnotify() {
  new alert({
    title: 'Search problem',
    text: 'Too many matches found. Please enter a more specific query!',
  });
}
