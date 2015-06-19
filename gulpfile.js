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

gulp.task('webpackCliente', function() 
{
  return gulp.src('src/js/AppCliente.jsx')
    .pipe(webpack({
      entry: './src/js/AppCliente.jsx',
      output: {
          path: __dirname + path.DEST_SRC + '/js',
          filename: 'Cliente.bundle.js' },
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
      entry: './src/js/AppProspeccion.jsx',
      output: {
          path: __dirname + path.DEST_SRC + '/js',
          filename: 'Prospeccion.bundle.js' },
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

gulp.task('webpackCustomerOrder', function() 
{
  return gulp.src('src/js/AppCustomerOrder.jsx')
    .pipe(webpack({
      entry: './src/js/AppCustomerOrder.jsx',
      output: {
          path: __dirname + path.DEST_SRC + '/js',
          filename: 'CustomerOrder.bundle.js' },
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
 
gulp.task('webpackTask', function() 
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

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch('src/js/AppCustomerOrder.jsx', ['webpackCustomerOrder']);
  gulp.watch('src/js/tasks.jsx', ['webpackTask']);
  gulp.watch('src/js/AppProspeccion.jsx', ['webpackProspeccion']);
  gulp.watch('src/js/AppCliente.jsx', ['webpackCliente']);
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch','webpackCustomerOrder','webpackTask','webpackProspeccion', 'webpackCliente']);