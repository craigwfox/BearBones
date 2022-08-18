// ====---------------====
// Imports
// ====---------------====
const { watch, series, src, dest } = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const browserSync = require("browser-sync").create()
const concat = require("gulp-concat")
const terser = require("gulp-terser")
const rename = require("gulp-rename")
const imagemin = require("gulp-imagemin")

// ====---------------====
// Paths
// ====---------------====
const paths = {
  styles: {
    input: "src/sass/**/*.scss",
    output: "dist/css/",
  },
  js: {
    input: "src/js/**/*.js",
    output: "dist/js",
  },
  imgs: {
    input: "src/imgs/**/*",
    output: "dist/imgs",
  },
  html: {
    input: "src/html/**/*",
    output: "dist/",
  },
  pass: {
    input: "src/pass-through/**/*",
    output: "dist/",
  },
  reload: "./dist/",
}

// ====---------------====
// Styles
// ====---------------====
function buildStyles() {
  return src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.styles.output))
    .pipe(browserSync.stream())
}

// ====---------------====
// Javascript
// ====---------------====
function buildJs() {
  return src(paths.js.input)
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest(paths.js.output))
}

// ====---------------====
// Images
// ====---------------====
function buildImgs() {
  return src(paths.imgs.input)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.imgs.output))
}

// ====---------------====
// HTML
// ====---------------====
function moveHtml() {
  return src(paths.html.input).pipe(dest(paths.html.output))
}

// ====---------------====
// Pass through to root
// ====---------------====
function movePass() {
  return src(paths.pass.input).pipe(dest(paths.pass.output))
}

// ====---------------====
// BrowserSync
// ====---------------====

// Watch for changes to the src directory
var startServer = function (done) {
  // Make sure this feature is activated before running
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
    notify: false,
  })
  done()
}

// Reload the browser when files change
const reloadBrowser = function (done) {
  browserSync.reload()
  done()
}

// ====---------------====
// Watchers 👀
// ====---------------====
function watchSource() {
  watch(paths.styles.input, series(buildStyles))
  watch(paths.js.input, series(buildJs, reloadBrowser))
  watch(paths.imgs.input, series(buildImgs, reloadBrowser))
  watch(paths.html.input, series(moveHtml, reloadBrowser))
  watch(paths.pass.input, series(movePass, reloadBrowser))
}

// ====---------------====
// Export tasks
// ====---------------====
exports.buildStyles = buildStyles
exports.buildJs = buildJs
exports.buildImgs = buildImgs
exports.moveHtml = moveHtml
exports.movePass = movePass

const allTasks = [buildStyles, buildJs, buildImgs, moveHtml, movePass]

exports.build = series(...allTasks)
exports.watch = series(startServer, watchSource)

// ====---------------====
// Default
// ====---------------====
exports.default = series(...allTasks)
