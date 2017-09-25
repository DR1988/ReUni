import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const cssBundle = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import CleanWebpackPlugin from 'clean-webpack-plugin'
export const dist = path.join(__dirname, 'dist')
export default (env) => {
  const dev = o => (env.dev ? o : null)
  const prod = p => (env.prod ? p : null)
  const cssLoader = [
    dev('style-loader'),
    `css-loader?modules&importLoaders=1&localIdentName=rph__[local]&context=/`,
    'sass-loader',
    // &minimize=${!!env.prod}&context=/`,
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          './app/styles/variables/_colors.scss',
          './app/styles/variables/_global_variables.scss',
            // './app/styles/booostrap/_bootstrap.scss',
        ],
      },
    },
  ].filter(Boolean)

  // console.log(cssBundle.extract(cssLoader))
  return {
    node: {
      fs: 'empty',
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      // alias: {
      //   font_awesome_css: __dirname + '/node_modules/font-awesome/css/font-awesome.css',
      // },
    },
    resolveLoader: {
      alias: {
        'parent-scope-loader': path.join(__dirname, 'bin/utils', 'parent-scope-loader.js'),
      },
    },
    entry: [
      'whatwg-fetch',
      'babel-polyfill',
      'bootstrap-loader',
      dev('webpack-hot-middleware/client'),
      // dev('bootstrap-loader'),
      // prod('bootstrap-loader/extractStyles'),
      path.join(__dirname, 'app/index.js'),
    ].filter(Boolean),
    output: {
      path: dist,
      filename: 'build.js',
      publicPath: '/',
    },
    devtool: env.dev ? 'eval' : false,
    module: {
      rules: [
        {
          test: /\.s?css$/,
          // exclude: /node_modules/,
          use: env.dev ? cssLoader : cssBundle.extract(cssLoader),
        }, {
          test: /\.jsx?$/,
          exclude: /\/node_modules\//,
          loaders: ['babel-loader', 'parent-scope-loader'],
          include: path.join(__dirname, 'app'),
        },
        { test: /\.(woff2?|svg)$/,
          // include: /\/node_modules\//,
          loader: 'url-loader?limit=10000' },
        { test: /\.(ttf|eot)$/, loader: 'file-loader' }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.dev ? '"development"' : '"production"',
          WIDJET: env.widjet ? JSON.stringify('true') : null,
        },
      }),
      prod(cssBundle),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss() {
            return [autoprefixer({
              browsers: ['> 1%',
                'last 3 version'],
            })]
          },
        },
      }),
      dev(new webpack.HotModuleReplacementPlugin()),
      dev(new webpack.NoEmitOnErrorsPlugin()),
      prod(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })),
    ].filter(Boolean),
  }
}
