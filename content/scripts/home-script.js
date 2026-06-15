// Search type
$(document).on("click", ".search-type-btn", function () {
  $(
    ".intro-search .type-vila ,.intro-search .city_location, .intro-search .type-apartment , .intro-search .type-zamin"
  ).stop();

  if ($(this).data("type") == "villa") {
    $(".intro-search .type-vila").slideDown(time);
    $(".intro-search .type-apartment").slideUp(time);

    $(".search-type-btn:nth-child(1)").addClass("selected");
    $(".search-type-btn:nth-child(2)").removeClass("selected");
    $(".search-type-btn:nth-child(3)").removeClass("selected");
  } else if ($(this).data("type") == "kolbe") {
    $(".intro-search .type-vila").slideDown(time);
    $(".intro-search .type-apartment").slideUp(time);

    $(".search-type-btn:nth-child(3)").addClass("selected");
    $(".search-type-btn:nth-child(1)").removeClass("selected");
    $(".search-type-btn:nth-child(2)").removeClass("selected");
  } else {
    $(".search-type-btn:nth-child(1)").removeClass("selected");
    $(".search-type-btn:nth-child(3)").removeClass("selected");
    $(".search-type-btn:nth-child(2)").addClass("selected");

    $(".intro-search .type-apartment").slideDown(time);
    $(".intro-search .type-vila").slideUp(time);
  }
});

// Search type
$(document).on("click", ".search-melk-btn", function () {
  if ($(this).data("type") == "PreSell") {
    $(".search-melk-btn:nth-child(1)").addClass("selected");
    $(".search-melk-btn:nth-child(2)").removeClass("selected");
  } else {
    $(".search-melk-btn:nth-child(1)").removeClass("selected");
    $(".search-melk-btn:nth-child(2)").addClass("selected");
  }
});

$(document).on("click", ".play-btn", function () {
  let voice = $(this).closest(".play-voice").find(".play-voice-src")[0];

  $(".play-voice-src").each(function () {
    let vo = $(this)[0];
    if (voice != vo) {
      vo.pause();
    }
  });

  $(".play-btn").removeClass("playing");

  if (voice.paused) {
    voice.play();
    $(this).addClass("playing");
  } else {
    $(this).removeClass("playing");
    voice.pause();
  }
});

$(document).ready(function () {
  const stateSelect = $(".state_location");
  const citySelect = $(".city_location");

  // Initially disable the city select option
  citySelect.prop("disabled", true);
  citySelect.css("display", "none");

  stateSelect.on("change", function () {
    if ($(this).val() === "26") {
      citySelect.prop("disabled", false);
      citySelect.css("opacity", 1);
      citySelect.css("display", "flex");
    } else {
      citySelect.prop("disabled", true);
      citySelect.prop("value", "null");
      citySelect.css("opacity", 0);
      citySelect.css("display", "none");
    }
  });
});
