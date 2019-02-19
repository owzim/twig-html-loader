import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (script = 'index.js', tpl = 'index.twig', options = {}) => {
  const context = path.resolve(__dirname, 'fixtures');
  const entry = path.resolve(context, script);
  const template = path.resolve(context, tpl);
  const compiler = webpack({
    mode: 'production',
    context,
    entry,
    output: {
      path: path.resolve(__dirname),
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.twig$/,
          use: [
            'raw-loader',
            {
              loader: '../../src/index.js',
              options,
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template,
        inject: false,
        filename: path.resolve(__dirname, path.basename(template)),
      }),
    ],
  });

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => {
    compiler.run((errors, stats) => {
      if (errors || stats.hasErrors()) {
        const config = {
          chunks: false,
          colors: true,
        };
        reject(errors || stats.toString(config));
      }
      resolve(stats);
    });
  });
};
