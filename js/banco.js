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

// var firebaseConfig = {
//     apiKey: "AIzaSyAhj8kpn35PrelSPJguOFZ0uosNBJ-UMoI",
//     authDomain: "neon-fce00.firebaseapp.com",
//     databaseURL: "https://neon-fce00.firebaseio.com",
//     projectId: "neon-fce00",
//     storageBucket: "neon-fce00.appspot.com",
//     messagingSenderId: "464013235447",
//     appId: "1:464013235447:web:374f2d8b7c2507aa5eaff2",
//     measurementId: "G-16BF6G5QCK"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var response;
readDataBase()

// function deletar(id) {
//     let banco = firebase.database().ref('node/info/' + id);
//     banco.remove();
//     $("#deleteInput").val("");
// }

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
    const registerValid = validateUserRegistration().every(function() {
        return FIELD_OK;
    });

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
        readDevice(response.dispositivos.XPTO)
    });
}

const readUser = response => {
    userDate.nameWifi = response.nomeWifi;
    userDate.passwordAccess = response.senhaDeAcesso;
}

const readDevice = response => {
    let nome = response.nome;
    let statusOnOff = response.onOff;
    let temporizador = response.temporizador;
    let amperagem = response.amperagem;
    let consumo = response.consumo;

    showInformations(nome, temporizador, amperagem);
    readConsumption(consumo);
    readStatusDevice(statusOnOff);

}
const readStatusDevice = status => {
    debugger;
    let buttonON = $(".btn-outline-primary");
    let buttonOFF = $(".btn-outline-dark");

    if (status) {
        buttonON.addClass(ON_WITH_COLOR);
        buttonON.removeClass(ON_TRANSPARENT);

        buttonOFF.removeClass(OFF_WITH_COLOR);
        buttonOFF.addClass(OFF_TRANSPARENT);
        return;
    } else {
        buttonOFF.addClass(OFF_WITH_COLOR);
        buttonOFF.removeClass(OFF_TRANSPARENT);

        buttonON.removeClass(ON_WITH_COLOR);
        buttonON.addClass(ON_TRANSPARENT);
        return;
    }
}
const showInformations = (nome, temporizador, amperagem) => {
    showTitle(nome);
    showTimer(temporizador);
    showAmperage(amperagem);

    $("#timer").html(`Temporizador: ${temporizador} minuto`);
    $("#amperagemCard").html(`Amperagem: ${amperagem}`);
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
    let messageTimerPlaceHolder = `Ex: ${temporizador} minuto`;
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

const readConsumption = response => {
    let currentData = response[currentDate()].atual;
    let messageCurrentData = `${currentData} W`;

    $(".currentData").html(messageCurrentData);
    // console.log(convertObjectToArry(response))
}

// const convertObjectToArry = (object) => Object.values(object);

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

    let fullDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return fullDate;
}