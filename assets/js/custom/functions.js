/**
 * fix onload animation bug
 */
const fixChromeLoadingPageAnimationIssue = function () {
    document.body.classList.remove("preload");
};
window.addEventListener("DOMContentLoaded", fixChromeLoadingPageAnimationIssue);

/**
 * navigation toggle
 */
function navigationToggle(el) {
    const button = el.find(".menu-toggler");

    if (!button.length) return;

    button.on("click", function () {
        $("body").toggleClass("show-nav");
    });

    window.addEventListener("resize", function () {
        $('body').removeClass("show-nav");
    });
}
