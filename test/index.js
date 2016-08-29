'use strict';

let {
    open
} = require('..');

describe('index', () => {
    it('open', () => {
        return open('~');
    });
});
