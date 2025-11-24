import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV || 'development',
  
  // Entry point - where Webpack starts
  entry: './assets/js/app.js',
  
  // Output - where compiled files go
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    clean: true, // Clean output directory before build
  },
  
  // Module rules - how to process different file types
  module: {
    rules: [
      // Process SCSS files
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate file
          'css-loader',                 // Translates CSS into JS
          'sass-loader',                // Compiles SCSS to CSS
        ],
      },
      // Process CSS files
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  
  // Plugins
  plugins: [
    // Extract CSS into app.css file
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
  
  // Resolve modules
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
};
