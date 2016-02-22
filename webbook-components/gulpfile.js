// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// PROJECT
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var project = {
    source      : './src/main',
    sourceTest  : './src/test',
    destination : './dist',
    artifactId  : "webbook-components"
}


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// TOOLS
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var gulp  = require('gulp');
var tools = {
    del         : require('del'),
    concat      : require('gulp-concat'),
    minify      : require('gulp-minify-css'),
    uglify      : require('gulp-uglify'),
    sourcemaps  : require('gulp-sourcemaps'),
    rename      : require('gulp-rename'),
    bower       : require('gulp-bower'),
    connect     : require('gulp-connect'),
    watch       : require('gulp-watch')
}


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// TASKS
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('clean', function(cb) {
    tools.del([project.destination]);
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('resolve', function(cb) {
    return tools.bower().pipe(gulp.dest(project.destination+'/lib'));
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('concat-css', function() {
    return gulp.src([
        project.source+'/core/core.css',
        project.source+'/components/**/*.css'
    ])
    .pipe(tools.concat(project.artifactId+'.css'))
    .pipe(gulp.dest(project.destination));;
});


gulp.task('concat-js', function() {
    return gulp.src([
        project.source+'/core/core.js',
        project.source+'/components/**/*.js'
    ])
    .pipe(tools.concat(project.artifactId+'.js'))
    .pipe(gulp.dest(project.destination));;
});

gulp.task('concat-vendors', function() {
    return gulp.src([
        project.destination+'/lib/jquery/**/jquery.min.js',
        project.destination+'/lib/x-tag-core/**/x-tag-core.min.js'
    ])
    .pipe(tools.concat('vendors.js'))
    .pipe(gulp.dest(project.destination));;
});

gulp.task('concat', ['concat-css' , 'concat-js']);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src(project.destination+'/'+project.artifactId+'.css')
        .pipe(tools.sourcemaps.init())
        .pipe(tools.minify({
            keepBreaks: true
        }))
        .pipe(tools.rename({
            suffix: '.min'
        }))
        .pipe(tools.sourcemaps.write())
        .pipe(gulp.dest(project.destination));
});

gulp.task('minify-js', ['concat-js'], function() {
    return gulp.src(project.destination+'/'+project.artifactId+'.js')
        .pipe(tools.sourcemaps.init())
        .pipe(tools.uglify())
        .pipe(tools.rename({
            suffix: '.min'
        }))
        .pipe(tools.sourcemaps.write())
        .pipe(gulp.dest(project.destination));
});

gulp.task('minify', ['minify-css' , 'minify-js']);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('startServer', function() {
    tools.connect.server({
        livereload: true,
        root: ["."]
    });
});

gulp.task('watch',function() {
    gulp.watch(project.source+'/**/*.js', ['concat-js']);
    gulp.watch(project.source+'/**/*.css', ['concat-css']);
});


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// BUILDS
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
gulp.task('build', ['clean' , 'concat']);

gulp.task('package', ['clean' , 'resolve','concat-vendors', 'concat','minify']);

gulp.task('default', ['build']);

gulp.task('serve', ['package','startServer', 'watch']);