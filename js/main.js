const restCountriesApi = 'https://restcountries.com/v2/all';

let searchByName = "";
let filterByRegion = "";
let countries = [];

async function Main() {
    let data = await GetData();
    countries = ParceCountryFields(data);

    CreateCards();
}

async function GetData() {
    return fetch(restCountriesApi)
        .then(function (response) {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.statusText));
            }
            return Promise.resolve(response);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data;
        })
        .catch(function (error) {
            console.log('error', error)
            return ReadDataFromJson();
        })
}

function ReadDataFromJson() {
    return fetch("./data.json") 
        .then((response) => { 
        return response.json(); 
    }) 
}

function ParceCountryFields(data) {
    let counties = [];

    data.forEach(item => {
        let country = {
            name: item.name,
            capital: item.capital,
            region: item.region,
            population: item.population.toLocaleString('en-US'),
            flag: item.flag,
        }

        counties.push(country);
    });

    return counties;
}

function ApplySearchFilter() {
    searchByName = $('[name="search"]').val();

    ApplyFilters();
}

function ApplySelectFilter(value) {
    filterByRegion = value;

    ApplyFilters();
}

function ApplyFilters() {
    $('.grid-container').empty();

    CreateCards();
}

function CreateCard(country) {
    let card = 
    '<div class="card shadow-200">' + 
        '<a href="detail.html?name=' + country.name + '" target="_top">' +
            '<img class="card-img" src="' + country.flag + '" alt="card img">' + 
        '</a>' +
        '<div class="card-body">' +
            '<h1>' + country.name + '</h1>' +
            '<p>Populaion: <span>' + country.population + '</span></p>' +
            '<p>Region: <span>' + country.region + '</span></p>' +
            '<p>Capital: <span>' + country.capital + '</span></p>' +
        '</div>' +
    '</div>';

    $('.grid-container').append(card);
}

function CreateCards() {
    countries
        .filter(country => country.name.startsWith(searchByName) && country.region.startsWith(filterByRegion))
        .forEach(country => CreateCard(country));
}