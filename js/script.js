$(document).ready(function() {
    ($(window).width() < 480) ? $(".mainContainer__aside").hide(): $(".mainContainer__aside").show();
});

$(".header__openMenu").click(function() {
    $(".mainContainer__aside").show();

    ($(window).height() < 600) ? startAnimationHorizontal(): startAnimation();
});

$(".aside__closeMenu").click(function() {
    ($(window).height() < 600) ? endAnimationHorizontal(): endAnimation();
});


function selectedSector(sector) {
    let section = {
        "monitory": function() {
            $(".mainContainer__mainMonitory").removeAttr("hidden");
            $(".mainContainer__mainStatistic").attr("hidden", "true");
            $(".mainContainer__mainSettings").attr("hidden", "true");
        },
        "graph": function() {
            $(".mainContainer__mainMonitory").attr("hidden", "true");
            $(".mainContainer__mainStatistic").removeAttr("hidden");
            $(".mainContainer__mainSettings").attr("hidden", "true");
        },
        "settings": function() {
            $(".mainContainer__mainMonitory").attr("hidden", "true");
            $(".mainContainer__mainStatistic").attr("hidden", "true");
            $(".mainContainer__mainSettings").removeAttr("hidden");
        }

    }
    section[sector]();
    if ($(window).width() < 1000) {
        endAnimation();
    }

    if ($(window).height() < 600 || ($(window).height() < 400)) {
        endAnimationHorizontal()
    }

}

// SCREEN VERTICAL
function startAnimation() {
    $(".mainContainer__aside").css({
        "animation-name": "slide-right",
        "animation-duration": "2s"
    });
}

function endAnimation() {
    $(".mainContainer__aside").css({
        "animation-name": "slide-left",
        "animation-duration": "2s"
    });
    setTimeout(function() {
        $(".mainContainer__aside").hide();
    }, 2000);
}

// SCREEN HORIZONTAL
function startAnimationHorizontal() {
    $(".mainContainer__aside").css({
        "animation-name": "slide-bottom",
        "animation-duration": "2s"
    });
}

function endAnimationHorizontal() {
    $(".mainContainer__aside").css({
        "animation-name": "slide-top",
        "animation-duration": "2s"
    });
    setTimeout(function() {
        $(".mainContainer__aside").hide();
    }, 2000);
}