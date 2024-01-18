let select = $(".select");
let optionsContainer = select.find(".options-container");
let choosedOption = select.find(".choosed-option");

let showOptions = false;
let optionsValue = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function Main() {
    CreateOptions();
}

function ToggleOptions() {
    showOptions = !showOptions;
    DisplayOptionsContainer(showOptions);
}

function ChooseOption(value) {
    choosedOption.text(value);
    
    $.getScript( "main.js", function() {
        Main();
        ApplySelectFilter(value);
    });

    showOptions = false;
    DisplayOptionsContainer(showOptions);
}

function CreateOptions() {
    for (let i = 0; i < optionsValue.length; i++) {
        optionsContainer.append(
            '<div class="option" onclick="ChooseOption(\'' + optionsValue[i] + '\')">' + optionsValue[i] + '</div>'
        )
    }
}

function DisplayOptionsContainer(value) {
    let display = value ? 'block' : 'none';
    optionsContainer.css("display", display);
}