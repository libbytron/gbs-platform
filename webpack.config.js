const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname + "/app",
  entry: './app.route.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.route.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './home/index.html', to: "index.html" },
      { from: './blockchain', to: "blockchain" },
      { from: './footer', to: "footer" },
      { from: './home', to: "home" },
      { from: './navagation-bar', to: "navagation-bar" },
      { from: './owner-detail', to: "owner-detail" },
      { from: './owner-index', to: "owner-index" },
      { from: './pba-detail', to: "pba-detail" },
      { from: './pba-index', to: "pba-index" },
      { from: './create-gbs', to: "create-gbs" },
      { from: './services', to: "services" },
      { from: './test', to: "test" },
      { from: './app.css', to: "app.css" },
      { from: './app.module.js', to: "app.module.js" },
      { from: './create-gbs', to: "create-gbs" }
    ])
  ],
    module: {
    loaders: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.svg$/,
          loader: 'file-loader?name=images/[name].[ext]'
      },
    ]
  }
}
