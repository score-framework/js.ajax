if (typeof loadScore === 'undefined') {

    var loadScore = function loadScore(modules, callback) {
        var fs = require('fs'),
            request = require('sync-request'),
            vm = require('vm');
        if (typeof modules === 'function') {
            callback = modules;
            modules = [];
        } else if (!modules) {
            modules = [];
        }
        var loaded = {};
        var customRequire = function(module) {
            if (loaded[module]) {
                return loaded[module];
            }
            var script, url, name = module.substring('score.'.length);
            if (testConf[name] === 'local') {
                script = fs.readFileSync(__dirname + '/../' + name.replace('.', '/') + '.js', {encoding: 'UTF-8'});
            } else if (testConf[name]) {
                url = 'https://raw.githubusercontent.com/score-framework/js.' + name + '/' + testConf[name] + '/' + name + '.js';
            } else {
                url = 'https://raw.githubusercontent.com/score-framework/js.' + name + '/master/' + name + '.js';
            }
            if (url) {
                if (!loadScore.cache[url]) {
                    loadScore.cache[url] = request('GET', url).getBody('utf8');
                }
                script = loadScore.cache[url];
            }
            var sandbox = vm.createContext({require: customRequire, module: {exports: {}}});
            vm.runInContext(script, sandbox, module + '.js');
            loaded[module] = sandbox.module.exports;
            return loaded[module];
        };
        var score = customRequire('score.init');
        for (var i = 0; i < modules.length; i++) {
            customRequire('score.' + modules[i]);
        }
        callback(score);
    };

    loadScore.cache = {};

    var expect = require('expect.js');
}

var testConf = {
    'ajax': 'local'
};

describe('score.ajax', function() {

    describe('module', function() {

        it('should add the score.ajax function', function(done) {
            loadScore(function(score) {
                expect(score).to.be.an('object');
                expect(score.ajax).to.be(undefined);
                loadScore(['ajax'], function(score) {
                    expect(score).to.be.an('object');
                    expect(score.ajax).to.be.a('function');
                    done();
                });
            });
        });

        it('should add the score.ajax.callback function', function(done) {
            loadScore(function(score) {
                expect(score).to.be.an('object');
                expect(score.ajax).to.be(undefined);
                loadScore(['ajax'], function(score) {
                    expect(score).to.be.an('object');
                    expect(score.ajax).to.be.a('function');
                    expect(score.ajax.callback).to.be.a('function');
                    done();
                });
            });
        });

    });

});

