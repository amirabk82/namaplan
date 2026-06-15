$(".custom-carousel").owlCarousel({
  autoWidth: true,
  rtl: true,
  autoplay: true,
  nav: true,
  autoplayHoverPause: true,
  rewind: true,

  //loop: true,
});
$(document).ready(function () {
  $(".custom-carousel .blog-slider-item").click(function () {
    $(".custom-carousel .blog-slider-item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});
