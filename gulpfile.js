var gulp = require('gulp')
var concat = require('gulp-concat-css')

gulp.task('concat', () => {
    return gulp.src('src/styles/**/*.css')
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest('src'));
})

gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.css', gulp.series('concat'))
})
