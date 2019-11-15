function updateNextPrev() {
    $(".list").each(function() {
        var current = $( this ).find("ul > .current");
        var rest = Math.min(current.nextAll().length + 1, numberOfSlides);
        for (var i = 0; i < rest; i++) {
            current.css("opacity", "1")
            current = current.next();
        }

        if ($( this ).find("ul > li").length <= numberOfSlides) {
            $( this ).find("progress").css("display", "none");
        }

        if ($( this ).find(".current").prevAll().length < numberOfSlides) {
            $( this ).find("a.left").css("display", "none");
        }
        if ($( this ).find(".current").nextAll().length < numberOfSlides) {
            $( this ).find("a.right").css("display", "none");
        }
    });
}

var numberOfSlides = 3;
var slideWidth;

$(function(){
    $(".list > ul > li:first-of-type").addClass("current");

    slideWidth = $(".list > ul > li").outerWidth();
    if (window.screen.width > 1200) {
        numberOfSlides = 3;
        slideWidth += 20;
    } else if (window.screen.width > 600) {
        numberOfSlides = 2;
        slideWidth += window.screen.width / 50;
    } else {
        numberOfSlides = 1;
    }

    updateNextPrev()

    $(".list > ul").each(function() {
        $( this ).children("a.left").click(function(){
            var current = $( this ).siblings(".current").removeClass("current");
            $( this ).siblings("a.right").css("display", "block");
            for (var i = 0; i < numberOfSlides; i++) {
                current.css("opacity", "");
                current = current.prev();
            }
            var progress = $( this ).parent().parent().children('progress');
            progress.attr("value",  parseInt(progress.attr("value")) - numberOfSlides);
            $( this ).siblings('li').css('left', (-parseInt(progress.attr("value")) * slideWidth) + "px");
            current.addClass("current");
            updateNextPrev();
        });

        $( this ).children("a.right").click(function(){
            var current = $( this ).siblings(".current").removeClass("current");
            $( this ).siblings("a.left").css("display", "block");
            for (var i = 0; i < numberOfSlides; i++) {
                current.css("opacity", "");
                current = current.next();
            }
            var progress = $( this ).parent().parent().children('progress');
            progress.attr("value",  parseInt(progress.attr("value")) + numberOfSlides);
            $( this ).siblings('li').css('left', (-parseInt(progress.attr("value")) * slideWidth) + "px");
            current.addClass("current");
            updateNextPrev();
        });
    });
})
