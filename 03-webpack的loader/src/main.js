//1、使用commonjs模块化规范
const {add, mul} = require('./js/commonjsUtils.js')
console.log(add(20, 30))
console.log(mul(20, 30))

//2、使用ES6模块化规范
import {sub, divide} from "./js/es6Utils.js";
console.log(sub(20, 30))
console.log(divide(20, 30))

//3、依赖css
require('./css/normal.css')

//4、依赖less
//less-loader:负责对less文件进行加载 less：对less内容进行转化，转化为css，也可以使用手动less
require('./css/special.less')
document.writeln('<h2>hello webpack</h2>')