> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://markgoodyear.com/2014/01/getting-started-with-gulp/

<header class="post-header">

# Getting started with gulp

Jan 19, 2014

</header>

<article class="post-content">

*   _Updated Jan 28th, 2014 to reflect the advancement of gulp_
*   _Updated Apr 21st, 2014 to utilise updated `gulp-livereload`_
*   _Updated Aug 11th, 2014 Using `del` instead of `gulp-clean`, updated `gulp-livereload`_
*   _Updated May 20th, 2015 Update `gulp-ruby-sass` syntax_
*   _Updated Nov 2nd, 2015 Update `del` syntax_
*   _Updated Jan 12th, 2016 `gulp-minify-css` depreciated. Use `gulp-cssnano`_

Step aside Grunt, there's a new task runner in town. Gulp is an intuitive, code-over-configuration, streaming build system. It's _fast_.

_Why should I be interested?_ Good question. Gulp’s code-over-configuration makes it not only easy to write tasks for, but also much easier to read and maintain.

Gulp uses node.js streams, making it faster to build as it doesn’t need to write temporary files/folders to disk. If you want to learn more about streams—although not necessary—[this article](https://github.com/substack/stream-handbook) is a good read. Gulp allows you to input your source file(s), pipe them through a bunch of plugins and get an output at the end, rather than configuring each plugin with an input and output—like in Grunt. Let’s take a look at an example of what a basic Sass build could look like with both Grunt and gulp:

####**Grunt:**

```
sass: {
  dist: {
    options: {
      style: 'expanded'
    },
    files: {
      'dist/assets/css/main.css': 'src/styles/main.scss',
    }
  }
},

autoprefixer: {
  dist: {
    options: {
      browsers: [
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
      ]
    },
    src: 'dist/assets/css/main.css',
    dest: 'dist/assets/css/main.css'
  }
},

grunt.registerTask('styles', ['sass', 'autoprefixer']);
```

Grunt requires each plugin to be configured separately, specifying source and destination paths for each plugin. For example, we input one file to the Sass plugin, which then saves the output. We then need to configure Autoprefixer to input Sass’s output, which then outputs another file. Let’s take a look at the same configuration with gulp:

####**Gulp:**

```
gulp.task('sass', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
});
```

With gulp we only input one file. This gets modified by the Sass plugin, passed to the Autoprefixer plugin and modified, then we get one file out. This process speeds up the build process as we’re not reading and writing unnecessary files to end up with one.

So you’re interested, now what? Let’s install gulp and create a basic gulpfile with some core tasks to get started.

## Installing gulp

Before we delve into configuring tasks, we need to install gulp:

```
$ npm install gulp -g
```

This installs gulp globally, giving access to gulp’s CLI. We then need to install it locally to the project. `cd` into your project and run the following (make sure you have an existing `package.json` file):

```
$ npm install gulp --save-dev
```

This installs gulp locally to the project and saves it to the `devDependencies` in the `package.json` file.

## Installing gulp plugins

We are going to install some plugins to achieve the following tasks:

*   Sass compile _([gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass))_
*   Autoprefixer _([gulp-autoprefixer](https://github.com/Metrime/gulp-autoprefixer))_
*   Minify CSS _([gulp-cssnano](https://github.com/jonathanepollack/gulp-cssnano))_
*   JSHint _([gulp-jshint](https://github.com/wearefractal/gulp-jshint))_
*   Concatenation _([gulp-concat](https://github.com/wearefractal/gulp-concat))_
*   Uglify _([gulp-uglify](https://github.com/terinjokes/gulp-uglify))_
*   Compress images _([gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin))_
*   LiveReload _([gulp-livereload](https://github.com/vohof/gulp-livereload))_
*   Caching of images so only changed images are compressed _([gulp-cache](https://github.com/jgable/gulp-cache/))_
*   Notify of changes _([gulp-notify](https://github.com/mikaelbr/gulp-notify))_
*   Clean files for a clean build _([del](https://www.npmjs.org/package/del))_

To install these plugins, run the following command:

```
$ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
```

This will install all necessary plugins and save them to `devDependencies` in `package.json`. A full list of gulp plugins can be [found here](http://gulpjs.com/plugins/).

## Load in the plugins

Next, we need to create a `gulpfile.js` and load in the plugins:

```
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
```

Phew! That seems a lot more work than Grunt, right? Gulp plugins are slightly different from Grunt plugins—they are designed to do one thing and one thing well. An example; Grunt’s `imagemin` uses caching to avoid re-compressing images that are already compressed. With gulp, this would be done with a cache plugin, which can also be used to cache other things too. This adds an extra layer of flexibility to the build process. Pretty cool huh?

We can [auto load](https://github.com/jackfranklin/gulp-load-tasks) all installed plugins like in Grunt, but for the purpose of this post we’ll stick to the manual method.

## Creating tasks

### Compile Sass, Autoprefix and minify

Firstly, we will configure Sass compiling. We’re going to compile Sass as expanded, run it through Autoprefixer and save it to our destination. We’ll then create a minified `.min` version, auto-refresh the page and notify that the task is complete:

```
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
```

_A little explanation before moving on._

```
gulp.task('styles', function() { ... )};
```

This is the `gulp.task` API which is used to create tasks. The above can run from Terminal with `$ gulp styles`.

```
return sass('src/styles/main.scss', { style: 'expanded' })
```

This is the new `gulp-ruby-sass` API where we define the source file(s) and pass in any options. For many other plugins, you would use the `gulp.src` API which we use later in this post (`return gulp.src(...)`). It also can be a glob pattern, such as `/**/*.scss` to match multiple files. By returning the stream it makes it asynchronous, ensuring the task is fully complete before we get a notification to say it’s finished.

```
.pipe(autoprefixer('last 2 version'))
```

We use `.pipe()` to pipe the source file(s) into a plugin. Usually the options for a plugin are found on their respective GitHub page. I’ve linked them above for convenience. Pipes are chainable so you can add as many plugins as you need to the stream.

```
.pipe(gulp.dest('dist/assets/css'));
```

The `gulp.dest` API is where we set the destination path. A task can have multiple destinations, one to output the expanded version and one to output the minifed version. This is demonstrated in the above `styles` task.

I’d recommend checking out the gulp [API documentaiton](https://github.com/gulpjs/gulp/blob/master/docs/API.md) to get a better understanding of these methods. It’s not as scary as it sounds!

### JSHint, concat, and minify JavaScript

Hopefully you’ll now have a good idea of how to create a task for gulp. Next, we’ll set up the scripts task to lint, concat and uglify:

```
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
```

Here we use the `gulp.src` API to specify our input files. One thing to note is that we need to specify a reporter for JSHint. I’m using the default reporter, which should be fine for most people. More on this can be found [on the JSHint website](http://www.jshint.com/docs/reporters/).

### Compress Images

Next, we’ll set up image compression:

```
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
```

This will take any source images and run them through the `imagemin` plugin. We can go a little further and utilise caching to save re-compressing already compressed images each time this task runs. All we need is the [gulp-cache](https://github.com/jgable/gulp-cache) plugin—which we installed earlier. To set this up, we need to change this line:

```
.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
```

To this:

```
.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
```

Now only new or changed images will be compressed. _Neat!_

### Clean up!

Before deploying, it’s a good idea to clean out the destination folders and rebuild the files—just in case any have been removed from the source and are left hanging out in the destination folder:

```
gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});
```

We don’t need to use a gulp plugin here as we can take advantage of Node modules directly within gulp. We use a return to ensure the task finishes before exiting.

### The default task

We can create a default task, ran by using `$ gulp`, to run all three tasks we have created:

```
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
```

Notice the additional array in `gulp.task`. This is where we can define task dependencies. In this example, the clean task will run before the tasks in `gulp.start`. Tasks in Gulp run concurrently together and have no order in which they’ll finish, so we need to make sure the `clean` task is completed before running additional tasks.

_**Note:** It’s advised against using `gulp.start` in favour of executing tasks in the dependency arrary, but in this scenario to ensure `clean` fully completes, it seems the best option._

### Watch

To watch our files and perform the necessary task when they change, we firstly need to create a new task, then use the `gulp.watch` API to begin watching files:

```
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

});
```

We specify the files we want to watch via the `gulp.watch` API and define which task(s) to run via the dependency array. We can now run `$ gulp watch` and any changes to `.scss`, `.js` or image files will run their respective tasks.

### LiveReload

Gulp can also take care of automatically refreshing the page on file change. We’ll need to modify our `watch` task, configuring the LiveReload server.

```
gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});
```

To make this work, you’ll need to install and enable the LiveReload browser plugin. You can also [place the snippet in manually](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-).

## Putting it all together

Here we have the full gulpfile, embedded from [this gist](https://gist.github.com/markgoodyear/8497946#file-01-gulpfile-js):

```
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

```

[view raw](https://gist.github.com/markgoodyear/8497946/raw/a51ecf66d7c4e430873a219d954f24a1bc98b27a/01-gulpfile.js) [01-gulpfile.js](https://gist.github.com/markgoodyear/8497946#file-01-gulpfile-js) hosted with ❤ by [GitHub](https://github.com)

I’ve also put together a Gruntfile that accomplishes the same tasks, so you have take a look for a comparison, in the [same gist](https://gist.github.com/markgoodyear/8497946#file-02-gruntfile-js).