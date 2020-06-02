
const  HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractplugin=require('mini-css-extract-plugin')
const {resolve}=require('path')

module.exports={
  entry:"./src/js/index.js",
  output:{
    filename:'js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/.\css$/,
        use:[
          MiniCssExtractplugin.loader,
          'css-loader',
          {
            loader:"postcss-loader",
            options:{
              ident:'postcss',
              preset
            }
          }
        ]
      },
      {
        test:/.\less$/,
        use:[
          MiniCssExtractplugin.loader,
          'css-loader',
          {
            loader:"postcss-loader",
            options:{
              ident:'postcss',
              preset
            }
          },
          'less-loader'
        ]
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractplugin()
  ],
  mode:'production'
}