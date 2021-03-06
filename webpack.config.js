const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  publicPath: 'https://wuxia-tools-main-server-1251080372.file.myqcloud.com/',
  // publicPath: '/'
};

module.exports = {
  context: paths.SRC,
  entry: {
    bundle: path.join(paths.SRC, 'index.js'),
    vendor: [
      'react',
      'ajv',
      'react-bootstrap',
      'react-custom-scrollbars',
      'react-dom',
      'react-measure',
      'react-onclickoutside',
      'react-redux',
      'react-router-bootstrap',
      'react-router-dom',
      'redux',
      'redux-localstorage',
      'redux-promise',
      'js-cookie'
    ],
  },
  output: {
    path: paths.DIST,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    // cdn前缀设置，下面css还有一个
    // publicPath: '/',
    publicPath: paths.publicPath
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: 'head', // 预渲染需要
      chunksSortMode: 'dependency',
      stylePublicPath: paths.publicPath,
    }),
    new ExtractTextPlugin({
      // 给输出的 CSS 文件名称加上 Hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      { from: 'static' }
    ]),
    //实际发布使用
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin(),
    new PrerenderSpaPlugin(
      path.join(__dirname, '/dist'),
      [ '/', '/xinfa', '/map', '/calendar', '/family-tech', '/rank', '/panorama'],
      {
        postProcessHtml: function (context) {
          let html = context.html;
          let titles = {
                    '/': '段段天刀综合助手 | 天涯明月刀：心法模拟器、地图助手、时辰吉凶、帮派技能模拟器、数据百科',
                    '/xinfa': '天刀心法模拟器，精确计算功力、突破、潜修、砭石 | 段段天刀综合助手',
                    '/map': '天刀地图助手，墨宝坐标、航海图鉴… | 段段天刀综合助手',
                    '/calendar': '天刀吉凶时辰模拟预测，天涯时刻 | 段段天刀综合助手',
                    '/family-tech': '天刀帮派技能模拟器，碎银帮贡修为消耗模拟 | 段段天刀综合助手',
                    '/rank': '天刀功力排行榜，每日最新排名、历史排名查询 | 段段天刀综合助手',
                    '/panorama': '天刀全景图分享，全景美图视觉体验 | 段段天刀综合助手'
                  };
          html = html.replace(
            /<title>[^<]*<\/title>/i,
            '<title>' + titles[context.route] + '</title>'
          );

          html = html.replace(
            /<body[^>]*>/ig,
            '<body>'
          );
          html = html.replace(
            /<div role="dialog">.*<\/div><\/body>/ig,
            '<\/body>'
          );
          return html;
        }
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['last 2 versions', '> 2%']
                  }
                }]
              ],
              plugins: [
                'transform-react-jsx',
                'transform-object-rest-spread',
                'syntax-dynamic-import',
                [
                  'react-css-modules',
                  {
                    context: paths.SRC
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            publicPath: paths.publicPath
          })
      },{
        test: /\.css$/,
        include: /node_modules/,
        use:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })

      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
