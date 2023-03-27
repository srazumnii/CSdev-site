let userPhone = "";


function openMenu() {
  if (window.screen.width > 680) return;
  if (!mobileMenu.classList.contains("mobile-menu-active")) {
    scrollUp()
    mobileMenu.classList.add("mobile-menu-active");
    headerContacts.classList.remove("header-contacts-display");
    headerLinks.classList.remove("header-links-display");
    document.body.classList.add("overflow_hidden");
  } else {
    mobileMenu.classList.remove("mobile-menu-active");
    headerContacts.classList.add("header-contacts-display");
    headerLinks.classList.add("header-links-display");
    document.body.classList.remove("overflow_hidden");
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider').forEach((el) => {
    new ItcSlider(el, {
      autoplay: true,
      loop: true,
      refresh: true
    });
  });
});


window.addEventListener('scroll', function () {
  if (scrollY < document.documentElement.clientHeight) {
    header.classList.remove("header_bg");
    arrow.hidden = true;
  } else {
    header.classList.add("header_bg");
    arrow.hidden = false;
  }
});


function showToast(txt, time = 5000) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  msg.innerText = txt;
  toast.classList.remove("hidden");
  setTimeout(hideToast, time, toast);
}

function hideToast(toast) {
  toast.classList.add("hidden");
}

document.getElementById("form_phone").addEventListener("keydown", e => {
  e.preventDefault();

  if (e.key === "Backspace") {
    userPhone = userPhone.split("")
    userPhone.pop();
    userPhone = userPhone.join("");
    addNumberChair(e.target)
    return
  }

  if (/\d/i.test(+e.key)) {
    userPhone += e.key;
    addNumberChair(e.target);
    return;
  }
})


function addNumberChair(el) {
  if (userPhone.length > 10) return;

  switch (userPhone.length) {
    case 0:
      el.value = `+7(___) ___-__-__`
      break;

    case 1:
      el.value = `+7(${userPhone}__) ___-__-__`
      break;

    case 2:
      el.value = `+7(${userPhone}_) ___-__-__`
      break;

    case 3:
      el.value = `+7(${userPhone}) ___-__-__`
      break;

    case 4:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone[3]}__-__-__`
      break;

    case 5:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 5)}_-__-__`
      break;

    case 6:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 6)}-__-__`
      break;

    case 7:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 6)}-${userPhone[6]}_-__`
      break;

    case 8:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 6)}-${userPhone.substring(6, 8)}-__`
      break;

    case 9:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 6)}-${userPhone.substring(6, 8)}-${userPhone[8]}_`
      break;

    case 10:
      el.value = `+7(${userPhone.substring(0, 3)}) ${userPhone.substring(3, 6)}-${userPhone.substring(6, 8)}-${userPhone.substring(8, 10)}`
      break;
  }
}


document.getElementsByTagName("form")[0].addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("form_name");
  const phone = `7${userPhone}`;
    // phone = document.getElementById("form-phone");

  if (!/^[А-Яа-яЁё\s]+$/.test(name.value)) {
    showToast("Пожалуйста, заполните имя корректно");
    return
  }

  // if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone.value)) {
  //   showToast("Пожалуйста, заполните номер телефона корректно");
  //   return
  // }

  const url = "https://script.google.com/macros/s/AKfycbwfaqmakftqiaK13o7HzJvCDakTmahMks1d8C9g5IegFjEpePg5RYmMpIutV3hIcroU/exec";
  fetch(`${url}?name=${name.value}&phone=${phone}`);
  document.getElementById("form_phone").value = "";
  showToast(`Благодарим за обращение, ${name.value}, мы свяжемся с Вами в ближайшее время`);
  name.value = "";
  userPhone = "";
})


document.getElementsByName("image-wrapper").forEach(el => {
  el.addEventListener("mouseover", (e) => {
    let images = el.getElementsByTagName("img");
    images[0].style = "display:none";
    images[1].style = "display:inline";
  })

  el.addEventListener("mouseout", (e) => {
    let images = el.getElementsByTagName("img");
    images[0].style = "display:inline";
    images[1].style = "display:none";
  })
})


for (let anchor of document.querySelectorAll('a[href*="#"]')) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    openMenu();
  })
}


function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    block: 'start'
  })
}