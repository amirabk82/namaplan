$(document).ready(function () {
  checkInputFull();
});

//-- Input Text

$(document).on(
  "focus",
  ".input-text > input, .input-text > textarea",
  function () {
    $(this).parent("div").addClass("is-focus");
    $(this).parent("div").removeClass("is-full");
  }
);

$(document).on(
  "blur",
  ".input-text > input, .input-text > textarea",
  function () {
    $(this).parent("div").removeClass("is-focus");

    if ($(this).val().length > 0) {
      $(this).parent("div").addClass("is-full");
    } else {
      $(this).parent("div").removeClass("is-full");
    }
  }
);
$(document).on(
  "change",
  ".input-text > input, .input-text > textarea",
  function () {
    $(this).blur();
  }
);

$(document).on("click", ".input-text h5", function () {
  $(this).parent().children("input").focus();
});

function checkInputFull() {
  $(".input-text > input, .input-text > textarea").blur();
}

//-- File Upload

$(document).on("change", ".input-file input[type=file]", function () {
  var fileName = $(this).val();
  if (fileName.length > 0) {
    $(this).parent().parent().children("em").html(fileName);
    $(this).parent().parent().addClass("is-select");
  } else {
    $(this).parent().parent().children("em").html("یک فایل انتخاب کنید ...");
    $(this).parent().parent().removeClass("is-select");
  }
});

//-- Number

$(
  '<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>'
).insertAfter(".input-number input");

$(document).on("click", ".quantity-up", function () {
  var spinner = $(this).closest(".input-number");
  var input = spinner.find('input[type="number"]');
  var oldValue = parseFloat(input.val());
  var max = input.attr("max");

  if (isNaN(oldValue)) {
    oldValue = 0;
  }
  if (oldValue >= max) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue + 1;
  }
  spinner.find("input").val(newVal);
  spinner.find("input").trigger("change");
});
$(document).on("click", ".quantity-down", function () {
  var spinner = $(this).closest(".input-number");
  var input = spinner.find('input[type="number"]');
  var oldValue = parseFloat(input.val());
  var min = input.attr("min");

  if (isNaN(oldValue)) {
    oldValue = 0;
  }
  if (oldValue <= min) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue - 1;
  }
  spinner.find("input").val(newVal);
  spinner.find("input").trigger("change");
});
