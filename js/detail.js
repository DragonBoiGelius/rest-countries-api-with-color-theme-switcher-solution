const restCountriesApi = 'https://restcountries.com/v2/all';

let queryString = '';
let data;

async function Main() {
    queryString = (new URL(location.href)).searchParams.get('name');

    data = await GetData();
    country = ParceCountryFields(data);

    Fill(country);
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
    let countryData;

    data
        .filter(item => item.name.startsWith(queryString))
        .forEach(item => {
        
        let currencies = [];
        if (item.currencies != null)
            item.currencies.forEach(currency => {
                currencies.push(currency.name);
            });

        let languages = [];
        if (item.languages != null)
            item.languages.forEach(language => {
                languages.push(language.name);
            });
            
        let country = {
            name: item.name,
            topLevelDomain: item.topLevelDomain,
            capital: item.capital,
            subregion: item.subregion,
            region: item.region,
            population: item.population.toLocaleString('en-US'),
            borders: item.borders,
            nativeName: item.nativeName,
            currencies: currencies,
            languages: languages,
            flag: item.flag,
        }

        countryData = country;
    });

    return countryData;
}

function GetNameByCode(value) {
    let countries = data.filter(item => item.alpha3Code.startsWith(value));
    return countries[0].name;
}

function Fill(country) {
    $('#flag').attr('src', country.flag);
    $('#country-name').text(country.name);
    $('#native-name').text(country.nativeName);
    $('#population').text(country.population);
    $('#region').text(country.region);
    $('#sub-region').text(country.subregion);
    $('#capital').text(country.capital);
    $('#top-level-domain').text(country.topLevelDomain);
    $('#currencies').text(country.currencies);
    $('#languages').text(country.languages.join(', '));
    if (country.borders != null) {
        for (let i = 0; i < country.borders.length; i++) {
            $('#border-countries').append(
                '<a class="border-country shadow-100" href="detail.html?name=' + GetNameByCode(country.borders[i]) + '" target="_top">' + 
                    country.borders[i] + 
                '</a>'
                // '<span class="border-country shadow-100">' + country.borders[i] + '</span>'
            ); 
        }
    }
}