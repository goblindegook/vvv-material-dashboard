var path              = require('path')
var webpack           = require('webpack')
var autoprefixer      = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],
  output: {
    path:       path.join(__dirname, 'dist'),
    filename:   'bundle.js',
    publicPath: '/material-dashboard/dist/'
  },
  resolve: {
    extensions: ['', '.dev.jsx', '.jsx', '.scss', '.dev.js', '.js', '.json'],
    root:       path.resolve(__dirname, './node_modules'),
  },
  module: {
    loaders: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader:  'babel'
      }, {
        test:   /\.(sass|scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
      }, {
        test:    /\.(gif|jpeg|jpg|png)$/,
        loader:  'url-loader?limit=8192'
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    })
  ],
}
