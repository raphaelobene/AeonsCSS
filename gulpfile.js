const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssMinify = require('gulp-clean-css')
const jsMinify = require('gulp-terser')
const svgMinify = require('gulp-svgmin')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const ttf2woff = require('gulp-ttf2woff');
// const imagemin = require('gulp-imagemin');
// const imgwebp = require('gulp-webp');
// const font = require('gulp-font');

function styles() {
  return src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssMinify())
    .pipe(rename('style.min.css'))
    .pipe(dest('./dist/styles'))
}

function scripts() {
  return src('./src/scripts/**/*.js')
    .pipe(jsMinify())
    .pipe(rename('script.min.js'))
    .pipe(dest('./dist/scripts/'))
}

function fonts() {
  return src('./src/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./dist/fonts'));
}

function svgs() {
  return src('./src/svgs/**/*.svg', { base: 'src/svgs' })
    .pipe(svgMinify())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("icon.svg"))
    .pipe(dest('./dist/svgs/'));
}

function watchTask() {
  watch(['./src/styles/**/*.scss', './src/scripts/**/*.js', './src/fonts/**/*.ttf', './src/svgs/**/*.svg', '*.html'], series(styles, scripts, fonts, svgs))
}

exports.default = series(styles, scripts, fonts, svgs, watchTask)