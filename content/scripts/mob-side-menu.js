// let sideMenu_haveL1 = document.querySelector(".have-sub-side");
// let sideMenu_haveL1_2 = document.querySelector(".have-sub-side_2");
// let sideMenu_haveL2 = document.querySelector(".have_l2");

// let sideMenu_checkInput_L1 = document.querySelector(".submenu_l1");
// let sideMenu_checkInput_L1_2 = document.querySelector(".submenu_l1_2");
// let sideMenu_checkInput_L2 = document.querySelector(".submenu_l2");

// let sideMenu_L1 = document.querySelector(".submenu-holder-side");
// let sideMenu_L1_2 = document.querySelector(".submenu-holder-side_2");
// let sideMenu_L2 = document.querySelector(".submenu-holder-l2-side");

// sideMenu_haveL1.addEventListener("click", function (e) {
//   if (!sideMenu_L1) return; // جلوگیری از خطا اگه المنت پیدا نشه

//   // تغییر وضعیت چک‌باکس
//   sideMenu_checkInput_L1.checked = !sideMenu_checkInput_L1.checked;
//   //   console.log(sideMenu_checkInput.checked);

//   // تغییر وضعیت نمایش منو
//   if (sideMenu_checkInput_L1.checked) {
//     sideMenu_L1.style.display = "block";
//     sideMenu_L1.style.height = "auto";
//   } else {
//     sideMenu_L1.style.display = "none";
//     sideMenu_L1.style.height = "0";
//   }
// });

// sideMenu_haveL1_2.addEventListener("click", function () {
//   if (!sideMenu_L1_2) return; // جلوگیری از خطا اگه المنت پیدا نشه

//   // تغییر وضعیت چک‌باکس
//   sideMenu_checkInput_L1_2.checked = !sideMenu_checkInput_L1_2.checked;
//   //   console.log(sideMenu_checkInput.checked);

//   // تغییر وضعیت نمایش منو
//   if (sideMenu_checkInput_L1_2.checked) {
//     sideMenu_L1_2.style.display = "block";
//     sideMenu_L1_2.style.height = "auto";
//   } else {
//     sideMenu_L1_2.style.display = "none";
//     sideMenu_L1_2.style.height = "0";
//   }
// });

// sideMenu_haveL2.addEventListener("click", function () {
//   if (!sideMenu_L2) return; // جلوگیری از خطا اگه المنت پیدا نشه

//   // تغییر وضعیت چک‌باکس
//   sideMenu_checkInput_L2.checked = !sideMenu_checkInput_L2.checked;
//   //   console.log(sideMenu_checkInput.checked);

//   // تغییر وضعیت نمایش منو
//   if (sideMenu_checkInput_L2.checked) {
//     sideMenu_L2.style.display = "flex";
//     sideMenu_L2.style.height = "auto";
//   } else {
//     sideMenu_L2.style.display = "none";
//     sideMenu_L2.style.height = "0";
//   }
// });

// گرفتن تمام دکمه‌های باز کننده منو
let sideMenu_haveL1 = document.querySelector(".have-sub-side");
let sideMenu_haveL1_2 = document.querySelector(".have-sub-side_2");
let sideMenu_haveL2 = document.querySelector(".have_l2");

// گرفتن چک‌باکس‌های مرتبط
let sideMenu_checkInput_L1 = document.querySelector(".submenu_l1");
let sideMenu_checkInput_L1_2 = document.querySelector(".submenu_l1_2");
let sideMenu_checkInput_L2 = document.querySelector(".submenu_l2");

// گرفتن زیرمنوها
let sideMenu_L1 = document.querySelector(".submenu-holder-side");
let sideMenu_L1_2 = document.querySelector(".submenu-holder-side_2");
let sideMenu_L2 = document.querySelector(".submenu-holder-l2-side");

function toggleSubMenu(trigger, submenu, checkbox) {
  if (!submenu) return; // جلوگیری از خطا اگه المنت پیدا نشه

  checkbox.checked = !checkbox.checked; // تغییر وضعیت چک‌باکس
  trigger.classList.toggle("open-sub"); // اضافه/حذف کلاس به تگ a

  if (checkbox.checked) {
    trigger.style.backgroundColor = "#fff";
    trigger.style.color = "#00022a";
    submenu.style.display = "block";
    submenu.style.height = "auto";
  } else {
    trigger.style.backgroundColor = "transparent";
    trigger.style.color = "#fff";
    submenu.style.display = "none";
    submenu.style.height = "0";
  }
}

// اضافه کردن رویداد کلیک به هر آیتم منو
sideMenu_haveL1.addEventListener("click", function () {
  toggleSubMenu(sideMenu_haveL1, sideMenu_L1, sideMenu_checkInput_L1);
});

sideMenu_haveL1_2.addEventListener("click", function () {
  toggleSubMenu(sideMenu_haveL1_2, sideMenu_L1_2, sideMenu_checkInput_L1_2);
});

sideMenu_haveL2.addEventListener("click", function () {
  toggleSubMenu(sideMenu_haveL2, sideMenu_L2, sideMenu_checkInput_L2);
});
