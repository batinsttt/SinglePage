$(document).ready(function () {


    if (document.body.clientWidth < 979) {

        $(".dropdown-toggle.disabled").removeClass("disabled");
        $("ul.nav li.dropdown.laptop").removeClass("laptop");


    }
    else {

        $("ul.nav li.dropdown.laptop").hover(function () {
            $(this).children(".dropdown-menu").removeClass("fadeOutRight animated");
            $(this).children(".dropdown-menu").addClass("fadeInRight animated").show();
            $(this).addClass("active");
        }, function () {
            $(this).children(".dropdown-menu").removeClass("fadeInRight animated");
            $(this).children(".dropdown-menu").addClass("fadeOutRight animated").fadeOut(300);
            $(this).removeClass("active");
        });
    }

    $(window).resize(function () {


        if (document.body.clientWidth < 979) {

            $(".dropdown-toggle.disabled").removeClass("disabled");
            $("ul.nav li.dropdown.laptop").removeClass("laptop");
        }
        else {

            //$(".dropdown-toggle").addClass("disabled");
            //$("ul.nav li.dropdown").addClass("laptop");
        }
    });






    $("#id_mocha").click(function () {
        $("#content_mocha").toggle();
        $("#id_mocha").addClass("item-active");

    });


    $("#input-search-index").keypress(function () {
        $("#ul-input-search-index").show();
    });


    $("#input-search-sim").click(function (e) {
        $("#ul-input-search-sim").show();
        e.stopPropagation();
    });



    $("#input-search-simmenu").keypress(function () {
        $("#ul-input-search-simmenu").show();
    });


    $("#btn-hotro").click(function (e) {
        $("#menu-hotro").show();
        $("#menu-taikhoan").hide();
        $(".btn-menu-sub").removeClass('active');
        $(this).addClass("active");
        e.stopPropagation();
    });


    $("#btn-taikhoan").click(function (e) {
        $("#menu-taikhoan").show();
        $("#menu-hotro").hide();
        $(".btn-menu-sub").removeClass('active');
        $(this).addClass("active");
        e.stopPropagation();
    });

    $(".menu-sub").click(function (e) {
        e.stopPropagation();
    });


    $("#btn-search-show-destop").hover(function (e) {
        $(".serch-destop").addClass('slideInDown animated active');
        $(this).addClass('active');
        e.stopPropagation();
    }, function () {
        $(this).removeClass("active");
    });

    $(".serch-destop").click(function (e) {
        $(this).addClass("active");
        e.stopPropagation();
    });

    $(".serch-destop").hover(function () {
        $(this).addClass("active");
        $("#btn-search-show-destop").addClass("active");        
    }, function () {
        $(this).removeClass("active");
        $("#btn-search-show-destop").removeClass("active");
    });


    $("#btn-user-show-destop").click(function (e) {
        $(".user-destop").addClass('active');
        $(this).addClass('active');
        e.stopPropagation();
    });
    $(".user-destop").click(function (e) {
        $(".user-destop").addClass('active');
        e.stopPropagation();
    });

    $(".btn-thunho").click(function (e) {
        $('html, body').animate({
            scrollTop: $("#" + $(this).parent().parent().parent().parent().attr('id')).offset().top
        }, 1000);
    });
    $("#btn-search-option1").click(function () {
        $("#search-option0").hide();
        $("#search-option1").show();
        $("#search-option2").hide();
        $("#btn-search-option2").removeClass('active');
        $(this).addClass("active");

    });
    $("#btn-search-option2").click(function () {
        $("#search-option0").hide();
        $("#search-option1").hide();
        $("#search-option2").show();
        $("#btn-search-option1").removeClass('active');
        $(this).addClass("active");



    });


    $("#close-search-option1").click(function () {
        $(".show-search-option").hide();
        $("#search-option0").show();
        $(".btn-search-option").removeClass('active');

    });

    $("#close-search-option2").click(function () {
        $(".show-search-option").hide();
        $("#search-option0").show();
        $(".btn-search-option").removeClass('active');
    });





    $("#btn-search-option").click(function () {
        $("#show-search-option").toggle();

    });

    $("#btn-xacnhansdt").click(function () {
        $(".content-xacnhansdt").show();
    });
    $("#close-big").click(function () {
        $(".content-xacnhansdt").hide();
    });



    $(".btn-xemchitiet1").click(function (e) {

        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');

        $("#container-child1").slideDown(500);
        e.stopPropagation();

    });
    $(".btn-xemchitiet2").click(function (e) {

        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');

        $("#container-child2").slideDown(500);
        e.stopPropagation();

    });
    $(".btn-xemchitiet3").click(function (e) {

        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');

        $("#container-child3").slideDown(500);
        e.stopPropagation();

    });

    $(".btn-xemchitiet4").click(function (e) {
        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');
        $("#container-child4").slideDown(500);
        e.stopPropagation();
    });
    $(".btn-xemchitiet5").click(function (e) {
        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');
        $("#container-child5").slideDown(500);
        e.stopPropagation();
    });
    $(".btn-xemchitiet6").click(function (e) {
        $(".item-goicuoc").removeClass('item-active');
        $(this).parent(".item-goicuoc").addClass('item-active');
        $("#container-child6").slideDown(500);
        e.stopPropagation();
    });

    //$(".item-produce-foryou").hover(function (e) {
    //    $(".item-produce-foryou").removeClass('active');
    //    $(this).addClass('active');
    //});


    $(".item-produce-foryou").click(function (e) {
        $(".item-produce-foryou").removeClass('active');
        $(this).addClass('active');
    });


    $(".item-nav-tienich a").hover(function (e) {
        $(".item-nav-tienich a").removeClass('active');
        $(this).addClass('active');

        stopinterval();
    });

    $(".item-nav-tienich a").click(function (e) {
        $(".item-nav-tienich a").removeClass('active');
        $(this).addClass('active');


    });


    //
    //$(".item-nav-form-tab").hover(function (e) {
    //    $(".item-nav-form-tab").removeClass('active');
    //    $(this).addClass('active');
    //});

    $(".item-nav-form-tab").click(function (e) {
        $(".item-nav-form-tab").removeClass('active');
        $(this).addClass('active');
    });


    $(".tab-menu-header").click(function (e) {
        $(".tab-menu-header").removeClass('active');
        $(".navbar-collapse").removeClass('in');
        $(this).addClass('active');
    });



    $("#close-child1").click(function () {
        $("#container-child1").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });
    $("#close-child2").click(function () {
        $("#container-child2").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });
    $("#close-child3").click(function () {
        $("#container-child3").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });
    $("#close-child4").click(function () {
        $("#container-child4").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });
    $("#close-child5").click(function () {
        $("#container-child5").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });
    $("#close-child6").click(function () {
        $("#container-child6").slideUp(500);
        $(".item-goicuoc").removeClass('item-active');
    });


    $("#xemtatcathietbi1").click(function () {
        $("#wa-container-main").hide();

        $("#wa-container-child1").show();
    });
    $("#xemtatcathietbi2").click(function () {
        $("#wa-container-main").hide();

        $("#wa-container-child2").show();
    });
    $("#xemtatcathietbi3").click(function () {
        $("#wa-container-main").hide();

        $("#wa-container-child3").show();
    });




    $(".css-label-right2").click(function () {
        $("#compare1").show();
        $("#compare2").show();

        $("#compare2-mobile").show();

    });
    $("#close-compare").click(function () {
        $("#compare1").hide();
        $("#compare2").hide();

        $("#compare2-mobile").hide();
    });

    $("#btn-sosanh1").click(function () {
        $("#compare1").toggleClass("active-height1");
    });

    $("#btn-sosanh2").click(function () {
        $("#compare2").toggleClass("active-height2");
    });

    $(".btn-support-index").click(function () {
        $(".btn-support-index").removeClass('active');
        $(".show-support").removeClass('show-support');
    });

    $("#id_support1").click(function (e) {
        $("#id_support1").toggleClass("active");
        e.stopPropagation();
    });

    $("#id_support2").click(function (e) {
        $("#container_support2").toggleClass("show-support");
        $("#id_support2").toggleClass("active");
        e.stopPropagation();
    });
    $("#id_support3").click(function (e) {
        $("#container_support3").toggleClass("show-support");
        $("#id_support3").toggleClass("active");
        e.stopPropagation();
    });



    $(".navbar-collapse").click(function (e) {


    });

    $("#bs-navbar-mobi-search").click(function (e) {

        e.stopPropagation();
    });
    $("#bs-navbar-mobi-diadiem").click(function (e) {

        e.stopPropagation();
    });
    $("#bs-navbar-mobi-dangnhap").click(function (e) {

        e.stopPropagation();
    });





    $(".title-footer").click(function (e) {

        $(this).parent(".col-item-footer").toggleClass("active");
        e.stopPropagation();
    });


    $(".btn-close").click(function () {
        $(this).parent().hide();

    });

    $("#btn-showtimkiemnangcao").click(function (e) {
        $("#sim-timkiemnangcao").toggleClass("active");
        $(this).hide();
        $("#btn-hiddentimkiemnangcao").show();
        e.stopPropagation();
    });
    $("#btn-hiddentimkiemnangcao").click(function (e) {
        $("#sim-timkiemnangcao").toggleClass("active");
        $(this).hide();
        $("#btn-showtimkiemnangcao").show();
        e.stopPropagation();
    });


    $(document).click(function () {
        $("#ul-input-search-index").hide();
        $("#ul-input-search-sim").hide();
        $("#ul-input-search-simmenu").hide();
        $("#menu-hotro").hide();
        $("#menu-taikhoan").hide();

        $(".item-goicuoc").removeClass('item-active');
        $(".container-child").slideUp(500);

        $(".serch-destop").removeClass('active');
        $(".show-support").removeClass('show-support');
        $(".user-destop").removeClass('active');

        $(".item-shoping a").removeClass('active');
        $(".navbar-collapse").removeClass('in');


    });



    //$(document).on('click', 'a[href^="#"]', function (e) {
    //    // target element id
    //    var id = $(this).attr('href');

    //    // target element
    //    var $id = $(id);
    //    if ($id.length === 0) {
    //        return;
    //    }

    //    // prevent standard hash navigation (avoid blinking in IE)
    //    e.preventDefault();

    //    // top position relative to the document
    //    var pos = $(id).offset().top;

    //    // animated top scrolling
    //    $('body, html').animate({ scrollTop: pos });
    //});



    //Revolution Slider 1
    if ($('.tp-banner-1').length) {
        var revolutionSlider = $('.tp-banner-1');

        if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
            var body = $('body'),
                width = body.width(),
                topHeight = 0,
                headerHeight = 104,
                height;

            if ($('#top-box').length) {
                if (body.hasClass('hidden-top')) {
                    topHeight = $('#top-box').outerHeight() - 32;
                }
            }

            if ((body.width() + scrollWidth) >= 1200) {
                height = body.height() - (topHeight + headerHeight);
            } else {
                height = 900;
            }

            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: height,
                hideThumbs: 10,
                navigationType: 'bullet',
                navigationArrows: 'solo',
                navigationHAlign: 'center',
                navigationVAlign: 'top',
                navigationHOffset: -545,
                navigationVOffset: 30,
                hideTimerBar: 'on'
            }).parents('.slider').removeClass('load');
        } else {
            revolutionSlider.revolution({

                delay: 6000,
                startwidth: 1200,
                startheight: 900,
                hideThumbs: 0,
                navigationType: 'bullet',
                navigationArrows: 'none',
                navigationVOffset: 320,
                hideTimerBar: 'on',
                onHoverStop: 'off'
            }).parents('.slider').removeClass('load');
        }
    }



    //Revolution Slider 2
    if ($('.tp-banner-2').length) {
        var revolutionSlider = $('.tp-banner-2');

        if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
            var body = $('body'),
                width = body.width(),
                topHeight = 0,
                headerHeight = 104,
                height;

            if ($('#top-box').length) {
                if (body.hasClass('hidden-top')) {
                    topHeight = $('#top-box').outerHeight() - 32;
                }
            }

            if ((body.width() + scrollWidth) >= 1200) {
                height = body.height() - (topHeight + headerHeight);
            } else {
                height = 480;
            }

            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: height,
                hideThumbs: 10,
                navigationType: 'bullet',
                navigationArrows: 'solo',
                navigationHAlign: 'center',
                navigationVAlign: 'top',
                navigationHOffset: -545,
                navigationVOffset: 30,
                hideTimerBar: 'on'
            }).parents('.slider').removeClass('load');
        } else {
            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: 480,
                hideThumbs: 0,
                navigationType: 'bullet',
                navigationArrows: 'none',
                navigationVOffset: 30,
                hideTimerBar: 'on',
                onHoverStop: 'off'
            }).parents('.slider').removeClass('load');
        }
    }


    //Revolution Slider 3
    if ($('.tp-banner-3').length) {
        var revolutionSlider = $('.tp-banner-3');

        if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
            var body = $('body'),
                width = body.width(),
                topHeight = 0,
                headerHeight = 104,
                height;

            if ($('#top-box').length) {
                if (body.hasClass('hidden-top')) {
                    topHeight = $('#top-box').outerHeight() - 32;
                }
            }

            if ((body.width() + scrollWidth) >= 1200) {
                height = body.height() - (topHeight + headerHeight);
            } else {
                height = 480;
            }

            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: height,
                hideThumbs: 10,
                navigationType: 'bullet',
                navigationArrows: 'solo',
                navigationHAlign: 'center',
                navigationVAlign: 'top',
                navigationHOffset: -545,
                navigationVOffset: 30,
                hideTimerBar: 'on'
            }).parents('.slider').removeClass('load');
        } else {
            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: 480,
                hideThumbs: 0,
                navigationType: 'bullet',
                navigationArrows: 'none',
                navigationVOffset: 30,
                hideTimerBar: 'on',
                onHoverStop: 'off'
            }).parents('.slider').removeClass('load');
        }
    }


    //Revolution Slider 4
    if ($('.tp-banner-4').length) {
        var revolutionSlider = $('.tp-banner-4');

        if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
            var body = $('body'),
                width = body.width(),
                topHeight = 0,
                headerHeight = 104,
                height;

            if ($('#top-box').length) {
                if (body.hasClass('hidden-top')) {
                    topHeight = $('#top-box').outerHeight() - 32;
                }
            }

            if ((body.width() + scrollWidth) >= 1200) {
                height = body.height() - (topHeight + headerHeight);
            } else {
                height = 570;
            }

            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: height,
                hideThumbs: 10,
                navigationType: 'bullet',
                navigationArrows: 'solo',
                navigationHAlign: 'center',
                navigationVAlign: 'top',
                navigationHOffset: -545,
                navigationVOffset: 30,
                hideTimerBar: 'on'
            }).parents('.slider').removeClass('load');
        } else {
            revolutionSlider.revolution({
                delay: 6000,
                startwidth: 1200,
                startheight: 570,
                hideThumbs: 0,
                navigationType: 'bullet',
                navigationArrows: 'none',
                navigationVOffset: 30,
                hideTimerBar: 'on',
                onHoverStop: 'off'
            }).parents('.slider').removeClass('load');
        }
    }

    function fixmenutop() {
        var $cache = $('#menutop-fixed');
        if ($(window).scrollTop() > 150)
            $cache.addClass('menutop-fixed');
        else
            $cache.removeClass('menutop-fixed')
    }
    $(window).scroll(fixmenutop);
    fixmenutop();


    function fixDiv() {
        var $cache = $('#menu-fixed');
        if ($(window).scrollTop() > 550)
            $cache.addClass('section-fixed');
        else
            $cache.removeClass('section-fixed')
    }

    $(window).scroll(fixDiv);
//    fixDiv();_sysfix();
    	fixDiv();
    var interval;

    function playinterval() {
        activateTab();
        interval = setInterval(function () { activateTab(); }, 3000);
        return false;
    }

    function stopinterval() {
        clearInterval(interval);
        return false;
    }

    $(document).on('ready', playinterval);

    var tabs = $('#myTab a');
    var counter = 0;

    function activateTab() {
        // remove active class from all the tabs
        tabs.removeClass('active');
        var currentLink = $('#tab-nav' + counter).attr('href');

        //alert(currentLink);

        $('.tab-pane2').removeClass('active in');
        $(currentLink).addClass('active in');
        $('#tab-nav' + counter).addClass('active');
        if (counter < tabs.length - 1) {
            counter++;
        }
        else {
            counter = 0;
        }
    }    
});