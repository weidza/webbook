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
gulp.task('clean', function() {
    tools.del([project.destination]);
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task('resolve', function() {
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
        project.source+'/core/core-logger.js',
        project.source+'/core/core-asserts.js',
        project.source+'/core/core-check.js',
        project.source+'/core/core-services.js',
        project.source+'/core/core-rendering.js',
        project.source+'/core/core-components.js',
        project.source+'/components/**/*-compo.js',
        project.source+'/components/**/sh*.js',
        project.source+'/core/core-webcomponents.js',
        project.source+'/components/**/*-element.js',
    ])
    .pipe(tools.concat(project.artifactId+'.js'))
    .pipe(gulp.dest(project.destination));;
});

gulp.task('concat-vendors', ['resolve'],function() {
    return gulp.src([
        project.destination+'/lib/jquery/**/jquery.min.js',
        project.destination+'/lib/x-tag-core/**/x-tag-core.min.js',
        project.destination+'/lib/xregexp/**/xregexp-all-min.js',
        project.destination+'/lib/SyntaxHighlighter/**/shCore.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushAppleScript.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushAS3.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushBash.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushColdFusion.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushCpp.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushCSharp.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushCss.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushDelphi.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushDiff.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushErlang.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushGroovy.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushHaxe.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushJava.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushJavaFX.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushJScript.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushPerl.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushPhp.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushPlain.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushPowerShell.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushPython.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushRuby.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushSass.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushScala.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushSql.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushTAP.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushTypeScript.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushVb.js',
        project.destination+'/lib/SyntaxHighlighter/**/shBrushXml.js'
    ])
    .pipe(tools.concat('vendors.js'))
    .pipe(gulp.dest(project.destination));
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
        livereload: false,
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