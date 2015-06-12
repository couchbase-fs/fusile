'use strict';

var fusile = require('../lib/');
var fuse = require('fuse-bindings');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var async = require('async');

var when = require('when');
var node = require('when/node');

var whenFs = node.liftAll(fs);

var expect = require('unexpected')
  .clone()
  .installPlugin(require('unexpected-promise'))
  .installPlugin(require('unexpected-sinon'));

var sinon = require('sinon');

var src = 'fixtures/source';
var compiled = 'fixtures/compiled';
var mnt = 'test/READ';

describe('In a mounted filesystem', function () {
  before(function (done) {
    var self = this;
    fuse.unmount(mnt, function () {
      mkdirp(mnt, function (err) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }

        self.fusile = fusile(src, mnt, {
          // verbose: true,
          accord: {}
        });

        setTimeout(done, 300);
      });
    });
  });

  after(function (done) {
    setTimeout(function () {
      fuse.unmount(mnt, function () {
        rimraf(mnt, done);
      });
    }, 500);
  });

  it('should read a directory', function () {
    return expect(whenFs.readdir(mnt), 'to be resolved with', [
      'autoprefixer',
      'babel',
      'basic.css',
      'coco',
      'coffee',
      'csso',
      'dogescript',
      'ejs',
      'escape-html',
      'extensions',
      'haml',
      'handlebars',
      'jade',
      'less',
      'livescript',
      'marc',
      'markdown',
      'minify-css',
      'minify-html',
      'minify-js',
      'mustache',
      'myth',
      'scss',
      'stylus',
      'swig',
      'toffee',
      'unchanged.txt'
    ]);
  });

  it('should translate extensions when reading a directory', function () {
    return expect(whenFs.readdir(mnt + '/extensions'), 'to be resolved with', [
      'babel.js',
      'coco.js',
      'coffee.js',
      'dogescript.js',
      'less.css',
      'livescript.js',
      'markdown.html',
      'mcss.css',
      'md.html',
      'mdown.html',
      'myth.css',
      'scss.css',
      'stylus.css',
      'swig.html'
    ]);
  });

  it('should verify the existance of a file', function (done) {
    fs.exists(mnt + '/less/basic.less', function (exists) {
      expect(exists, 'to be true');

      done();
    });
  });

  it('should read an ordinary file', function (done) {
    fs.readFile(mnt + '/unchanged.txt', { encoding: 'utf-8' }, function (err, data) {
      expect(err, 'to be null');
      expect(data, 'to be a string');
      expect(data.toString(), 'to be', 'I am the same\n');

      done();
    });
  });

  describe('when reading uncompiled files', function () {
    it('should compile babel/basic.jsx', function (done) {
      var actual = path.join(mnt, 'babel/basic.jsx');
      var expected = path.join(compiled, 'babel/basic.js');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile coco/basic.co', function (done) {
      var actual = path.join(mnt, 'coco/basic.co');
      var expected = path.join(compiled, 'coco/basic.js');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile coffee/basic.coffee', function (done) {
      var actual = path.join(mnt, 'coffee/basic.coffee');
      var expected = path.join(compiled, 'coffee/basic.js');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile dogescript/basic.djs', function (done) {
      var actual = path.join(mnt, 'dogescript/basic.djs');
      var expected = path.join(compiled, 'dogescript/basic.js');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile escape-html/basic.html', function (done) {
      var actual = path.join(mnt, 'escape-html/basic.html');
      var expected = path.join(compiled, 'escape-html/basic.html');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile less/basic.less', function (done) {
      var actual = path.join(mnt, 'less/basic.less');
      var expected = path.join(compiled, 'less/basic.css');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile livescript/basic.ls', function (done) {
      var actual = path.join(mnt, 'livescript/basic.ls');
      var expected = path.join(compiled, 'livescript/basic.js');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile markdown/basic.md', function (done) {
      var actual = path.join(mnt, 'markdown/basic.md');
      var expected = path.join(compiled, 'markdown/basic.html');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile myth/basic.myth', function (done) {
      var actual = path.join(mnt, 'myth/basic.myth');
      var expected = path.join(compiled, 'myth/basic.css');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1].replace(/\n$/, ''));

        done();
      });
    });

    it('should compile scss/basic.scss', function (done) {
      var actual = path.join(mnt, 'scss/basic.scss');
      var expected = path.join(compiled, 'scss/basic.css');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });

    it('should compile stylus/basic.styl', function (done) {
      var actual = path.join(mnt, 'stylus/basic.styl');
      var expected = path.join(compiled, 'stylus/basic.css');

      async.parallel([
        fs.readFile.bind(undefined, actual, 'utf-8'),
        fs.readFile.bind(undefined, expected, 'utf-8')
      ], function (err, results) {
        expect(err, 'to be undefined');
        expect(results[0], 'to be', results[1]);

        done();
      });
    });
  });

  describe('when caching', function () {
    before(function (done) {
      setTimeout(done, 200);
    });

    beforeEach(function () {
      this.emitSpy = sinon.spy(this.fusile, 'emit');
    });
    afterEach(function () {
      this.fusile.emit.restore();
    });

    it('should not have a cache hit on first read of non-compiled file', function (done) {
      var self = this;

      this.fusile.cache = {};

      fs.readFile(path.join(mnt, '/unchanged.txt'), { encoding: 'utf-8' }, function (err) {
        expect(err, 'to be null');
        expect(self.emitSpy, 'was not called');

        fs.readFile(path.join(mnt, '/unchanged.txt'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');
          expect(self.emitSpy, 'was not called');

          done();
        });
      });
    });

    describe('compiled file with no partials, stylus/cache.styl', function () {

      it('should not have a cache hit on first read', function (done) {
        var self = this;

        this.fusile.cache = {};

        fs.readFile(path.join(mnt, 'stylus/cache.styl'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');
          expect(self.emitSpy, 'was not called');

          done();
        });
      });

      it('should have a cache hit on second read', function (done) {
        var self = this;

        fs.readFile(path.join(mnt, 'stylus/cache.styl'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');
          expect(self.emitSpy, 'was called once');
          expect(self.emitSpy, 'was called with exactly', 'info', 'cache hit', '/stylus/cache.styl');

          done();
        });
      });

      it('should have a cache miss on third read when source file was updated', function (done) {
        var self = this;

        setTimeout(function () {
          fs.utimes(path.join(src, 'stylus/cache.styl'), new Date(), new Date(), function () {
            fs.readFile(path.join(mnt, 'stylus/cache.styl'), { encoding: 'utf-8' }, function (err) {
              expect(err, 'to be null');
              expect(self.emitSpy, 'was called once');
              expect(self.emitSpy, 'was called with exactly', 'info', 'cache miss', '/stylus/cache.styl');

              done();
            });
          });
        }, 1000);
      });

    });

    describe('compiled file with no partials, scss/cache.scss', function () {

      it('should not have a cache hit on first read', function (done) {
        var self = this;

        this.fusile.cache = {};

        fs.readFile(path.join(mnt, 'scss/cache.scss'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');
          expect(self.emitSpy, 'was not called');

          done();
        });
      });

      it('should have a cache hit on second read', function (done) {
        var self = this;

        fs.readFile(path.join(mnt, 'scss/cache.scss'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');

          expect(self.emitSpy, 'was called');
          expect(self.emitSpy, 'was called with', 'info', 'cache hit', '/scss/cache.scss');

          done();
        });
      });

      it('should have a cache miss on third read when source file was updated', function (done) {
        var self = this;

        setTimeout(function () {
          fs.utimes(path.join(src, 'scss/cache.scss'), new Date(), new Date(), function () {
              fs.readFile(path.join(mnt, 'scss/cache.scss'), { encoding: 'utf-8' }, function (err) {
                expect(err, 'to be null');
                expect(self.emitSpy, 'was called once');
                expect(self.emitSpy, 'was called with exactly', 'info', 'cache miss', '/scss/cache.scss');

                done();
              });

          });
        }, 1000);
      });

      it('should have a cache miss on fourth read when partial file was updated', function (done) {
        var self = this;

        setTimeout(function () {
          fs.utimes(path.join(src, 'scss/_cache_partial.scss'), new Date(), new Date(), function () {
              fs.readFile(path.join(mnt, 'scss/cache.scss'), { encoding: 'utf-8' }, function (err) {
                expect(err, 'to be null');
                expect(self.emitSpy, 'was called once');
                expect(self.emitSpy, 'was called with exactly', 'info', 'cache miss', '/scss/cache.scss');

                done();
              });
          });
        }, 1000);
      });

    });

    describe('compiled file with no partials, less/cache.less', function () {

      it('should not have a cache hit on first read', function (done) {
        var self = this;

        this.fusile.cache = {};

        fs.readFile(path.join(mnt, 'less/cache.less'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');
          expect(self.emitSpy, 'was not called');

          done();
        });
      });

      it('should have a cache hit on second read', function (done) {
        var self = this;

        fs.readFile(path.join(mnt, 'less/cache.less'), { encoding: 'utf-8' }, function (err) {
          expect(err, 'to be null');

          expect(self.emitSpy, 'was called');
          expect(self.emitSpy, 'was called with', 'info', 'cache hit', '/less/cache.less');

          done();
        });
      });

      it('should have a cache miss on third read when source file was updated', function (done) {
        var self = this;

        setTimeout(function () {
          fs.utimes(path.join(src, 'less/cache.less'), new Date(), new Date(), function () {
              fs.readFile(path.join(mnt, 'less/cache.less'), { encoding: 'utf-8' }, function (err) {
                expect(err, 'to be null');
                expect(self.emitSpy, 'was called once');
                expect(self.emitSpy, 'was called with exactly', 'info', 'cache miss', '/less/cache.less');

                done();
              });

          });
        }, 1000);
      });

      it('should have a cache miss on fourth read when partial file was updated', function (done) {
        var self = this;

        setTimeout(function () {
          fs.utimes(path.join(src, 'less/_cache_partial.less'), new Date(), new Date(), function () {
              fs.readFile(path.join(mnt, 'less/cache.less'), { encoding: 'utf-8' }, function (err) {
                expect(err, 'to be null');
                expect(self.emitSpy, 'was called once');
                expect(self.emitSpy, 'was called with exactly', 'info', 'cache miss', '/less/cache.less');

                done();
              });
          });
        }, 1000);
      });

    });

  });
});
