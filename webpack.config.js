// @ts-check

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV || 'development';

export default {
  mode,
  entry: {
    app: './server/src/index.js',
  },
  output: {
    filename: 'app.js',
    path: new URL('./server/public', import.meta.url).pathname,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'app.css' }),
  ],
};
