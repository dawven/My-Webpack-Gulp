module.exports = {
    entry: __dirname + "/app/main.js", //入口文件路径
    output: {
        path: __dirname + "/public/", //存放打包后文件的地方路径
        filename: "bundle.js" //打包后的文件名
    },
    devServer: {
        contentBase: "./public",
        port: "9000",
        inline: true,
        historyApiFallback: true,
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules' //添加对样式表的处理,感叹号的作用在于使同一文件能够使用不同类型的 loader,?modules可以让CSS模块化
            }
        ]
    }
}