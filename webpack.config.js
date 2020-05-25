
/*
此文件为webpack配置文件
作用：指示webpack干拿些活，当运行webpack指令时会加载里面的配置
webpack是基于node.js运行，所以用common.js来模块化
*/
/*
loader 下载 使用
plugin 下载 引入 使用
*/

//nodejs的resolve方法用来拼接绝对路径
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    //输出文件名
    filename: "build.js",
    //输出路径
    //__dirname nodejs的变量，表示当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  //loader的配置
  module: {
    rules: [
      {
        //匹配哪些文件（用正则）
        test: /\.css$/,
        //用哪些loader来处理匹配到的以上文件
        use: [
          //loader执行顺序，从右到左，从下到上
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          //将css文件变成commonjs模块加载到js中，内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          //将less编译成css
          'less-loader'
        ]
      },
      {
        //url-loader:处理样式文件中的url
        //下载file-loader url-loader,后者依附于前者
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          //将小于8kb的图片转换成base64
          //优点：减少服务器请求，缺点：使文件体积变大，增大计算机CPU压力，请求速度变慢。
          //所以小图片转换就行了，别转换大图片
          limit: 8 * 1024,
          //使用html-loader后会报错，因为url-loader使用es6模块化，而html-loader使用commonjs模块化
          //所以要关掉url-loader中的es模块化，使用commonjs模块化
          esModule: false,
          //给图片重命名
          //[hash:10]取hash值的前十位
          //[ext]取文件原来的扩展名（就是.jpg/.png)
          name: "[hash:10].[ext]"
        }
      },
      {
        //html-loader:处理html文件中img图片
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          name: "[hash:10].[ext]"
        }
      },
      {
        //其它文件打包比如iconfont的一些文件
        exclude:/\.(less|css|html|js|jpg|png|gif)$/,
        loader:'file-loader'
      },
    ]
  },
  //插件的配置
  plugins: [
    //html-webpack-plugin
    //new HtmlWebpackPlugin()默认创建一个空的HTML文件，自动引入打包输出的所有资源
    //复制./src/index.html文件，并自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  //模式'development'/'production'
  mode: "development",
  //开发服务器devServer，自动编译
  //只会在内存中编译打包，不会输出
  //启动命令为：npx webpack-dev-server（webpack-dev-server要先下载）
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    //启动gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //自动打开浏览器
    open: true
  }

}