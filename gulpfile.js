const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gulp = require('gulp');
const targetPath='./builded/';
const devPath="./src/";
let include=function(cb){
      console.log("合并html")
    gulp.src(`${devPath}html/*.html`)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(`${targetPath}tmphtml`))
    .pipe(reload({ stream: true }));
    cb();
}
let revFn=function(cb){
      console.log("打印 html")
     setTimeout(()=>{
            gulp.src(['rev/**/*.json', `${targetPath}tmphtml/**/*.html`])
            .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                  'css': '/css',
                  '/js/': '/js/',
                  'cdn/': function(manifest_value) {
                        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                  }
            }
            }) )
            .pipe( gulp.dest(`${targetPath}html`) )
            .pipe(reload({ stream: true }));
            cb();
            
     },3000)
}


    
let lessFn=function(cb){
    gulp.src(`${devPath}less/*.less`)
      .pipe(less())
      .pipe(rev())
      .pipe(autoprefixer('last 10 version'))
      .pipe(gulp.dest(`${targetPath}css`))
      .pipe( rev.manifest() )
      .pipe( gulp.dest( 'rev/css' ) )
      cb();
}
let moveImage=function(cb){
      gulp.src(`${devPath}images/**/*`)
      .pipe(gulp.dest(`${targetPath}images`));
      cb();
}
let jsFn=function(cb){
      gulp.src(`${devPath}js/*.js`)
      .pipe(rev())
      .pipe(babel({
            presets: ['@babel/env']
        }))
          .pipe(gulp.dest(`${targetPath}js`))
          .pipe( rev.manifest() )
          .pipe( gulp.dest( 'rev/js' ) )
          cb();
}
let serverFn=function(cb){
      browserSync.init({
            server: {
                baseDir: targetPath,
                files:['**'],
            //     port: 8080,
            //     open: "local"
            }
        });
        
     cb();   
}
let watchFn=function(cbs){
      gulp.watch([`${devPath}images/**/*`], function(cb) {
            moveImage(cb);
      });
      gulp.watch([`${devPath}less/**/*`], function(cb) {
            lessFn(cb);
      });
      gulp.watch([`${devPath}js/**/*`], function(cb) {
            jsFn(cb);
      });
      gulp.watch([`${devPath}html/*`,`${devPath}template/*`], function(cb) {
            console.log("html变动=========")
            include(cb);
      });
      cbs();
};

exports.default = gulp.series(
      gulp.parallel(
                  moveImage,
                  watchFn,
                  include, lessFn,jsFn
      ),
      serverFn
);