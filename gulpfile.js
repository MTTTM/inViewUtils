const fileinclude = require("gulp-file-include");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const rev = require("gulp-rev");
const revCollector = require("gulp-rev-collector");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const gulp = require("gulp");
const targetPath = "./tmp/";
const bulidPath = "./dist/";
const devPath = "./src/";
//合并html模块
let include = function (cb) {
    gulp
        .src(`${devPath}html/*.html`)
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest(`${targetPath}html`))
        .pipe(reload({ stream: true }));
    cb();
};
//编译less，做兼容处理
let lessFn = function (cb) {
    gulp
        .src(`${devPath}less/*.less`)
        .pipe(less())
        .pipe(autoprefixer("last 10 version"))
        .pipe(gulp.dest(`${targetPath}css`))
        .pipe(reload({ stream: true }));
    cb();
};
//移动图片
let moveImage = function (cb) {
    gulp
        .src(`${devPath}images/**/*`)
        .pipe(gulp.dest(`${targetPath}images`))
        .pipe(reload({ stream: true }));
    cb();
};
//编译js6到指定文件目录
let jsFn = function (cb) {
    gulp
        .src(`${devPath}js/*.js`)
        .pipe(
            babel({
                presets: ["@babel/env"],
                plugins: ["@babel/plugin-transform-modules-umd"],
            })
        )
        .pipe(gulp.dest(`${targetPath}js`))
        .pipe(reload({ stream: true }));
    cb();
};
let libsMove = function (cb) {
    gulp
        .src(`${devPath}libs/**/*`)
        .pipe(gulp.dest(`${targetPath}libs`))
        .pipe(reload({ stream: true }));
    cb();
};
//开启本地服务
let serverFn = function (cb) {
    browserSync.init({
        server: {
            baseDir: targetPath, //在开发环境，生成的文件启动服务器
            files: ["**"],
        },
    });

    cb();
};
//监听文件变动，触发编译
let watchFn = function (cbs) {
    gulp.watch([`${devPath}images/**/*`], function (cb) {
        moveImage(cb);
    });
    gulp.watch([`${devPath}less/**/*`], function (cb) {
        lessFn(cb);
    });
    gulp.watch([`${devPath}js/**/*`], function (cb) {
        jsFn(cb);
    });
    gulp.watch([`${devPath}html/*`, `${devPath}template/*`], function (cb) {
        console.log("html变动=========");
        include(cb);
    });
    cbs();
};

//======打包发布==================
//给html引用的本地cssjs添加时间戳
let htmlBulidrevFn = function (cb) {
    gulp
        .src(["rev/**/*.json", `${targetPath}html/**/*.html`])
        .pipe(
            revCollector({
                replaceReved: true,
                dirReplacements: {
                    css: "/css",
                    "/js/": "/js/",
                    "cdn/": function (manifest_value) {
                        return (
                            "//cdn" +
                            (Math.floor(Math.random() * 9) + 1) +
                            "." +
                            "exsample.dot" +
                            "/img/" +
                            manifest_value
                        );
                    },
                },
            })
        )
        .pipe(gulp.dest(`${bulidPath}html`));
    cb();
};
let jsBulidFn = function (cb) {
    gulp
        .src(`${targetPath}js/*.js`)
        // .pipe(rev())
        .pipe(gulp.dest(`${bulidPath}js`))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/js"));
    cb();
};
let cssBulidFn = function (cb) {
    gulp
        .src(`${targetPath}css/*.css`)
        // .pipe(rev())
        .pipe(gulp.dest(`${bulidPath}css`))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/css"));
    cb();
};
let imgBulidMove = function (cb) {
    gulp.src(`${targetPath}images/**/*`).pipe(gulp.dest(`${bulidPath}images`));
    cb();
};
let libsBulidMove = function (cb) {
    gulp.src(`${targetPath}images/**/*`).pipe(gulp.dest(`${bulidPath}images`));
    cb();
};
//对dev环境编译出来的代码进行打包
exports.build = gulp.series(
    jsBulidFn,
    // cssBulidFn,
    // imgBulidMove,
    // libsBulidMove,
    // htmlBulidrevFn
);
//dev环境任务
exports.default = gulp.series(
    gulp.parallel(moveImage, watchFn, include, lessFn, jsFn, libsMove),
    serverFn
);