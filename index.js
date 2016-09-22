'use strict';

let {
    exec
} = require('mz/child_process');

let requestor = require('cl-requestor');

let {
    stat
} = require('mz/fs');

let fs = require('fs');

let del = require('del');

let isWindow = () => process.platform === 'win32';

let getUserHome = () => {
    return process.env[isWindow() ? 'USERPROFILE' : 'HOME'];
};

let open = (p) => isWindow() ? exec(`start ${p}`) : exec(`open ${p}`);

let existsFile = (filePath) => {
    return new Promise((resolve) => {
        stat(filePath).then((statObj) => {
            resolve(statObj.isFile());
        }).catch(() => {
            resolve(false);
        });
    });
};

let download = (type, opts, target, {
    progress
} = {}) => {
    return del([target]).then(() => {
        let out = fs.createWriteStream(target);
        let request = requestor(type, {
            throwBody: true,
            chunkHandler: (chunk, type) => {
                if (type === 'data') {
                    progress && progress(chunk);
                    out.write(chunk);
                } else if (type === 'end') {
                    out.end();
                }
            }
        });

        // if exist then delete file
        return request(opts).then((res) => {
            if (res.statusCode !== 200) {
                return del([target]).then(() => {
                    throw new Error('response code is not 200');
                });
            }
        }).catch((err) => {
            try {
                out.end();
            } catch (e) {
                console.log(e); // eslint-disable-line
            }
            return del([target]).then(() => {
                throw err;
            });
        });
    });
};

module.exports = {
    getUserHome,
    open,
    isWindow,
    existsFile,
    download
};
