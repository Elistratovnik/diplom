const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  entry: { main: './src/index.js',
           about: './src/about/index.js',
           analytics: './src/analytics/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [  {
                  loader: 'file-loader',
                  options: {
                    outputPath: './images/',
                    name: '[name].[ext]'
                  }
                },
                {
                        loader: 'image-webpack-loader',
                        options: {
                        //   mozjpeg: {
                        //     progressive: true,
                        //     quality: 65
                        //   },
                        //   optipng: {
                        //     enabled: false,
                        //   },
                        //   pngquant: {
                        //     quality: [0.65, 0.90],
                        //     speed: 4
                        //   },
                        //   gifsicle: {
                        //     interlaced: false,
                        //   },
                        //   webp: {
                        //     quality: 75
                        //   }
                         }
                },
        ]
      },
      {
        test: /\.css$/i,
        use: [
                        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                        {
                        loader: 'css-loader',
                        options: { importLoaders: 2}
                        },
                        'postcss-loader'
                ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      chunks: ['main'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/about.html',
      chunks: ['about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/analytics.html',
      chunks: ['analytics'],
      filename: 'analytics.html'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
