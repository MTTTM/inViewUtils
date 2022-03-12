(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.inViewUtils = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isInView = _exports.isInDomView = _exports.getViewPortWidth = _exports.getViewPortHeight = _exports.getScrollableChildren = _exports.getRectWidth = _exports.getRectHeight = _exports.getDomToVisbleDis = _exports.getDomToViewVisbleDis = _exports.getDomScrollY = _exports.getDomScrollX = _exports.getComputedStyle = _exports.getBoundingClientRect = _exports.getBodyScrollY = _exports.getBodyScrollX = _exports.getBlockWidth = _exports.getBlockHeight = void 0;

  //窗口相关
  var getViewPortHeight = function getViewPortHeight() {
    return window.innerHeight;
  };

  _exports.getViewPortHeight = getViewPortHeight;

  var getViewPortWidth = function getViewPortWidth() {
    return window.innerWidth;
  }; //dom 相关==========================


  _exports.getViewPortWidth = getViewPortWidth;
  var getComputedStyle = window.getComputedStyle; //获取dom真实样式
  //getBoundingClientRect 返回的width，height 永远是相对设备方向而言的，如果旋转了90度，width就等于样式高

  _exports.getComputedStyle = getComputedStyle;

  var getBoundingClientRect = function getBoundingClientRect(dom) {
    var rect = dom.getBoundingClientRect();
    return rect;
  }; //获取相对用户设备方向的宽


  _exports.getBoundingClientRect = getBoundingClientRect;

  var getRectWidth = function getRectWidth(dom) {
    var obj = getBoundingClientRect(dom);
    return obj.width;
  }; //获取相对用户设备方向的高


  _exports.getRectWidth = getRectWidth;

  var getRectHeight = function getRectHeight(dom) {
    var obj = getBoundingClientRect(dom);
    return obj.height;
  }; //获取计算后的样式宽


  _exports.getRectHeight = getRectHeight;

  var getBlockWidth = function getBlockWidth(dom) {
    var obj = getComputedStyle(dom);
    return parseFloat(obj.width);
  }; //获取计算后的样式高


  _exports.getBlockWidth = getBlockWidth;

  var getBlockHeight = function getBlockHeight(dom) {
    console.log("dom", dom);
    var obj = getComputedStyle(dom);
    return parseFloat(obj.height);
  }; //滚动相关


  _exports.getBlockHeight = getBlockHeight;

  var getBodyScrollY = function getBodyScrollY() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  };

  _exports.getBodyScrollY = getBodyScrollY;

  var getBodyScrollX = function getBodyScrollX() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  };

  _exports.getBodyScrollX = getBodyScrollX;

  var getDomScrollX = function getDomScrollX(dom) {
    return dom.scrollLeft;
  };

  _exports.getDomScrollX = getDomScrollX;

  var getDomScrollY = function getDomScrollY(dom) {
    return dom.scrollTop;
  }; //是否在窗口可视区


  _exports.getDomScrollY = getDomScrollY;

  var isInView = function isInView(_ref) {
    var dom = _ref.dom,
        _ref$otherHeight = _ref.otherHeight,
        otherHeight = _ref$otherHeight === void 0 ? 0 : _ref$otherHeight;
    var rect = getBoundingClientRect(dom);
    var viewHeight = getViewPortHeight({});
    return rect.top >= 0 && rect.bottom <= viewHeight - otherHeight;
  }; //是否在dom的可视区

  /**
   *
   * @param {*} param0
   * @description
   *  dom 检测的目标dom
   *  wrapDom 容器dom
   *  overallVisible 是否完全都在可视区
   * otherHeight 底部覆盖元素高度
   */


  _exports.isInView = isInView;

  var isInDomView = function isInDomView(_ref2) {
    var dom = _ref2.dom,
        wrapDom = _ref2.wrapDom,
        rotate = _ref2.rotate,
        _ref2$otherHeight = _ref2.otherHeight,
        otherHeight = _ref2$otherHeight === void 0 ? 0 : _ref2$otherHeight,
        _ref2$overallVisible = _ref2.overallVisible,
        overallVisible = _ref2$overallVisible === void 0 ? true : _ref2$overallVisible;
    var rect = getBoundingClientRect(dom);
    var wrapDomReact = getBoundingClientRect(wrapDom);
    var wrapDomReactBottom = wrapDomReact.bottom - otherHeight;
    console.log("otherHeight", otherHeight, wrapDomReactBottom, "rect.bottom", rect.bottom);

    if (overallVisible) {
      //整个dom都在可视区nei
      return wrapDomReactBottom >= rect.bottom && rect.top >= wrapDomReact.top && rect.left >= wrapDomReact.left && wrapDomReact.right >= rect.right;
    } else {
      //X轴方向范围内
      var xInView = rect.left >= wrapDomReact.left && wrapDomReact.right >= rect.right; //Y轴一部分在视图里面

      var yPartInView = rect.bottom > wrapDomReact.top && rect.bottom < wrapDomReactBottom || //一部分超出顶部
      rect.top < wrapDomReactBottom && rect.top > wrapDomReact.top; //一部分超出底部
      //Y轴全部在shitu

      var yInView = wrapDomReactBottom >= rect.bottom && rect.top >= wrapDomReact.top; //X轴一部分在视图

      var xPartInView = rect.right > wrapDomReact.left && rect.right < wrapDomReact.right || //一部分超出左侧
      rect.left < wrapDomReact.right && rect.left > wrapDomReact.left; //一部分超出右侧

      console.log("xInView", xInView, "yPartInView", yPartInView, "yInView", yInView, "xPartInView", xPartInView);
      return xInView && yPartInView || yInView && xPartInView;
    }
  };
  /**
   * 获取dom的可滚动子组件
   * @param {*} box  检测的dom
   * @param {*} maxLoop  最大轮询次sun
   * @param {*} dir  检测滚动方向
   * @returns  dom
   */


  _exports.isInDomView = isInDomView;

  var getScrollableChildren = function getScrollableChildren(box) {
    var maxLoop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "v";
    var v = 0;
    var direction = dir == "h" ? "h" : "v";
    var result = null;

    function check(box) {
      var childs = box.children;

      if (result) {
        return result;
      }

      if (v > maxLoop) {
        return undefined;
      }

      for (var i = 0; i < childs.length; i++) {
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
   *  获取dom到XY轴完全可见的距离
   * @param {*} dom ,被检测的dom
   * @param {*} viewPort  容器dom可滚动】
   * @param {*} otherHeight
   * @returns {x:number,y:number}
   */


  _exports.getScrollableChildren = getScrollableChildren;

  var getDomToVisbleDis = function getDomToVisbleDis() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        dom = _ref3.dom,
        viewPort = _ref3.viewPort,
        _ref3$yOtherHeight = _ref3.yOtherHeight,
        yOtherHeight = _ref3$yOtherHeight === void 0 ? 0 : _ref3$yOtherHeight,
        _ref3$xOtherHeight = _ref3.xOtherHeight,
        xOtherHeight = _ref3$xOtherHeight === void 0 ? 0 : _ref3$xOtherHeight,
        _ref3$rotate = _ref3.rotate,
        rotate = _ref3$rotate === void 0 ? 0 : _ref3$rotate;

    var rect = getBoundingClientRect(dom);
    var wrapStyle = getComputedStyle(dom);
    console.log("dom????", dom); // let wrapHeight = getBlockHeight(dom);

    console.log("????");
    var wrapPaddingTop = parseFloat(wrapStyle.paddingTop);
    var wrapPaddingBottom = parseFloat(wrapStyle.paddingBottom);

    if (viewPort instanceof Element) {
      var wrapRect = getBoundingClientRect(viewPort);
      console.log("rotate", rotate); //旋转前和旋转后，计算得到的x y一样才是正常的，因为内部dom没有滚动，变得是外部dom的旋转

      if (rotate == -90) {
        var _obj = {
          y: rect.right - wrapRect.right + yOtherHeight - (wrapPaddingTop + wrapPaddingBottom),
          x: wrapRect.bottom - rect.bottom + xOtherHeight
        };
        console.log("-90", _obj);
        return _obj;
      } else if (rotate == 90) {
        var _obj2 = {
          y: wrapRect.left - rect.left + yOtherHeight - (wrapPaddingTop + wrapPaddingBottom),
          x: rect.bottom - wrapRect.bottom + xOtherHeight
        };
        return _obj2;
      }

      var obj = {
        y: rect.bottom - wrapRect.bottom + yOtherHeight - (wrapPaddingTop + wrapPaddingBottom),
        x: rect.left - wrapRect.left + xOtherHeight
      };
      return obj;
    } else {}

    return null;
  }; //获取dom到浏览器窗口可视区的距离，如果是0说明在可视区内


  _exports.getDomToVisbleDis = getDomToVisbleDis;

  var getDomToViewVisbleDis = function getDomToViewVisbleDis() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        dom = _ref4.dom,
        _ref4$yOtherHeight = _ref4.yOtherHeight,
        yOtherHeight = _ref4$yOtherHeight === void 0 ? 0 : _ref4$yOtherHeight,
        _ref4$xOtherHeight = _ref4.xOtherHeight,
        xOtherHeight = _ref4$xOtherHeight === void 0 ? 0 : _ref4$xOtherHeight;

    var rect = getBoundingClientRect(dom);
    var winHeight = getViewPortHeight();
    var winWidth = getViewPortWidth();
    var y = 0;
    var x = 0; //在屏幕顶部

    if (rect.bottom < 0) {
      y = rect.top;
    } else if (rect.bottom - winHeight + yOtherHeight > 0) {
      //屏幕下方
      y = rect.bottom - winHeight + yOtherHeight;
    } else {
      //在可视区内，啥也不做
      y = 0;
    } //在屏幕左边


    if (rect.left < xOtherHeight) {
      x = rect.left + xOtherHeight;
    } else if (rect.left > winWidth) {
      //屏幕右边
      x = rect.right - winWidth + xOtherHeight;
    } else {
      x = 0; //视图内
    }

    return {
      y: y,
      x: x
    };
  };

  _exports.getDomToViewVisbleDis = getDomToViewVisbleDis;
});