var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-rollup');
var typescript = require('rollup-plugin-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('default', function() {
    return gulp.src('src/main.ts')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            format: 'iife',
            moduleName: 'Wagtail',
            plugins: [
                typescript()
            ]
        }))
        .pipe((rename('wagtail.js')))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


gulp.task('dist', ['default'], function() {
    return gulp.src('dist/wagtail.js')
        .pipe(uglify())
        .pipe((rename('wagtail.min.js')))
        .pipe(gulp.dest('dist'));
});
