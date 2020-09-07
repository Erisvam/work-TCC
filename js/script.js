$(".openMenu").click(function(){
    $(".headerVertical").show();
    startAnimation();
});

$(".closeMenu").click(function(){
    endAnimation();
});


function selectedSector(sector) {
    let section = {
        "monitory": function () {
            $(".graphModify").attr("hidden", "true");
            $(".settingsModify").attr("hidden", "true");
            $(".main").removeAttr("hidden");
        },
        "graph": function () {    
            $(".main").attr("hidden", "true");
            $(".settingsModify").attr("hidden", "true");
            $(".graphModify").removeAttr("hidden");
        },
        "settings": function () {
            $(".main").attr("hidden", "true");
            $(".graphModify").attr("hidden", "true");
            $(".settingsModify").removeAttr("hidden");
        }

    }
    section[sector]();
    if(screen.width < 1000){
        endAnimation();
    }
}

function startAnimation(){
    $(".headerVertical").css({
        "animation-name": "slide-right",
        "animation-duration": "2s"
    });
}

function endAnimation(){
    $(".headerVertical").css({
        "animation-name": "slide-left",
        "animation-duration": "2s"
    });
    setTimeout(function(){
        $(".headerVertical").hide();
    },2000);
}