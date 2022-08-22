//start : swiper control ================================================
/**
 * 이미지 사이즈 체크
 * @param $items
 * @returns {boolean}
 */
function isProductVisualImgLoaded($items) {
  return $items.find('img').length > 0 && $items.find('img')[0].naturalHeight !== 0;
}

/**
 * 이미지 로드 체크 promise
 * @param isSuccessCallback
 * @returns {Promise<unknown>}
 */
function getMainImgData(isSuccessCallback) {
  return new Promise((resolve, reject) => {
    if (isSuccessCallback) {
      resolve('success');
    } else {
      reject(new Error('메인 비주얼 렌더링이 이루어지지 않았습니다.'));
    }
  });
}


function timer($item, initFunc, retryCount = 100) {
  //
  let imgCheckTimer = setTimeout(() => {
    //
    if ($item.find('img')[0].naturalHeight === 0) {
      timer($item, initFunc, retryCount - 1);
      console.log('retryCount=', retryCount);
      if (retryCount === 0) {
        clearTimeout(imgCheckTimer);
        alert('네트워크가 지연되고 있습니다. 새로 고침 해주세요~');
        return;
      }
    } else {
      initFunc.call(null);
      clearTimeout(imgCheckTimer);
    }
  }, 200);
}


function beforeUpdate($items, initFunc) {
  getMainImgData(isProductVisualImgLoaded($items)).then((resolve) => {
    console.log(resolve);
    initFunc.call(null);
  }).catch((reject) => {
    console.log('not element\n', reject);
    timer($items, initFunc);
  });
}

// product swiper
/*const productPagination = ['Air Tents', 'Negative Pressue Frame', 'Function Panels'];
const $productItems = $('.product-list .item-inner');
//이미지 태그를 감싸고 있는 컨테이너를 전달하면 된다.
beforeUpdate($productItems, productSlideInit);

function productSlideInit() {
  const productSwiper = new Swiper('.product-list', {
    loop: true,
    // cssMode: true,
    speed: 800,
    slidesPerView: 2, // or 'auto',
    spaceBetween: 48,
    centeredSlides: true,
    pagination: {
      el: '.product-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (productPagination[index]) + '</span>';
      }
    },
    navigation: {
      nextEl: '.product-list .swiper-button-next',
      prevEl: '.product-list .swiper-button-prev'
    },
    breakpoints: {
      1023: {
        spaceBetween: 30, // 20220509 수정
        slidesPerView: 1.083 // 20220509 추가
      }
    }
  });
}*/

// start: 20220509 수정 ====================================================
const $sitesListItems = $('.menu-list .swiper-slide');
//이미지 태그를 감싸고 있는 컨테이너를 전달하면 된다.
beforeUpdate($sitesListItems, sitesListSlideInit);

function sitesListSlideInit() {
  // site swiper
  const sitesSwiperThumbs = new Swiper('.menu-list', {
    slidesPerView: 1,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    loop: true,
    pagination: {
      el: '.experience-pagination',
      clickable: true
    },
    breakpoints: {
      1023: {
        spaceBetween: 8,
        slidesPerView: 1.075,
        centeredSlides: true,
        loop: false,
        pagination: {
          clickable: false
        }
      }
    }
  });

}

// end: 20220509 수정 ====================================================

const $plannerItems = $('.gallery-list .gallery-top .swiper-slide');
//이미지 태그를 감싸고 있는 컨테이너를 전달하면 된다.
beforeUpdate($plannerItems, plannerSlideInit);

function plannerSlideInit() {

  let plannerSwiperTop = new Swiper('.gallery-top', {
    loop: true,
    cssMode: true,
    centeredSlides: true,
    // slidesPerView: 1,
    /*thumbs: {
        swiper: plannerSwiperThumbs
    },*/
    breakpoints: {
      1023: {
        spaceBetween: 12.5,
        slidesPerView: 1.6
      }
    },
  });
}

//end : swiper control ================================================


//scroll event / html 태그에 data-dir="up" 처럼 속성 표기가 이루어진다. 터치 다운시  data-dir="up" 터치 업  data-dir="down"
// scrollDir({dir: 'up', attribute: 'data-dir'});

/*//이벤트 대상 더미 객체 생성.
const $EventObj = $('<div class="event-dummy"></div>');

//이벤트 종류 선언.
const SCROLL_UP_DOWN_EVENT = 'scrollUpDownEvent';

function isScrollable() {
  let scrolllHGap = Utils.getDocHeight() - Utils.getWindowHeight();
  // console.log(  Utils.getDocHeight(), Utils.getWindowHeight(),  (scrolllHGap > 30) )
  return (scrolllHGap > 30); // true 이면 화면 스크롤 가능.
}

let $header = $('header');
let $mainVisual = $('.main-visual');

let $topBtn = $('.top-btn');
$topBtn.on('click.top', function (e) {
  e.preventDefault();
  TweenMax.to(window, 0.5, {scrollTo: {y: 0}});
});

$EventObj.on(SCROLL_UP_DOWN_EVENT, function (e, params) {
  let scrollValue = params.value;
  //렌딩 헤더가 없다면 여기서 종료.
  if ($header[0] === undefined) {
    return
  }
  if ($mainVisual[0] === undefined) {
    return
  }
  let th = ($mainVisual.offset().top + $mainVisual.outerHeight()) - $header.outerHeight();
  const $bg = $header.find('.bg-header');

  // console.log( th, value )
  // $header.attr('style', '');
  if (10 < scrollValue) {
    $header.addClass('add-bg');
    if (th < scrollValue) {
      $bg.css({backgroundColor: '#fff'});
    } else {
      $bg.attr('style', '');
    }
    $topBtn.show();
    $bg.css({transform: 'translateY(0)'});
  } else {
    $topBtn.hide();
    $bg.css({transform: 'translateY(-80px)'});
    $header.removeClass('add-bg');
  }

});*/


//scroll event
/*$(window).on('scroll.down-up', Utils.getThrottle(updateScrollEvent, 150));

function updateScrollEvent(e) {
  // if( Utils.getIsMobileSize() ){ return }
  let scrollTop = $(this).scrollTop();
  $EventObj.trigger(SCROLL_UP_DOWN_EVENT, {value: scrollTop});
}


let $openMobileMenuBtn = $('.mob-menu');
let $closeMobileMenuBtn = $('.close-btn');
let $gnb = $('.gnb');
let $body = $('body');

$gnb.find('a').on('click.gnb', function (e) {
  if (Utils.getIsMobileSize()) {
    $gnb.removeClass('active');
    $body.removeClass('overflow');
  }
});*/

// function resizeStageEvent() {
//   if (Utils.getIsMobileSize()) {

//     $gnb.removeClass('active');
//     // $body.removeClass('overflow');
//     $header.removeClass('add-bg');

//     if ($openMobileMenuBtn.hasEvent('click.menu-open')) {
//       $openMobileMenuBtn.off('click.menu-open');
//     }
//     if ($closeMobileMenuBtn.hasEvent('click.menu-close')) {
//       $closeMobileMenuBtn.off('click.menu-close');
//     }

//     $openMobileMenuBtn.on('click.menu-open', function (e) {
//       $gnb.addClass('active');
//       // $body.addClass('overflow');
//     });
//     $closeMobileMenuBtn.on('click.menu-close', function (e) {
//       $gnb.removeClass('active');
//       // $body.removeClass('overflow');
//     });
//   }
// }

// $(window).on('resize.stage', function () {
//   resizeStageEvent();
// })
// resizeStageEvent();


//start : scroll masic ================================================
// const controller = new ScrollMagic.Controller();

/*// build tween
let tween = TweenMax.from("#animate", 0.5, {autoAlpha: 0, scale: 0.7});

// build scene
let scene = new ScrollMagic.Scene({triggerElement: "a#top", duration: 200, triggerHook: "onLeave"})
    .setTween(tween)
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);*/

// change behaviour of controller to animate scroll instead of jump
// controller.scrollTo((pos) => {
//   // console.log( pos )
//   TweenMax.to(window, 0.5, {scrollTo: {y: pos}});
// });

//  bind scroll to anchor links
/*$(document).on('click', '.gnb-list a', function (e) {
  let id = $(this).attr('href');
  // console.log( id )
  if ($(id).length > 0) {
    e.preventDefault();

    // trigger scroll
    controller.scrollTo(id);

    // if supported by the browser we can even update the URL.
    if (window.history && window.history.pushState) {
      history.pushState('', document.title, id);
    }
  }
});

//end : scroll masic ================================================
let currentCount = 0;
// main video swiper
const videoPagination = ['How to build up', 'About KARE Prodcut & System About'];
const videoSwiper = new Swiper('.video-list', {
  loop: false,
  speed: 800,
  pagination: {
    el: '.video-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (videoPagination[index]) + '</span>';
    }
  }
});
const modalShortcutBtns = $('.youtube-shortcut-btn .js-modal-btn');

function activeShortcutBtn(idx) {
  modalShortcutBtns.each(function (i, item) {
    if (i === idx) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}*/


// const $mainVisualVideos = $('.video-list .bg-video');
// //video ended event
// $mainVisualVideos.on('ended', function (e) {
//   // console.log( e )
//   //현재 카운트에서 다음 카운트 자동 계산
//   currentCount = Utils.getCount(currentCount, 1, true, true)
//   updateVideo(currentCount, $mainVisualVideos)
//   activeShortcutBtn(currentCount);
//   videoSwiper.slideTo(currentCount, 500);
// });
// updateVideo(currentCount, $mainVisualVideos);
// activeShortcutBtn(currentCount);
// modalShortcutBtns.modalVideo();


// videoSwiper.on('transitionStart', function (e) {
//   currentCount = this.realIndex;
//   updateVideo(currentCount, $mainVisualVideos);
//   activeShortcutBtn(currentCount);
// });

//video pagination 클릭시
/*videoSwiper.on('change', function(e){
    currentCount= this.realIndex;
    updateVideo( currentCount, $mainVisualVideos );
    activeShortcutBtn( currentCount );
});*/

//메인 상단비주얼에 goto video 버튼 클릭시
/*
modalShortcutBtns.on('click.main-video', function (e) {
  videoPlayAndStop($mainVisualVideos.eq(currentCount));

  //메인 비디오 close 할때
  $('.js-modal-video-dismiss-btn, .modal-video').on('click', function (e) {
    $(this).off('click');
    videoPlayAndStop($mainVisualVideos.eq(currentCount), false);
  });
});
*/


// system swiper
/*let systemPagination = ['For Medical Staffs', 'For Patients', 'Monitoring System'];
const systemSwiper = new Swiper('.system-list', {
  loop: false,
  effect: 'fade',
  fadeEffect: {crossFade: true},
  speed: 800,
  spaceBetween: 20,
  pagination: {
    el: '.system-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (systemPagination[index]) + '</span>';
    }
  },
  navigation: {
    nextEl: '.system-button-next',
    prevEl: '.system-button-prev'
  },
  breakpoints: {
    1023: {
      spaceBetween: 20,
      slidesPerView: 1
    }
  }
});
const $systemVideos = $('.system-list .bg-video');
let systemVidCurCount = 0;

function addSystemVideoEndedEvent() {
  $systemVideos.on('ended', function (e) {
    // console.log( e )
    //현재 카운트에서 다음 카운트 자동 계산
    systemVidCurCount = Utils.getCount(systemVidCurCount, 2, true, true)
    updateVideo(systemVidCurCount, $systemVideos, false); // 20220519 수정
    systemSwiper.slideTo(systemVidCurCount, 500);
  });
}

addSystemVideoEndedEvent();

function removeSystemVideoEndedEvent() {
  $systemVideos.off('ended');
}

systemSwiper.on('transitionStart', function (e) {
  systemVidCurCount = this.realIndex;
  updateVideo(systemVidCurCount, $systemVideos, false); // 20220519 수정
});
systemSwiper.on('slideChange', function () {
  systemVidCurCount = this.realIndex;
  // console.log( systemVidCurCount )
  updateVideo(systemVidCurCount, $systemVideos, false); // 20220519 수정
});

updateVideo(systemVidCurCount, $systemVideos, false); // 20220519 수정

function videoPlayAndStop($item, isPlay = true) {
  // console.log( $item )
  if (isPlay) {
    $item[0].pause();
  } else {
    $item[0].play();
  }
}*/

// start: 20220519 수정 ====================================================
/*function updateVideo(idx, $items, isTween = true) {

  $items.each(function (i, item) {
    let video = item;
    video.pause();
    video.currentTime = 0;
    var targetVid = $(this);

    if (isTween) {
      if (idx === i) {
        targetVid.show();
        TweenMax.set(video, {opacity: 0.1})
        TweenMax.to(video, 0.5, {
          opacity: 1, onComplete: function () {
            video.play();
          }
        })
      } else {
        targetVid.css({opacity: 0.1}).hide();
        video.pause();
        video.currentTime = 0;
      }
    } else {
      if (idx === i) {
        targetVid.show();
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}*/

// end: 20220519 수정 ====================================================

/*const mainYoutubeURL=[
 {url:'https://www.youtube.com/embed/bJHYL2HvjxE'},
 {url:'https://www.youtube.com/embed/ltRgLxIvsBc'},
 ];
 // 최상단 유튜브 링크 ( 새창 )
 $('#gotoMainVideo').on('click.main-youtube', function (e) {
 e.preventDefault();
 Utils.link(mainYoutubeURL[currentCount].url );
 });*/

// start: 20220509 추가 =============================================
// promotional video swiper

/*const $youtubeItems = $('.youtube-list .swiper-slide');
//이미지 태그를 감싸고 있는 컨테이너를 전달하면 된다.
beforeUpdate($youtubeItems, youtubeSlideInit);

function youtubeSlideInit() {
  const youtubeSwiper = new Swiper('.youtube-list', {
    loop: true,
    speed: 800,
    slidesPerView: 2, // or 'auto',
    spaceBetween: 50,
    centeredSlides: true,
    pagination: {
      el: '.youtube-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.youtube-button-next',
      prevEl: '.youtube-button-prev'
    },
    breakpoints: {
      1023: {
        spaceBetween: 8,
        slidesPerView: 1.075
      }
    }
  });
}*/


function clickGroomPopup(){
  const x = document.getElementById("popupGroom");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function clickBridePopup(){
  const x = document.getElementById("popupBride");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function closeBtnGroom(){
  const x = document.getElementById("popupGroom");
  x.style.display = "none";
}

function closeBtnBride(){
  const x = document.getElementById("popupBride");
  x.style.display = "none";
}





/* 계좌번호 복사 */
/*
function copy_to_clipboard(event) {
  const copyText = event.target.parentNode.previousElementSibling;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("Copy");
  alert('복사되었습니다.\n감사합니다. \n늘 행복이 가득하세요! \n♥ 영은 동근 올림 ♥');
}
*/

function copy_to_clipboard(event) {
  const copyText = event.target;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("Copy");
  alert('복사되었습니다.\n감사합니다. \n늘 행복이 가득하세요! \n♥ 영은 동근 올림 ♥');
}






/* 이미지 클릭 시 확대 */
/*$(function(){
//     이미지 클릭시 해당 이미지 모달
  $(".img").click(function(e){
    e.preventDefault();
    let img = new Image();
    img.src = $(this).attr("src")
    $('.modalBox').html(img);
    $(".modal").show();
  });
// 모달 클릭할때 이미지 닫음
  $(".modal").click(function (e) {
    $(".modal").toggle();
  });
});*/





/* 이미지 클릭 시 팝업 및 슬라이드 */
const overlay = document.querySelector(".slide-overlay");
let slides = document.querySelectorAll(".slides > li");
let slidePhoto = document.querySelectorAll(".slides > li > img");
const slide = document.querySelector(".slides");
// const thumbnails = document.querySelectorAll(".box__gallery > li");
const thumbnails = document.querySelectorAll(".img");
const photoCount = slides.length;
const duration = 400;
let bullets = 0;
let photoIndex = 0;

// 갤러리 모달창 이벤트
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "block";
    // 썸네일 원본 사진과 갤러리 슬라이드 이미지 소스 링크 연결
    for (let i = 0; i < thumbnails.length; i++) {
      // let photo = thumbnails[i].lastElementChild;
      let photo = thumbnails[i];
      // slidePhoto[i].src = photo.href;
      slidePhoto[i].src = photo.src;
    }
  });
});
document.querySelector(".close-btn").addEventListener("click", () => {
  overlay.style.display = "none";
});

/*document.querySelector(".slide-overlay").addEventListener("click", () => {
  overlay.style.display="none"
})*/

// bullet 이미지 개수에 맞게 생성하는 함수
function createBullets() {
  // bullet들의 리스트를 생성
  const bulletsList = document.createElement("ul");
  bulletsList.setAttribute("id", "bullets");
  overlay.appendChild(bulletsList);
  // 이미지 개수대로 bullet를 생성
  slides.forEach((slide, index) => {
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    // 이미지의 index를 a의 html에 집어넣음 (나중에 이미지 이동할 때 주소 역할이 되어줌)
    a.innerHTML = `${index}`;
    const li = document.createElement("li");
    li.appendChild(a);
    bulletsList.appendChild(li);
  });
  return (bullets = document.querySelectorAll("#bullets > li > a"));
}
createBullets();
bulletLink();


// bullet을 클릭하면 해당하는 번호의 이미지로 슬라이드 되는 함수
function bulletLink() {
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", (e) => {
      e.preventDefault();
      // 클릭된 bullet의 인덱스
      const clickedIndex = index;
      // 현재 bullet과 클릭된 bullet의 차이
      let step = clickedIndex - photoIndex;
      photoIndex = clickedIndex;
      //모든 bullet의 클래스를 없애고 클릭된 bullet에만 on 클래스 추가
      bulletClassReset();
      bullets[clickedIndex].classList.add("on");

      // 클릭할 때마다 순서가 바뀌는 slides들 업뎃
      slides = document.querySelectorAll(".slides>li")
      let currentSlides = [...slides];
      //step이 양수: 현재 요소보다 뒤에 오는 요소로 이동
      if (step > 0) {
        // 이미지 슬라이드 step의 수 만큼 앞에서 자른다
        let sliceSlides = currentSlides.slice(undefined, step);
        slide.style.transition = duration+"ms";
        slide.style.left=step * -100+"%";
        window.setTimeout(() => {
          slide.removeAttribute("style");
          // 잘린 요소들을 맨 뒤로 집어넣기..
          slide.append(...sliceSlides);
        }, duration);
      } else {
        // step이 음수: 현재 요소보다 앞에 있는 요소로 이동
        sliceSlides = currentSlides.slice(step);
        // 잘린 요소들을 맨 앞으로 집어넣기
        slide.prepend(...sliceSlides);
        slide.style.left = step * 100 + "%";
        window.setTimeout(()=>{
          slide.style.left = 0;
          slide.style.transition = duration+"ms";
        })
      }
      //서로 같은 경우 이동할 필요가 없기 때문에 함수 즉시 종료
      if (step==0) return;
    });
  });
}
//썸네일을 클릭하면 해당하는 사진으로 점프
thumbnails.forEach((thumbnail, index) => {
  // 클릭 이벤트 추가
  thumbnail.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedIndex = index;
    let step = clickedIndex - photoIndex;
    photoIndex = clickedIndex;
    bulletClassReset();
    bullets[clickedIndex].classList.add("on");
    // 클릭할 때마다 순서가 바뀌는 slides들 업뎃
    slides = document.querySelectorAll(".slides>li");
    let currentSlides = [...slides];
    if (step > 0) {
      // 이미지 슬라이드 step의 수 만큼 앞에서 자른다
      let sliceSlides = currentSlides.slice(undefined, step);
      // 잘린 슬라이드들 맨 뒤로 집어넣기..
      slide.append(...sliceSlides);
    } else {
      sliceSlides = currentSlides.slice(step);
      // 잘린 슬라이드들 맨 앞으로 집어넣기
      slide.prepend(...sliceSlides);
    }
  });
});





// 슬라이드 버튼 클릭 이벤트
document.querySelector(".--next").addEventListener("click", nextSlideImage);
document.querySelector(".--prev").addEventListener("click", prevSlideImage);

// 다음 사진으로 슬라이드
function nextSlideImage() {
  photoIndex++;
  photoIndex %= photoCount;
  slide.style.left = "-100%";
  slide.style.transition = duration + "ms";
  window.setTimeout(() => {
    slide.appendChild(slide.firstElementChild);
    slide.removeAttribute("style");
  }, duration);
  bulletClassReset();
  //해당하는 bullet에 on 클래스 넣기
  bulletIndex();
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
  photoIndex--;
  photoIndex %= photoCount;
  slide.insertBefore(slide.lastElementChild, slide.firstChild);
  slide.style.left = "-100%";
  slide.style.transition = "0ms";
  window.setTimeout(() => {
    slide.style.left = 0;
    slide.style.transition = duration+"ms";
  });
  bulletClassReset();
  //해당하는 bullet에 on 클래스 넣기
  bulletIndex();
}

// 모든 bullet의 on 클래스를 삭제
function bulletClassReset() {
  bullets.forEach((bullet) => {
    bullet.classList.remove("on");
  });
}

//해당하는 bullet에 on 클래스 넣기
function bulletIndex() {
  // photoIndex가 음수일 때를 고려
  let index = photoIndex + bullets.length;
  index %= bullets.length;
  bullets[index].classList.add("on");
}



let curPos = 0;
let postion = 0;
let start_x, end_x;
const IMAGE_WIDTH = 375;
const images = document.querySelectorAll(".img")

// images.addEventListener('touchstart', touch_start);
// images.addEventListener('touchend', touch_end);

function prev(){
  if(curPos > 0){
    postion += IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
}
function next(){
  if(curPos < 3){
    postion -= IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
}

function touch_start(event) {
  start_x = event.touches[0].pageX
}

function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
  }else{
    prev();
  }
}






function showIt() {
  const toBeShown = document.querySelectorAll(".scroll-y"); // consider adding :not(.scrolled) to selector to reduce the number of iterations if you don't want to support scrolling up

  // consider taking this outside of the loop and resetting it on window resize to optimize the loop
  const halfScreen = window.innerHeight / 1.5;

  toBeShown.forEach((item, i) => {
    const scrolled = (window.scrollY + window.innerHeight);// - (item.offsetHeight/2);

    if (item.offsetTop - window.scrollY < halfScreen) {
      item.classList.add('scrolled');
    } else {
      item.classList.remove('scrolled');
    }
  })

}

/*window.addEventListener('scroll', showIt);*/




