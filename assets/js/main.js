// popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 300;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
//menu
const header = document.querySelector('.header');
const btnMenu = document.querySelector(".header-bottom_menu");
const menu = document.querySelector(".header-bottom_drop");
const list = document.querySelectorAll('.header-bottom_drop-box_item');
const bntclose = document.querySelector('.header-bottom_drop-close');
// const body = document.body;
bntclose.addEventListener("click", () => {
    menu.classList.remove('opens');
    body.classList.remove("noscroll");
    header.classList.remove('opens-visibility');
});
const toggleMenu = function () {
  menu.classList.toggle("opens");
  body.classList.toggle("noscroll");
  header.classList.toggle('opens-visibility');
  list.forEach((link) => {
    link.addEventListener("click", closeOnClick);
  });
}

btnMenu.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu();
});
document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu || menu.contains(target);
  const its_btnMenu = target == btnMenu;
  const menu_is_active = menu.classList.contains("opens");

  if (!its_menu && !its_btnMenu && menu_is_active) {
      toggleMenu();
  }
  
});
function closeOnClick() {
    menu.classList.remove('opens');
    body.classList.remove("noscroll");
    header.classList.remove('opens-visibility');
}

// // Показать еще
const showMore = document.querySelector('.btn-download');
const cards = document.querySelectorAll('.photo-gallery_content-card').length;
const darkening = document.querySelector('.darkening');

let items = 10;

showMore.addEventListener('click', () => {
  items += 4;
  const array = Array.from(document.querySelector('.photo-gallery_content').children);
  const visItems = array.slice(0 , items);

  visItems.forEach(el => el.classList.add('is-visible'));
    
  if(visItems.length === cards) {
    showMore.style.display = 'none';
    if (lastVisibleElement) {
        lastVisibleElement.classList.remove('darkening');
      }
  }
});
function getLastVisibleDiv() {
    return Array.from(document.querySelectorAll('.photo-gallery_content-card'))
                .reverse()
                .find(div => div.offsetParent !== null);
  }
  let lastVisibleElement = getLastVisibleDiv();
  if (lastVisibleElement) {
    lastVisibleElement.classList.add('darkening');
  }

//slider
const swiper = new Swiper('.fitness_swiiper', {
    loop: true,
    autoplay: {
        delay: 2000,       
    },
    navigation: {
        nextEl: '.fitness-next',
        prevEl: '.fitness-prev',
      },
});

const swiperTwo = new Swiper('.maps_swiper', {
    slidesPerView: 1,
    spaceBetween: 1,
	centeredSlides:true,
    autoHeight: true,
    loop: true,
    navigation: {
      nextEl: '.maps-wrapper-arrow-next',
      prevEl: '.maps-wrapper-arrow-prev',
    },
    breakpoints: {
        1700: {
            slidesPerView: 3,
            autoHeight: false,
        },
        1260: {
            slidesPerView: 1.9,
            autoHeight: false,
        },
        1020: {
            slidesPerView: 1.6,
            autoHeight: false,
        },
    },
  });


  
let swipers = new Swiper(".coaches_description-swiper", {
    spaceBetween: 10,
    slidesPerView: 1,
    initialSlide: 1,
    speed: 500,
    loop: true,
    allowTouchMove: false
});
let swipertwo = new Swiper(".coaches_people-swiper", {
    slidesPerView: 1,
    initialSlide: 1,
    сenteredSlides: false,
    loop: true,
    speed: 500,
    autoHeight: true,
    navigation: {
      nextEl: ".coaches-next",
      prevEl: ".coaches-prev",
    },
    breakpoints: {
        1020: {
            centeredSlides:true,
            speed: 700,
            slidesPerView: 3,
            autoHeight: false,
        },
    },
    thumbs: {
      swiper: swipers,
    },
});