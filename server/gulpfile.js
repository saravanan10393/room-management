var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

var source = {
    js : ["*.js",'**/*.js', '!dist/{** | *.js}', '!webpack.config.js', '!gulpfile.js', '!node_modules/**']
} 

gulp.task("default", function () {
  return gulp.src(source.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(concat("app.all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
});