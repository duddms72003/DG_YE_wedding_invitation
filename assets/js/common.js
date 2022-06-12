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

/**
 * 타이머로 이미지 로드 체크
 * @param $item
 * @param initFunc
 * @param retryCount
 */
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

/**
 * 이미지 로드 promise then / catch
 * @param $items
 * @param initFunc
 */
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
const productPagination = ['Air Tents', 'Negative Pressue Frame', 'Function Panels'];
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
}

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
  // let sitesSwiperTop =null;
  /*
  function activeTxtGroup(idx) {
      let txtGroup= $('.sites-top .txt-group');
      let len=txtGroup.length;
      for (let i = 0; i < len; i++) {
          let items = txtGroup.eq(i);
          if( idx === i ){
              items.css({opacity: 1});
          }else{
              items.css({opacity:0});
          }
      }
  }
   */

  /*
  const resizeSiteSlide=()=>{
      if( Utils.getIsMobileSize()){
          sitesSwiperTop=new Swiper('.experience-top', {
              loop:true,
              spaceBetween: 8,
              slidesPerView: 1,
              pagination: {
                  el: '.experience-pagination',
                  type: 'fraction',
              }
          });
      }else{
          sitesSwiperTop=new Swiper('.experience-top', {
              loop:true,
              thumbs: {
                  swiper: sitesSwiperThumbs
              },
              pagination: {
                  el: '.experience-pagination',
                  clickable: true,
              },
              breakpoints: {
                  1023: {
                      spaceBetween: 8,
                      slidesPerView: 1,
                      pagination: {
                          el: '.experience-pagination',
                          type: 'fraction',
                      }
                  }
              },
              navigation: {
                  nextEl: '.site-button-next',
                  prevEl: '.site-button-prev',
              },
          });
      }

      sitesSwiperTop.on('transitionStart', function (e) {
          console.log( this.activeIndex )
          // activeTxtGroup(this.activeIndex);
      });
  }
  // activeTxtGroup(0);
  $(window).on('resize.experience-top', function(){
      resizeSiteSlide();
  });
  resizeSiteSlide();
   */
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
        spaceBetween: 10,
        slidesPerView: 1.6
      }
    },
  });
}

//end : swiper control ================================================


//scroll event / html 태그에 data-dir="up" 처럼 속성 표기가 이루어진다. 터치 다운시  data-dir="up" 터치 업  data-dir="down"
// scrollDir({dir: 'up', attribute: 'data-dir'});

//이벤트 대상 더미 객체 생성.
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

});


//scroll event
$(window).on('scroll.down-up', Utils.getThrottle(updateScrollEvent, 150));

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
});

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
$(document).on('click', '.gnb-list a', function (e) {
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
}


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
modalShortcutBtns.on('click.main-video', function (e) {
  videoPlayAndStop($mainVisualVideos.eq(currentCount));

  //메인 비디오 close 할때
  $('.js-modal-video-dismiss-btn, .modal-video').on('click', function (e) {
    $(this).off('click');
    videoPlayAndStop($mainVisualVideos.eq(currentCount), false);
  });
});


// system swiper
let systemPagination = ['For Medical Staffs', 'For Patients', 'Monitoring System'];
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
}

// start: 20220519 수정 ====================================================
function updateVideo(idx, $items, isTween = true) {

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
}

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

const $youtubeItems = $('.youtube-list .swiper-slide');
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
}


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




/* 계좌번호 클릭 */
function copy_to_clipboard(event) {
  const copyText = event.target.parentNode.previousElementSibling;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("Copy");
  alert('복사되었습니다, 감사합니다.');
}




// banner swiper - 모바일에서만 작동.
// bannerSwiperInit();
// $(window).on('resize', () => {
//   bannerSwiperInit();
// });
//
// function bannerSwiperInit() {
//   if (Utils.getIsMobileSize()) {
//     const bannerSwiper = new Swiper('.banner-list', {
//       slidesPerView: 2,
//       autoplay: {
//         delay: 3000,
//         disableOnInteraction: false
//       },
//       loop: true,
//       speed: 800,
//       on: {
//         resize: () => {
//           if (!Utils.getIsMobileSize()) {
//             bannerSwiper.destroy();
//           }
//         }
//       }
//     });
//   }
// }




// end: 20220509 추가 =============================================

//
// //하단 youtube 비디오 플레이
//   $('.press-video .js-modal-btn').modalVideo();
//
// // 20220509 추가 - promotional video youtube modal
//   $('.youtube-item .js-modal-btn').modalVideo();
//
// // 20220519 추가 - System & Interface youtube modal
//   $('.system-youtube .js-modal-btn').modalVideo();
