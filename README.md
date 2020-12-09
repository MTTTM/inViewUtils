# 这是一个简单的前端构建工具
## 执行方式 在命令行执行gulp就可以自动编译less和js
## 运行环境node v15.3.0
## 开发运行步骤
* npm i //如果没有安装依赖，先执行这一步
* gulp 
## 打包步骤
* gulp    //先编译，成功后再执行打包
* gulp prod   //打包

## 目录说明
* src 开发目录
* tmp 开发过程编译出来的临时目录
* prod 打包发布的目录

## src目录说明
* html  存放html页面文件
* template  存放html模板文件
* libs 存放第三方依赖，不参与编译的文件
* less 存放less文件
*  js 存放需要编译的js文件
* images 存放图片文件