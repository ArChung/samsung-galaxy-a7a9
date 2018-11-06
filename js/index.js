var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute('content', "width=768 user-scalable=0");

$(document).ready(function () {

    $('.jBtn').on('click', function (e) {
        e.preventDefault();
        var pos = $('#' + $(this).attr('data-id')).offset().top;
        jumpto(pos);
    });


    $("#s_slider").slider({
        slide: function (event, ui) {
            $('.s_phoneBox .s_p3 .p2').css({
                'opacity': ui.value * 0.01
            })

            var txt = ui.value * 1000 + Math.floor(Math.random() * 1000)
            txt = Math.min(Math.max(1000, txt), 99999)
            txt = (txt == 1000) ? 10 : txt;
            $('.s_phoneBox .s_p3 .st').text(txt)
        },
        change: function (event, ui) {
            $('.s_phoneBox .s_p3 .p2').css({
                'opacity': ui.value * 0.01
            })

            var txt = ui.value * 1000 + Math.floor(Math.random() * 1000)
            txt = Math.min(Math.max(1000, txt), 99999)
            txt = (txt == 1000) ? 10 : txt;
            $('.s_phoneBox .s_p3 .st').text(txt)
        }
    });
    $("#s_slider").slider("value", 0);

    $('.s_p4 .sp').on('mousemove', function (e) {
        var t = $(this);
        var parentOffset = $(this).parent().offset();
        var relX = e.pageX - parentOffset.left;
        hoverPhone(relX);
    })


    $('.vMenuBox').perfectScrollbar();
    $(window).on('resize', function () {
        console.log(123);
        $('.vMenuBox').perfectScrollbar('update');
    })

    $('.s_menu ').on('click', function () {
        $(this).toggleClass('open')
    });

    window.onscroll = function () {
        var pos0 = $('.s_mainContainer').offset().top
        var pos = typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;

        if (pos <= pos0) {
            $('.s_menu').css({
                'top': -pos + pos0 + 'px'
            })
        } else {
            $('.s_menu').css({
                'top': '0px'
            })
        }
    }
    $(window).scroll()


    $('.p_video .vBtn').on('click', function () {
        addYouTube($('.p_video .videoBox'), $(this).attr('data-vid'))
    });

    // test
    var check = false;

    setInterval(function () {
        $('.autoAnimation').toggleClass('switch')

        if (check) {
            $("#s_slider").slider("value", 0);
            hoverPhone(0)
        } else {
            $("#s_slider").slider("value", 100);
            hoverPhone(1000)
        }


        check = !check;

    }, 2000)

    $('.p_blog .manBtn').on('click', function () {
        console.log($(this).index());
        $(this).addClass('active').siblings('.manBtn').removeClass('active');;

        $('.s_works .s_work').eq($(this).index()).addClass('active').siblings('.s_work').removeClass('active');;
        if (isPhone()) {
            jumpto($('.s_works').offset().top)
        }
    });
})

function hoverPhone(relX) {
    $('.s_p4 .uii').css({
        "left": Math.max(Math.min(relX, 586), 42)
    })
    $('.s_p4 .p2').css({
        "width": Math.max(Math.min(relX, 586), 42) + 11
    })
}

function addYouTube(el, vid) {
    el.empty().append('<iframe allowfullscreen="" frameborder="0" height="100%" width="100%" src="http://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1&showinfo=0?ecver=2"></iframe>');
}

function isPhone() {
    testExp = new RegExp('Android|webOS|iPhone|iPad|' +
        'BlackBerry|Windows Phone|' +
        'Opera Mini|IEMobile|Mobile',
        'i');
    return (testExp.test(navigator.userAgent))
}

function jumpto(pos) {
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({
        scrollTop: pos
    }, 600);
}