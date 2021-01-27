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

//5、使用vue进行开发
import Vue from 'vue'

//报错：
//[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
//原因：vue在构建最终的发布版本时，有两类版本：
//(1)、runtime-only：代码中，不能有任何的template，没有对template编译的代码。当挂在div进el实例时，会把div认为是template
//(2)、runtime-compiler：代码中，能有任何的template
//解决：修改webpack的配置，添加resolve


//import App from './vue/app'

//配置对应loader：vue-loader vue-template-compiler
import App from './vue/App.vue'

new Vue({
  //同时有el和template，template会将el的内容太替换掉
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})

//使用vue组件化开发：一步一步抽离组件
//index.html中只保留最外层的div
//main.js中，抽出主组件App.vue，处理三处：1、import导入，2、template，3、components
//App.vue（新建vue component）分为三处：template、script、style