var fs= require('fs');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function(){
	try {
		browserSync.init({
			server: {
				baseDir: "./dist/"
			},
			notify: {
				styles: {
					top: "auto",
					bottom: 0
				}
			}
		});
		
		gulp.watch("./dist/*").on('change', browserSync.reload);
	}catch(err){
		console.log(err);
		browserSync.notify("Unkown error (check console)", 1000);
	}
});

gulp.task('default', ['serve']);