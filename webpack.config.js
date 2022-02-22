const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "index.js",
    library: 'wallets-manager',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
