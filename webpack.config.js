const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new CopyWebpackPlugin({
    patterns: [
        { from: './src/static/img', to: './img', force: true },
    ]
}),],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: {
                publicPath: '/public/path/to/'
            }
        },
        {
            loader: "css-loader", 
            options: { sourceMap: true}
        },{
          loader: "sass-loader", 
          options: { sourceMap: true }
        }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: { outputPath: 'assets/images', publicPath: '../images', useRelativePaths: true }
      }
    ],
  },
};