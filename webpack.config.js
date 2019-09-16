//  Dependencies
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharp = require('responsive-loader/sharp');

//  Environment
const isDevelopment = process.env.NODE_ENV === 'development';

const miniCssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: path.resolve(__dirname, './dist'),
    hmr: isDevelopment,
  },
};
const styleLoader = {loader: 'style-loader'};
const cssLoader = {// CSS
  loader: 'css-loader',
  options: {
    import: true,
    importLoaders: 1,
    modules: {
      context: path.resolve(__dirname, ''),
      localIdentName: '[name]__[local]'
    },
    sourceMap: isDevelopment,
    url: true
  }
};
const postCssLoader = {// POST CSS
  loader: 'postcss-loader',
  options: {
    sourceMap: isDevelopment,
    plugins: () => [
      require('postcss-import')(),
      require('postcss-cssnext')(),
      require('cssnano')()
    ]
  }
};
const sassLoader = {// SASS
  loader: 'sass-loader',
  options: {sourceMap: isDevelopment}
};
const lessLoader = {// LESS
  loader: 'less-loader',
  options: {
    sourceMap: isDevelopment,
    strictMath: true,
    noIeCompat: true
  }
};

let plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false
  })
];

let rules = [
  {// HTML
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
      options: {
        attrs: [':data-src']
      }
    }
  },
  {// CSS
    test: /\.css$/,
    use: [
      styleLoader,
      miniCssExtractLoader,
      cssLoader,
      postCssLoader
    ]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      query: {
        plugins: ['transform-class-properties'],
        presets: [
          '@babel/preset-react',
          "@babel/preset-env"
        ]
      }
    }
  },
  {// JSON
    test: /\.json$/,
    use: 'json-loader'
  },
  {//-- GZIP
    test: /\.gzip?$/,
    enforce: 'pre',
    use: [
      {//-- GZIP-LOADER
        loader: 'gzip-loader'
      }
    ]
  },
  {//-- (GIF | PNG | JPG | JPEG) [ OPTIMIZATION / COMPRESS ]
    test: /\.(gif|png|jpe?g)$/i,
    use: [
      {loader: 'babel-loader'},
      {loader: 'file-loader'},
      {
        loader: 'image-webpack-loader',
        options: {
          disable: true, // webpack@2.x and newer
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: { // optipng.enabled: false will disable optipng
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          webp: { // the webp option will enable WEBP
            quality: 75
          }
        }
      }
    ]
  },
  {//-- (PNG || JPG)
    test: /\.(png|jpg|gif)?$/,
    use: [
      {//-- FILE-LOADER
        loader: 'file-loader',
        options: {//-- Configuracion del LOADER
          name: '[name].[ext]', //-- Nombre del Archivo Generado
          context: 'this.options.context', //-- Contexto de Archivo Personalizado
          // publicPath: path.resolve(__dirname, '/'), //--Ruta pública personalizada
          // outputPath: path.resolve(__dirname, '/'), //-- Ruta de salida personalizada
          useRelativePath: false, //-- Generar una URL relativa al contexto para cada archivo
          emitFile: true //-- Emitir un archivo para paquetes del lado del servidor
        }
      },
      {
        loader: 'responsive-loader',
        options: {
          adapter: sharp
        }
      }
    ]
  },
  {//-- SVG
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [
      {loader: 'babel-loader'},
      {
        loader: 'svg-url-loader',
        options: {
          //  limit: 10485760,
          //  mimetype: 'images/svg+xml',
          fallback: {
            loader: 'responsive-loader',
            options: {adapter: sharp}
          }
        }
      }
    ]
  }
];

if (isDevelopment) rules.push(
  {// SASS
    test: /\.(sass|scss)$/,
    use: [
      styleLoader,
      cssLoader,
      postCssLoader,
      sassLoader
    ]
  },
  {// LESS
    test: /\.less$/,
    use: [
      cssLoader,
      postCssLoader,
      lessLoader
    ]
  }
);

else rules.push(
  {// SASS
    test: /\.(sass|scss)$/,
    use: [
      miniCssExtractLoader,
      cssLoader,
      postCssLoader,
      sassLoader
    ]
  },
  {// LESS
    test: /\.less$/,
    use: [
      miniCssExtractLoader,
      cssLoader,
      postCssLoader,
      lessLoader
    ]
  }
);

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {extensions: [".js", ".jsx"]},
  plugins,
  module: {rules},
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    port: 9000
  }
};
