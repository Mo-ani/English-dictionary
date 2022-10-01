const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
const TerserPlugin         = require("terser-webpack-plugin");
const HtmlMinimizerPlugin  = require("html-minimizer-webpack-plugin");


module.exports = {
    mode: 'development',

    output:{
        clean: true,
        filename: '[name].[contenthash].js' // esto limpiara si se llega a crear uno o mas archivos. Index
    },

    module: {
        rules: [{
            test: /\.html$/i,
            loader: "html-loader",
            options: {
                // Disables attributes processing
                sources: false,
            }
            },
            {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin(),
          ],
    },


    plugins: [new HtmlWebpackPlugin({
        title: 'Promesas',
        filename: './index.html',
        template: './src/index.html',
        inject: 'body',
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        ignoreOrder: false
    }),
    new CopyPlugin({
        patterns: [
          { from: "./src/assets/img", to: "assets/img" },
        ],
      }),
    ],
    
};