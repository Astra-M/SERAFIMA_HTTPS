const gulp = require('gulp');
const replace = require('gulp-replace');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpPug = require('gulp-pug');
const gulpNewer = require('gulp-newer');

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}
function pug() {
  return gulp
    .src('src/**/*.pug')
    .pipe(
      gulpPug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
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
  return (
    gulp
      // .src(['src/**/*.html', 'src/**/*.pug']) // Добавляем поддержку Pug-файлов в layouts
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
      .pipe(browserSync.reload({ stream: true }))
  );
}
function processPug() {
  return gulp
    .src(['src/**/*.pug']) // Путь ко всем Pug-файлам
    .pipe(plumber())
    .pipe(
      replace(
        /link\(rel="stylesheet",\s*href="(\.\.\/)*index\.css"\)/g, // Регулярное выражение для поиска
        (match, p1) => {
          const level = (p1 || '').length / 3; // Каждое '../' имеет длину 3 символа
          const newPath = '../'.repeat(level) + 'bundle.css';
          return `link(rel="stylesheet", href="${newPath}")`; // Возвращаем обновленную строку
        }
      )
    )
    .pipe(
      //не будет работать, пока не заменю регулярку на синтаксис шаблона паг.
      replace(
        /<link rel="stylesheet" href="\.*\/?index\.css"\s*\/?>/g,
        '<link rel="stylesheet" href="./bundle.css" />'
      )
    )
    .pipe(
      gulpPug({
        pretty: true, // Форматирование выходного HTML
      })
    )
    .pipe(gulp.dest('dist/')) // Сохраняем сгенерированные HTML в dist
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return (
    gulp
      .src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}', {
        encoding: false,
      })
      // Используем gulp-newer для копирования (добавления) только новых или измененных изображений
      .pipe(gulpNewer('dist/images'))
      .pipe(gulp.dest('dist/images'))
      .pipe(browserSync.reload({ stream: true }))
  );
}
function clean() {
  return del('dist');
}

// Функция для копирования (добавления) в сборку всех новых файлов, исключая Pug
function copyNewFiles() {
  return gulp
    .src(['src/**/*', '!src/**/*.pug']) // Исключаем Pug-файлы (тк pug не нужен в итоговой сборке)
    .pipe(gulpNewer('dist/')) // Добавляем только новые или измененные файлы (newer нужен, чтобы изображения не пропадали при добавлении новых pug-файлов)
    .pipe(gulp.dest('dist/')); // Копируем все остальные файлы
}

function watchFiles() {
  gulp.watch(['src/**/*.pug'], processPug);
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}'], images);
  // Отслеживаем все изменения в папке src для новых файлов и папок, чтобы они появились сразу в сборке
  gulp.watch(['src/**/*'], copyNewFiles).on('change', browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(processPug, html, css, images)); // Добавляем html в сборку
const watchapp = gulp.series(build, gulp.parallel(watchFiles, serve));

exports.pug = pug;
exports.processPug = processPug;
exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean;
exports.copyNewFiles = copyNewFiles;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
