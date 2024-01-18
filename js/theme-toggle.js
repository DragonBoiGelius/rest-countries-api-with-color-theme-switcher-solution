let body = $(document.body);
let moon = $('#moon');
let theme = 'theme-light';

function Main() {
    if (sessionStorage.getItem('theme')) {
        theme = sessionStorage.getItem('theme');
    }

    body.attr('data-theme', theme);

    moon.addClass(theme == 'theme-light' ? 'fa-regular' : 'fa-solid');
}

function UpdateTheme() {
    isThemeLight = theme == 'theme-light';
    theme = isThemeLight ? 'theme-dark' : 'theme-light';
    moon.removeClass(!isThemeLight ? 'fa-solid' : 'fa-regular');
    moon.addClass(!isThemeLight ? 'fa-regular' : 'fa-solid');

    body.attr('data-theme', theme);

    sessionStorage.setItem('theme', theme);
}