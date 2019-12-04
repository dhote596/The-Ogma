var isActive = false;
function toggleNav(){
    if (isActive) {
        $('.nav-overlay').css('width','0');
        $('.js-menu').removeClass("active");
        $("body").removeClass("menu-open");
    } else {
        $('.nav-overlay').css('width','100vw');
        $('.js-menu').addClass("active");
        $("body").addClass("menu-open");
    }
    isActive = !isActive;
}
$(".js-menu").on("click", toggleNav);
$(".nav-overlay").on("click", toggleNav);