//窗口相关
export const getViewPortHeight = function() {
    return window.innerHeight;
};
export const getViewPortWidth = function() {
    return window.innerWidth;
};

//dom 相关==========================
export const getComputedStyle = window.getComputedStyle; //获取dom真实样式
//getBoundingClientRect 返回的width，height 永远是相对设备方向而言的，如果旋转了90度，width就等于样式高
export const getBoundingClientRect = function({ dom, rotate = 0 } = {}) {
    let rect = dom.getBoundingClientRect();
    return rect;
};
//获取相对用户设备方向的宽
export const getRectWidth = function({ dom, rotate = 0 } = {}) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.width;
};
//获取相对用户设备方向的高
export const getRectHeight = function({ dom, rotate = 0 } = {}) {
    let obj = getBoundingClientRect({ dom, rotate });
    return obj.height;
};
//获取计算后的样式宽
export const getBlockWidth = function(dom) {
    let obj = getComputedStyle(dom);
    return parseInt(obj.width);
};
//获取计算后的样式高
export const getBlockHeight = function(dom) {
    let obj = getComputedStyle(dom);
    return parseInt(obj.height);
};
//滚动相关
export const getBodyScrollY = function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};
export const getBodyScrollX = function() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
};
export const getDomScrollX = function(dom) {
    return dom.scrollLeft;
};
export const getDomScrollY = function(dom) {
    return dom.scrollTop;
};

//是否在窗口可视区
export const isInView = function({ dom, otherHeight = 0 }) {
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
 * otherHeight 底部覆盖元素高度
 */
export const isInDomView = function({
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
export const getScrollableChildren = function(box, maxLoop = 100, dir = "v") {
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
 * @param {*} dom ,【可滚动】的dom容器
 * @param {*} viewPort 可能是dom，可能是window
 * @param {*} otherHeight
 * @returns {x:number,y:number}
 */
export const getDomToVisbleDis = function({
    dom,
    viewPort,
    yOtherHeight = 0,
    xOtherHeight = 0,
    rotate = 0,
} = {}) {
    let rect = getBoundingClientRect({ dom });
    let wrapStyle = getComputedStyle(dom);
    console.log("dom????", dom);
    // let wrapHeight = getBlockHeight(dom);
    console.log("????");
    let wrapPaddingTop = parseInt(wrapStyle.paddingTop);
    let wrapPaddingBottom = parseInt(wrapStyle.paddingBottom);

    if (viewPort instanceof Element) {
        let wrapRect = getBoundingClientRect({ dom: viewPort });
        console.log("rotate", rotate);
        //旋转前和旋转后，计算得到的x y一样才是正常的，因为内部dom没有滚动，变得是外部dom的旋转
        if (rotate == -90) {
            let obj = {
                y: rect.right -
                    wrapRect.right +
                    yOtherHeight -
                    (wrapPaddingTop + wrapPaddingBottom),
                x: wrapRect.bottom - rect.bottom + xOtherHeight,
            };
            console.log("-90", obj);
            return obj;
        } else if (rotate == 90) {
            let obj = {
                y: wrapRect.left -
                    rect.left +
                    yOtherHeight -
                    (wrapPaddingTop + wrapPaddingBottom),
                x: rect.bottom - wrapRect.bottom + xOtherHeight,
            };
            return obj;
        }
        let obj = {
            y: rect.bottom -
                wrapRect.bottom +
                yOtherHeight -
                (wrapPaddingTop + wrapPaddingBottom),
            x: rect.left - wrapRect.left + xOtherHeight,
        };
        return obj;
    } else {}
    return null;
};