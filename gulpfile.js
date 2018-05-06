//Definição dos Modulos a serem utilizados no projeto
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


//Função para complilar o SASS e adicionar os prefixos
function compilaSass(){
    return gulp.src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}


//Tarefa de Gulp para a função de SASS
gulp.task('sass', compilaSass);


//Função para iniciar o Browser
function browser(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    })
}


//Tarefa de Gulp para o Browser-sync
gulp.task('browser-sync', browser);


//Função de Watch do Gulp
function watch(){
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}


//Inicia a tarefa de Watch
gulp.task('watch', watch);


//Tarefa padrão do Gulp que inicia o Watch e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));