var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


gulp.task('styles', function () {
    return gulp.src('./css/_scss/*.scss')
               .pipe(plugins.sass())
               .pipe(plugins.autoprefixer({
                   browsers : ['last 7 versions']
               }))
               .pipe(plugins.cssnano({
                   discardComments: { removeAll: true }
               }))
               .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
    return gulp.src('./js/src/**/*.js')
               .pipe(plugins.babelMinify())
               .pipe(gulp.dest('./js/'));
});

gulp.task('scriptdata', function () {
    return gulp.src('./js/src/**/*.json')
               .pipe(gulp.dest('./js/'));
});

gulp.task('modernizr', function () {
    return gulp.src(['./js/src/**/*.js', '!./js/src/lib/modernizr.custom.js'])
               .pipe(plugins.modernizr('modernizr.custom.js'))
               .pipe(gulp.dest('./js/src/lib/'));
});


gulp.task('default', function () {
    gulp.start('styles');
    gulp.start('scripts');
    gulp.start('scriptdata');
    gulp.start('modernizr');

    gulp.watch(
        ['./css/_scss/**/*.scss', './js/src/**/*.js', './js/src/**/*.json'],
            ['styles', 'scripts', 'scriptdata']
        );
});