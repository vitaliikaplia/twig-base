/**
 * document ready
 */
(function ($) {
    $(document).ready(function () {

        /** header */
        $("body").headroom({
            tolerance: {
                up: 14,
                down: 16
            }
        });

        /** navigation toggle */
        if($('.header').length){
            $('.header').each(function(){
                navigationToggle($(this));
            });
        }

        /** textarea autogrow */
        if($('textarea').length){
            $('textarea').each(function(){
                let thisEl = $(this),
                    thisTextAreaHeight = thisEl.outerHeight();
                thisEl.autogrow();
                thisEl.css("height", thisTextAreaHeight);
            });
        }

        /** cookie popup */
        if (!$.cookie("user-cookies-accepted") && $('.cookiePopupWrapper').length) {
            setTimeout(function () {
                $('.cookiePopupWrapper').addClass('show');
            }, 3000);
            $('.cookiePopup .accept').click(function () {
                $.cookie("user-cookies-accepted", true, {
                    expires: 365,
                    path: "/",
                    secure: false
                });
                $('.cookiePopupWrapper').removeClass('show');
            });
        }

    });
})(jQuery);
