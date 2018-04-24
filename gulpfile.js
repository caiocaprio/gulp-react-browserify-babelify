var gulp = require('gulp');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del'); // rm -rf
var uglify = require('gulp-uglify');
var pump = require('pump');
var runSequence = require('run-sequence').use(gulp);
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var minifyJs = require("gulp-minify");
var spritesmith = require('gulp.spritesmith');
var rename = require('gulp-rename');
var concat = require('gulp-concat')
var jsmin = require('gulp-jsmin');

var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var reactify = require('reactify');
// var replace = require('gulp-replace');


var defaults = {
    app: '.',
    src: 'assets/src',
    dev: 'assets/dist',
    dist: 'assets/dist',
    distScripts: 'assets/dist/js',
    devSprites: '../../dist/img',
    distSprites: '../../dist/img',
    imgPathSprites: '/assets/dist/img'
};

var cdn = {
    img: {
        url: 'http://cdn.img.com',
        replace: defaults.dist + '/img'
    },
    font: {
        url: 'http://cdn.font.com',
        replace: defaults.dist + '/font'
    },
}

var pumpCb = function(err) {
    if (err) {
        console.log('Error: ', err.toString());
    }
};

/* CLEAN DEV */
gulp.task('clean:dev', function() {
    return del.sync([defaults.dev]);
});

/* CLEAN DIST */
gulp.task('clean:dist', function() {
    return del.sync([defaults.dist]);
});

/* SASS DEV */
gulp.task('sass:dev', function(pumpCb) {
    pump([
            gulp.src(defaults.src + '/scss/**/*.scss'),
            sourcemaps.init(),
            sass({ outputStyle: 'expanded' }).on('error', sass.logError),
            autoprefixer(),
            sourcemaps.write('.'),
            // compass({
            //     style: 'expanded',
            //     css: defaults.dev + '/css',
            //     sass: defaults.src + '/scss',
            //     image: defaults.dev + '/img',
            //     sourcemap: true
            // }),
            gulp.dest(defaults.dev + '/css')
        ],
        pumpCb
    );
});

/* SASS DIST */
gulp.task('sass:dist', function(pumpCb) {
    pump([
            gulp.src(defaults.src + '/scss/**/*.scss'),
            sass({ outputStyle: 'compressed' }).on('error', sass.logError),
            // sass({
            //     style: 'compressed',
            //     css: defaults.dev + '/css',
            //     sass: defaults.src + '/scss',
            //     image: defaults.dist + '/img'
            // }),
            autoprefixer(),
            // replace(cdn.img.replace, cdn.img.url),
            // replace(cdn.font.replace, cdn.font.url),
            gulp.dest(defaults.dist + '/css')
        ],
        pumpCb
    );
});

/* JS DEV */
gulp.task('js:dev', function(pumpCb) {
    pump([
            gulp.src(defaults.src + '/js/**/*.js'),
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
            gulp.dest(defaults.dev + '/js')
        ],
        pumpCb
    );
});

/* JS DIST */
gulp.task('js:dist', function(pumpCb) {
    pump([
            gulp.src(defaults.src + '/js/**/*.js'),
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
            gulp.dest(defaults.dist + '/js')
        ],
        pumpCb
    );
});

/* JS BUNDLE */
gulp.task('bundle:js', function() {
    return gulp.src([
        defaults.src + '/third-party/material-kit/assets/js/core/jquery.min.js',
        defaults.src + '/third-party/material-kit/assets/js/core/popper.min.js',
        defaults.src + '/third-party/material-kit/assets/js/bootstrap-material-design.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/moment.min.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/bootstrap-datetimepicker.min.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/nouislider.min.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/bootstrap-selectpicker.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/bootstrap-tagsinput.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/jasny-bootstrap.min.js',
        defaults.src + '/third-party/material-kit/assets/js/plugins/jquery.flexisel.js',
        defaults.src + '/third-party/material-kit/assets/assets-for-demo/js/modernizr.js',
        defaults.src + '/third-party/material-kit/assets/js/material-kit.min.js',
        defaults.src + '/js/es5/bundle/**/*.js'
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
        .pipe(gulp.dest(defaults.dist + '/js'));
});

/*
  <script src="./assets/js/core/jquery.min.js"></script>
    <script src="./assets/js/core/popper.min.js"></script>
    <script src="./assets/js/bootstrap-material-design.js"></script>
    <!--  Google Maps Plugin  -->
    <!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> -->
    <!--  Plugin for Date Time Picker and Full Calendar Plugin  -->
    <script src="./assets/js/plugins/moment.min.js"></script>
    <!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
    <script src="./assets/js/plugins/bootstrap-datetimepicker.min.js"></script>
    <!--	Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
    <script src="./assets/js/plugins/nouislider.min.js"></script>
    <!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select -->
    <script src="./assets/js/plugins/bootstrap-selectpicker.js"></script>
    <!--	Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/  -->
    <script src="./assets/js/plugins/bootstrap-tagsinput.js"></script>
    <!--	Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
    <script src="./assets/js/plugins/jasny-bootstrap.min.js"></script>
    <!--	Plugin for Small Gallery in Product Page -->
    <script src="./assets/js/plugins/jquery.flexisel.js"></script>
    <!-- Plugins for presentation and navigation  -->
    <script src="./assets/assets-for-demo/js/modernizr.js"></script>
    <script src="./assets/assets-for-demo/js/vertical-nav.js"></script>
    <!-- Material Kit Core initialisations of plugins and Bootstrap Material Design Library -->
    <script src="./assets/js/material-kit.js?v=2.0.2"></script>
    <!-- Fixed Sidebar Nav - js With initialisations For Demo Purpose, Don't Include it in your project -->
    <script src="./assets/assets-for-demo/js/material-kit-demo.js"></script>
     */

gulp.task('sprite:dev', function() {
    var spriteData = gulp.src(defaults.src + '/img/sprites/*.{png,gif}').pipe(spritesmith({
        imgPath: defaults.imgPathSprites + '/sprites.png',
        imgName: defaults.devSprites + '/sprites.png',
        cssName: '_sprites.scss',
        padding: 20,
    }));
    return spriteData.pipe(gulp.dest(defaults.src + '/scss/'));
});



gulp.task('sprite:dist', function() {
    var spriteData = gulp.src(defaults.src + '/img/sprites/*.{png,gif}').pipe(spritesmith({
        imgPath: defaults.imgPathSprites + '/sprites.png',
        imgName: defaults.distSprites + '/sprites.png',
        padding: 20,
        cssName: '_sprites.scss'
    }));
    return spriteData.pipe(gulp.dest(defaults.src + '/scss/'));
});


/* SASS WATCH */
gulp.task('watch', function() {
    gulp.watch(defaults.src + '/scss/**/*.scss', ['sass:dev']);
    gulp.watch(defaults.src + '/js-old/**/*.js', ['build-js:dev']);
    gulp.watch([defaults.src + '/img/**/*',
        '!' + defaults.src + '/img/sprites{,/**/*}'
    ], ['copy:img']);
    gulp.watch(defaults.src + '/font/sprites/**/*', ['sprite:dev']);
    gulp.watch(defaults.src + '/font/**/*', ['copy:font']);
    gulp.watch(defaults.src + '/third-party/**/*', ['copy:third-party']);
    gulp.watch(defaults.src + '/media/**/*', ['copy:media']);

});

/* COPY */
gulp.task('copy:img', function(pumpCb) {
    return gulp.src([defaults.src + '/img/**/*', '!' + defaults.src + '/img/sprites{,/**/*}'], { base: defaults.src }).pipe(gulp.dest(defaults.dev));
})
gulp.task('copy:font', function(pumpCb) {
    return gulp.src([defaults.src + '/font/**/*'], { base: defaults.src }).pipe(gulp.dest(defaults.dev));
})
gulp.task('copy:media', function(pumpCb) {
    return gulp.src([defaults.src + '/media/**/*'], { base: defaults.src }).pipe(gulp.dest(defaults.dev));
})
gulp.task('copy:third-party', function(pumpCb) {
    return gulp.src([
        defaults.src + '/third-party/**/*.{js,css,jpg,gif,png,jpeg,ttf,svg,map,ico,eot,ttf,woff}',
    ], { base: defaults.src }).pipe(gulp.dest(defaults.dev));
});


gulp.task('transform', function() {
    return gulp.src(defaults.src + '/js/index.js')
        .pipe(babel({
            presets: ["babel-preset-env", "react"]
        }))
        .pipe(gulp.dest(defaults.dist + '/js'));
})

gulp.task('react:dev', function() {

    var b = browserify({
        entries: [defaults.src + '/js/index.js'], //entry file
        // ignore: /\/node_modules\)/,
        debug: true
    });
    b.transform(babelify, {
        presets: ["babel-preset-env", "react"],
        plugins: ["transform-runtime", "transform-object-assign", "rewire", "lodash", "inline-replace-variables", "transform-object-rest-spread"]
    }); // use the reactify transform
    return b.bundle()
        .pipe(source('index.js'))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest(defaults.dist + '/js'));
    // return browserify(defaults.src + '/js/app.js')
    //     .bundle()
    //     .on('error', gutil.log)
    //     .pipe(source('app.js'))
    //     .pipe(buffer())
    //     .pipe(gulp.dest(defaults.dist + '/js'))
})

//browserify -t [ babelify --presets [ es2015 react ] ] assets/src/js/index.js -o  assets/dist/js/index.js


gulp.task('default', ['build:dev'])
gulp.task('dist', ['build:dist'])

gulp.task('build-js:dev', function() {
    runSequence('bundle:js', ['js:dev'])
});


gulp.task('build:dev', function() {
    runSequence('clean:dev', 'sprite:dev', 'bundle:js', ['js:dev', 'sass:dev', 'copy:img', 'copy:font', 'copy:media', 'copy:third-party'], 'watch', function() {
        console.log('Waiting for changes...')
    })
});

gulp.task('build:dist', function() {
    runSequence('clean:dist', 'sprite:dist', 'bundle:js', ['js:dist', 'sass:dist', 'copy:img', 'copy:font', 'copy:media', 'copy:third-party'], function() {
        console.log('Finished deploy!')
    })
});;