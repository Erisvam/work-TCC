const firebaseConfig = {
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
//     apiKey: "AIzaSyCLvPHVICq6C8kpYS-Zsw1Dfb-pDSWyCSc",
//     authDomain: "teste-tcc-bb2d9.firebaseapp.com",
//     databaseURL: "https://teste-tcc-bb2d9.firebaseio.com",
//     projectId: "teste-tcc-bb2d9",
//     storageBucket: "teste-tcc-bb2d9.appspot.com",
//     messagingSenderId: "71678916346",
//     appId: "1:71678916346:web:05f00df680e5e5d5cbfb43",
//     measurementId: "G-RBLNWGD3CB"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


//gerador de IDs 
let date = new Date();
var time = date.getTime();

//cadastrar nome e senha do roteador
function registerUser() {
    time += 1;

    let routerName = $("#search").val();
    let routerPasswd = $("#passwd").val();

    if (routerName && routerPasswd) {
        var user = {
            id: time.toString(),
            description: routerName,
            password: routerPasswd
        }
        let banco = firebase.database().ref('router/');
        banco.set(user);
    } else {
        // put on message of error
    }
}

var response;

function read() {
    const banco = firebase.database().ref();

    banco.on("value", (snapshot) => {
        response = snapshot.val();

        console.log(Object.values(response.LDR)[Object.values(response.LDR).length - 1]);

        for (let index = 0; index < Object.values(response.LDR).length; index++) {
            console.log(Object.values(response.LDR)[index]);
        }

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