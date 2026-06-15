const time = 300;
setTimeout(() => {
  $(".type-apartment").removeClass("d-none");
  $(".type-apartment").slideUp(1);
}, 1);
// Swiper
const swiperConfig = {
  // Optional parameters
  slidesPerView: "auto",
  spaceBetween: 14,
  //loop: true,
  simulateTouch: false,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerGroup: 1,
  loopFillGroupWithBlank: false,
  breakpoints: {
    640: {
      slidesPerGroup: 1,
    },
    768: {
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerGroup: 3,
    },
  },
};

const swiper = new Swiper(".slider-item-wrapper .swiper", swiperConfig);

var firstSwiper = new Swiper(".first-slider", {
  loop: true,
  centeredSlides: true,
  parallax: true,
  effect: "fade", // افکت محو
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
});

const melkEl = document.querySelector(".melk-swiper");
var melkSwiper = new Swiper(".melk-swiper", {
  pagination: {
    el: ".swiper-pagination-melk",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // loop: true,
  // loop: !document.querySelector(".melk-swiper").classList.contains("disable-last-arrow"),
  loop: melkEl ? !melkEl.classList.contains("disable-last-arrow") : false,
  preventInteractionOnTransition: true,
  nested: true,
});
// $(document).on("click", ".plan-item-img > a", function (event) {
//   //event.preventDefault();
// });


var userCommentSwiper = new Swiper(".user-comment-swiper", {
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 40,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var newsSectionSwiper = new Swiper(".news-section-swiper", {
  // loop: true,

  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  spaceBetween: 8,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var reviewSectionSwiper = new Swiper(".review-section-swiper", {
  loop: true,
  autoplay: false,
  slidesPerView: 1,
  // loop: true,
  spaceBetween: 8,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  simulateTouch: true,

  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var newsSectionSwiper = new Swiper(".article-archive-swiper", {
  // loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 8,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});

var blogLastPostSwiper = new Swiper(".swiper-last-posts-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true, // امکان کلیک روی نقاط صفحه‌بندی
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var blogLastPostSwiper = new Swiper(".mobile-article-slider-wrapper", {
  loop: true,
  centeredSlides: false,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true, // امکان کلیک روی نقاط صفحه‌بندی
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const melkSwiperWrapper = new Swiper(".melk-list-wrapper > .swiper", {
  // Optional parameters
  slidesPerView: "auto",
  spaceBetween: 14,
  //loop: true,
  simulateTouch: false,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next-melk",
    prevEl: ".swiper-button-prev-melk",
  },
  slidesPerGroup: 1,
  loopFillGroupWithBlank: false,
  breakpoints: {
    640: {
      slidesPerGroup: 1,
    },
    768: {
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerGroup: 3,
    },
  },
});

// Slider tab
$(document).on("click", ".slider-tab > li", function () {
  let index = $(this).index() + 1;
  if ($(this).parent("ul").find(".selected").index() == $(this).index()) {
    return;
  }

  $(".swiper").stop();

  $(this).parent("ul").find(".selected").removeClass("selected");
  $(this).addClass("selected");

  $(this).closest(".mini-slider-wrapper").find(".swiper").slideUp(time);
  $(this)
    .closest(".mini-slider-wrapper")
    .find(".swiper:nth-of-type(" + index + ")")
    .slideDown(time);
});
$(document).on("click", ".slider-tab > label", function () {
  $(this).parent(".slider-tab").find(".selected").removeClass("selected");
  $(this).addClass("selected");
});
// Header Search type
$(document).on("change", ".header-search-type", function () {
  $(".header-search .type-vila , .header-search .type-apartment").stop();

  if ($(this).val() == "vila") {
    $(".header-search .type-vila").slideDown(time);
    $(".header-search .type-apartment").slideUp(time);
  } else {
    $(".header-search .type-apartment").slideDown(time);
    $(".header-search .type-vila").slideUp(time);
  }
});
$(document).on("change", ".search-field-type", function () {
  $(".search-field .type-vila , .search-field .type-apartment").stop();

  if ($(this).val() == "vila") {
    $(".search-field .type-vila").slideDown(time);
    $(".search-field .type-apartment").slideUp(time);
  } else {
    $(".search-field .type-apartment").slideDown(time);
    $(".search-field .type-vila").slideUp(time);
  }
});
// Favorite button
$(document).on("click", ".add-favorite", function () {
  if ($(this).children("img:nth-child(1)").hasClass("d-none")) {
    $(this).children("img:nth-child(1)").removeClass("d-none");
    $(this).children("img:nth-child(2)").addClass("d-none");
  } else {
    $(this).children("img:nth-child(2)").removeClass("d-none");
    $(this).children("img:nth-child(1)").addClass("d-none");
  }
});

// About Tab
$(document).on("click", ".about-header-wrapper", function () {
  if ($(this).hasClass("faq-header")) {
    $(".faq-header").addClass("selected");
    $(".about-header").removeClass("selected");

    $(".faq-wrapper").removeClass("d-none");
    $(".about-wrapper").addClass("d-none");
  } else {
    $(".faq-header").removeClass("selected");
    $(".about-header").addClass("selected");

    $(".faq-wrapper").addClass("d-none");
    $(".about-wrapper").removeClass("d-none");
  }
});

// Faq
var faq = document.getElementsByClassName("accordion-head");
for (i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 48 + "px";
    }
  });
}
$(faq[0]).click();

// scroll to top

$(".to-up , .search-fixed-menu").on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 400);
});

// Fixed menu

$(window).on("scroll", setMenuFixed);

const _menuScrollShow =
  $(".header-wrapper").outerHeight() +
  ($(".intro-wrapper").length > 0 ? $(".intro-wrapper").outerHeight() : 0);
function setMenuFixed() {

  // اگر موبایل بود، اصلاً فیکس نشه
  // if ($(".menu-overlay").hasClass("open")){
  //     if (window.innerWidth <= 768) {
  //       $(".header-wrapper").removeClass("header-fixed");
  //       return;
  // }
  // }


  if (
    $("body").scrollTop() > _menuScrollShow ||
    $(document).scrollTop() > _menuScrollShow
  ) {
    $(".header-wrapper").addClass("header-fixed");
  } else {
    $(".header-wrapper").removeClass("header-fixed");
  }
}
setMenuFixed();

// Responsive menu
$(".nav-icon").click(function () {
  $(".menu-overlay").toggleClass("open");
});
$(".menu-close").click(function () {
  $(".menu-overlay").removeClass("open");
});

// Quick watch click
// $(document).on('click', '.plan-item-watch', function () {

//     quickThumbsSwiper = new Swiper(".quick-gallery-thumbs", {
//         spaceBetween: 4,
//         slidesPerView: "auto",
//         freeMode: true,
//     });
//     quickGallerySwiper = new Swiper('.quick-gallery-swiper', {
//         spaceBetween: 0,
//         slidesPerView: 1,
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         thumbs: {
//             swiper: quickThumbsSwiper,
//         }
//     });

//     // quickGallerySwiper.removeAllSlides();
//     // quickThumbsSwiper.removeAllSlides();

//     // quickThumbsSwiper.appendSlide('<div class="swiper-slide"><img src="content/img/intro-img.jpg" alt=""/></div>');
//     // quickThumbsSwiper.appendSlide('<div class="swiper-slide preview-blocked preview-blocked-nama"><img src="content/img/intro-img.jpg" alt=""/><div class="preview-blocked-info"><img src="content/img/icon/ic-lock.svg" alt=""></div></div>');

//     // quickGallerySwiper.appendSlide('<div class="swiper-slide"><img src="content/img/intro-img.jpg" alt=""/></div>');
//     // quickGallerySwiper.appendSlide('<div class="swiper-slide preview-blocked preview-blocked-nama"><img src="content/img/intro-img.jpg" alt=""/><div class="preview-blocked-info"><img src="content/img/icon/ic-lock.svg" alt=""><span>عکس با کیفیت اصلی در پکیج خرید موجود می‌باشد</span></div></div>');

// })

// Plan Preview Change img

$(document).on("click", ".img-thumb", function (e) {
  e.preventDefault();

    elem = $(this).parent("a").find("figure:not(.img-thumb)");
  $(this).removeClass("img-thumb");
    elem.addClass("img-thumb");
});

$(document).on("click", "a", function (e) {
  var href = $(this).attr("href");

  if (href && href[0] === "#") {
    window.location.replace(href);
    return false;
  }
});

//calc_build_or_license_bill_overlay----melk_page

let calc_build_btn = document.querySelector(".calc-btn-build");
let calc_license_btn = document.querySelector(".calc-btn-license");
let calc_renovation_btn = document.querySelector(".calc-btn-renovation");
let select_btn = document.querySelector(".select-btn");
let calc_overlay = document.querySelector(".calc_overlay");
let calc_form_wrapper = document.querySelector(".calc-form-wrapper");
let calc_form1 = document.querySelector(".calc_form1");
let calc_form2 = document.querySelector(".calc_form2");
let calc_form3 = document.querySelector(".calc_form3");
let overlay_close_btn = document.querySelector(".overlay_close_btn");

let isOverlayOpen = false;
let currentForm = null;
select_btn?.addEventListener("click", () => {
  if (isOverlayOpen) {
    close_overlay();
  }
  calc_overlay.style.display = "flex";
  calc_form1.style.display = "block";
  isOverlayOpen = true;
  currentForm = calc_form1;
});
calc_build_btn?.addEventListener("click", () => {
  if (isOverlayOpen) {
    close_overlay();
  }
  calc_overlay.style.display = "flex";
  calc_form1.style.display = "block";
  isOverlayOpen = true;
  currentForm = calc_form1;
});

calc_license_btn?.addEventListener("click", () => {
  if (isOverlayOpen) {
    close_overlay();
  }
  calc_overlay.style.display = "flex";
  calc_form2.style.display = "block";
  isOverlayOpen = true;
  currentForm = calc_form2;
});
calc_renovation_btn?.addEventListener("click", () => {
  if (isOverlayOpen) {
    close_overlay();
  }
  calc_overlay.style.display = "flex";
  calc_form3.style.display = "block";
  isOverlayOpen = true;
  currentForm = calc_form3;
});

overlay_close_btn?.addEventListener("click", () => {
  close_overlay();
});

const close_overlay = () => {
  calc_overlay.style.display = "none";
  if (currentForm) {
    currentForm.style.display = "none";
  }
  isOverlayOpen = false;
  currentForm = null;
};

// نمایش بیشتر و کمتر متن در صفحات جواز و بازسازی

document.querySelectorAll(".plan-details-show-more-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const wrapper = document.querySelector(".plan-details-wrapper");

    if (wrapper.style.maxHeight === "none") {
      wrapper.style.maxHeight = "350px"; // اندازه پیش‌فرض
      wrapper.classList.remove("expanded");
      button.textContent = "نمایش بیشتر";
    } else {
      wrapper.style.maxHeight = "none"; // ارتفاع خودکار
      wrapper.classList.add("expanded");
      button.textContent = "نمایش کمتر";
    }
  });
});

