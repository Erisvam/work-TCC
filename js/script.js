$(".openMenu").click(function() {
    $(".headerVertical").show();

    ($(window).height() < 600) ? startAnimationHorizontal(): startAnimation();
});

$(".closeMenu").click(function() {
    ($(window).height() < 600) ? endAnimationHorizontal(): endAnimation();
});


function selectedSector(sector) {
    let section = {
        "monitory": function() {
            $(".graphModify").attr("hidden", "true");
            $(".settingsModify").attr("hidden", "true");
            $(".main").removeAttr("hidden");
        },
        "graph": function() {
            $(".main").attr("hidden", "true");
            $(".settingsModify").attr("hidden", "true");
            $(".graphModify").removeAttr("hidden");
        },
        "settings": function() {
            $(".main").attr("hidden", "true");
            $(".graphModify").attr("hidden", "true");
            $(".settingsModify").removeAttr("hidden");
        }

    }
    section[sector]();

    if ($(window).width() < 1000) {
        endAnimation();
    }

    if ($(window).height() < 600) {
        endAnimationHorizontal()
    }

}

// SCREEN VERTICAL
function startAnimation() {
    $(".headerVertical").css({
        "animation-name": "slide-right",
        "animation-duration": "2s"
    });
}

function endAnimation() {
    $(".headerVertical").css({
        "animation-name": "slide-left",
        "animation-duration": "2s"
    });
    setTimeout(function() {
        $(".headerVertical").hide();
    }, 2000);
}

// SCREEN HORIZONTAL
function startAnimationHorizontal() {
    $(".headerVertical").css({
        "animation-name": "slide-bottom",
        "animation-duration": "2s"
    });
}

function endAnimationHorizontal() {
    $(".headerVertical").css({
        "animation-name": "slide-top",
        "animation-duration": "2s"
    });
    setTimeout(function() {
        $(".headerVertical").hide();
    }, 2000);
}