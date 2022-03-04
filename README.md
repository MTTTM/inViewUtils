# 检测dom是否在视图内

## 提供函数列表
| 函数名        | 说明    |  参数  | 返回值|
| --------     | :-----   | :----|:----|
| isInDomView   | 检测dom在**容器dom**内是否可见      |   参考isInDomView说明   | boolean|
| isInView        | 检测dom在**窗口**内是否完全可见    |   检测的dom   | boolean|
| getScrollableChildren |获取可滚动的子节点一个或者null |参考 getScrollableChildren 说明|dom或null|
| getDomToVisbleDis        | 获取dom进入容器可视区距离    |   参考getDomToVisbleDis 说明   | {x:number,y:number}|
| getDomToViewVisbleDis| 获取dom到窗口可视区的距离| 参考 getDomToViewVisbleDis 说明| {x:number,y:number}|

## 其他辅助函数
| 函数名        | 说明    |  参数  |返回值|
| --------     | :-----   | :---- |:----|
| getBoundingClientRect   |   获取dom的rect对象    | 对象 dom   | rect 对象|
| getRectHeight        |   获取dom的rect对象的高度，如果标签旋转90度或-90度，得到的是基于设备方向的上的高度，不再是样式属性  |  对象dom    | number|
| getRectWidth        |   获取dom的rect对象的宽度，如果标签旋转90度或-90度，得到的是基于设备方向的上的高度，不再是样式属性  |  对象 dom   |number|
| getViewPortHeight        | 获取**窗口**高度    |   -   |number|
| getViewPortWidth        |   获取**窗口**宽度   |    -  |number|
| getBlockWidth        | 获取视图计算后的高度css属性，是传统意义上的样式属性    |   -   |number|
| getBlockHeight        |   获取视图计算后宽度css属性，是传统意义上的样式属性   |    -  |number|
| getBodyScrollY        |   获取body Y轴滚动  |   -   |number|
| getBodyScrollY        |   获取body Y轴滚动  |   -   |number|
| getDomScrollX        |   获取 dom X轴滚动  |    dom  |number|
| getDomScrollY        |  获取dom Y轴滚动   |   dom   |number|


## 示意图

### 图1
![图一](./imgs/img1.png)
### 图2
![图一](./imgs/img1.png)

## api 说明
### isInDomView
#### 说明
兼容dom在父容器里面是否可见
#### 参数
对象类型
**dom**: 检测的目标dom
**wrapDom**: 检测dom的父容器
**overallVisible**: 是否部分在父容器可见，默认否，如果设置了true，那一部分可见isInDomView函数也会返回true，如【图2】,否则只有如图一时候才会true

### getScrollableChildren
#### 说明
获取dom里面可滚动的元素，再返回来，如果没有就是null

#### 参数
* 参数一：要检测的dom
* 参数二:最大层次遍历次数,默认100
* 参数三:滚动的方向，可选v(垂直，默认)和h(水平滚动)

#### 返回
一个dom或者null

### getDomToVisbleDis 
#### 说明
获取dom到容器可视区的距离，容器可以是可滚动的dom标签，也可以是window

####  参数 {}

* dom :被检测的元素
* viewPort:  dom(可滚动容器)或者window
* yOtherHeight:   Y轴底部遮罩的高度
* xOtherHeight：X轴底部的遮罩高度
* rotate:容器旋转角度，可选0，90，-90

#### 返回
{
  x:"到X轴可见区的距离",
  y:"到Y轴可见区的距离"
}



### getDomToViewVisbleDis

#### 说明
获取dom到浏览器窗口可视区的距离，返回 {x:number,y:number}.如果是**负数**，说明在可视区内

#### 参数 {}
* dom: 被检测的dom
* yOtherHeight: y轴方向，底部遮罩div高度
* xOtherHeight:  x轴方向，左侧遮罩div高度


## Q&A

#### getRectHeight 和 getBlockHeight 的区别
 只有容器设置了旋转90度或者90度时候才会有区别。
 
 getRectHeight 是通过getBoundingClientRect得到高度

 getBlockHeight是通过getComputedStyle得到的高度。


  1. getBoundingClientRect 永远是基于设备方向的，得到是设备方向意义上面的左右上下 和宽高
  2. getComputedStyle 只是对生效的css样式做读取