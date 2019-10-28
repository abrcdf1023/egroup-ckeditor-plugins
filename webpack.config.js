'use strict';

const path = require('path');
const {
  styles
} = require('@ckeditor/ckeditor5-dev-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  // https://webpack.js.org/configuration/entry-context/
  entry: './app.js',

  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  module: {
    rules: [{
        // Or /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/ if you want to limit this loader
        // to CKEditor 5 icons only.
        test: /\.svg$/,

        use: ['raw-loader']
      },
      {
        // Or /ckeditor5-[^/]+\/theme\/.+\.css$/ if you want to limit this loader
        // to CKEditor 5 theme only.
        test: /\.css$/,

        use: [{
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
      }
    ]
  },

  // Useful for debugging.
  devtool: 'source-map',

  // By default webpack logs warnings if the bundle is bigger than 200kb.
  performance: {
    hints: false
  },

  resolve: {
    alias: {
      '@egroup/ckeditor-insert-image': path.resolve(__dirname, './packages/insert-image/src/'),
      '@egroup/ckeditor-insert-drawio': path.resolve(__dirname, './packages/insert-drawio/src/'),
    }
  }
};