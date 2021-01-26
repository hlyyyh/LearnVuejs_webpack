//1、入口、出口映射
//2、命令映射

//1、入口、出口映射
//之前打包命令：webpack ./src/main.js ./dist/bundle.js
//现在希望直接使用：webpack
//使用node语法,动态引入绝对路径，存在path的包：npm init 详见npm_init_detail,会生成package.json（使用node的东西，一般会有package.json）
//npm install 会在package.json引入依赖
const path = require('path')
//path 是一个模块，有一个函数resolve,用于对两个路径进行拼接,_dirname是node上下文自带的全局变量（保存当前package.json的路径）
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname,'dist'), //绝对路径
    filename: 'bundle.js'
  }
}

//npm run build 构建打包
//命令很长可以映射
//2、命令映射 npm run build
//build 会找package.json script中的build对应命令,写在script中会优先从本地找
//一般开发中，会有本地的webpack
//本地安装webpack开发时依赖：npm install webpack@3.6.0 --save-dev
//package.json中的devDependencies会多处webpack的依赖

//后续使用vue，则会有dependencies，叫运行时依赖
//script的脚本执行时，会按照一定顺序：1、node_modules/.bin 2、全局