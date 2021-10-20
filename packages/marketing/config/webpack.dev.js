const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const HtmlWebpackPlugIn = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies

        }),
        new HtmlWebpackPlugIn({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);