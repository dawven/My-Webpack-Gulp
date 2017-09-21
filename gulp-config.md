## gulp-config ##

gulp常用配置

----------

- `git bash` 到目标文件夹

- `npm init` 初始化新建package.json

- `gulpfile.js` 新建webpack配置文件

- `npm install webpack --save-dev` 安装webpack到项目文件

- `npm install gulp-sass --save-dev` 处理sass

- `npm install browser-sync --save-dev` 搭建本地服务器

- `npm install gulp-useref --save-dev` gulp-useref会将多个文件拼接成单一文件，并输出到相应目录

- `$ npm install gulp-if --save-dev` 进行判断做不同处理

- `$ npm install gulp-uglify --save-dev` 压缩JS

- `npm install gulp-if gulp-minify-css --save-dev` 压缩CSS

- `npm install gulp-imagemin --save-dev` 优化图片

- `$ npm install gulp-cache --save-dev` 减少重复压缩

- `npm install del --save-dev` 清理生成文件

- `$ npm install run-sequence --save-dev` 控制任务顺序

-  其它常用插件 
	- 使用 `Autoprefixer`，你不再需要写CSS浏览器内核前缀
    - 增加 `Sourcemap`s，让你更方便的调试Sass,coffeescript
    - 使用 `sprity` 创建精灵图
    - `gulp-load-plugins`：自动加载 package.json 中的 gulp 插件，避免一个个require插件
    - `gulp-changed` 只允许通过修改的文件
    - `Babe`l 或 `Traceur` 写ES6
    - `Browserify` , `webpack` , `jspm` 模块化JavaScript
    - `Handlebars` ,`Swing` 模块化Html
    - `require-dir` 分割gulpfile成多个文件
    - `gulp-moderinizr` 自动生成Modernizr脚本
	- 优化：
    	- unCSS 移除多余的CSS
    	- CSSO 更深入地优化CSS
    	- Critical 生成行内CSS