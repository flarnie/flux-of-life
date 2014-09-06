/* global __dirname:false */

/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */
module.exports = {
  // 'resolve' 'root' options can be used to specifiy the path to look for
  // modules. This is similar to the 'context' option.
  resolve: {
    root: [
      __dirname + '/app/assets/javascripts',
      'vendor/assets/bower_components',
      'node_modules'
    ],
    alias: {
      'react': 'react/react',
      'lodash': 'lodash/lodash'
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.js.jsx'
    ]
  },

  // 'entry' specifies the entry point, where webpack starts reading all
  // dependencies listed and bundling them into the output file.
  // The entrypoint can be anywhere and named anything - here we are calling it
  // '_application' and storing it in the 'javascripts' directory to follow
  // Rails conventions.
  entry: '_application.js',

  // 'output' specifies the filepath for saving the bundled output generated by
  // wepback.
  // It is an object with options, and you can interpolate the name of the entry
  // file using '[name]' in the filename.
  // You will want to add the bundled filename to your '.gitignore'.
  output: {
    filename: '[name].bundle.js',
    // We want to save the bundle in the same directory as the other JS.
    path: __dirname + '/app/assets/javascripts',
  },

  // If you have global vars, specify them here
  externals: {
    jquery: 'var jQuery',
    react: 'var React',
    routes: 'var Routes'
  },

  // This turns on sourcemaps.
  // @see http://webpack.github.io/docs/configuration.html#devtool
  // Sourcemaps allow you to see the original filename and line numbers rather
  // than the bundled version when debugging with browser devtools.
  devtool: 'eval-source-map',

  // The 'module' and 'loaders' options tell webpack to use loaders.
  // @see http://webpack.github.io/docs/using-loaders.html
  module: {
    // We don't need to parse the React library.
    noParse: [/react\/react\.js/],
    loaders: [
      {
        // Pattern to match only files with the '.js' or '.jsx' extension.
        // This tells the loader to only run for those files.
        test: /\.jsx?$/,
        // @see https://github.com/shama/es6-loader
        // It was installed with 'npm install es6-loader --save' and transpiles
        // es6 to es5.
        loader: 'es6-loader'
      },
      {
        // @see https://github.com/petehunt/jsx-loader
        // It was installed with npm install jsx-loader --save' and parses the
        // JSX inline template syntax into plain es5 JavaScript.
        test: /\.jsx$/,
        // adds pragma for files with jsx extension
        loader: 'jsx-loader'
      },
    ]
  }
};
