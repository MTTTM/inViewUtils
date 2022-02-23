//dom 相关==========================
export const getBoundingClientRect = function({ dom, rotate }) {
    return dom.getBoundingClientRect();
};

export const getRectWidth = function({ dom, rotate }) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.width;
};
export const getRectHeight = function({ dom, rotate }) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.height;
};

//窗口相关
export const getViewPortHeight = function({ rotate }) {
    return !rotate ? window.innerHeight : window.innerWidth;
};
export const getViewPortWidth = function({ rotate }) {
    return !rotate ? window.innerWidth : window.innerHeight;
};
//滚动相关
export const getBodyScrollY = function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};
export const getDomScrollX = function(dom) {
    return dom.scrollLeft;
};
export const getDomScrollY = function(dom) {
    return dom.scrollTop;
};

//是否在窗口可视区
export const isInView = function({ dom, rotate, otherHeight = 0 }) {
    let rect = getBoundingClientRect({ dom: dom });
    let viewHeight = getViewPortHeight({});
    console.log("rect", rect, viewHeight);
    return rect.top >= 0 && rect.bottom <= viewHeight - otherHeight;
};

//是否在dom的可视区