//dom 相关==========================
export const getBoundingClientRect = function ({ dom, rotate }) {
    return dom.getBoundingClientRect();
};

export const getRectWidth = function ({ dom, rotate }) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.width;
};
export const getRectHeight = function ({ dom, rotate }) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.height;
};

//窗口相关
export const getViewPortHeight = function ({ rotate }) {
    return !rotate ? window.innerHeight : window.innerWidth;
};
export const getViewPortWidth = function ({ rotate }) {
    return !rotate ? window.innerWidth : window.innerHeight;
};
//滚动相关
export const getBodyScrollY = function () {
    return document.documentElement.scrollTop || document.body.scrollTop;
};
export const getBodyScrollX = function () {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
};
export const getDomScrollX = function (dom) {
    return dom.scrollLeft;
};
export const getDomScrollY = function (dom) {
    return dom.scrollTop;
};

//是否在窗口可视区
export const isInView = function ({ dom, rotate, otherHeight = 0 }) {
    let rect = getBoundingClientRect({ dom: dom });
    let viewHeight = getViewPortHeight({});
    return rect.top >= 0 && rect.bottom <= viewHeight - otherHeight;
};

//是否在dom的可视区
/**
 *
 * @param {*} param0
 * @description
 *  dom 检测的目标dom
 *  wrapDom 容器dom
 *  overallVisible 是否完全都在可视区
 */
export const isInDomView = function ({
    dom,
    wrapDom,
    rotate,
    overallVisible = true,
}) {
    let rect = getBoundingClientRect({ dom: dom });
    let wrapDomReact = getBoundingClientRect({ dom: wrapDom });
    if (overallVisible) {
        //整个dom都在可视区nei
        return (
            wrapDomReact.bottom >= rect.bottom &&
            rect.top >= wrapDomReact.top &&
            rect.left >= wrapDomReact.left &&
            wrapDomReact.right >= rect.right
        );
    } else {
        //X轴方向范围内
        let xInView =
            rect.left >= wrapDomReact.left && wrapDomReact.right >= rect.right;
        //Y轴一部分在视图里面
        let yPartInView =
            (rect.bottom > wrapDomReact.top && rect.bottom < wrapDomReact.bottom) || //一部分超出顶部
            (rect.top < wrapDomReact.bottom && rect.top > wrapDomReact.top); //一部分超出底部
        //Y轴全部在shitu
        let yInView =
            wrapDomReact.bottom >= rect.bottom && rect.top >= wrapDomReact.top;
        //X轴一部分在视图
        let xPartInView =
            (rect.right > wrapDomReact.left && rect.right < wrapDomReact.right) || //一部分超出左侧
            (rect.left < wrapDomReact.right && rect.left > wrapDomReact.left); //一部分超出右侧
        console.log(
            "xInView",
            xInView,
            "yPartInView",
            yPartInView,
            "yInView",
            yInView,
            "xPartInView",
            xPartInView
        );
        return (xInView && yPartInView) || (yInView && xPartInView);
    }
};