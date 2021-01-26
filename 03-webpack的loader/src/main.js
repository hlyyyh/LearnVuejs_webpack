//1、使用commonjs模块化规范
const {add, mul} = require('./js/commonjsUtils.js')
console.log(add(20, 30))
console.log(mul(20, 30))

//2、使用ES6模块化规范
import {sub, divide} from "./js/es6Utils.js";
console.log(sub(20, 30))
console.log(divide(20, 30))

//3、依赖css
//打包报错：You may need an appropriate loader to handle this file type.
//从官网搜loader
//1、安装：npm install --save-dev css-loader
//2、webpack.config.js加入module
//3、npm run build
require('./css/normal.css')