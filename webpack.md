webpack
===
Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

1.webpack安装
		
		$ npm install webpack -g	    //全局环境安装webpack
		# 进入项目目录 
		# 确定已经有 package.json，没有就通过 npm init 创建 
		# 安装 webpack 依赖 
		$ npm install webpack --save-dev    //将 Webpack 安装到项目的依赖中，这样就可以使用项目本地版本的 Webpack
2.在项目中创建package.json文件,npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等

		$ npm init    //创建package.json文件
3.在项目中安装webpack作为依赖包

		$ npm install webpack --save-dev    //安装webpack到项目
4.编译打包文件

		$ webpack [原始文件] [编译打包之后的文件]    //git命令台编译打包
		//webpack非全局安装的情况
		$ node_modules/.bin/webpack [原始文件] [编译打包之后的文件]
5.Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件，没有就创建一个webpack.config.js.
模块加载都可以写在文件中，可以避免每次都在命令行中执行
		
		$ webpack	// webpack全局安装条件下执行
		$ node_modules/.bin/webpack		// webpack项目目录下安装
6.不用命令行，可以利用npm可以引导任务执行，对其进行配置后可以使用简单的`npm start`命令来代替这些繁琐的命令。在package.json中对npm的脚本部分进行相关设置即可
		
		{ 
		"name": "webpack-demo", 
		"version": "1.0.0", 
		"description": "", 
		"scripts": { 
				"start": "webpack" //配置的地方就是这里啦，相当于把npm的start命令指向webpack命令，npm的start是一个特殊的脚本名称，它的特殊性表现在，在命令行中使用npm start就可以执行相关命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}如npm run build
				}, 
		"author": "", 
		"license": "ISC", 
		"devDependencies": { 
				"webpack": "^2.2.1" 
				} 
		}
7.使用webpack构建本地服务器
		
		$ npm install webpack-dev-server -g //全局安装 
		$ npm install webpack-dev-server --save-dev // 项目目录安装
		
		// 之后在webpack.config.js中配置
		module.exports = {
  			entry:  __dirname + "/app/main.js",
  			output: {
   				path: __dirname + "/public",
    			filename: "bundle.js"
  			},
			//配置服务器的各个属性
  			devServer: {
				port: 8080 //设置默认监听端口，如果省略，默认为”8080“
    			contentBase: "./public",//本地服务器所加载的页面所在的目录，默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
    			colors: true,//终端中输出结果为彩色，设置为true，使终端输出的文件为彩色的
    			historyApiFallback: true,//不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    			inline: true//实时刷新，设置为true，当源文件改变时会自动刷新页面
  			} 
		}
		
		//配置完成之后运行本地服务器
		$ webpack-dev-server
		//开启服务器并不能自动刷新，要自动刷新要启动热更新
		$ webpack-dev-server --hot --inline
8.Loaders需要单独安装并且需要在webpack.config.js下的`modules`关键字下进行配置，Loaders的配置选项包括以下几方面：

	* test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须)
	* loader：loader的名称（必须）
	* include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选)
	* query：为loaders提供额外的设置选项（可选）
	
	//安装可以装换JSON的loader
	$ npm install --save-dev json-loader

	//配置文件webpack.config.js中配置loader
	module.exports = {   
		devtool: 'eval-source-map',   
		entry: __dirname + "/app/main.js",   
		output: {     
			path: __dirname + "/public",     
			filename: "bundle.js" 
		},   
		module: {//在配置文件里添加JSON loader     
			loaders: [ 
				{         
					test: /\.json$/,         
					loader: "json-loader" 
				}	 
			] 
		}
	}
	* 注意JSON文件里面不可以有注释