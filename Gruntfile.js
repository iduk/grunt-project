function parseFunction(source) {
	return source.replace(/\{\{\s?([\.\-\w]*)\s?\}\}/g, function () {
		return "";
	});
}

module.exports = function (grunt) {
	'use strict';

	// 자동으로 grunt 태스크를 로드 , grunt.loadNpmTasks를 생략함
	require('load-grunt-tasks')(grunt);

	// 패키지 시작
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// clean 파일,폴더 삭제
		clean: {
			dist: {
				src: ['.ds_store', '**/.ds_store', '**/*.css.map', '.sass-cache'] // '!' = 제외하고 빌드
			}
		},


		// Bower install 시, 자동 삽입
		wiredep: {
			target: {
				// run `grunt wiredep`
				src: ['src/**/*.html'],
				ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/,
				dependencies: true,
				devDependencies: true
			},
			options: {
				overrides: {
					"jquery": {
						"main": [
							"dist/*.min.js"
						]
					},
					"jquery-easing": {
						"main": [
							"*.min.js"
						]
					},
					"bootstrap": {
						"main": [
							"dist/js/bootstrap.bundle.min.js"
						]
					},
					"fontawesome": {
						"main": [
							"css/all.min.css",
							"css/fontawesome.min.css"
						]
					},
					"select2": {
						"main": [
							"dist/css/select2.min.css",
							"dist/js/select2.min.js"
						]
					}
				}
			}
		},


		// imagemin 이미지 최적화
		imagemin: {
			all: {
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/images'
				}]
			}
		},


		// Sass
		sass: {
			options: {
				style: 'expanded'
			},
			dist: { // Target
				files: {
					'src/css/main.css': 'src/scss/main.scss'
				}
			}
		},


		// Postcss /autoprefixer CSS 브라우저 호환
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: [
							'Android 2.3',
							'Android >= 4',
							'Chrome >= 20',
							'Firefox >= 24',
							'Explorer >= 9',
							'iOS >= 6',
							'Opera >= 12',
							'Safari >= 6'
						]
					})
				]
			},
			dist: {
				files: {
					'dist/css/main.css': 'src/css/main.css'
				}
			}
		},


		// cssmin, Css 파일 최적화
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['*.css', '!*.min.css', '!*.css.map'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},


		// Concat 파일 합치기
		// concat: {
		// 	css: {
		// 		src: ['src/css/main.css'],
		// 		dest: 'dist/css/main.css'
		// 	},
		// 	js: {
		// 		src: ['src/js/main.js'],
		// 		dest: 'dist/js/main.js'
		// 	}
		// },
		
		
		// Jshint 자바스크립트 검사
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', '!**/*.min.js'],
			options: {
				reporter: require('jshint-stylish')
			}
		},


		// uglify, JS 파일 최적화
		uglify: {
			compress: {
				files: {
					'dist/js/script.min.js': ['src/js/scrollSpy.js', 'src/js/scrollTop.js', 'src/js/modules.js']
				}
			},
			options: {
				mangle: false
			}
		},


		// include
		includereplace: {
			dist: {
				options: {
					prefix: '<!-- @@',
					suffix: ' -->',
					includesDir: 'src/include/' // 상대경로
				},
				files: [{
					expand: true,
					cwd: 'src/', // 기존 경로
					src: '*.html',
					dest: 'dist/' // 컴파일 경로
				}]
			}
		},


		// watch 변경,감시
		watch: {
			sass: {
				files: ['**/*.scss', '**/*.css'],
				tasks: ['sass:dist']
			},
			css: {
				files: ['**/*.css', '**/*.min.css'],
				tasks: ['postcss', 'cssmin']
			},
			js: {
				files: ['Gruntfile.js', 'src/**/*.js', 'dist/**/*.js'],
				tasks: ['jshint:files', 'uglyfy']
			},
			html: {
				files: ['**/*.html'],
				tasks: ['includereplace']
			},
			livereload: {
				files: [
					'**/*.js',
					'**/*.css',
					'**/*.min.css',
					'**/*.scss',
					'**/*.html'
				]
			}
		}
		// final line
	});


	// plugin's task(s), then test the result.
	// grunt.task.run([
	// 	'watch'
	// ]);

	// grunt 명령어로 실행할 작업
	grunt.registerTask('include', ['includereplace', 'watch']);
	grunt.registerTask('build', ['imagemin', 'sass', 'postcss', 'cssmin', 'jshint:files', 'uglify', 'includereplace', 'watch']);

};