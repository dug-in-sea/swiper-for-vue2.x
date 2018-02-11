import { setTimeout } from "timers";

const PC_MDOE = 1;
const MOBILE_MODE = 2;

var tool = {
    //蒙层函数
    // (content, time, options)
    showToast: showToast,
    //获取url中的参数 并返回参数对象 
    getSearchObj: getSearchObj,
    //属性赋值
    oto: oto,
    //跳转
    turnToHome : turnToHome,
    //
    htmlRemInit : htmlRemInit,
    isInMobile : isInMobile,
    isInIos : isInIos,
    //更改页面title
    setPageTitle: setPageTitle,
    
};

export default tool;


//返回是否在移动端
function isInMobile() {
    let mobileReg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    return mobileReg.test(navigator.userAgent);
}

function isInIos() {
    let iosReg = /(iPhone|iPod|ios|iPad)/i;
    return iosReg.test(navigator.userAgent);
}

//根据设计稿大小设置html的fontsize属性
/**
 * @param {number} designedWidth 设计稿宽度 
 * @param {number} maxWidth 屏幕最大宽度
 * @param {number} minWidth 屏幕最小宽度
 */
let setRem = function(designedWidth, maxWidth, minWidth) {
    let html = document.getElementsByTagName("html")[0];

    let page_width = document.documentElement.clientWidth || document.body.clientWidth;
    page_width = (maxWidth && page_width > maxWidth) ? maxWidth : page_width;
    page_width = (minWidth && page_width < minWidth) ? minWidth : page_width;  

    html.style.fontSize = page_width / designedWidth * 100 + "px"; 
}

//初始化html的font-size
function htmlRemInit(options, isAutoChange = true) {
    let dev_mode = isInMobile() ? MOBILE_MODE : PC_MDOE; 
    options = options || {};

    let pc_width = options.pc_width || 750 ; 
    let pc_max = options.pc_max || 1024; 
    let pc_min = options.min || 600;

    let mobile_width = options.mobile_width || 750 ;
    let mobile_max = options.mobile_max || 768 ; 
    let mobile_min = options.mobile_min || 320 ;
    
    dev_mode === MOBILE_MODE ? setRem(mobile_width, mobile_max, mobile_min) : setRem(pc_width, pc_max, pc_min);

    let throttle = function(fn, context, designWidth, maxWidth, minWidth) {
        if (fn.isRun) return; 
        fn.isRun = true;
        fn.tId = setTimeout(function() {
            fn.call(context, designWidth, maxWidth, minWidth);
            fn.isRun = false;
        }, 100);
    }

    if (isAutoChange) {
        window.onresize = function() {
            if (dev_mode === MOBILE_MODE) {
                throttle(setRem, null, mobile_width, mobile_max, mobile_min);
            } else {
                throttle(setRem, null, pc_width, pc_max, pc_min);
            }
        }
    }
}



/**
 * @param {Object} options 用对象描述的形式写css 
 * eg {
 *      "background-color" : "red",
 *      "color" : "green",
 * } 
 * @param {Object} host 作用的dom对象
 * @returns {undefined}
 */
var optionsToStyle = function (options, host) {
    if (typeof options !== "object") return;
    for (var i in options) {
        if (!options.hasOwnproperty(i)) break;
        var key = i.replace("/-([a-z])/", "$1.toUpperCase()");
        var val = options[i];
        host.style[key] = val;
    }
};


/**
 * 蒙层函数
 * @param {string} content 要显示的toast文案 
 * @param {number} time 文案持续的时间,默认为1500ms
 * @param {object} options 以obj形式设置toast的样式，属性值用“” 
 *         {
 *           color : "red", 
 *           "background-color" : "green",   
 *         } 
 * @returns {undefined}
 */
function showToast(content, time, options) {
    var toast = document.createElement("div");
    var text = document.createElement("p");
    text.innerText = content;
    toast.appendChild(text);

    toast.style.backgroundColor = "rgba(0,0,0,0.9)";
    toast.style.color = "#fff";
    toast.style.fontSize = "0.25rem";
    toast.style.padding = "0.3rem";
    toast.style.paddingLeft = "0.4rem";
    toast.style.paddingRight = "0.4rem";
    toast.style.position = "fixed";
    toast.style.width = "80%";
    toast.style.lineHeight = "1.5";
    toast.style.left = "50%";
    toast.style.top = "50%";
    toast.style.transform = "translate(-50%,-50%)";
    toast.style.WebkitTransform = "translate(-50%,-50%)";
    toast.style.borderRadius = "0.1rem";
    toast.style.zIndex = "100000";
    toast.style.textAlign = "center";

    text.style.wordBreak = "keep-all";
    text.style.textAlign = "center";

    options = options || Object.create(null);
    optionsToStyle(options, toast);

    document.body.appendChild(toast);

    time = options.time || 1500;
    setTimeout(function () {
        document.body.removeChild(toast);
        toast = null;
    }, time);
}


/**
 * 获取url中的search，并返回search对象
 * @returns {Object} 
 * eg {
 *     token : "sewr1231312",
 *     lang : "en"
 * }
 */
function getSearchObj() {
    var resultObj = {};
    var qsString = location.search.length ? location.search.slice(1) : "";

    var items = qsString.length ? qsString.split("&") : [],
        item = null, key = null, value = null;

    var len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        key = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (key.length) {
            resultObj[key] = value;
        }
    }
    return resultObj;
}

/**
 * 将源对象的指定参数 赋值到目标对象上
 * @param {Object} dest 目标对象
 * @param {Object} origin 源对象
 * @param {List} keys 需要赋值的参数 
 * @returns 
 */
function oto(dest, origin) {
    if (!dest || !origin) return; 
    var keys = Array.prototype.slice.call(arguments, 2);
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (key in origin) {
            dest[key] = origin[key];
        }
    }
}

/**
 * bigo 内和pc端的跳直播间和主播资料页
 * @param {any} uid 主播uid
 * @param {any} roomid 直播间房间号
 * @param {any} isPc 是否在pc端 1为在
 * @param {any} isLive 是否在直播 
 */
function turnToHome(uid, roomid, isPc, isLive) {
    if (isPc == 1 && isLive == 1) {
        window.open("https://bigo.tv/" + uid);
    } 
    else if (roomid) {
        window.location.href = "bigolive://livevideoshow?roomid=" + roomid + "&uid=" + uid;
    } else {
        window.location.href = "bigolive://profile?uid=" + uid;        
    }
}


// 设置页面title，兼容ios
function setPageTitle(title) {
    var i = document.createElement("iframe");
    // i.style.display = "none";
    i.onload = function() {
        setTimeout( function() {
            i.remove();
        }, 200);
    };
    document.body.appendChild(i);
    document.title = title;
}
