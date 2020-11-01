var menu;
var currentScreen;

$(document).ready(function() {
    ($(window).width() < 480) ? $(".mainContainer__aside").hide(): $(".mainContainer__aside").show();
    popOver();
});

$(".header__openMenu").click(function() {
    changeParent();

    $(".mainContainer__aside").show();
    ($(window).height() < 600) ? animation("bottom"): animation("right");
});

$(".aside__closeMenu").click(function() {
    ($(window).height() < 600) ? animation("top"): animation("left");

});


function changeParent() {
    menu = document.querySelector(".mainContainer__aside");
    currentScreen = document.querySelector(".currentScreen");
    currentScreen.appendChild(menu);
}

function selectedSector(sector) {
    setCurrentScreen(`mainContainer__main${sector}`);
    if ($(window).width() < 1000) {
        changeParent();
        animation("left")
    };
    if ($(window).height() < 600 || ($(window).height() < 400)) animation("top");
}

function setCurrentScreen(elementClass) {
    let listClass = ["mainContainer__mainMonitory", "mainContainer__mainStatistic"];

    listClass.forEach(element => {
        if (elementClass == element) {
            $(`.${elementClass}`).addClass("currentScreen");
            $(`.${elementClass}`).removeAttr("hidden");
        } else {
            $(`.${element}`).attr("hidden", "true");
            $(`.${element}`).removeClass("currentScreen");
        }
    });
}


function animation(side) {
    $(".mainContainer__aside").css({
        "animation-name": `slide-${side}`,
        "animation-duration": "2s"
    });

    if (side == "left" || side == "bottom") {
        setTimeout(function() {
            $(".mainContainer__aside").hide();
        }, 2000);
    }
}

function hideComponente(component) {
    $(component).hide();
}

function showComponente(component, property) {
    $(component).css("display", property);
}

function popOver() {
    $('[data-toggle="popover"]').popover();
}

function showComponentEdit(somethingHide, somethingShow, property) {
    $(somethingHide).hide();
    $(somethingShow).css("display", property);
}

function hideComponenteEdit(somethingShow, somethingHide, property, inputError) {
    $(somethingShow).css("display", property);
    $(somethingHide).hide();
    inputError.removeClass(FIELD_INVALID);
}

const FALSE = 0;
const DESLIGADO = false;
const LIGADO = true;
let propertyFlex = "flex";
let propertyInitial = "initial";

let buttonOnAndOFF = ".toast-body button";

let editTitle = $("#editTitle");
let titleDefault = $(".titleDefault");
let cardTitle__editTitle = $(".cardTitle__editTitle");
let backTitle = $("#editTitle__buttons__backTitle");
let saveTitle = $("#editTitle__buttons__saveTitle");


let editTime = $("#editTime");
let timeDefault = $(".timeDefault");
let setTimeOut__editSetTimeOut = $(".setTimeOut__editSetTimeOut");
let backTime = $("#editTitle__buttons__backTime");
let saveTime = $("#editTitle__buttons__saveTime");


let editAmperagem = $("#editAmperagem");
let amperagemDefault = $(".amperagemDefault");
let cardAmperagem__editAmperagem = $(".cardAmperagem__editAmperagem");
let backAmperagem = $("#editTitle__buttons__backAmperagem");
let saveAmperagem = $("#editTitle__buttons__saveAmperagem");

$(editTitle).click(function() {
    showComponentEdit(titleDefault, cardTitle__editTitle, propertyFlex);
});

$(backTitle).click(function() {
    hideComponenteEdit(titleDefault, cardTitle__editTitle, propertyFlex, inputTitleError);
});

$(saveTitle).click(function() {
    const NOME_PATH = "/dispositivos/XPTO/nome";
    let inputTitle = $("#inputTitle").val();
    let inputTitleError = $("#inputTitleError");

    if (isNotEmpty(inputTitle, inputTitleError)) {
        const updateNome = inputTitle;
        accessBank(NOME_PATH, updateNome);
        $("#inputTitle").val("");
        hideComponenteEdit(titleDefault, cardTitle__editTitle, propertyFlex, inputTitleError);
    }
});

$(editTime).click(function() {
    showComponentEdit(timeDefault, setTimeOut__editSetTimeOut, propertyFlex);
});

$(backTime).click(function() {
    hideComponenteEdit(timeDefault, setTimeOut__editSetTimeOut, propertyInitial, inputTimeError);
});

$(saveTime).click(function() {
    const NOME_PATH = "/dispositivos/XPTO/temporizador";
    let inputTime = $("#inputTime").val();
    let inputTimeError = $("#inputTimeError");

    if (isNotEmpty(inputTime, inputTimeError)) {
        const updateTimer = inputTime;
        accessBank(NOME_PATH, updateTimer);
        $("#inputTime").val("");
        hideComponenteEdit(timeDefault, setTimeOut__editSetTimeOut, propertyInitial, inputTimeError);
    }
});


$(editAmperagem).click(function() {
    showComponentEdit(amperagemDefault, cardAmperagem__editAmperagem, propertyFlex);
});

$(backAmperagem).click(function() {
    hideComponenteEdit(amperagemDefault, cardAmperagem__editAmperagem, propertyInitial, inputAmperagemError);
});

$(saveAmperagem).click(function() {
    const NOME_PATH = "/dispositivos/XPTO/amperagem"
    let inputAmperagem = $("#inputAmperagem").val();
    let inputAmperagemError = $("#inputAmperagemError");

    if (isNotEmpty(inputAmperagem, inputAmperagemError)) {
        const updateAmperage = inputAmperagem;
        accessBank(NOME_PATH, updateAmperage);
        $("#inputAmperagem").val("");
        hideComponenteEdit(amperagemDefault, cardAmperagem__editAmperagem, propertyInitial, inputAmperagemError);
    }
});

$(buttonOnAndOFF).click(function() {
    const NOME_PATH = "/dispositivos/XPTO/onOff";
    let valueClickButton = ($(this).val() == FALSE) ? DESLIGADO : LIGADO;
    accessBank(NOME_PATH, valueClickButton);
    setTimeout(() => readDataBase(), 100);
});