'use strict';

let {
    open, existsDir
} = require('..');

let assert = require('assert');

let path = require('path');

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
});
