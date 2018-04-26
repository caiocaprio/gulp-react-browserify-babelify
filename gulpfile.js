const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del'); // rm -rf
const uglify = require('gulp-uglify');
const pump = require('pump');
const runSequence = require('run-sequence').use(gulp);
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const minifyCSS = require('gulp-minify-css');
const compass = require('gulp-compass');
const sass = require('gulp-sass');
const minifyJs = require("gulp-minify");
const spritesmith = require('gulp.spritesmith');
const rename = require('gulp-rename');
const concat = require('gulp-concat')
const jsmin = require('gulp-jsmin');
const browserify = require('browserify');
const gutil = require('gulp-util');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const webpack = require('webpack');
const stream = require('webpack-stream');
const package = require('./package.json');
const webserver = require('gulp-webserver');
const source = require('vinyl-source-stream');
const webpackDevServer = require("webpack-dev-server");
// var replace = require('gulp-replace');


const PATHS = require('./config/vars');

const cdn = {
    img: {
        url: 'http://cdn.img.com',
        replace: PATHS.dist + PATHS.assetsPath + '/img'
    },
    font: {
        url: 'http://cdn.font.com',
        replace: PATHS.dist + PATHS.assetsPath + '/font'
    },
}

const pumpCb = function(err) {
    if (err) {
        console.log('Error: ', err.toString());
    }
};

/* CLEAN DEV */
gulp.task('clean:dev', function() {
    return del.sync([PATHS.dev]);
});

/* CLEAN DIST */
gulp.task('clean:dist', function() {
    return del.sync([PATHS.dist]);
});

/* SASS DEV */
gulp.task('sass:dev', function(pumpCb) {
    pump([
            gulp.src(PATHS.src + '/scss/**/*.scss'),
            sourcemaps.init(),
            sass({ outputStyle: 'expanded' }).on('error', sass.logError),
            autoprefixer(),
            sourcemaps.write('.'),
            gulp.dest(PATHS.dev + PATHS.assetsPath + '/css')
        ],
        pumpCb
    );
});

/* SASS DIST */
gulp.task('sass:dist', function(pumpCb) {
    pump([
            gulp.src(PATHS.src + '/scss/**/*.scss'),
            sass({ outputStyle: 'compressed' }).on('error', sass.logError),
            autoprefixer(),
            // replace(cdn.img.replace, cdn.img.url),
            // replace(cdn.font.replace, cdn.font.url),
            gulp.dest(PATHS.dist + PATHS.assetsPath + '/css')
        ],
        pumpCb
    );
});

/* JS DEV */
gulp.task('static:js:dev', function(pumpCb) {
    pump([
            gulp.src(PATHS.src + '/js/static/**/*.js'),
            minifyJs({
                ext: {
                    src: '.js',
                    // min: '.js'
                },
                output: { comments: true, beautify: true },
                exclude: ['tasks'],
                ignoreFiles: ['.combo.js', '-min.js']
            }),
            // sourcemaps.write('.'),
            gulp.dest(PATHS.dev + PATHS.assetsPath + '/js')
        ],
        pumpCb
    );
});

/* JS DIST */
gulp.task('static:js:dist', function(pumpCb) {
    pump([
            gulp.src(PATHS.src + '/js/static/**/*.js'),
            minifyJs({
                ext: {
                    src: '.debug.js',
                    min: '.js'
                },
                output: { comments: true, beautify: true },
                exclude: ['tasks'],
                ignoreFiles: ['.combo.js', '-min.js']
            }),
            jsmin(),
            gulp.dest(PATHS.dist + PATHS.assetsPath + '/js')
        ],
        pumpCb
    );
});

/* JS BUNDLE */
gulp.task('bundle:js', function() {
    return gulp.src([
        // PATHS.src + '/third-party/material-kit/assets/js/core/jquery.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/core/popper.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/bootstrap-material-design.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/moment.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/bootstrap-datetimepicker.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/nouislider.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/bootstrap-selectpicker.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/bootstrap-tagsinput.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/jasny-bootstrap.min.js',
        // PATHS.src + '/third-party/material-kit/assets/js/plugins/jquery.flexisel.js',
        // PATHS.src + '/third-party/material-kit/assets/assets-for-demo/js/modernizr.js',
        // PATHS.src + '/third-party/material-kit/assets/js/material-kit.min.js',
        // PATHS.src + '/js/bundle/**/*.js'
    ])

    .pipe(concat('all.js'))
        .pipe(minifyJs({
            ext: {
                src: '.debug.js',
                min: '.min.js'
            },
            output: { comments: true, beautify: true },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js']
        }))
        .pipe(jsmin())
        .pipe(gulp.dest(PATHS.dist + PATHS.assetsPath + '/js'));
});

gulp.task('sprite:dev', function() {
    var spriteData = gulp.src(PATHS.src + '/img/sprites/*.{png,gif}').pipe(spritesmith({
        imgPath: PATHS.imgPathSprites + '/sprites.png',
        imgName: PATHS.devSprites + '/sprites.png',
        cssName: '_sprites.scss',
        padding: 20,
    }));
    return spriteData.pipe(gulp.dest(PATHS.src + '/scss/'));
});

gulp.task('sprite:dist', function() {
    var spriteData = gulp.src(PATHS.src + '/img/sprites/*.{png,gif}').pipe(spritesmith({
        imgPath: PATHS.imgPathSprites + '/sprites.png',
        imgName: PATHS.distSprites + '/sprites.png',
        padding: 20,
        cssName: '_sprites.scss'
    }));
    return spriteData.pipe(gulp.dest(PATHS.src + '/scss/'));
});

/* SASS WATCH */
gulp.task('watch', function() {
    gulp.watch(PATHS.src + '/scss/**/*.scss', ['sass:dev']);
    gulp.watch(PATHS.src + '/js/static/**/*.js', ['static:js:dev']);
    gulp.watch(PATHS.src + '/js/bundle/**/*.js', ['bundle:js']);
    gulp.watch([PATHS.src + '/js/**/*.{js,jsx,jsm}',
        '!' + PATHS.src + '/js/static/**/*.{js,jsx,jsm}',
        '!' + PATHS.src + '/js/bundle/**/*.{js,jsx,jsm}'
    ], ['react:webpack']);
    gulp.watch([PATHS.src + '/img/**/*',
        '!' + PATHS.src + '/img/sprites/**/*'
    ], ['copy:img']);
    gulp.watch(PATHS.src + '/font/sprites/**/*', ['sprite:dev']);
    gulp.watch(PATHS.src + '/font/**/*', ['copy:font']);
    gulp.watch(PATHS.src + '/html/**/*', ['copy:html']);
    gulp.watch(PATHS.src + '/third-party/**/*', ['copy:third-party']);
    gulp.watch(PATHS.src + '/media/**/*', ['copy:media']);

});

/* COPY */
gulp.task('copy:html', function(pumpCb) {
    return gulp.src([PATHS.src + '/html/**/*'], { base: PATHS.src + '/html' }).pipe(gulp.dest(PATHS.dev));
})
gulp.task('copy:img', function(pumpCb) {
    return gulp.src([PATHS.src + '/img/**/*', '!' + PATHS.src + '/img/sprites{,/**/*}'], { base: PATHS.src }).pipe(gulp.dest(PATHS.dev + PATHS.assetsPath));
})
gulp.task('copy:font', function(pumpCb) {
    return gulp.src([PATHS.src + '/font/**/*'], { base: PATHS.src }).pipe(gulp.dest(PATHS.dev + PATHS.assetsPath));
})
gulp.task('copy:media', function(pumpCb) {
    return gulp.src([PATHS.src + '/media/**/*'], { base: PATHS.src }).pipe(gulp.dest(PATHS.dev + PATHS.assetsPath));
})
gulp.task('copy:third-party', function(pumpCb) {
    return gulp.src([
        PATHS.src + '/third-party/**/*.{js,css,jpg,gif,png,jpeg,ttf,svg,map,ico,eot,ttf,woff}',
    ], { base: PATHS.src }).pipe(gulp.dest(PATHS.dev + PATHS.assetsPath));
});

gulp.task('react:browserify', function() {

    var b = browserify({
        entries: [PATHS.src + '/js/index.js'], //entry file
        // ignore: /\/node_modules\)/,
        debug: true
    });
    b.transform(babelify, {
        presets: ["babel-preset-env", "react"],
        plugins: ["transform-runtime", "transform-object-assign", "rewire", "lodash", "inline-replace-variables", "transform-object-rest-spread"]
    }); // use the reactify transform
    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(PATHS.dist + PATHS.assetsPath + '/js'));

})

gulp.task('react:webpack', function() {

    return gulp.src(PATHS.src + '/js/index.js')
        .pipe(stream(require('./config/webpack.config.dev')))
        //    .pipe(buffer())
        //    .pipe(uglify())
        .pipe(gulp.dest(PATHS.dist + PATHS.assetsPath + '/js'));

});

gulp.task('webserver', function() {
    gulp.src(PATHS.dist)
        .pipe(webserver({
            livereload: {
                enable: true, // need this set to true to enable livereload
                filter: function(fileName) {
                    if (fileName.match(/.map$/)) { // exclude all source maps from livereload
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }));
});

gulp.task('watch:webpack', function() {
    gulp.watch(PATHS.src+'/js/**/*.js', ['webpack']);
});

gulp.task('webpack', [], function() {
    console.log("opa")
    return gulp.src(PATHS.src+'/js/index.js') // gulp looks for all source files under specified path
    .pipe(sourcemaps.init()) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
    .pipe(stream(require('./config/webpack.config.dev'))) // blend in the webpack config into the source files
    .pipe(uglify())// minifies the code for better compression
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.dist+'/assets/js'));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(require('./config/webpack.config.dev'));
    myConfig.devtool = "eval";
    myConfig.mode = "development";
    myConfig.entry = './src/js';
    myConfig.cache = false;
    myConfig.module = {
            rules: [{
                test: /.(jsx,js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'env',
                            { modules: false },
                        ],
                    ],
                }
            }]
        };
        myConfig.resolve= {
            modules: [
                
                './node_modules',
                './src/js',
            ],
            extensions: ['.js', '.jsx', '.jsm'],
        };
     // Start a webpack-dev-server
    new webpackDevServer(webpack(myConfig), {
        // path: PATHS.dist,
            inline: true,
            contentBase: './dist',
            hot:true,
            port: 8080,
            publicPath: myConfig.output.publicPath,
            open: true,
            overlay: {
                warnings: true,
                errors: true
            },
            stats: {
                colors: true
            }
        }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/index.html");
    });
});

gulp.task('wp', ['webpack-dev-server', 'watch:webpack']);

gulp.task('default', ['build:dev'])
gulp.task('dist', ['build:dist'])
gulp.task('build-js:dev', function() {
    runSequence('bundle:js', ['static:js:dev', 'bundle:js'])
});
gulp.task('build:dev', function() {
    runSequence('clean:dev', 'sprite:dev', 'bundle:js', ['react:webpack', 'static:js:dev', 'bundle:js', 'sass:dev', 'copy:html', 'copy:img', 'copy:font', 'copy:media', 'copy:third-party'], function() {
        console.log('Finished build:dev...')
    })
});
gulp.task('dev', function() {
    runSequence('clean:dev', 'sprite:dev', 'bundle:js', ['react:webpack', 'static:js:dev', 'sass:dev', 'copy:html', 'copy:img', 'copy:font', 'copy:media', 'copy:third-party'], 'watch', function() {
        console.log('Waiting for changes...')
    })
});
gulp.task('build:dist', function() {
    runSequence('clean:dist', 'sprite:dist', 'bundle:js', ['react:webpack', 'js:dist', 'sass:dist', 'copy:html', 'copy:img', 'copy:font', 'copy:media', 'copy:third-party'], function() {
        console.log('Finished build:dist!')
    })
});



