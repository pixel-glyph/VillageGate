var watchify      = require('watchify');
var browserify    = require('browserify');
var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var gutil         = require('gulp-util');
var babelify      = require('babelify');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var assign        = require('lodash.assign');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var jade          = require('gulp-jade');


// ////////////////////////////////////////////////
// Jade Task
// ////////////////////////////////////////////////

gulp.task('jade', function() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(jade()) // pipe to jade plugin
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Javascript Browserify, Watchify, Babel
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// ////////////////////////////////////////////////

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
b.transform("babelify", {presets: ["es2015"]});

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({stream:true}));
}


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./public/"
        },
        notify: false
    });
});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
  gulp.src('src/sass/main.sass')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      // .on('error', errorlog)
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'SASS ERROR:' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/sass/**/*.sass', ['styles']);
});


gulp.task('default', ['jade', 'js', 'styles', 'browserSync', 'watch']);
