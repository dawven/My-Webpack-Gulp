# gulp API #


----------

- gulp.src(globs[, options])

	- `gulp.src(globs[, options])`，用于产生数据流，参数为符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件

	- 参数`globs`，类型是String 或 Array，所要读取的（文件） glob 或者包含 globs 的数组，路径不要用相对路径
	
	- src通配符，对文件名和路径进行匹配：

		- `*` 匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾

 		- `**` 匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。

 		- `?` 匹配文件路径中的一个字符(不会匹配路径分隔符)

 		- `[...]` 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法

 		- `!(pattern|pattern|pattern)` 匹配任何与括号中给定的任一模式都不匹配的

 		- `?(pattern|pattern|pattern)` 匹配括号中给定的任一模式0次或1次，类似于js正则中的`(pattern|pattern|pattern)?`

 		- `+(pattern|pattern|pattern)` 匹配括号中给定的任一模式至少1次，类似于js正则中的`(pattern|pattern|pattern)+`

 		- `*(pattern|pattern|pattern)` 匹配括号中给定的任一模式0次或多次，类似于js正则中的`(pattern|pattern|pattern)*`

 		- `@(pattern|pattern|pattern)` 匹配括号中给定的任一模式1次，类似于js正则中的(pattern|pattern|pattern)

		- 例子：
	
			- *.scss：*号匹配当前目录任意文件，所以这里*.scss匹配当前目录下所有scss文件
		
			- **/*.scss：匹配当前目录及其子目录下的所有scss文件。
		
			- !not-me.scss：！号移除匹配的文件，这里将移除not-me.scss
		
			- *.+(scss|sass)：+号后面会跟着圆括号，里面的元素用|分割，匹配多个选项。这里将匹配scss和sass

	- 可选参数`options`，类型是object

- gulp.dest(path[, options])

	- `gulp.dest(path[, options])`，将管道的输出写入文件，而且这些输出还可以继续输出，所以可以多次调用dest方法，将输出写入到多个目录。目录不存在，也会被新建

	- `path`参数，类型String或者function，文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径


- gulp.task(name[, deps], fn)

	- `gulp.task(name[, deps], fn)`，定义具体任务，它的第一个参数是任务名，第二个参数是任务函数
	
	- `name`，任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格
		
	- `deps`，可选参数，个包含任务列表的数组，这些任务会在你当前任务运行之前完成
		
	- `fn`，该函数定义任务所要执行的一些操作。通常来说，它会是这种形式：`gulp.src().pipe(someplugin())`

	- 默认的，task 将以最大的并发数执行，也就是说，gulp 会一次性运行所有的 task 并且不做任何等待。如果你想要创建一个序列化的 task 队列，并以特定的顺序执行，你需要做两件事：

    	- 给出一个提示，来告知 task 什么时候执行完毕，
    	
    	- 并且再给出一个提示，来告知一个 task 依赖另一个 task 的完成
    		
				var gulp = require('gulp');

				// 返回一个 callback，因此系统可以知道它什么时候完成
				gulp.task('one', function(cb) {
				    // 做一些事 -- 异步的或者其他的
				    cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
				});
				
				// 定义一个所依赖的 task 必须在这个 task 执行之前完成
				gulp.task('two', ['one'], function() {
				    // 'one' 完成后
				});
				
				gulp.task('default', ['one', 'two']);
		
- gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])

	- `gulp.watch(glob [, opts], tasks)` 或 `gulp.watch(glob [, opts, cb])`，watch方法用于指定需要监视符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。一旦这些文件发生变动，就运行指定任务

	- `gulp.watch(glob[, opts], tasks)`

		- `glob`，类型String和Array，一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动

		- `opts`，类型： Object 

		- `tasks`，类型： Array ，需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字

				var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
				// 给监听绑定一个事件，当监听的文件变动时触发回调函数
				watcher.on('change', function(event) { 
					console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); 
				});

	- `gulp.watch(glob[, opts, cb])`

		- `cb(event)`，类型： Function，每次变动需要执行的 callback

		- callback 会被传入一个名为 event 的对象。这个对象描述了所监控到的变动

			- event.type，类型： String，发生的变动的类型：added, changed 或者 deleted

			- event.path，类型： String，触发了该事件的文件的路径