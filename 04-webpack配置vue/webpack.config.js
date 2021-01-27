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
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/, //匹配所有css
        //style-loader：将模块的导出作为样式添加到 DOM 中
        //css-loader：解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
        //使用多个loader时，是从右向左
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载图片小于limit时，会将图片编译成base64字符串形式，6*1024 < 8192
              //当加载图片大于limit时，需要安装，不需要额外配置
              limit: 8192,
              //直接写name，会被当成文件夹或文件，[name]会当成变量
              name: 'img/[name].[hash:8].[ext]'
            },

          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //这么配置会去找babel rc文件
            //presets: ['@babel/preset-env']
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }

    ],
  },
  resolve: {
    //原理：当发现有import Vue from 'vue'时，会先看此vue有没有指向一个具体文件夹，这时不会按默认方式找某一个文件
    //即使用node_modules/vue/dist/vue.esm.js，包括compiler
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js','.css','.vue'],
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

//安装loader
//打包报错：You may need an appropriate loader to handle this file type.
//从官网搜loader
//1、安装：npm install --save-dev css-loader
//安装完毕后，webpack.config.js加入module
//2、加入rules
//3、npm run build


//npm install --save-dev css-loader@2.0.2
//npm install --save-dev style-loader@0.23.1
//npm run build
//报错：this.getResolve is not a function at Object.loader... 降低版本


//4、less
//1、创建less
//2、main.js中引入
//3、安装less-loader和less：npm install --save-dev less-loader@4.1.0 less@3.9.0
//less-loader:负责对less文件进行加载 less：对less内容进行转化，转化为css，也可以使用手动less
//4、npm run build（搭建本地服务器后就不用每次重新打包了）

//5、url
//npm install --save-dev url-loader@1.1.2
//npm install --save-dev file-loader@3.0.1
//问题：图片大于limit时，编译没报错，但没加载到：base64字符串不需要单独处理，而当成文件处理时，需要把图片放到dist中，连同文件一起，
//此时dist中多了一张32位hash值命名后的图片
//解决：webpack.config.js中加入publicPath，以后涉及到任何url都会在此路径下找
//注意：1、后续需要将这些静态文件都放入dist中，此配置则不需要了
//     2、打包图片规范：img/name/hash:8.ext


//6、ES6语法处理
//ES6转ES6，使用babel
//在webpack中，使用babel对应的loader即可
//npm install babel-loader babel-core babel-preset-env
//如果安装babel-preset-env，需要配置babel rc文件
//更换如下安装配置：
//npm install babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1

//7、安装vue
//开发和运行以来
//npm install vue@2.5.21 --save
//import导入
//通过alias指定当前使用vue版本

//后续开发SPA（simple page web application） ——》 vue router
//只有一个html

//8、vue模块化开发
//npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev
//报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
//从14版本后，想使用需要另外配置插件
//修改vue-loader版本后，npm install