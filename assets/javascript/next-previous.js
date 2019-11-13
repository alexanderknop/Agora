function updateNextPrev() {
    if ($(".list > ul > li").length <= 3) {
        $(".list > progress").css("display", "none");
    }
    $(".list > ul > a.left").each(function() {
        if ($( this ).siblings(".current").prevAll().length < 3) {
            $( this ).css("display", "none");
        }
    });
    $(".list > ul > a.right").each(function() {
        if ($( this ).siblings(".current").nextAll().length < 3) {
            $( this ).css("display", "none");
        }
    });
}

$(function(){
    $(".list > ul > li:first-of-type").addClass("current");

    updateNextPrev()

    $(".list > ul").each(function() {
        $( this ).children("a.left").click(function(){
            var current = $( this ).siblings(".current").removeClass("current");
            $( this ).siblings("a.right").css("display", "block");
            if (current.prevAll().length > 3) {
                for (var i = 0; i < 3; i++) {
                    current = current.prev();
                }
                var progress = $( this ).parent().parent().children('progress');
                progress.attr("value",  parseInt(progress.attr("value")) - 3);
            }
            $( this ).siblings('li').css('left', (-parseInt(progress.attr("value")) * 360) + "px");
            current.addClass("current");
            updateNextPrev();
        });

        $( this ).children("a.right").click(function(){
            var current = $( this ).siblings(".current").removeClass("current");
            $( this ).siblings("a.left").css("display", "block");
            if (current.nextAll().length > 3) {
                for (var i = 0; i < 3; i++) {
                    current = current.next();
                }
                var progress = $( this ).parent().parent().children('progress');
                progress.attr("value",  parseInt(progress.attr("value")) + 3);
            }
            $( this ).siblings('li').css('left', (-parseInt(progress.attr("value")) * 360) + "px");
            current.addClass("current");
            updateNextPrev();
        });
    });
})
