/**
 * jquery hasEvent 함수 추가
 */
(function ( $ ) {
    $.fn.hasEvent = function() {
        var ty = arguments[0], fn = arguments[1], da = $._data(this[0], 'events') || undefined;
        if (da === undefined || ty === undefined || da[ty] === undefined || da[ty].length === 0)  return false;
        if (fn === undefined) return true;
        return Boolean(fn == da[ty][0].handler);
    };
}( jQuery ));

var Utils = Utils || {};
Utils = ( function ($) {

    var _ua,
        _IE, _IEver, _IEflag, _EDGE,
        _Chrome, _ChromeVer,
        _FireFox, _FireFoxVer,
        _Safari, _SafariVer,
        _Opera, _OperaVer,
        _Mac,
        _iPhone,
        _iPad,
        _iOSver,
        _Android,
        _AndroidVer,
        _AndroidMobile,
        _AndroidTablet,
        _vendor,
        _hasTransition,
        _transitionEnd,
        _currentDeskTopBrowser,
        _currentDeviceInfo,
        _browserInfo,
        _doc = document;

    userAgentCheck();

    function userAgentCheck() {
        _ua = window.navigator.userAgent.toLowerCase();
        //console.log( _ua )
        // 브라우저 설정.
        if (_ua.indexOf("msie") != -1) {
            _IE = true;
            _ua.match(/msie (\d+\.\d)/);
            _IEver = parseFloat(RegExp.$1);
        } else if (window.navigator.appName === 'Netscape' && _ua.indexOf('trident') > -1) {
            _IE = true;
            _IEflag = 'trident/.*rv:';
            var versionSort = '([0-9]{1,})(\\.{0,}[0-9]{0,1})';
            var numCheckReg = new RegExp(_IEflag + versionSort);
            if (numCheckReg.exec(_ua) != null) {
                _IEver = parseFloat(RegExp.$1);
            } else {
                _IEver = 11;
            }
        } else if (_ua.indexOf('edge') > -1) {
            _EDGE = true;
            _IEflag = 'edge';
            var matches = _ua.match(/edge\/(\d+\.\d)/);
            _IEver = ( matches !== null ) ? matches[1] : 0;
        } else if (_ua.indexOf("chrome") !== -1) {
            _Chrome = true;
            _ua.match(/chrome[\/ ]?(\d+\.\d+)/);
            _ChromeVer = parseFloat(RegExp.$1);
        } else if (_ua.indexOf("firefox") !== -1) {
            _FireFox = true;
            _ua.match(/firefox[\/ ]?(\d+\.\d+)/);
            _FireFoxVer = parseFloat(RegExp.$1);

        } else if (_ua.indexOf("opera") != -1) {
            _Opera = true;
            _ua.match(/opera[\/ ]?(\d+\.\d+)/);
            _OperaVer = parseFloat(RegExp.$1);
        } else if (_ua.indexOf("safari") !== -1) {
            _Safari = true;
            _ua.match(/version[\/ ]?(\d+\.\d+)/);
            _SafariVer = parseFloat(RegExp.$1);
        }

        if (_ua.indexOf("iphone") != -1) {
            _iPhone = true;
            _ua.match(/iphone os (\d+)_(\d+)/);
            _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;
        } else if (_ua.indexOf("ipad") != -1) {
            _iPad = true;
            _ua.match(/cpu os (\d+)_(\d+)/);
            _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;
        } else if (_ua.indexOf("android") != -1) {
            _Android = true;
            _ua.match(/android (\d+\.\d)/);
            _AndroidVer = parseFloat(RegExp.$1);
            if (_ua.indexOf('mobile') != -1) {
                _AndroidMobile = true;
            } else {
                _AndroidTablet = true;
            }
        }

        if (_ua.indexOf('mac os') !== -1) {
            _Mac = true;
        }


        _browserInfo = [
            {item: _IE, type: 'ie', version: _IEver},
            {item: _EDGE, type: 'edge', version: _IEver},
            {item: _Chrome, type: 'chrome', version: _ChromeVer},
            {item: _FireFox, type: 'firefox', version: _FireFoxVer},
            {item: _Safari, type: 'safari', version: _SafariVer},
            {item: _Opera, type: 'opera', version: _OperaVer},
            {item: _iPhone, type: 'iphone', version: _iOSver},
            {item: _iPad, type: 'ipad', version: _iOSver},
            {item: _Android, type: 'android', version: _AndroidVer},
            {item: _AndroidMobile, type: 'android-mobile', version: _AndroidVer},
            {item: _AndroidTablet, type: 'android-tablet', version: _AndroidVer}
        ];


        var style = _doc.createElement('div').style;
        var crossTransforms = [{type: 'transform', prefix: ''}, {
            type: 'msTransform',
            prefix: '-ms-'
        }, {type: 'MozTransform', prefix: '-moz-'}, {type: 'webkitTransform', prefix: '-webkit-'}];

        for (var i = 0, len = crossTransforms.length; i < len; i++) {
            if (crossTransforms[i].type in style) {
                _vendor = crossTransforms[i].prefix;
            }
        }


        if ('transition' in style) {
            style.transition = 'opacity 0ms linear 0ms';
            if (style.transition != '') {
                _hasTransition = true;
                _transitionEnd = 'transitionend';
            }
        }

        if (_IEver > 9 && 'msTransition' in style) {
            style.msTransition = 'opacity 0ms linear 0ms';
            if (style.msTransition != '') {
                _hasTransition = true;
                _transitionEnd = 'transitionend';
            }
        }

        if ('MozTransition' in style) {
            style.MozTransition = 'opacity 0ms linear 0ms';
            if (style.MozTransition != '') {
                _hasTransition = true;
                _transitionEnd = 'transitionend';
            }
        }

        if ('webkitTransition' in style) {
            style.webkitTransition = 'opacity 0ms linear 0ms';
            if (style.webkitTransition != '') {
                _hasTransition = true;
                _transitionEnd = 'webkitTransitionEnd';
            }
        }
        //console.log(  _vendor)
    }


    function getVendorPrefix() {
        return _vendor;
    }

    function transformSupportCheck() {
        var styles = document.documentElement.style;
        return 'WebkitTransition' in styles && 'WebkitTransform' in styles || 'transition' in styles && 'transform' in styles
    }

    function hasScrollBar() {
        var body = $('body');
        return (body.prop("scrollHeight") === 0 && body.prop("clientHeight") === 0) || (body.prop("scrollHeight") > body.prop("clientHeight"));
    }

    function getDocHeight() {
        var doc = document;
        return Math.max(
            doc.body.scrollHeight, doc.documentElement.scrollHeight,
            doc.body.offsetHeight, doc.documentElement.offsetHeight,
            doc.body.clientHeight, doc.documentElement.clientHeight
        );
    }

    function browserInfo() {
        var results = [];

        for (var i = 0, len = _browserInfo.length; i < len; i++) {
            if (_browserInfo[i].item === true) {
                //console.log(_browserInfo[i].type, _browserInfo[i].item, _browserInfo[i].version )
                results.push({
                    type: _browserInfo[i].type,
                    version: _browserInfo[i].version,
                    item: _browserInfo[i].item
                });
            }
        }
        return results;
    }


    function getDeviceInfo() {
        return _currentDeviceInfo;
    }

    function setDeviceInfo(value) {
        _currentDeviceInfo = value;
    }

    function getDesktopBrowserInfo() {
        return _currentDeskTopBrowser;
    }

    function setDesktopBrowserInfo(infoObj) {
        _currentDeskTopBrowser = ( infoObj.type === 'ie' && infoObj.version === 8) ? String(infoObj.type + infoObj.version) : infoObj.type;
    }

    function getBrowser() {
        var info = browserInfo();
        var currentBrowser = '';
        if (info.length > 1) {
            var reg = /iphone|ipad|android|android-mobile|android-tablet/g;
            for (var i = 0; i < info.length; i++) {
                if (reg.test(info[i].type)) {
                    setDeviceInfo(info[i].type);
                    currentBrowser = 'mobile '+getDeviceInfo();
                }
            }
        } else {
            setDesktopBrowserInfo(info[0]);
            currentBrowser = 'desktop ' + getDesktopBrowserInfo();
        }
        return currentBrowser;
    }

    function browserSetting() {
        $('html').addClass(getBrowser());
    }
    function isIE() {
        return (_IE === true);
    }
    function isIEver() {
        return _IEver;
    }
    function isIEver8() {
        return (_IEver === 8);
    }

    browserSetting();

    /**
     * 인수로 전달된 엘리먼트의 영역 범위( 위치 및 사이즈 ) 호출
     * @param ele
     * @returns {*}
     */
    function getBoundingClientRect(ele) {
        var clientRect = ele.getBoundingClientRect();

        // ie8 에서 width/height 속성이 없다.
        if (typeof clientRect.height === 'undefined') {
            return {
                top: clientRect.top,
                bottom: clientRect.bottom,
                left: clientRect.left,
                right: clientRect.right,
                width: clientRect.right - clientRect.left,
                height: clientRect.bottom - clientRect.top
            };
        }
        return clientRect;
    }

    /**
     * 카운트 계산
     * @param {Number} count 현재 카운트값
     * @param {Number} len 롤링할 최대개수
     * @param {Boolean} mountUp (증가) true 이면 증가식
     * @param {Boolean} countLoop true 이면 무한 롤링
     */
    function getCalCount(count, len, mountUp, countLoop) {
        if (mountUp) {
            count++;
        } else {
            count--;
        }
        if (countLoop) {
            if (count > len){
                count = 0;
            }
            if (count < 0){
                count = len;
            }
        } else {
            if (count > len){
                count = len;
            }
            if (count <= 0){
                count = 0;
            }
        }
        return count;
    }

    /**
     * number counter 모션 정의
     * @param settings  - time: 시간, delay: 모션 딜레이, num: 카운트할 숫자( type -string ), ele: 제이쿼리 셀렉터 엘리먼트.
     * @example counterUp( {time:400, delay:1, num:'1,785,000', ele: $('.list-group .list .max')});
     */
    function counterUp( settings ){
        var $settings = settings;
        var $target =$settings.ele;
        var countUpDatas = [];
        var countFuncs;

        var nums = [];
        var delay=$settings.delay || 1;
        var time=$settings.time || 400;
        var divisions = time / delay;
        var num = $settings.num;
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, '');
        // 숫자 목록 생성
        for (var i = divisions; i >= 1; i--) {
            //  int 인 경우 int로 유지
            var newNum = parseInt(num / divisions * i);
            // 쉼표가있는 경우 쉼표 유지
            if (isComma) {
                while (/(\d+)(\d{3})/.test(newNum.toString())) {
                    newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                }
            }
            nums.unshift(newNum);
        }

        countUpDatas=nums;

        $target.text('0');

        // 완료 될 때까지 번호를 업데이트
        function updateNum() {

            $target.text( countUpDatas.shift() );
            if ( countUpDatas.length ) {
                setTimeout( countFuncs, $settings.delay);
            } else {
                countUpDatas=[];
                countUpDatas=null;
                countFuncs=null;
            }
        }
        countFuncs=updateNum;
        // 카운트 시작
        setTimeout( countFuncs, $settings.delay);
    }
    /**
     * 배열에서 속성명으로 오브젝트 데이터를 축출, 1차원 배열로 생성.
     * @param datas
     * @param propName
     * @returns {Array}
     */
    function valueByArray( datas, key ) {
        var result = [];
        for(var i=0;i<datas.length;i++){
            result.push( datas[i][key] );
        }
        return result;
    }


    return {
        getValueByArray:valueByArray,
        counterUp:counterUp,
        getCount:getCalCount,
        link: function ( url, target='_blank' ) {
            if (target === '_blank') {
                window.open(url);
            }else{
                window.location.href=url;
            }
        },
        getURLParamValue: function (key) {
            var url = decodeURIComponent(window.location.search.substring(1));
            var urlParams = url.split('&');
            var targetValue;
            for (var i = 0; i < urlParams.length; i++) {
                targetValue = urlParams[i].split('=');
                if (targetValue[0] === key) {
                    return targetValue[1];
                }
            }
            return -1;
        },

        addTrans:function( spd ) {
            var speed=spd || '0.5';
            return {
                "-webkit-transition" :"all "+speed+'s',
                "-moz-transition": "all "+speed+'s',
                "-o-transition": "all "+speed+'s',
                "-ms-transition" :"all "+speed+'s',
                "transition" :"all "+speed+'s'
            };
        },
        //디바이스 체크
        getDeviceInfo: getDeviceInfo,
        //데스크탑 브라우정 정보
        getDesktopBrowserInfo: getDesktopBrowserInfo,
        //문자열 전체를  for등의 루프로 개별 검색시 인덱스에 해당하는 문자열
        getCharByIndex: function(txt, idx) {
            return txt.charAt(idx);
        },
        /**
         * 문자열 여러개 중 개별 1개 문자에 대한 바이트 계산
         * @param txt 문자
         * @returns {number}
         */
        getCharByteSize: function(txt) {
            if (txt == null || txt.length == 0) {
                return 0;
            }
            //byte 는 -128 ~ 127 까지  0x00 ~ 0xFF (1 바이트)
            //2byte = 16bit = 2^16 = 65,536
            var charCode = txt.charCodeAt(0);
            if (charCode <= 127 ) {  //0x00007F
                return 1;
            } else if (charCode <= 2047 ) { //0x0007FF
                return 2;
            } else if (charCode <= 65535 ) {//0x00FFFF
                return 3;
            } else {
                return 4;
            }
        },

        /**
         * 여러 문자열 중 검색시 1개 문자에 대한 바이트 계산
         * @param txt 문자
         * @param idx 인덱스
         * @returns {*|number}
         */
        getCharIndexToBytes: function (txt, idx) {
            return Utils.getCharByteSize( Utils.getCharByIndex(txt, idx) );
        },
        /**
         * 문자열 전체를 한번에 검색하여 바이트 총 사이즈 계산
         * @param txt 문자열 전체
         * @returns {number}
         */
        getBytesTotalSize:function( txt ){
            var regx=/[\0-\x7f]|([0-\u07ff]|(.))/g;
            return txt.replace(regx,"$&$1$2").length;
        },
        /**
         * someNav  를  some-nav 이런식으로 변경시켜줌.
         * @param propertyName
         * @returns {string}
         */
        styleHyphenFormat: function (propertyName) {
            function upperToHyphenLower(match) {
                return '-' + match.toLowerCase();
            }
            return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
        },
        //벤더 프리픽스  -webkit- / -moz- / -ms- / -o- 등 현재 알맞는 프리픽스를 가져옴.
        getVendorPrefix: getVendorPrefix,
        /**
         * 크로스브라우징  getBoundingClientRect()
         * @param ele - 해당하는 엘리먼트
         * @returns  { top: ~, bottom: ~, left:~, right:~, width:~, height:~}
         */
        getBoundingClientRect: getBoundingClientRect,
        getDocHeight: getDocHeight,
        hasScrollBar: hasScrollBar,
        //모바일인지 체크
        isMobile: function () {
            //(_iPhone === true || _iPad === true || _Android === true)? true : false 의 의미
            return !!(_iPhone === true || _iPad === true || _Android === true);
        },
        //브라우저 정보 체크
        getBrowser: getBrowser,
        /**
         * 크로스브라우징 window.width
         * @returns {Number|number}
         */
        getWindowWidth: function () {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },
        /**
         * 크로스브라우징 window.height
         * @returns {Number|number}
         */
        getWindowHeight: function () {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        },
        getIsIE:isIE,
        getIsIEver8:isIEver8,
        /**
         * 브라우저 사이즈 측정 - 모바일인지 데스크탑 사이즈 인지 구분해 준다.
         * @returns {boolean}
         */
        getIsMobileSize:function() {
            //console.log( Utils.isMobile(), Utils.getWindowWidth()<1024,  isIEver8() )
            return !!( Utils.isMobile()===true || ( Utils.getWindowWidth()<1024 && isIEver8()===false ) )
        },
        getThrottle: function (fn, delay, scope) {
            delay || (delay = 250);
            var last, deferTimer;
            return function () {
                var context = scope || this;

                var now = +new Date,
                    args = arguments;
                if (last && now < last + delay) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, delay);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
        getNow: function () {
            return new Date().getTime();
        },
        getDebounce: function (fn, delay, immediate) {
            var timeout, args, context, timestamp, result;

            var later = function () {
                var last = Utils.getNow() - timestamp;

                if (last < delay && last >= 0) {
                    timeout = setTimeout(later, delay - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        result = fn.apply(context, args);
                        if (!timeout) context = args = null;
                    }
                }
            };

            return function () {
                context = this;
                args = arguments;

                timestamp = Utils.getNow();
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, delay);
                if (callNow) {
                    result = fn.apply(context, args);
                    context = args = null;
                }

                return result;
            };
        },
        getTransitionSupport: transformSupportCheck,
        /**
         * Object 인지 체크
         * @param value
         * @returns {boolean}
         */
        isObject:function (value){
            return value != null && typeof value === 'object';
        },
        /**
         * Array인지 체크
         * @param o
         * @returns {boolean}
         */
        isArray: function isArray(o) {
            //Object.prototype 의 리터럴 축약형 ({})
            return  ({}).toString.call(o) === '[object Array]';
        },
        /**
         * 함수인지 체크
         * @param func
         * @returns {*|boolean}
         */
        isFunction: function isFunction(func) {
            //Object.prototype 의 리터럴 축약형 ({})
            return func &&  ({}).toString.call(func) === '[object Function]';
        },
        /**
         * 함수 실행 시간 평가~
         * @param totalCnt
         * @param func
         */
        funcLog: function (totalCnt, func) {
            //@formatter:off
            var argLen = arguments.length,
                now = new Date(),
                len = (totalCnt != null || totalCnt != undefined || totalCnt > 0) ? totalCnt : 100,
                funcName = func.getName() || "default_function",
                start = now.getTime(),
                i = -1,
                params = [];

            while (++i < len) {
                if (argLen > 3) {
                    params = Array.prototype.slice.call(arguments, 3, argLen);
                    func.apply(null, params);
                } else {
                    func();
                }
            }
            var before = new Date(),
                inVal = (before.getTime() - start) / 1000;
            console.log(funcName + " 함수 실행시간=" + inVal);
        },
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },
        /**
         * undefined 공백 null 같은값 체크
         * @param value
         * @returns {*|boolean|{$deprecated, since, replacedBy}}
         */

        isEmpty: function (value) {
            return Utils.isUndefined(value) || value === '' || value === null || value !== value;
        },
        /**
         * width 100% 일때 height 스케일 측정해서 리사이즈 및 재배치
         * @param nw 이미지 원래 width 사이즈 img.naturalWidth
         * @param nh 이미지 원래 height 사이즈 img.naturalHeight
         * @param winW window width
         * @param maxH 고정시킬 height 값 ( 지정하게 되면 이미지 컨테이너에 해당값으로 고정된다. )
         * @returns {{height: number, margin: number, ratio: number, overSize: number}}
         */
        imageScaleTo: function (nw, nh, winW, maxH) {
            var that = this;
            var overHSize = 0;
            var calW = ( winW > nw ) ? winW - nw : nw - winW;
            var remainderRatio = ( winW > nw ) ? calW / winW : calW / nw;
            var direction = ( winW > nw ) ? 1 : -1;
            var changeH = nh + ( nh * remainderRatio) * direction;
            var align = null;
            var imgSize = 0;
            //
            if (changeH > maxH && maxH > 0) {
                overHSize = changeH;
                imgSize = maxH;
                align = 'center';
            } else {
                overHSize = changeH;
                imgSize = changeH;
                align = null;
            }

            var fitSize = ( overHSize > 0 ) ? Math.ceil(( overHSize - imgSize ) / 2) : 0;
            var alignDir = 1;
            if (!align) {
                alignDir *= 0;
            } else if (align === 'center') {
                alignDir *= -1;
            }

            return {
                height: imgSize,
                margin: fitSize * alignDir,
                ratio: remainderRatio,
                overSize: overHSize
            }
        }
    }
}(jQuery) );






