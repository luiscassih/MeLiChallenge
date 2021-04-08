const gulp = require("gulp");
const ts = require("gulp-typescript");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const spawn = require("child_process").spawn;

var nodeprocess;

var tsp = ts.createProject("tsconfig.json");

const buildClient = () => {
  gulp.src("src/client/public/*").pipe(gulp.dest("dist/public"));
  gulp.src(".env").pipe(gulp.dest("dist/"));
  return gulp.src("src/*")
    .pipe(gulpWebpack(require("./webpack.config"), webpack))
    .pipe(gulp.dest("dist"));
}

const buildServer = () => {
  return gulp.src("src/app.ts")
    .pipe(gulpWebpack(require("./webpack.server.config"), webpack))
    .pipe(gulp.dest("dist"));
}

const startServer = async () => {
  if (nodeprocess) nodeprocess.kill();
  nodeprocess = await spawn("node", ["app"], {stdio: "inherit", cwd: "dist/"});
  nodeprocess.on("close", function(code) {
      if(code === 8) {
          gulp.log("error", code)
      }
  });
}
const watch = () => {
  // gulp.watch("src/app.ts", gulp.series(buildServer, startServer));
  gulp.watch("src", { ignored: "src/app.ts"}, gulp.series(buildServer, buildClient, startServer));
}

exports.dev = gulp.series(buildServer, buildClient, startServer, watch);
exports.build = gulp.series(buildServer, buildClient);
exports.watch = gulp.watch