const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // или 'production' для билда
  entry: './src/index.js', // главный JS-файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // очищает dist при сборке
  },
  resolve: {
    extensions: ['.js', '.jsx'], // для React JSX
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // транспилируем JSX и современный JS
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // импорт CSS в JS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // картинки
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // берём HTML из src/
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // где искать index.html
    compress: true,
    port: 3000,
    hot: true,
    open: true, // открывает браузер автоматически
    historyApiFallback: true, // для React Router
  },
};