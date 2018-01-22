const path = require('path');
//const uglify=require('uglifyjs-webpack-plugin');//压缩
const htmlPlugin = require('html-webpack-plugin');
//css分离
const extractTextPlugin = require('extract-text-webpack-plugin');
/* var website = {
    publicPath: "/"
}; */
var website={};
if(process.env.type=="build"){
    website["pubilcPath"]="/";
}else{
    website["publicPath"]="/";
}
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const entryList = require("./webpack_config/entry_webpack.js");
const webpack=require('webpack');
module.exports = {
    entry: {
        //entry: './src/entry.js',
        //entry2: './src/entry2.js'
        entry:entryList.path
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                //use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //new uglify(), //压缩
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin('css/index.css'),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new webpack.BannerPlugin('王欢')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/'),
        compress:true,
        port: 8080,
        inline:true,
        host: '192.168.0.151',
        disableHostCheck:true,
    }
}