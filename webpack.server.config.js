const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: "./src/main.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"dist"),
    },
    devtool: process.env.NODE_ENV !== "production" && "source-map",
    target: 'node',
    node: {
        __dirname: false
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    mode: process.env.NODE_ENV || "development",
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.(jpg|png|gif|pdf|ico|eot|ttf|woff2?)$/, use: [
                    { 
                        loader: 'file-loader', 
                        options: { 
                            name: '[path][name]-[hash:8].[ext]', 
                            outputPath: url => url.replace(/^src\/client\//,'public/'),
                            publicPath: url => url.replace(/^src\/client\//,'/'),
                        } 
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                loader: "./src/lib/null-loader.js"
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            svgo: false
                        }
                    }
                ] 
            }
        ]
    },
    externals: ["utf-8-validate", "bufferutil", "uws", {express: 'commonjs express'}, {sqlite3: 'commonjs sqlite3'}, {sharp: 'commonjs sharp'}]
}