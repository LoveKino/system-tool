'use strict';

let {
    open, existsDir, mkdirp
} = require('..');

let assert = require('assert');

let path = require('path');

let del = require('del');

describe('index', () => {
    it('open', () => {
        return open('~');
    });

    it('existsDir', () => {
        return existsDir(path.join(__dirname, './fixture/testDir')).then((ret) => {
            assert.equal(ret, true);
        }).then(() => {
            return existsDir(path.join(__dirname, 'fakkkkkk')).then((ret) => {
                assert.equal(ret, false);
            });
        });
    });

    it('mkdirp', () => {
        return del([path.join(__dirname, './fixture/textMkdirp')]).then(() => {
            return mkdirp(path.join(__dirname, './fixture/testMkdirp/dir1/dir2'));
        });
    });
});
