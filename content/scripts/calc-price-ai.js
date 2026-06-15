var OPENAI_API_KEY =
  "Bearer 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"; // کلید API خود را اینجا وارد کنید
var ousyuu = []; // برای ذخیره مکالمات
var model = "gpt-3.5-turbo"; // مدل مورد استفاده

function checkInput() {
  const sendButton = document.getElementById("sendButton");
  const sentence = document.getElementById("sentence").value;
  sendButton.disabled = sentence.trim() === ""; // غیرفعال کردن دکمه ارسال اگر ورودی خالی باشد
}

function checkEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    // اگر کلید اینتر زده شد
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض اینتر (پریدن خط)
    chatTxt(); // ارسال پیام
  }
}

async function chatTxt() {
  let text = document.getElementById("sentence").value.trim();

  if (!text) return; // اگر ورودی خالی باشد، چیزی ارسال نشود

  ousyuu.push({ role: "user", content: text }); // ذخیره پیام کاربر

  // نمایش پیام کاربر بلافاصله
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<div class="message user-message fade-in">
                            <div class="user-profile"><img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="پروفایل کاربر"></div>
                            <p class="message-text">${text}</p>
                          </div>`;
  document.getElementById("sentence").value = ""; // پاک کردن ورودی پس از ارسال
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

  // نمایش لودر برای پاسخ هوش مصنوعی
  const loaderMessage = document.createElement("div");
  loaderMessage.classList.add("message", "ai-message", "fade-in");
  loaderMessage.innerHTML = `<span class="loader"></span>`;
  messagesDiv.appendChild(loaderMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

  const URL = "https://api.openai.com/v1/chat/completions";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: model,
      messages: ousyuu.slice(-10), // 10 پیام آخر را ارسال می‌کنیم
    }),
  };

  try {
    let resp = await fetch(URL, requestOptions);
    let answer = "خطا در ارتباط با سرور";

    if (resp.status === 200) {
      const data = await resp.json();
      answer = data["choices"][0]["message"]["content"].trim();
    }

    // حذف لودر
    messagesDiv.removeChild(loaderMessage); // حذف لودر

    // ایجاد پیام جدید برای پاسخ هوش مصنوعی
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "ai-message", "fade-in"); // ایجاد پیام جدید برای هوش مصنوعی
    newMessage.innerHTML = `<div class="ai-profile"><img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی"></div>
                            <p class="message-text">${answer}</p>`;

    messagesDiv.appendChild(newMessage); // اضافه کردن پیام جدید به لیست پیام‌ها
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "ai-message", "fade-in");
    newMessage.innerHTML = `<div class="ai-profile"><img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی"></div>
                           <p class="message-text">خطا در ارتباط با سرور</p>`;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

function initSettings() {
  // نمایش لودر اولیه برای پیام هوش مصنوعی
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<div class="message ai-message fade-in">
                            <span class="loader"></span>
                          </div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

  // پس از 1 ثانیه نمایش پیام "سلام چطور می‌توانم کمکتان کنم؟"
  setTimeout(() => {
    const lastMessage = messagesDiv.querySelector(".ai-message");
    lastMessage.innerHTML = `<div class="ai-profile"><img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی"></div>
                             <p class="message-text">هوش مصنوعی نماپلان هستم ! در خدمتم :)</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  }, 1000);
}

////////////////////////////////////////////////////////////////

function convertLinksToClickable(text) {
  // پیدا کردن لینک‌های داخل متن و تبدیلشون به تگ <a>
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" class="ai-link">$1</a>'
  );
}

async function sendToAI(userText) {
  var ousyuu = []; // ذخیره تاریخچه چت
  ousyuu.push({ role: "user", content: userText });

  const messagesDiv = document.getElementById("messages");

  //  نمایش لودر
  const loaderMessage = document.createElement("div");
  loaderMessage.classList.add("message", "ai-message", "fade-in");
  loaderMessage.innerHTML = `<span class="loader"></span>`;
  messagesDiv.appendChild(loaderMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

  const URL = "https://api.openai.com/v1/chat/completions";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: ousyuu.slice(-10), // ارسال 10 پیام آخر
    }),
  };

  try {
    let resp = await fetch(URL, requestOptions);
    let answer = "خطا در ارتباط با سرور";

    if (resp.status === 200) {
      const data = await resp.json();
      answer = data["choices"][0]["message"]["content"].trim();
      answer = convertLinksToClickable(answer); // لینک‌ها رو تبدیل کن
    }

    // حذف لودر
    messagesDiv.removeChild(loaderMessage);

    //  نمایش پاسخ هوش مصنوعی
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message", "fade-in");
    aiMessage.innerHTML = `
  <div class="ai-profile">
      <img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی">
  </div>
  <p class="message-text">${answer}</p>
`;
    messagesDiv.appendChild(aiMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    messagesDiv.removeChild(loaderMessage);

    // نمایش پیام خطا
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("message", "ai-message", "fade-in");
    errorMessage.innerHTML = `
  <div class="ai-profile">
      <img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی">
  </div>
  <p class="message-text">خطا در ارتباط با سرور</p>
`;
    messagesDiv.appendChild(errorMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  }
}

////////////////////////////////////////////////////////////////

const answers = {
  "تاثیر نوسانات ارز بر هزینه ساخت":
    "بسیاری از تجهیزات و برخی مصالح ساختمانی مانند آسانسور، درب‌های ضدسرقت و سیستم‌های هوشمند وابسته به واردات هستند، بنابراین تغییر نرخ ارز مستقیماً بر قیمت تمام‌شده تأثیر می‌گذارد. برای کنترل این تأثیر، می‌توان از تجهیزات داخلی با کیفیت مناسب استفاده کرد یا در زمان مناسب اقدام به خرید ارز و مصالح کلیدی نمود. سرمایه‌گذاری در بازارهای موازی مثل طلا و ارز تا زمان خرید مصالح نیز می‌تواند مانع از کاهش ارزش سرمایه شود.",
  "راه های کاهش هزینه نیروی کار":
    " افزایش دستمزد کارگران به دلیل تورم و کاهش نیروی کار ماهر در صنعت ساختمان اتفاق افتاده است. برای کاهش این هزینه، می‌توان از سیستم‌های ساخت صنعتی، قالب‌های پیش‌ساخته، رباتیک در ساخت و آموزش کارگران برای افزایش بهره‌وری استفاده کرد.",
  "راه های کاهش زمان برای اخذ جواز ساخت":
    "1.	خرید زمین‌های دارای جواز ساخت، روند پروژه را تسریع می‌کنند زیرا نیازی به طی کردن پروسه طولانی دریافت مجوز، که ممکن است چندین ماه زمان ببرد، ندارند. با خرید چنین زمینی، کارفرما مستقیماً وارد فاز طراحی و ساخت می‌شود و از تأخیرهای اداری اجتناب می‌کند." +
    "<br>" +
    " 2.	از مشاوران حقوقی و مهندسین مجرب برای تهیه مدارک و پیگیری فرآیند اخذ مجوزها استفاده کنید . " +
    "<br>" +
    " 3.	قبل از شروع پروژه، تمام قوانین و مقررات محلی را بررسی کنید تا از تاخیرهای غیرضروری جلوگیری شود . " +
    "<br>" +
    " 4.ارتباط خوب با ادارات مربوطه و رعایت دقیق ضوابط شهردار ی میتواند فرآیند را تسریع کند.",
  "تاثیر تورم بر هزینه ساخت":
    " تورم باعث افزایش قیمت مصالح و دستمزدها می‌شود و ممکن است بودجه اولیه کافی نباشد. برای کاهش اثر تورم، می‌توان از روش‌های تأمین مالی جایگزین مانند پیش‌فروش واحدها، اوراق مشارکت ساختمانی و سرمایه‌گذاری در بازارهای موازی مانند طلا و بورس تا زمان خرید مصالح استفاده کرد." +
    "<br><br>" +
    "همچنین برای کاهش اثرات آن، یکی از بهترین راهکارها، تسریع در روند ساخت پروژه است. هرچه زمان ساخت کوتاه‌تر باشد، کمتر تحت تأثیر نوسانات تورم قرار می‌گیرد. استفاده از سازه‌های فلزی LSF (Light Steel Frame)  یکی از روش‌های مؤثر در این راستا است. این نوع سازه‌ها سرعت ساخت را افزایش می‌دهند، زیرا نیاز به زمان کمتری برای نصب و اجرا دارند و به‌طور کلی فرآیند ساخت را کوتاه‌تر می‌کنند. این رویکرد باعث می‌شود که هزینه‌های ناشی از تورم تا حد زیادی کاهش یابد و پروژه با هزینه‌ای کمتر به اتمام برسد." +
    "<br><br>" +
    "البته سازه های LSF اگرچه به دلیل سرعت اجرا، سبکی و صرفه‌جویی در مصرف مصالح مورد توجه قرار گرفته‌اند، اما در مقایسه با سازه های فلزی و بتنی محدودیت‌هایی دارند که باید در طراحی و اجرای پروژه‌ها مدنظر قرار گیرند. مخصوصا در خلق فضاهای با کیفیت که باید خواسته‌های کارفرمایان با آنها مورد بررسی قرار گیرد. ",
  "تاثیر هزینه طراحی بر ساخت پروژه ها":
    "اگر طراحی توسط یک تیم با تجربه و خلاق صورت گیرد، باعث کاهش بسیاری از هزینه‌های ساخت می‌شود. از این جهت که در ابتدای امر تمامی چالش‌های طراحی برای برآورده کردن خواسته‌های کارفرما با هماهنگی و ادغام کامل با روابط فضایی، مسائل زیبایی شناسی، استفاده بهینه از متریال و مصالح نوین، حل چالش‌های اقلیمی و بستر، تحلیل و آنالیز سازه‌ای و سایر مسائل فنی بررسی می‌شود  و به یک راهکار بهینه می‌رسد. " +
    "<br><br>" +
    "بدین ترتیب، از این رو هنگامی که فرآیند ساخت آغاز می‌شود، تصمیمات آنی در پروژه گرفته نمی‌شود که متحمل هزینه‌های زمانی و مالی شود. تحلیل و بررسی همه جانبه در مرحله طراحی، امکان پیش‌بینی و پیشگیری از هزینه‌های احتمالی را فراهم کرده و روند ساخت را بهینه می‌کند. ",
  "سرمایه گذاری ساختمان در ایران به صرفه است؟":
    "ساخت ساختمان در ایران با توجه به تورم و نوسانات قیمت مصالح چالش‌برانگیز است، اما اگر به درستی برنامه‌ریزی شود، می‌تواند سودآور باشد. برای کاهش هزینه‌ها، بهتر است از مصالح داخلی با کیفیت استفاده کنید و پروژه را در کوتاه‌ترین زمان ممکن به پایان برسانید. همچنین، سرمایه‌گذاری در مناطق با پتانسیل رشد بالا می‌تواند بازدهی خوبی داشته باشد.",
  "راه های کاهش هزینه ساخت":
    "-	از مصالح با کیفیت و قیمت مناسب استفاده کنید." +
    "<br>" +
    "-	پروژه را به پیمانکاران معتبر و با تجربه بسپارید." +
    "<br>" +
    "-	هزینه‌های غیرضروری مانند تغییرات مکرر در طراحی را کاهش دهید." +
    "<br>" +
    "-	بخشی از بودجه را به هزینه‌های غیرمترقبه اختصاص دهید تا از وقفه در پروژه جلوگیری شود." +
    "<br>" +
    "-	میتوان از روش‌های تأمین مالی جایگزین مانند پیش‌فروش واحدها، اوراق مشارکت ساختمانی و سرمایه‌گذاری در بازارهای موازی مانند طلا و بورس تا زمان خرید مصالح استفاده کرد",
  "خرید زمین و ساخت خانه یا خرید یک ساختمان نوساز؟":
    "خرید زمین و ساخت ساختمان می‌تواند سود بیشتری داشته باشد، زیرا شما کنترل کامل بر طراحی و کیفیت ساخت دارید. اما اگر زمان یا تخصص کافی برای مدیریت پروژه ساخت را ندارید، خرید ساختمان نوساز می‌تواند گزینه بهتری باشد. در هر صورت، بررسی موقعیت مکانی و پتانسیل رشد منطقه بسیار مهم است.",
  "ساخت ساختمان سبز (Green Building)":
    "با وجود اهمیت و ضرورت ساختمان‌های سبز برای حفظ محیط زیست، در ایران به دلیل تحریم‌ها و محدودیت‌های واردات مواد اولیه و فناوری‌های نوین، پیاده‌سازی کامل این نوع ساختمان‌ها با چالش‌هایی مواجه است. بسیاری از مصالح و تجهیزات مورد نیاز برای ساخت ساختمان‌های سبز به راحتی قابل دسترسی نیستند و همین امر روند طراحی و ساخت را پیچیده‌تر و پرهزینه‌تر می‌کند." +
    "<br>" +
    "ساخت ساختمان‌های سبز در بلندمدت می‌تواند به دلیل کاهش مصرف انرژی و هزینه‌های نگهداری، مقرون به صرفه باشد. اگرچه هزینه‌های اولیه ممکن است بالاتر باشد، اما استفاده از انرژی‌های تجدیدپذیر و مصالح پایدار می‌تواند بازدهی خوبی داشته باشد. همچنین، این نوع ساختمان‌ها از نظر زیست‌محیطی و ارزش افزوده ملک، مزایای زیادی دارند. ",
  "یک نمونه جدول برنامه زمان بندی ساخت": `برای دانلود نمونه جدول برنامه زمان‌بندی ساخت، روی لینک زیر کلیک کنید: <br><br>
    <a href="/Construction_Schedule.xlsx" download="Construction_Schedule_template.xlsx" target="_blank" class="ai-link">📥 دانلود جدول زمان‌بندی</a>`,
};

document
  .querySelectorAll(".calc-price-ai .default-question")
  .forEach((item) => {
    item.addEventListener("click", function (event) {
      event.stopPropagation(); // جلوگیری از اجرا شدن اسکریپت پیش‌فرض

      const questionText = this.innerText.trim();

      // نمایش سؤال در چت مثل پیام کاربر
      const messagesDiv = document.getElementById("messages");
      const userMessage = document.createElement("div");
      userMessage.classList.add("message", "user-message", "fade-in");
      userMessage.innerHTML = `
            <div class="user-profile">
                <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="پروفایل کاربر">
            </div>
            <p class="message-text">${questionText}</p>
        `;
      messagesDiv.appendChild(userMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

      // حذف سؤال از لیست بعد از کلیک
      // this.remove();

      const loaderMessage = document.createElement("div");
      loaderMessage.classList.add("message", "ai-message", "fade-in");
      loaderMessage.innerHTML = `<span class="loader"></span>`;
      messagesDiv.appendChild(loaderMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

      // بعد از 1 ثانیه لودر حذف شده و پاسخ نمایش داده می‌شود
      setTimeout(() => {
        messagesDiv.removeChild(loaderMessage);

        const answerText =
          answers[questionText] || "متأسفم، اطلاعاتی در این مورد ندارم.";

        const aiMessage = document.createElement("div");
        aiMessage.classList.add("message", "ai-message", "fade-in");
        aiMessage.innerHTML = `
    <div class="ai-profile">
        <img src="https://picsum.photos/id/1/200/300" alt="پروفایل هوش مصنوعی">
    </div>
    <p class="message-text">${answerText}</p>
`;
        messagesDiv.appendChild(aiMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }, 3000);
    });
  });
