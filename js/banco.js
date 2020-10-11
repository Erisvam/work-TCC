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


//gerador de IDs 
// let date = new Date();
// var time = date.getTime();

//cadastrar nome e senha do roteador
// function registerUser() {
//     time += 1;

//     let routerName = $("#search").val();
//     let routerPasswd = $("#passwd").val();

//     if (routerName && routerPasswd) {
//         var user = {
//             id: time.toString(),
//             description: routerName,
//             password: routerPasswd
//         }
//         let banco = firebase.database().ref('router/');
//         banco.set(user);
//     } else {
//         // put on message of error
//     }
// }


var response;
readDataBase()

function read() {
    const banco = firebase.database().ref();

    banco.on("value", (snapshot) => {
        response = snapshot.val();

        // let getUsuario = response.usuario;
        // let getDispositivos = response.dispositivos

        // let titleCard = $("#titleCard");
        // let timer = $("#timer");
        // for (const iterator of getDispositivos) {
        //     $(titleCard).html(iterator.nomeDispositivo);
        //     $(timer).html(`Temporizador: <strong>${iterator.temporizador} minuto</strong>`);
        // }

        // console.log(Object.values(response.LDR)[Object.values(response.LDR).length - 1]);

        // for (let index = 0; index < Object.values(response.LDR).length; index++) {
        //     console.log(Object.values(response.LDR)[index]);
        // }

    });
}

function writeValue(id) {
    let banco = firebase.database().ref("led");
    banco.set(Boolean(id));
}

// function deletar(id) {
//     let banco = firebase.database().ref('node/info/' + id);
//     banco.remove();
//     $("#deleteInput").val("");
// }


$(".toast-body button").click(function() {
    writeValue($(this).val())
    $(this).blur();
    if ($(this).val() == "true") {
        $(".btn-outline-primary").css({
            "background-color": "#4eae3d",
            "color": "#fff"
        });
        $(".btn-outline-dark").css({
            "background-color": "transparent",
            "color": "#e15757",
            "border-color": "#e15757"
        });
    } else {
        $(".btn-outline-dark").css({
            "background-color": "#e15757",
            "color": "#fff"
        });
        $(".btn-outline-primary").css({
            "background-color": "transparent",
            "color": "#4eae3d",
            "border-color": "#4eae3d"
        });
    }
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
const userDate = {};

// REGISTER USER
const registerUser = function() {
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
        let banco = firebase.database().ref('/usuario');
        banco.set(user);
        clearModalAndClose(".close");
        setTimeout(function() {
            showMessageSuccess();
        }, 600);
    }
}

function readDataBase() {
    const bank = firebase.database().ref();

    bank.on("value", (snapshot) => {
        response = snapshot.val();
        readUser(response);
    });
}


const readUser = response => {
    userDate.nameWifi = response.usuario.nomeWifi;
    userDate.passwordAccess = response.usuario.senhaDeAcesso;
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
    }, 2000);

    $(".messageSuccess").show();
    animation("bottom");
}

function animation(side) {
    $(".messageSuccess__alertSuccess").css({
        "animation-name": `slide-${side}`,
        "animation-duration": "2s"
    });

    if (side === "top") {
        setTimeout(function() {
            $(".messageSuccess").hide();
        }, 2000);
    }
}