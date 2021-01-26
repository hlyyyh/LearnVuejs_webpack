//1、使用commonjs模块化规范
const {add, mul} = require('./commonjsUtils')
console.log(add(20, 30))
console.log(mul(20, 30))

//2、使用ES6模块化规范
import {sub, divide} from "./es6Utils";
console.log(sub(20, 30))
console.log(divide(20, 30))
