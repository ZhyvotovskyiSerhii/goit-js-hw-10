import Notiflix from "notiflix";
import { fetchCountries } from "./js/fetchCountries";
import "lodash.debounce";
import _ from "lodash";
import './css/styles.css';


 
const refs = {
  DEBOUNCE_DELAY: 300,
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  country: document.querySelector('.country-info'),
};


let name;
const handleSubmit = event => {
  name = refs.input.value.trim();
  clearInput();
  fetchCountries(name)
    .then(country => {
      searchMarkup(country);
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};


refs.input.addEventListener('input', _.debounce(handleSubmit, refs.DEBOUNCE_DELAY));

function searchMarkup(country) {
    if (country.length > 1 && country.length < 11) {
        const markup = country
      .map(country => {
        return `<li class="country-item" id="${country.name}" >
        <img class="country-flag" src="${country.flag}" alt="${country.name}" style = "width: 40px"> ${country.name}
        </li>`;
      })
      .join('');
        refs.countryList.innerHTML = markup;
        return markup;
      }
  if (country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
   else if (country.length === 1) {
    const markupItem = country
      .map(country => {
        return `<li class="country-item" id="${country.name}" style = "list-style: none">
        <img class="country-flag" src="${country.flag}" alt="${
          country.name
        }" style = "width: 200px">
          <div class="country-name">
            <p class="country-descr">
              <span class="country-titles">Capital: </span>
              <span >${country.capital}</span>
            </p>
            <p class="country-descr">
              <span class="country-titles">Population: </span>
              <span>${country.population}</span>
            </p>
            <p class="country-descr">
              <span class="country-titles">Language: </span>
              ${
                country.languages.length > 1
                  ? `<ul class ="language_list"> 
                ${country.languages
                  .map(language => {
                    return `<li class = "language_item">${language.name}</li>`;
                  })
                  .join('')}
                </ul>`
                  : `${country.languages[0].name}`
              }
            </p>
          </div>
        </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markupItem;
  }
}

function clearInput() {
  if (refs.countryList.children.length) {
    refs.countryList.innerHTML = '';
  }
}
