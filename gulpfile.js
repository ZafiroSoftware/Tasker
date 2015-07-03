var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var webpack = require('gulp-webpack');

var path = {
  HTML: 'src/*.html',
  CSS: './src/css/*.css',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('webpackTask', function() 
{
  return gulp.src('./src/js/AppTask.jsx')
    .pipe(webpack({
      transform : [ 'reactify' ],
      output: {
          path: __dirname + path.DEST_SRC + '/js',
          filename: 'task.bundle.js' },
       module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' ,exclude: /node_modules/},
          ]
        },
         resolve: {
            extensions: ['','.js','.jsx']
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

gulp.task('webpackTasks', function() 
{
  return gulp.src('./src/js/tasks.jsx')
    .pipe(webpack({
      entry: './src/js/tasks.jsx' ,
      output: {
          path: __dirname + path.DEST_SRC + '/js',
          filename: 'tasks.bundle.js' },
       module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
          ]
        },
         resolve: {
            extensions: ['', '.js','.jsx', '.htm']
        }
    }))
    .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

gulp.task('webpackProspeccion', function() 
{
  return gulp.src('src/js/AppProspeccion.jsx')
    .pipe(webpack({
      transform : [ 'reactify' ],
      output: {
          filename: 'Prospeccion.bundle.js' },
       module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' ,exclude: /node_modules/},
          ]
        },
         resolve: {
            extensions: ['', '.js','.jsx']
        }
    }))
    .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

gulp.task('webpackProspeccionInteresar', function() 
{
  return gulp.src('src/js/AppProspeccionInteresar.jsx')
    .pipe(webpack({
      transform : [ 'reactify' ],
      output: {
          filename: 'ProspeccionInteresar.bundle.js' },
       module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' ,exclude: /node_modules/},
          ]
        },
         resolve: {
            extensions: ['', '.js','.jsx']
        }
    }))
    .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

gulp.task('webpackProspeccionCalificar', function() 
{
  return gulp.src('src/js/AppProspeccionCalificar.jsx')
    .pipe(webpack({
      transform : [ 'reactify' ],
      output: {
          filename: 'ProspeccionCalificar.bundle.js' },
       module: {
          loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' ,exclude: /node_modules/},
             { test: /\.css$/, loader: 'style-loader!css-loader' },
          ]
        },
         resolve: {
            extensions: ['', '.js','.jsx']
        }
    }))
    .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch('src/js/tasks.jsx', ['webpackTasks']);
  gulp.watch('src/js/AppTask.jsx', ['webpackTask']);
  gulp.watch('src/js/AppProspeccion.jsx', ['webpackProspeccion']);
  gulp.watch('src/js/AppProspeccionInteresar.jsx', ['webpackProspeccionInteresar']);
  gulp.watch('src/js/AppProspeccionCalificar.jsx', ['webpackProspeccionCalificar']);
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch',
                      'webpackTasks',
                      'webpackTask',
                      'webpackProspeccion',
                      'webpackProspeccionInteresar',
                      'webpackProspeccionCalificar']);
