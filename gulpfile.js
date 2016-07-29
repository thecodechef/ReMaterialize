'use-strict';

const gulp        = require('gulp'),
      colors      = require('colors'),
      runSequence = require('run-sequence'),
      path        = require('path'),
      argv        = require('yargs').argv,
      del         = require('del'),
      fs          = require('fs'),
      _           = require('lodash'),
      $           = require('gulp-load-plugins')();

const srcPath = './.src',
      commons = require(srcPath + '/settings/commons.json');

//
//  >> Cleaning
//

gulp.task('clean:themes',() => {
  return del('./themes/*');
});

gulp.task('clean:schemes',() => {
  return del('./schemes/*');
});

gulp.task('clean:widgets',() => {
  return del('./widgets/*');
});

gulp.task('clean:prefs',() => {
  return del('./preferences/*');
});

gulp.task('clean:langs',() => {
  return del('./Langs/*');
});

gulp.task('clean:readme',() => {
  return del('./README.md');
});

//
// >> Building
//

gulp.task('build', (cb) => {
  runSequence(
    'build:themes',
    'build:schemes',
    'build:widgets',
    'build:prefs',
    'build:langs',
    'build:docs',
    (error) => {
      if (error) {
        $.util.log('Error Occured'.bold.red + error.message);
      } else {
        $.util.log('Gulp is running the \'build\' task.'.bold.blue);
      }
      cb(error);
    }
  );
});

gulp.task('build:themes',['clean:themes'], () => {
    gulp.src(srcPath + '/themes/*.json')
      .pipe($.include())
      .pipe($.data((file) => {
        var specific = require(srcPath + '/settings/specific/' + path.basename(file.path));
        return _.merge(commons,specific);
      }))
      .pipe($.template())
      .pipe($.rename((path) => {
        path.basename = path.basename;
        path.extname = '.sublime-theme';
      }))
      .pipe(gulp.dest('./themes'));
});

gulp.task('build:schemes',['clean:schemes'], () => {
    gulp.src(srcPath +'/settings/specific/*.json')
      .pipe($.plumber((error)=> {
        $.util.log('Error Occured with task \'build:schemes\''.bold.red + error.message);
      }))
      .pipe($.flatmap((stream, file) => {
        var basename = path.basename(file.path, path.extname(file.path));

        return stream = gulp.src(srcPath + '/schemes/scheme.pug')
          .pipe($.data(() => {
            var specific = require(file.path);
            return _.merge(commons,specific);
          }))
          .pipe($.pug({pretty: true}))
          .pipe($.rename((scheme) => {
            scheme.basename = basename;
            scheme.extname = '.tmTheme';
          }))
          .pipe(gulp.dest('./schemes'))
          .pipe($.replace('&lt;','<'))
          .pipe($.replace('&gt;','>'))
          .pipe(gulp.dest('./schemes'));
      }))
      .on('end', () => {
        $.util.log('Gulp ran task \'build:schemes\' Successfully.'.bold.green);
      });
});

gulp.task('build:widgets',['clean:widgets'], (cb) => {
  runSequence(
    'build:widget-themes',
    'build:widget-settings',
    (error) => {
      if (error) {
        $.util.log('Error Occured'.bold.red + error.message)
      } else {
        $.util.log('Gulp ran task \'build:widgets\' Successfully.'.bold.green)
      }
      cb(error);
    }
  );
});

gulp.task('build:widget-themes', () => {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.flatmap((stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));

      return stream = gulp.src(srcPath + '/widgets/widget.pug')
        .pipe($.data(() => {
          var specific = require(file.path);

          return _.merge(commons, specific);
        }))
        .pipe($.pug({pretty: true}))
        .pipe($.rename((widget) => {
          widget.basename = 'Widget - ' + basename;
          widget.extname = '.stTheme';
        }))
        .pipe(gulp.dest('./widgets'));
    }));
});

gulp.task('build:widget-settings',() => {
  return gulp.src(srcPath + '/settings/specific/*.json')
    .pipe($.flatmap((stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));

      return stream = gulp.src(srcPath + '/widgets/widget.sublime-settings')
        .pipe($.data(() => {
          var specific = require(file.path);

          return _.merge(commons, specific);
        }))
        .pipe($.template())
        .pipe($.rename((widget) => {
          widget.basename = 'Widget - ' + basename;
        }))
        .pipe(gulp.dest('./widgets'));
    }));
});

gulp.task('build:prefs',['clean:prefs'], () => {
  return gulp.src(srcPath + '/prefs/*.json')
    .pipe($.flatmap((stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));
      return stream = gulp.src(srcPath + '/prefs/prefs.pug')
        .pipe($.data(() => {
          var specific = require(file.path);

          return _.merge(commons, specific);
        }))
        .pipe($.pug({pretty: true}))
        .pipe($.rename((pref) => {
          pref.basename = basename;
          pref.extname = '.tmPreferences';
        }))
        .pipe(gulp.dest('./preferences'));
    }));
});

gulp.task('build:langs',['clean:langs'], () => {
  return gulp.src(srcPath + '/langs/*.json')
    .pipe($.flatmap((stream, file) => {
      var basename = path.basename(file.path, path.extname(file.path));
      return stream = gulp.src(srcPath + '/langs/langs.pug')
        .pipe($.data(() => {
          var specific = require(file.path);

          return _.merge(commons, specific);
        }))
        .pipe($.pug({pretty: true}))
        .pipe($.rename((pref) => {
          pref.basename = basename;
          pref.extname = '.tmLanguage';
        }))
        .pipe(gulp.dest('./Langs'));
    }));
});

gulp.task('build:docs',['clean:readme'], () => {
  gulp.src('.verbrc.md')
    .pipe($.verb({dest: 'README.md'}))
    .pipe(gulp.dest('./'));
});

//
// >> Releasing
//

gulp.task('bump',(cb) => {
  runSequence(
    'bump-version',
    'commit-version',
    'create:tag',
    (error) => {
      if (error) {
        $.util.log('Sorry something went wrong bumping version'.bold.red + error.message);
      } else {
        $.util.log('Bumped Version Successfully.'.bold.green)
      }
      cb(error);
    }
  );
});
gulp.task('bump-version',() => {
  function getPackageJSON() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  }
  gulp.src('./package.json')
    .pipe($.if(argv.alpha, $.bump({type: 'prerelease',version: getPackageJSON().version + '.alpha-' + 1})))
    .pipe($.if(argv.beta, $.bump({type: 'prerelease',version: getPackageJSON().version + '.beta-' + 1})))
    .pipe($.if(argv.pre, $.bump({type: 'prerelease'})))
    .pipe($.if(argv.patch, $.bump()))
    .pipe($.if(argv.minor, $.bump({type: 'minor'})))
    .pipe($.if(argv.major, $.bump({type: 'major'})))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-version', () => {
 return gulp.src('.')
    .pipe($.git.add())
    .pipe($.git.commit('Version Bump.'));
});

gulp.task('create:tag', () => {
  return gulp.src('./package.json')
    .pipe($.tagVersion());
});

//
// >> Default
//

gulp.task('default',['build'], () => {});
