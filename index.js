'use strict';

let {
    exec
} = require('mz/child_process');

let isWindow = () => process.platform === 'win32';

let getUserHome = () => {
    return process.env[isWindow() ? 'USERPROFILE' : 'HOME'];
};

let open = (p) => isWindow() ? exec(`start "${p}"`) : exec(`open "${p}"`);

module.exports = {
    getUserHome,
    open,
    isWindow
};
