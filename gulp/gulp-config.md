## gulp-config ##

gulp常用配置

----------

- `git bash` 到目标文件夹

- 创建项目目录

- `npm init` 初始化新建package.json

- `gulpfile.js` 新建gulp配置文件

- `npm install gulp --save-dev` 安装gulp到项目文件

- `npm install gulp-sass --save-dev` 处理sass，可以配置输出压缩的CSS

- `npm install browser-sync --save-dev` 搭建本地服务器

- `npm install gulp-useref --save-dev` gulp-useref会将多个文件拼接成单一文件，并输出到相应目录

- `npm install gulp-if --save-dev` 进行判断做不同处理

		gulp(条件判断, 操作) // 满足条件判断就进行操作

- `npm install gulp-uglify --save-dev` 压缩JS

- `npm install gulp-minify-css --save-dev` 压缩CSS

- `npm install gulp-imagemin --save-dev` 优化图片，一般是在生产环境使用，开发环境不需要

- `npm install gulp-cache --save-dev` 减少重复压缩

- `npm install del --save-dev` 清理生成文件

- `npm install run-sequence --save-dev` 控制任务顺序

-  其它常用插件：
	- `gulp-rev`，为css文件名添加哈希值，而rev.manifest()会生成一个json文件，这个json文件中记录了原文件名和添加哈希值后的文件名的一个对应关系，这个对应关系在最后对应替换html的引用的时候会用到
	- 使用 `Autoprefixer`，你不再需要写CSS浏览器内核前缀
    - 增加 `Sourcemap`s，让你更方便的调试Sass,coffeescript
    - 使用 `sprity` 创建精灵图
    - `gulp-load-plugins`：自动加载 package.json 中的 gulp 插件，避免一个个require插件
		
			var gulp = require('gulp'),
			    gulpLoadPlugins = require('gulp-load-plugins'),
			    plugins = gulpLoadPlugins();
				// 不用再一个个加载插件
			gulp.task('js', function () {
			   return gulp.src('js/*.js')
			      .pipe(plugins.jshint())
			      .pipe(plugins.jshint.reporter('default'))
			      .pipe(plugins.uglify())
			      .pipe(plugins.concat('app.js'))
			      .pipe(gulp.dest('build'));
			});
    - `gulp-changed` 只允许通过修改的文件
    - `Babel` 或 `Traceur` 写ES6
    - `Browserify` , `webpack` , `jspm` 模块化JavaScript
    - `Handlebars` ,`Swing` 模块化Html
    - `require-dir` 分割gulpfile成多个文件
    - `gulp-moderinizr` 自动生成Modernizr脚本
	- 优化：
    	- unCSS 移除多余的CSS
    	- CSSO 更深入地优化CSS
    	- Critical 生成行内CSS
    - `gulp-rename`，重命名，例如压缩后的文件加个min
    - `gulp-load-plugins`，可以加载安装的所有插件