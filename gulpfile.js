const { src, dest, watch, parallel } = require('gulp');


const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');


const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(postcss([ autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
}

function imagenes() {
    return src('src/img/**/*.{jpg,png}')
        const opciones = {
            optimizationLevel: 3
        }
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
}

function imagenWebp() {
    return src('src/img/**/*.{jpg,png}')
        const opciones = {
            quality: 50
        }
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    watch('src/img/**/*', imagenWebp);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imagenWebp = imagenWebp;
exports.default = parallel( imagenes, imagenWebp, css, dev);