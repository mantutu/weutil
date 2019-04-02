#!/usr/bin/env node

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    target: "node",
    entry: "./lib/index.js",
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"]
                    }
                }
            }
        ]
    },
    devtool: process.env.SOURCE_MAP || "none",
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimize: false
    },
    plugins: [new CopyWebpackPlugin(["LICENSE", "*.md", "package*.json"])]
};
