function search() {
    $('.list > ul > li').css('display', 'grid');
    $('.list > ul > li').each(function() {
        if (!$( this ).text().toLowerCase().includes($('.search > input').val().toLowerCase())) {
            $( this ).css('display', 'none');
        }
    })
}

function setSearch() {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('search')) {
        $('.search > input').val(searchParams.get('search'));
    } else {
        $('.search > input').val('');
    }
}

function getSearch() {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('search')) {
        return searchParams.get('search');
    } else {
        return '';
    }
}

function newSearchState(value) {
    if (value != '') {
        return "?search=" + encodeURIComponent(value)
    } else {
        return ""
    }
}

function updateSearch(value) {
    if (value == '') {
        history.replaceState(null, null, window.location.pathname);
    } else {
        history.replaceState({}, "", newSearchState(value));
    }
}

function addSearch(currentValue, value) {
    updateSearch(value);
    if (currentValue == '') {
        history.pushState(null, null, window.location.pathname);
    } else {
        history.pushState({}, "", newSearchState(currentValue));
    }
}


$(function(){
    setSearch();
    $('.search > input').attr('previous-value', getSearch());
    search();

    $(window).bind('popstate', setSearch);

    $('.search > a').click(function() {
        $('.search > input').css('display', 'block');
        $('.search > input').animate({width: "125px"}, 100).focus();
        $('.search > input').attr('previous-value', $('.search > input').val());
    });

    $('.search > input').bind('input', function() {
        updateSearch($('.search > input').val());
    });

    $('.search > input').change(function() {
        addSearch($('.search > input').val(),
            $('.search > input').attr('previous-value'));
    })

    $('.search > input').focusout(function(){
        $('.search > input').animate({width: "0px"}, 100, function() {
            $( this ).css('display', 'none');
            search();
        });
    });

    $('.search > input').bind("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        if ($('.search > input').is(":focus")) {
            $('.search > input').animate({width: "0px"}, 100, function() {
                $( this ).css('display', 'none');
                search();
            });
        }
      }
    });

});
