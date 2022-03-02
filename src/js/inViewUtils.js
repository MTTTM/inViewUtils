//dom 相关==========================
export const getBoundingClientRect = function ({ dom, rotate = 0 } = {}) {
    let rect = dom.getBoundingClientRect();
    if (rotate == 90) {
        //x left
        //y top
        let obj = {
            left: rect.top,
            x: rect.top,

            y: rect.right,
            top: rect.right,

            right: rect.bottom,
            bottom: rect.left,

            width: rect.height,
            height: rect.width
        }
        return obj;
    }
    else if (rotate == -90) {
        //x left
        //y top
        let obj = {
            left: rect.bottom,
            x: rect.bottom,

            y: rect.left,
            top: rect.left,

            right: rect.top,
            bottom: rect.right,

            width: rect.height,
            height: rect.width
        }
        return obj;
    }
    return rect;
};

export const getRectWidth = function ({ dom, rotate = 0 } = {}) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.width;
};
export const getRectHeight = function ({ dom, rotate = 0 } = {}) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.height;
};

//窗口相关
export const getViewPortHeight = function ({ rotate = 0 } = {}) {
    return !rotate ? window.innerHeight : window.innerWidth;
};
export const getViewPortWidth = function ({ rotate = 0 } = {}) {
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
    // console.log("otherHeight", otherHeight)
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
 * otherHeight 底部覆盖元素高度
 */
export const isInDomView = function ({
    dom,
    wrapDom,
    rotate,
    otherHeight = 0,
    overallVisible = true,
}) {
    let rect = getBoundingClientRect({ dom: dom });
    let wrapDomReact = getBoundingClientRect({ dom: wrapDom });

    let wrapDomReactBottom = wrapDomReact.bottom - otherHeight;
    console.log(
        "otherHeight",
        otherHeight,
        wrapDomReactBottom,
        "rect.bottom",
        rect.bottom
    );
    if (overallVisible) {
        //整个dom都在可视区nei
        return (
            wrapDomReactBottom >= rect.bottom &&
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
            (rect.bottom > wrapDomReact.top && rect.bottom < wrapDomReactBottom) || //一部分超出顶部
            (rect.top < wrapDomReactBottom && rect.top > wrapDomReact.top); //一部分超出底部
        //Y轴全部在shitu
        let yInView =
            wrapDomReactBottom >= rect.bottom && rect.top >= wrapDomReact.top;
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
/**
 * 获取dom的可滚动子组件
 * @param {*} box  检测的dom
 * @param {*} maxLoop  最大轮询次sun
 * @param {*} dir  检测滚动方向
 * @returns  dom
 */
export const getScrollableChildren = function (box, maxLoop = 100, dir = "v") {
    let v = 0;
    let direction = dir == "h" ? "h" : "v";
    var result = null;

    function check(box) {
        var childs = box.children;
        if (result) {
            return result;
        }
        if (v > maxLoop) {
            return undefined;
        }
        for (let i = 0; i < childs.length; i++) {
            v++;
            var el = childs[i];
            if (direction === "v" && el.scrollHeight > el.clientHeight) {
                result = el;
                break;
            } else if (direction === "h" && el.scrollWidth > el.clientWidth) {
                result = el;
                break;
            } else if (!result && v < maxLoop && el.children) {
                check(el, maxLoop);
            }
        }
        return result;
    }
    return check(box, maxLoop);
};
/**
 *  获取dom到Y轴完全可见的距离
 * @param {*} dom
 * @param {*} viewPort 可能是dom，可能是window
 * @param {*} otherHeight
 * @returns {x:number,y:number}
 */
export const getDomToVisbleDis = function ({ dom, viewPort, yOtherHeight = 0, xOtherHeight = 0 } = {}) {
    let rect = getBoundingClientRect({ dom });
    if (viewPort instanceof Element) {
        let wrapRect = getBoundingClientRect({ dom: viewPort });
        return {
            y: rect.bottom - wrapRect.bottom + yOtherHeight,
            x: rect.left - wrapRect.left + xOtherHeight,
        }
    } else {
        //dom在容器window可视区的距离
        return {
            y: rect.bottom - getViewPortHeight() + yOtherHeight,
            x: rect.left - getViewPortWidth() + xOtherHeight,
        }
    }
    return null;
};