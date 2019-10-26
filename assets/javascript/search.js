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
    history.replaceState({}, "", newSearchState(value));
}

function addSearch(value) {
    history.pushState({}, "", newSearchState(value));
}


$(function(){
    setSearch();

    $(window).bind('popstate', setSearch);

    $('.search > a').click(function() {
        $('.search > input').css('display', 'block');
        $('.search > input').animate({width: "125px"}, 100).focus();
    });

    $('.search > input').bind('input', function() {
        updateSearch($('.search > input').val())
    });

    $('.search > input').focusout(function(){
        if (getSearch(window.location.search) != $('.search > input').val()) {
            addSearch($('.search > input').val())
        }
        $('.search > input').animate({width: "0px"}, 100, function() {
            $( this ).css('display', 'none');
        });
    });
});
