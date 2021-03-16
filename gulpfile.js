var gulp = require("gulp");
var rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  'src': {
    'scss': 'scss/**/*.scss',
  },
  'dist': {
    'css': 'html/wp-content/themes/theme-bones/library/css',
  }
};

/* scss */
gulp.task('sass', done => {
  gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.dist.css));
  done();
});

// 保存するたびにコンパイルする
gulp.task('dev', () => {
  gulp.watch(paths.src.scss, gulp.task('sass'));
});
