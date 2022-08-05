import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries'
const debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event){
    let countryName = `${input.value}`.trim()
    if (input.value === ""){
        listCountry.innerHTML = ""
        countryInfo.innerHTML = ""
    } else {
    fetchCountries(countryName).then(data => {
        if (data.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            listCountry.innerHTML = ""
            return
        }
        if (data.length > 1) {
            generateList(data)
            countryInfo.innerHTML = ""
        }
        else {
            listCountry.innerHTML = ""
            generateInfo(...data)
        }
    })}
  
}

function createList(array){
    return `<li><img class="list-flag" src="${array.flags.svg}" alt="${array.name.official}" width=30 height=30><p>${array.name.official}</p></li>`
};

function generateList (allArray){
    result = allArray.reduce((acc, array) => acc + createList(array), "");
    return listCountry.innerHTML = result;
}

function generateInfo (array){
    return countryInfo.innerHTML = `
    <h1 class="country-tittle"><img class="list-flag" src="${array.flags.svg}" alt="${array.name.official}" width=50 height=50>${array.name.official}</h1>
    <ul>
    <li class="info-item">Capital:<span class="info-text">${array.capital}</span></li>
    <li class="info-item">Population:<span class="info-text">${array.population}</span></li>
    <li class="info-item">Languages:<span class="info-text">${Object.values(array.languages)}</span></li>
    </ul>
    `
}