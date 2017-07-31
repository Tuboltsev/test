'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const wiredep = require('wiredep').stream;
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';



function clean() {
	return del(['public']);
}
gulp.task(clean);


function assets() {
	return gulp.src(['frontend/assets/**/*.*', '!frontend/assets/svg/*.*'])
		.pipe(gulpIf(!isDevelopment, imagemin({optimizationLevel: 5})))
		.pipe(gulp.dest('./public'));
}


function buildCss() {
	return gulp.src(['frontend/scss/**/*.scss', '!frontend/scss/**/sprite.scss'])
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sass(gulpIf(!isDevelopment, {outputStyle: 'compressed'})).on('error', sass.logError))
		.pipe(postcss([ autoprefixer('last 2 versions', 'ie 10') ]))
        .pipe(gulp.dest('./public/css'))	
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest('public/css'));	
}


gulp.task('bower', function() {
	return gulp.src('./public/*.html')
		.pipe(wiredep({
			derictory: "frontend/bower_components"
		}))
		.pipe(gulp.dest('./public'));	
});


gulp.task('html', function() {
	return gulp.src('./frontend/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./public/'));	
});


function script() {
	return gulp.src('frontend/js/**/*.js')
		.pipe(gulpIf(!isDevelopment, uglify()))
		.pipe(gulp.dest('./public/js/'));	
}


gulp.task('sprite:svg', function () {
	return gulp.src('frontend/assets/svg/*.svg')
		.pipe(svgSprite({
			mode: {
				css: {
					dest: 			'.',
					bust: 			false,
					sprite: 		'sprite.svg',
					layout: 		'vertical',
					prefix: 		'%%',
					dimensions: 	true,
					render: 		{
						scss: true
					}
				}
			}
		}))
		.pipe(gulpIf('{*.sass,*.scss}', 
				gulp.dest('frontend/scss'), 
				gulp.dest('public/css')
		));
});



function watch() {
	gulp.watch('frontend/scss/**/*.scss', gulp.series(buildCss));
	gulp.watch('frontend/js/**/*.js', gulp.series(script));
	gulp.watch('frontend/**/*.pug', gulp.series('html', 'bower'));
	gulp.watch('frontend/assets/**/*.*', gulp.series(assets));
}


gulp.task('dev', gulp.series(
	gulp.parallel(
		gulp.series('html', 'bower'), 
		buildCss, 
		script, 
		assets, 
		'sprite:svg'
	),
	watch
));


gulp.task('default', gulp.series(
	clean, 
	gulp.parallel(
		gulp.series('html', 'bower'), 
		buildCss, 
		script, 
		assets, 
		'sprite:svg'
	)
));