// let art_text_holder = document.getElementById("art_text_holder")?.innerHTML;
// let art_txt = document.getElementById("article-txt");
// art_txt.style.display = "none";
// art_txt.innerHTML = art_text_holder;

////////////////////////////////////////////////////////////////

let art_text_holder =
  document.getElementById("art_text_holder")?.textContent ||
  document.getElementById("art_text_holder")?.innerText;
let art_txt = document.getElementById("article-txt");
art_txt.style.display = "none";
art_txt.textContent = art_text_holder?.trim() || "";

// console.log("script 2");
var OPENAI_API_KEY =
  "Bearer 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"; // کلید API خود را اینجا وارد کنید
var ousyuu = []; // برای ذخیره مکالمات
var model = "gpt-4-turbo"; // مدل مورد استفاده

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
                            <div class="user-profile"><img src="/content/img/user-Icon1.jpg" alt="پروفایل کاربر"></div>
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
    newMessage.innerHTML = `<div class="ai-profile"><img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی"></div>
                            <p class="message-text">${answer}</p>`;

    messagesDiv.appendChild(newMessage); // اضافه کردن پیام جدید به لیست پیام‌ها
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "ai-message", "fade-in");
    newMessage.innerHTML = `<div class="ai-profile"><img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی"></div>
                           <p class="message-text">لطفا vpn دستگار را روشن کنید.</p>`;
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
    lastMessage.innerHTML = `<div class="ai-profile"><img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی"></div>
                             <p class="message-text">هوش مصنوعی نماپلان هستم ! در خدمتم :)</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  }, 1000);
}

////////////////////////////////////////////////////////////////

console.log("script 3");
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".default-question");

  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const questionText = this.innerText.trim();

      // نمایش سوال در بخش چت مثل پیام کاربر
      const messagesDiv = document.getElementById("messages");
      const userMessage = document.createElement("div");
      userMessage.classList.add("message", "user-message", "fade-in");
      userMessage.innerHTML = `
        <div class="user-profile">
            <img src="/content/img/user-Icon1.jpg" alt="پروفایل کاربر">
        </div>
        <p class="message-text">${questionText}</p>
    `;
      messagesDiv.appendChild(userMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین

      // حذف سوال از لیست
      // this.remove();

      // ارسال به هوش مصنوعی
      sendToAI(questionText);
    });
  });

  async function sendToAI(userText) {
    let art_txt = document.getElementById("article-txt").innerHTML;
    var ousyuu = []; // ذخیره تاریخچه چت
    ousyuu.push({ role: "user", content: art_txt }); // ذخیره پیام کاربر
    ousyuu.push({ role: "user", content: userText });

    const messagesDiv = document.getElementById("messages");

    //  نمایش لودر (دقیقاً همونی که تو فایلت بود)
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
        model: "gpt-4-turbo",
        messages: ousyuu.slice(-10), // ارسال 10 پیام آخر
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
      messagesDiv.removeChild(loaderMessage);

      //  نمایش پاسخ هوش مصنوعی
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("message", "ai-message", "fade-in");
      aiMessage.innerHTML = `
        <div class="ai-profile">
            <img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی">
        </div>
        <p class="message-text">${answer}</p>
    `;
      messagesDiv.appendChild(aiMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
    } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
      messagesDiv.removeChild(loaderMessage);

      //  نمایش پیام خطا
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("message", "ai-message", "fade-in");
      errorMessage.innerHTML = `
        <div class="ai-profile">
            <img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی">
        </div>
        <p class="message-text">لطفا vpn خود را روشن کنید.</p>
    `;
      messagesDiv.appendChild(errorMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
    }
  }
});

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
      <img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی">
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
      <img src="/content/img/AI-Icon.webp" alt="پروفایل هوش مصنوعی">
  </div>
  <p class="message-text">لطفا vpn خود را روشن کنید.</p>
`;
    messagesDiv.appendChild(errorMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // اسکرول به پایین
  }
}

