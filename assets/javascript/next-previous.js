function updateNextPrev() {
    $(".list").each(function() {
        if ($( this ).find("ul > li:visible").length == 0 &&
                $( this ).find("div.empty").length == 0) {
            $( this ).append("<div class = 'empty'>Not Found</div>");
            $( this ).find("a.right").css("display", "none");
            $( this ).find("a.left").css("display", "none");
            $( this ).find("progress").css("display", "none");
        } else if ($( this ).find("ul > li:visible").length > 0){
            $( this ).find("div.empty").detach();
            $( this ).find("ul > li").css("opacity", "");
            $( this ).find("a.arrow").css("display", "block");
            var current = $( this ).find("ul > .current");
            var rest = Math.min(current.nextAll('li:visible').length + 1, numberOfSlides);
            for (var i = 0; i < rest; i++) {
                current.css("opacity", "1")
                current = current.next();
            }

            if ($( this ).find("ul > li:visible").length <= numberOfSlides) {
                $( this ).find("progress").css("display", "none");
            }

            if ($( this ).find(".current").prevAll('li:visible').length < numberOfSlides) {
                $( this ).find("a.left").css("display", "none");
            }
            if ($( this ).find(".current").nextAll('li:visible').length < numberOfSlides) {
                $( this ).find("a.right").css("display", "none");
            }
        }
    });
}

var numberOfSlides = 3;
var slideWidth;

var isAnimating = false;

function startSwipe(e) {
    if (! isAnimating) {
        var touch = e;
        if (e.type == 'touchstart') {
            touch = e.targetTouches[0] || e.changedTouches[0];
        }

        startX = touch.pageX;
        startY = touch.pageY;

        // e.preventDefault();

        $( this ).mousemove(swipeMove);
        $( this ).on('touchmove', swipeMove);

        $( this ).mouseup(endSwipe);
        $( this ).on('touchend', endSwipe);
    }
}

function swipeMove(e) {

    var touch = e;
    if (e.type == 'touchmove') {
        touch = e.targetTouches[0] || e.changedTouches[0];
    }

    moveX = touch.pageX;
    moveY = touch.pageY;

    if (Math.abs(moveX - startX) < 40) return;
    e.preventDefault();

    $( this ).siblings().addBack().each(function() {
        var start = slideLeft($( this ).parent());
        $( this ).css("left", (start + moveX - startX) + "px");
    });

    isAnimating = true;
}

function endSwipe(e) {
    var touch = e;

    $( this ).off("mousemove", swipeMove);
    $( this ).off('touchmove', swipeMove);
    $( this ).off("mouseup", endSwipe);
    $( this ).off('touchend', endSwipe);

    if (Math.abs(moveX - startX) === 0) return;
    e.preventDefault();

    var stayAtCur = Math.abs(moveX - startX) < 40 ||
        typeof moveX === "undefined" ? true : false;

    if (!stayAtCur) {
        if (moveX - startX > 0) {
            prevSlide($( this ).parent());
        } else {
            nextSlide($( this ).parent());
        }
    }

    delete startX;
    delete startY;
    delete moveX;
    delete moveY;

    isAnimating = false;
}

function slideLeft(list) {
    var progress = list.siblings('progress');
    return -parseInt(progress.attr("value")) * slideWidth;
}

function nextSlide(list) {
    var current =  list.children(".current").removeClass("current");
    var rest = Math.min(current.nextAll('li:visible').length, numberOfSlides);
    for (var i = 0; i < rest; i++) {
        current.css("opacity", "");
        current = current.next("li:visible");
    }
    var progress = list.siblings('progress');
    progress.attr("value",  parseInt(progress.attr("value")) + rest);
    list.children('li').animate({left: slideLeft(list) + "px"}, 1000);
    current.addClass("current");
    updateNextPrev();
}

function prevSlide(list) {
    var current =  list.children(".current").removeClass("current");
    console.log(current.prevAll('li:visible').length);
    var rest = Math.min(current.prevAll('li:visible').length, numberOfSlides);
    for (var i = 0; i < rest; i++) {
        current.css("opacity", "");
        current = current.prev("li:visible");
    }
    var progress = list.siblings('progress');
    progress.attr("value",  parseInt(progress.attr("value")) - rest);
    list.children('li').animate({left: slideLeft(list) + "px"}, 1000);
    current.addClass("current");
    updateNextPrev();
}

$(function(){
    $(".list > ul").find("li:visible:first").addClass("current");

    slideWidth = $(".list > ul > li").outerWidth();
    if (window.screen.width >= 1200) {
        numberOfSlides = 3;
        slideWidth += 20;
    } else if (window.screen.width >= 700) {
        numberOfSlides = 2;
        slideWidth += window.screen.width * 4 / 100;
    } else {
        numberOfSlides = 1;
        slideWidth += window.screen.width * 4 / 100
    }

    updateNextPrev()

    $(".list > ul").each(function() {
        $( this ).children("a.left").click(function(){
            prevSlide($( this ).parent())
        });

        $( this ).children("a.right").click(function(){
            nextSlide($( this ).parent())
        });
    });

    if (window.screen.width < 700) {
        $(".list > ul > li").mousedown(startSwipe);
        $(".list > ul > li").on('touchstart', startSwipe);
    }
});
