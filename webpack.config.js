const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.tsx',
  output: {
      path: `${__dirname  }/dist`,
      filename: '[name].[chunkhash].js',
  },
  plugins: [
    // HtmlWebpackPlugin comes first because we change the template to the production one.
    new HtmlWebpackPlugin({
        // hash: true,
        title: 'Observatorium',
        template: './src/index.development.html',
      }),
  ],

  devServer: {
  // This is where webpack-dev-server serves your bundle
  // which is created in memory.  In this example it will be:
  //   http://localhost/assets/bundle.js
    publicPath: '/',
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist')
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
    },
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
  },
}

module.exports = (env, argv) => {
  if (typeof argv !== 'undefined' && argv.mode === 'production') {
    config.plugins[0] = new HtmlWebpackPlugin({
        // hash: true,
        title: 'typescript-react-starter',
        template: './src/index.production.html',
      });
    // When deploying to production, to avoid external dependencies on FB CDN servers
    // react and react-dom will be bundled into the built bundle.js
    // config.externals = {}
  }
  return config;
};
