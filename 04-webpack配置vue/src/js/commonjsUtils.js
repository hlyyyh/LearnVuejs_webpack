function add(num1,num2) {
  return num1 + num2;
}

function mul(num1,num2) {
  return num1 * num2;
}

//通过模块化开发，使用commonJS的导入导出
//然后打包
//webpack ./src/main.js ./dist/bundle.js
//webpack会自动引用其他依赖
module.exports = {
  add,
  mul
}