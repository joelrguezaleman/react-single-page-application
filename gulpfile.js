var source             = require('vinyl-source-stream'),
    gulp               = require('gulp'),
    babelify           = require('babelify'),
    browserify         = require('browserify'),
    watchify           = require('watchify'),
    notify             = require('gulp-notify'),
    stylus             = require('gulp-stylus'),
    cssnano            = require('gulp-cssnano'),
    autoprefixer       = require('gulp-autoprefixer'),
    uglify             = require('gulp-uglify'),
    concat             = require('gulp-concat'),
    htmlmin            = require('gulp-htmlmin'),
    buffer             = require('vinyl-buffer'),
    browserSync        = require('browser-sync'),
    reload             = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback');

const DEV_DIRECTORY  = 'src/';
const PROD_DIRECTORY = 'dist/';

gulp.task('html', function() {
    return gulp.src(DEV_DIRECTORY + 'index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(PROD_DIRECTORY))
        .pipe(reload({stream:true}));
});

gulp.task('styles',function() {
    gulp.src(DEV_DIRECTORY + 'styles/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(PROD_DIRECTORY + 'css/'))
        .pipe(reload({stream:true}));
});

gulp.task('images',function(){
    gulp.src(DEV_DIRECTORY + 'images/**')
        .pipe(gulp.dest(PROD_DIRECTORY + 'img'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server : {
            baseDir: PROD_DIRECTORY
        },
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
}

function buildScript(file, watch) {
    var props = {
        entries: [DEV_DIRECTORY + 'scripts/' + file],
        debug : true,
        cache: {},
        packageCache: {},
        transform: [babelify.configure({
            presets : ["react", "es2015"]
        })]
    };

    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
        .on('error', handleErrors)
        .pipe(source(file))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(PROD_DIRECTORY + 'js'))
        .pipe(reload({stream:true}));
    }

    bundler.on('update', function() {
        rebundle();
    });

    return rebundle();
}

gulp.task('scripts', function() {
    return buildScript('app.js', false);
});

gulp.task(
    'default',
    ['html','images','styles','scripts','browser-sync'],
    function() {
        gulp.watch(DEV_DIRECTORY + 'styles/*.styl', ['styles']);
        gulp.watch(DEV_DIRECTORY + 'index.html', ['html']);
        return buildScript('app.js', true);
    }
);