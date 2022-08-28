import gulp from "gulp";
import browserSync from "browser-sync";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import jsmin from "gulp-jsmin";
import concat from "gulp-concat";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("style-min.css"))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/js/*.js", gulp.parallel("scripts"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(jsmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(concat("js-min.js"))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("icons", function () {
  return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
});

gulp.task("images", function () {
  return gulp.src("src/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "scripts",
    "fonts",
    "icons",
    "html",
    "images"
  )
);
