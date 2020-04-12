/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

const path = require('path');

module.exports = {
    entry: {
        server: './src/server.ts'
    },
    devtool: 'source-map',
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.graphql', '.graphqls', ".mjs", ".js"],
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@framework': path.resolve(__dirname, 'src/app/Framework')
        }
    },
    plugins: [
    ],
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        path: path.resolve(__dirname, 'dist'),
    },
};
