import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.css', '.scss'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Andre\'s Spotify Resumé',
            template: './src/index.html',
            filename: 'index.html',
        }),
    ]
}
