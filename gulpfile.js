// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngrok = require('ngrok');
var psi = require('psi');
var sequence = require('run-sequence');
var site = '';
var connect = require('gulp-connect');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageResize = require('gulp-image-resize');
var critical = require('critical');
var inlineCss = require('gulp-inline-css');
var htmlmin = require('gulp-htmlmin');

// set up a global port variable
var portVal = 3020;

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compress', function() {
  return gulp.src('/dist/*.html')
        .pipe(uglify())
        .pipe(gulp.dest('dist/html'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('css/*.css', ['css']);
});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});

gulp.task('psi-seq', function (cb) {
  return sequence(
    'browser-sync',
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
});
 
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});
 
gulp.task('default', ['connect', 'watch']);

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('browser-sync-psi', ['jekyll-build'], function() {
  browserSync({
    port: portVal,
    open: false,
    server: {
      baseDir: '_site'
    }
  });
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function () {
  return gulp.src('dist/views/images/pizzaria.jpg')
    .pipe(imageminJpegRecompress({loops: 3})())
    .pipe(gulp.dest('build/images'));
});

gulp.task('default', function () {
  gulp.src('views/images/pizzaria.jpg')
    .pipe(imageResize({ 
      width : 120,
      height : 175,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/', inline: true, css: ['dist/css/style.css']}))
        .pipe(gulp.dest('dist'));
});
// or...

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });

gulp.task('css', function() {
    return gulp.src('./views/*.html')
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: false
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify', function() {
  return gulp.src('./dist/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html'))
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);