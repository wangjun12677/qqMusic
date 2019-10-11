var gulp = require("gulp");

// 压缩html
var htmlClean = require("gulp-htmlclean");//接收插件

// 压缩图片
var imageMin = require("gulp-imagemin");

// 压缩js
var uglify = require("gulp-uglify");

// 去掉js中的调试语句
var debug = require("gulp-strip-debug");

//将less转换成css
var less = require("gulp-less")

//压缩css
var cleanCss = require("gulp-clean-css");

//postcss autoprefixer
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");//当成参数放在postCss里

//开启服务器
var connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/"
}

//设置环境变量
var devMod = process.env.NODE_ENV == "development";//这个设置不管用的话
//export NODE_ENV=development 在git设置环境变量
// console.log(devMod)
//开发环境为true 生产环境为false

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")//拿到开发目录src下所有html文件
        //pipe变成文件流放在管道里处理
        .pipe(connect.reload());//自动刷新
        if(!devMod){//如果不是开发环境 进行压缩处理
            page.pipe(htmlClean())//压缩处理
        }
        page.pipe(gulp.dest(folder.dist + "html/"))//输出处理好的文件到dist目录
})

gulp.task("image",function(){
    gulp.src(folder.src + "image/*")//拿到开发目录src下所有css文件
        .pipe(imageMin())//压缩图片
        .pipe(gulp.dest(folder.dist + "image/"))//输出处理好的文件到dist目录
})

gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")//拿到开发目录src下所有css文件
        .pipe(connect.reload())//自动刷新
        .pipe(less())//less转换成css
        .pipe(postCss([autoprefixer()]));
        if(!devMod){
            page.pipe(cleanCss())//压缩css
        }
        page.pipe(gulp.dest(folder.dist + "css/"))//输出处理好的文件到dist目录
})

gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")//拿到开发目录src下所有js文件
        .pipe(connect.reload())//自动刷新
        if(!devMod){
            page.pipe(debug())//去掉调试语句
                .pipe(uglify())//压缩处理
        }
        page.pipe(gulp.dest(folder.dist + "js/"))//输出处理好的文件到dist目录
})

//开启服务器
gulp.task("server",function(){
    connect.server({//默认放在8080端口
        port:"8888",//修改端口号为8888'
        livereload:true//开启刷新 需要调用
    })
})

//开启监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"])//监听html目录下所有文件
    gulp.watch(folder.src + "css/*",["css"])
    gulp.watch(folder.src + "js/*",["js"])
})

gulp.task("default",["html","css","js","image","server","watch"]);