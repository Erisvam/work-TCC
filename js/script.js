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

function hideComponenteEdit(somethingShow, somethingHide, property) {
    $(somethingShow).css("display", property);
    $(somethingHide).hide();
}

let propertyFlex = "flex";
let propertyInitial = "initial";


let editTitle = $("#editTitle");
let titleDefault = $(".titleDefault");
let cardTitle__editTitle = $(".cardTitle__editTitle");
let backTitle = $("#editTitle__buttons__backTitle");
let saveTitle = $("#editTitle__buttons__saveTitle");

$(editTitle).click(function() {
    showComponentEdit(titleDefault, cardTitle__editTitle, propertyFlex);
});

$(backTitle).click(function() {
    hideComponenteEdit(titleDefault, cardTitle__editTitle, propertyFlex);
});

$(saveTitle).click(function() {
    console.log("Save title");
});

let editTime = $("#editTime");
let timeDefault = $(".timeDefault");
let setTimeOut__editSetTimeOut = $(".setTimeOut__editSetTimeOut");
let backTime = $("#editTitle__buttons__backTime");
let saveTime = $("#editTitle__buttons__saveTime");

$(editTime).click(function() {
    showComponentEdit(timeDefault, setTimeOut__editSetTimeOut, propertyFlex);
});

$(backTime).click(function() {
    hideComponenteEdit(timeDefault, setTimeOut__editSetTimeOut, propertyInitial);
});

$(saveTime).click(function() {
    console.log("Save Time");
});