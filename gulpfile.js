const gulp = require('gulp');
const replace = require('gulp-replace');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}
function html() {
  return gulp.src('src/**/*.html').pipe(plumber()).pipe(gulp.dest('dist/'));
}
function css() {
  return gulp
    .src('src/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function html() {
  return gulp
    .src('src/**/*.html') // Путь ко всем вашим HTML-файлам
    .pipe(
      plumber({
        // Добавляем plumber сразу после src
        errorHandler: function (err) {
          console.error(err.toString());
          this.emit('end'); // Позволяет продолжить выполнение других задач
        },
      })
    )
    .pipe(
      replace(
        /<link rel="stylesheet" href="(\.\.\/)*index\.css"\s*\/?>/g,
        (match, p1) => {
          // Определяем количество '../' в пути
          const level = (p1 || '').length / 3; // Каждое '../' имеет длину 3 символа
          // Формируем новый путь к bundle.css
          const newPath = '../'.repeat(level) + 'bundle.css';
          return `<link rel="stylesheet" href="${newPath}" />`;
        }
      )
    )
    .pipe(
      replace(
        /<link rel="stylesheet" href="\.*\/?index\.css"\s*\/?>/g,
        '<link rel="stylesheet" href="./bundle.css" />'
      )
    ) // Замена для корневого файла
    .pipe(gulp.dest('dist')) // Сохранение обновленных HTML-файлов в папку dist
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}', {
      encoding: false,
    })
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}
function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}'], images);
}
const build = gulp.series(clean, gulp.parallel(html, css, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
