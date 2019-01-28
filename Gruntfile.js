module.exports = function (grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	RegExp.quote = function (string) {
		return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	};

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


		// include HTML
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


		// imagemin 이미지 최적화
		imagemin: {
			all: {
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,jpeg,gif}'],
					dest: 'dist/images'
				}]
			}
		},


		// Fonts 가져오기
		embedFonts: {
			files: {
				'dist/css/fonts.css': ['src/css/fonts.css']
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


		// Jshint 자바스크립트 검사
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			globals: {
				jQuery: true
			},
			target: ['Gruntfile.js', 'package.json', '!src/**/*.js']
		},


		// Concat 파일 합치기
		concat: {
			// css: {
			// 	src: ['src/css/main.css'],
			// 	dest: 'dist/css/main.css'
			// },
			js: {
				"files": {
					'dist/js/script.js': ['src/js/*.js']
				}
			}
		},


		// Modernizr 코드 호환 검사
		modernizr: {
			dist: {
				"cache": true,
				"devFile": false,
				"dest": false,
				"options": [
					"setClasses",
					"addTest",
					"html5shiv",
					"testProp"
				],
				"uglify": true,
				"customTests": [],
				"files": {
					"src": [
						"*[^(g|G)runt(file)?].{js,css,scss}",
						"**[^node_modules]/**/*.{js,css,scss}",
						"!lib/**/*"
					]
				}
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
				tasks: ['jshint', 'concat:js']
			},
			html: {
				files: ['src/**/*.html','dist/**/*.html'],
				tasks: ['includereplace'],
				options:{
					livereload: true
				}
			},
			livereload: 
			{
				files: [
					'**/*.js',
					'**/*.css',
					'**/*.min.css',
					'**/*.scss'
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
	grunt.registerTask('mdz', ['modernizr']);
	grunt.registerTask('include', ['includereplace', 'watch']);
	grunt.registerTask('build', ['includereplace', 'imagemin', 'embedFonts', 'sass', 'postcss', 'cssmin', 'jshint', 'concat:js', 'modernizr', 'watch']);

};