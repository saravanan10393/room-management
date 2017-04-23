var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var clean = require("gulp-clean");

var source = {
    js : ["*.js",'**/*.js', '!dist/{** | *.js}', '!webpack.config.js', '!gulpfile.js', '!node_modules/**']
} 

gulp.task("clear-dest", function(){
    return gulp.src("./dist", {read:false})
            .pipe(clean())
})

gulp.task("default", ['clear-dest'], function () {
  return gulp.src(source.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(concat("app.all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
});