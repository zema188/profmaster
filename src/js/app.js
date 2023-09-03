function changerActive(list) {
  for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
  }
  list = 0
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


//свайпер в карточки товара
if(document.querySelectorAll('.card__swiper').length) {
  const cardSwiper = new Swiper('.card__swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.card__next',
        prevEl: '.card__prev',
      },
  });
}


//свайпер в просмотренных товарах
if(document.querySelectorAll('.watch__swiper').length) {
  const watchSwiper = new Swiper('.watch__swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: '.watch__swiper-next',
        prevEl: '.watch__swiper-prev',
      },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      540: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  });
}





//Popup close 
document.addEventListener("click", function(event) {
  event = event || window.event;
  let target = event.target

  if(target.classList.contains('popup')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
    stopVideoPopup()
  }

  //закрытие меню кликом по темной области
  if(target.classList.contains('header-m')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.toggle('open')
    }
  }


  //закрытие блоков close-out по клику вне 
  if(!target.classList.contains('close-out') && !target.closest('.close-out')) {
    const closeOutBlock = document.querySelectorAll('.close-out')
    $( '.sort__list' ).slideUp( "slow", function() {});
    changerActive(closeOutBlock)
  }
})


//событие scroll у документа 
const headerW = document.querySelector('.header-w')
document.addEventListener("scroll", function(event) {
  if(window.pageYOffset) {
    headerW.classList.add('sticky')
  } else {
    headerW.classList.remove('sticky')
  }
})

if(window.pageYOffset) {
  headerW.classList.add('sticky')
} else {
  headerW.classList.remove('sticky')
}

let popupClose = document.querySelectorAll('.popup-close')
for(let i=0 ; i < popupClose.length ; i++) {
    popupClose[i].addEventListener("click",
    function() {
      let popup = popupClose[i].closest('.popup')
        popup.classList.remove('active')
        stopVideoPopup()
        bodyScrollLock.enableBodyScroll(popup);
    })
}


//бургер меню
let headerMenuBtn = document.querySelectorAll('.toggle-menu')
let mobileMenu = document.querySelector('.header-m')
for (let i = 0; i < headerMenuBtn.length; i++) {
  headerMenuBtn[i].addEventListener('click', function() {
    toggleMobileMenu()
  })
}

function toggleMobileMenu() {
  for (let i = 0; i < headerMenuBtn.length; i++) {
    headerMenuBtn[i].classList.toggle('open')
  }
  mobileMenu.classList.toggle('active')
}


// Size-control
window.addEventListener('resize', function(event){
  if(window.innerWidth >= 1024 && mobileMenu !== null) {
    mobileMenu.classList.remove('active')
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.remove('open')
    }
  }
})


//header-touch-swipe
function hedearMobileSwipeClose() {
  const headerMobile = document.querySelector('.header-m')
  const headerMobileContent = headerMobile.querySelector('.header-m__content')


  headerMobileContent.addEventListener('touchstart', handleTouchStart, false);
  headerMobileContent.addEventListener('touchmove', handleTouchMove, false);
  
  let xDown = null;
  let yDown = null;
  
  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  };
  
  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
  
      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
  
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            headerMobile.classList.remove('active')
            for (let i = 0; i < headerMenuBtn.length; i++) {
              headerMenuBtn[i].classList.toggle('open')
            }
            bodyScrollLock.enableBodyScroll(headerMobile);
          } else {
          }
      } else {
          if ( yDiff > 0 ) {
          } else {
          }
      }
      xDown = null;
      yDown = null;
  
  };
}
if(document.querySelectorAll('.header-m').length) {
  hedearMobileSwipeClose()
}