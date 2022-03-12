# inViewUtils.js

Detect if the dom is within the view, as well as some other dom-related helper functions

## The main functional functions
| function name        | description    |  arg  | return|
| --------     | :-----   | :----|:----|
| isInDomView   | Detects whether the dom is visible inside the container **dom**      |   Refer to the [isInDomView](#getDomToVisbleDis ) description   | boolean|
| isInView        | Detects if the dom is fully visible within the **window**    |   The dom object being detected   | boolean|
| getScrollableChildren |Gets one scrollable child node | Refer to the getScrollableChildren description| dom or null|
| getDomToVisbleDis        | Gets the distance between the dom entering the **dom** container viewable area    |   参考getDomToVisbleDis 说明   | {x:number,y:number}|
| getDomToViewVisbleDis| Gets the distance from the dom to the window viewable| Refer to the getDomToViewVisbleDis description| {x:number,y:number}|

## Other function
| function name        | description    |  arg  |return|
| --------     | :-----   | :---- |:----|
| getBoundingClientRect   |   Gets the dom's rect object   |dom   |  [rect object](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)|
| getRectHeight        |   Gets the **height** of the dom rect object, if the label is rotated 90 degrees or -90 degrees, the result is based on the height of the device orientation, no longer a style attribute |  dom    | number|
| getRectWidth        |   Gets the **width** of the dom rect object, if the label is rotated 90 degrees or -90 degrees, the result is based on the height of the device orientation, no longer a style attribute | dom   |number|
| getViewPortHeight        | Gets the **window height**    |   -   |number|
| getViewPortWidth        |   Gets the **Window width**   |    -  |number|
| getBlockWidth        | Gets the height of the view after the computed css property, which is a style property in the **traditional sense**    |   -   |number|
| getBlockHeight        |   Gets the view after the width is calculated after the css property, which is a style property in the **traditional sense**   |    -  |number|
| getBodyScrollY        |   Gets the **body** Y-axis scroll  |   -   |number|
| getBodyScrollX        |   Gets the **body** X axis scroll  |   -   |number|
| getDomScrollX        |   Gets the **dom** X-axis scroll |    dom  |number|
| getDomScrollY        |  Gets the **dom** Y axis to scroll   |   dom   |number|


## Diagram

### img1
![img1](./imgs/img1.png)
### img2
![img2](./imgs/img1.png)

## Api description
### isInDomView
#### description
兼容dom在父容器**dom**里面是否可见
#### arg

typeof arg ==  object

* **dom**: The target dom of the detected
* **wrapDom**: Detect the parent container (**dom**) of the dom
* **overallVisible**: Whether the part is visible in the parent container, the default is no, if true is set, the part of the visible isInDomView function will also return true, such as [img 2], otherwise it will only be true if it is shown in figure 1

### getScrollableChildren
#### description

Get the scrollable elements in the dom, and then return, if not, null

#### arg

len of arg ===3

* arg1：The dom to be detected
* arg2:Maximum number of hierarchical traversals, default 100
* arg3:Direction of scrolling, optional v (vertical, default) and h (horizontal scrolling)

#### return

A dom or null

### getDomToVisbleDis 
#### desc

Get the distance from the dom to the visual area of the container dom,

####  arg

typeof arg ==  object

* dom :The element being detected
* viewPort:  dom (scrollable parent container)
* yOtherHeight:   The height of the bottom mask of the Y axis
* xOtherHeight：The mask height at the bottom of the X axis
* rotate: Container rotation angle, optional 0, 90, -90

#### return
```javascript

{
  x:number,
  y:number
}
```



### getDomToViewVisbleDis

#### desc

Gets the distance from the dom to the **window area** of the browser window, returns {x:number,y:number}
If it is like {x:0,y:0}, it is within the visual area

#### arg 

typeof arg ==  object

* dom: The element being detected
* yOtherHeight: The height of the bottom mask of the Y axis
* xOtherHeight:  The mask height at the bottom of the X axis

#### return 

```javascript
{
  x:number,
  y:number
}
```

## Q&A

#### The difference between getRectHeight and getBlockHeight

 The difference is only if the container is set to rotate 90 degrees or 90 degrees.

 
 
  > 1. GetRectHeight is the height obtained by gettingBoundingClientRect 
  >  2. GetBlockHeight is the height obtained through getComputedStyle.
 

   > 1. GetBoundingClientRect is always **based on the orientation of the device**, and the result is the orientation of the device above the meaning of the left and right up and down and width and height
  >  2. GetComputedStyle simply reads the css styles that are in effect