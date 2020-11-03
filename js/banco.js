var firebaseConfig = {
    apiKey: "AIzaSyAVLD618EUY3O7ssLEDc-n3ATwpTH8jA_c",
    authDomain: "smartplug-7d741.firebaseapp.com",
    databaseURL: "https://smartplug-7d741.firebaseio.com/",
    projectId: "smartplug-7d741",
    storageBucket: "smartplug-7d741.appspot.com",
    messagingSenderId: "860137688202",
    appId: "1:860137688202:web:b357746511a35d8a593173",
    measurementId: "G-2JZW9BNKR2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var response;
readDataBase();
$(document).ready(function() {
    $("#de").attr("max", currentDate().substr(0, 7));
    $("#ate").attr("max", currentDate().substr(0, 7));
});

var valueNameRoteador;
var valuePasswordRoteador;
var valuePasswordAccess;

const FIELD_OK = true;
const FIELD_ERROR = false;
const FIELD_INVALID = "fildInvalid";
const FIELD_VALID = "fildValid";
const STRING_EMPTY = "";
const ATTR_HREF = "href";
const PAGINA_INDEX = "index.html"
const PLACEHOLDER = "placeHolder";
const DIGIT_OF_THE_MONTH_OR_DAY = "0";
const DASH_OF_THE_DATE = "-";
const ON_WITH_COLOR = "buttonON";
const ON_TRANSPARENT = "buttonONTransparent";
const OFF_WITH_COLOR = "buttonOFF";
const OFF_TRANSPARENT = "buttonOFFTransparent";
const userDate = {};

// REGISTER USER
const registerUser = function() {
    const USER_PATH = "/usuario";
    const registerValid = validateUserRegistration().every(element => element);

    if (registerValid) {
        var user = {
            id: 2,
            nomeWifi: valueNameRoteador,
            senhaWifi: valuePasswordRoteador,
            senhaDeAcesso: valuePasswordAccess
        }
        accessBank(USER_PATH, user);
        clearModalAndClose(".close");
        setTimeout(function() {
            showMessageSuccess();
        }, 600);
    }
}
const accessBank = (path, object) => {
    let banco = firebase.database().ref(path);
    banco.set(object);
}

function readDataBase() {
    const bank = firebase.database().ref();

    bank.on("value", (snapshot) => {
        response = snapshot.val();
        readUser(response.usuario);
        readDevice(response.dispositivos.XPTO);
        readConsumption(response.dispositivos.XPTO.consumo, response.consumo);
    });
}

const readUser = response => {
    userDate.nameWifi = response.nomeWifi;
    userDate.passwordAccess = response.senhaDeAcesso;
}
var arrAmount;
var currentWatts;
const readDevice = response => {
    let nome = response.nome;
    let statusOnOff = response.onOff;
    let temporizador = response.temporizador;
    let amperagem = response.amperagem;
    arrAmount = readAmount(response, "", "");
    mainGraph(context, $("#selectTypeGraph").val(), arrAmount);
    showInformations(nome, temporizador, amperagem);
    currentWatts = readStatusDevice(statusOnOff);
}
const readStatusDevice = status => {
    let buttonON = $(".btn-outline-primary");
    let buttonOFF = $(".btn-outline-dark");

    if (status) {
        buttonON.addClass(ON_WITH_COLOR);
        buttonON.removeClass(ON_TRANSPARENT);

        buttonOFF.removeClass(OFF_WITH_COLOR);
        buttonOFF.addClass(OFF_TRANSPARENT);
        return true;
    } else {
        buttonOFF.addClass(OFF_WITH_COLOR);
        buttonOFF.removeClass(OFF_TRANSPARENT);

        buttonON.removeClass(ON_WITH_COLOR);
        buttonON.addClass(ON_TRANSPARENT);
        return false;
    }
}
const showInformations = (nome, temporizador, amperagem) => {
    showTitle(nome);
    showTimer(temporizador);
    showAmperage(amperagem);
    $("#timer").html(`Tempo de atualização: ${temporizador * 60} minuto`);
    $("#amperagemCard").html(`Amperagem: ${amperagem} A`);
}

const showTitle = nome => {
    let titleCard = "#titleCard";
    let messageTitle = `${nome}`;
    let valuePlaceHolder = "#inputTitle";
    let messageTitlePlaceHolder = `Ex: ${nome}`;

    $(titleCard).html(messageTitle);
    $(valuePlaceHolder).attr(PLACEHOLDER, messageTitlePlaceHolder);
}

const showTimer = temporizador => {
    let timerTitle = "#timer";
    let messageTimer = `Temporizador: ${temporizador} minuto`;
    let messageTimerPlaceHolder = `Ex: ${temporizador * 60} minuto`;
    let valuePlaceHolder = "#inputTime";

    $(timerTitle).html(messageTimer);
    $(valuePlaceHolder).attr(PLACEHOLDER, messageTimerPlaceHolder);
}

const showAmperage = amperagem => {
    let amperagemTitle = "#amperagemCard";
    let messageAmperagem = `Amperagem: ${amperagem} A`;
    let valuePlaceHolder = "#inputAmperagem";
    let messageAmperagemPlaceHolder = `Ex: ${amperagem} A`;

    $(amperagemTitle).html(messageAmperagem);
    $(valuePlaceHolder).attr(PLACEHOLDER, messageAmperagemPlaceHolder);
}
const readConsumption = (deviceXpto, consumoDevice) => {
    let currentData = deviceXpto[currentDate()].atual;

    if (currentData !== undefined || currentData !== null) {
        let percent = (consumoDevice["microondas"].standby * 0.15) / 100;
        let quizePorcentoMais = consumoDevice["microondas"].standby + percent;
        let quizePorcentoMenos = consumoDevice["microondas"].standby - percent;

        if (currentData > quizePorcentoMenos && currentData < quizePorcentoMais) {
            setTimeout(function() {
                readStatusDevice(false);
            }, 120000);
        }
    }
    if (!currentWatts) {
        let messageCurrentData = `0 W`;
        $(".currentData").html(messageCurrentData);
    } else {
        let messageCurrentData = `${currentData} W`;
        $(".currentData").html(messageCurrentData);
    }
}

const logIn = function() {
    let userLogin = $("#userLogin").val();
    let messageErrorUserLogin = $("#userLoginError");

    let passwordAccess = $("#passwordAccess").val();
    let messageErrorPasswordAccess = $("#passwordAccessError");

    let checkingFields = [isNotEmpty(userLogin, messageErrorUserLogin), isNotEmpty(passwordAccess, messageErrorPasswordAccess)]

    let nameWifiRight = fildRightOrError((userDate.nameWifi === userLogin), messageErrorUserLogin);
    let passwordAccessRight = fildRightOrError((userDate.passwordAccess === passwordAccess), messageErrorPasswordAccess);

    const valid = checkingFields.every(() => {
        if (nameWifiRight && passwordAccessRight) {
            return FIELD_OK;
        }
    });

    if (valid) {
        $("#btn-entrar").attr(ATTR_HREF, PAGINA_INDEX);
    }
}

const isNotEmpty = (fieldValue, fieldError) => {
    if (fieldValue !== STRING_EMPTY) {
        $(fieldError).removeClass(FIELD_INVALID);
        $(fieldError).addClass(FIELD_VALID);
        return FIELD_OK;
    } else {
        $(fieldError).addClass(FIELD_INVALID);
        return FIELD_ERROR;
    }
}
const clearModalAndClose = (classNameModal) => {
    clearField("#nameWifi");
    clearField("#passwordWifi");
    clearField("#passwordAcess");

    setTimeout(() => $(classNameModal).click(), 200);
}

const validateUserRegistration = () => {
    valueNameRoteador = $("#nameWifi").val();
    let messageErrorNameRoteador = $("#nameWifiError");

    valuePasswordRoteador = $("#passwordWifi").val();
    let messageErrorPasswordRoteador = $("#passwordWifiError");

    valuePasswordAccess = $("#passwordAcess").val();
    let messageErrorPasswordAccess = $("#passwordAcessError");

    let checkingFields = [
        isNotEmpty(valueNameRoteador, messageErrorNameRoteador),
        isNotEmpty(valuePasswordRoteador, messageErrorPasswordRoteador),
        isNotEmpty(valuePasswordAccess, messageErrorPasswordAccess)
    ]
    return checkingFields;
}

const clearField = field => $(field).val(STRING_EMPTY);

const fildRightOrError = (condicional, messageError) => {
    if (condicional) {
        $(messageError).removeClass(FIELD_INVALID);
        $(messageError).addClass(FIELD_VALID);
        return FIELD_OK;
    } else {
        $(messageError).addClass(FIELD_INVALID);
        return FIELD_ERROR;
    }
}

const showMessageSuccess = () => {
    setTimeout(() => {
        animation("top");
    }, 1500);

    $(".messageSuccess__alertSuccess").css("opacity", "1");
    animation("bottom");
}

function animation(side) {
    $(".messageSuccess__alertSuccess").css({
        "animation-name": `slide-${side}`,
        "animation-duration": "1.5s"
    });

    if (side === "top") {
        setTimeout(function() {
            $(".messageSuccess__alertSuccess").css("opacity", "0");
        }, 1500);
    }
}

const currentDate = () => {
    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    let fullDate;

    (currentDay < 9) ? fullDate = `${currentYear}-${currentMonth}-0${currentDay}`: fullDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return fullDate;
}
const readAmount = (consumption, de, ate) => {
    let somaDe = 0;
    let somaAte = 0;
    let somaIntervalo = 0;
    let somaContador = 0;
    let somaContadorIntervalo = 0;
    let somaContadorAte = 0;

    let deNoParam;
    let ateNoParam;
    let obj = {};
    let objContador = {}
    let arr = [];

    (de === "") ? deNoParam = currentDate().substr(5, 2): deNoParam = de;
    (ate === "") ? ateNoParam = currentDate().substr(5, 2): ateNoParam = ate;

    for (const iteratorPai in consumption.consumo) {

        if (iteratorPai.substr(5, 2) == deNoParam) {
            somaDe += consumption.consumo[iteratorPai].montante;
            somaContador += consumption.consumo[iteratorPai].contador;

            obj[iteratorPai.substr(5, 2)] = somaDe;
            objContador[iteratorPai.substr(5, 2)] = somaContador;
        }

        if (iteratorPai.substr(5, 2) !== deNoParam && iteratorPai.substr(5, 2) !== ateNoParam) {
            if (iteratorPai.substr(5, 2) >= deNoParam && iteratorPai.substr(5, 2) <= ateNoParam) {
                somaIntervalo += consumption.consumo[iteratorPai].montante;
                somaContadorIntervalo += consumption.consumo[iteratorPai].contador;

                obj[iteratorPai.substr(5, 2)] = somaIntervalo;
                objContador[iteratorPai.substr(5, 2)] = somaContadorIntervalo;
            } else {
                obj[iteratorPai.substr(5, 2)] = 0;
                objContador[iteratorPai.substr(5, 2)] = 0;
            }
        }

        if (iteratorPai.substr(5, 2) == ateNoParam) {
            somaAte += consumption.consumo[iteratorPai].montante;
            somaContadorAte += consumption.consumo[iteratorPai].contador;

            obj[iteratorPai.substr(5, 2)] = somaAte;
            objContador[iteratorPai.substr(5, 2)] = somaContadorAte;
        }
    }

    for (let i = 1; i <= Object.values(obj).length; i++) {
        (i <= 9) ? i = "0" + String(i): i = String(i);
        if (objContador[i] !== 0 && objContador[i] !== undefined) {
            let consumoWattsKilooHora = ((obj[i] / objContador[i]) * (0.5 * objContador[i]) / 1000);
            arr.push(consumoWattsKilooHora.toFixed(2));
        } else {
            arr.push(0);
        }

    }
    return arr;
}

const getMonths = function() {
    let de = $("#de").val().substr(5, 2);
    let ate = $("#ate").val().substr(5, 2);
    if (!(parseInt(de) > parseInt(ate))) {
        var contextNew = document.getElementsByClassName('myChart');
        graph.destroy();
        arrAmount = readAmount(response.dispositivos.XPTO, de, ate)
        mainGraph(contextNew, $("#selectTypeGraph").val(), arrAmount);
    } else {
        alert("Data mínima não pode ser maior do que a data máxima!")
    }
}