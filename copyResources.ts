// @ts-ignore

import fs from 'fs';
import glob from 'glob';

// Copy graphQLS
glob('src/**/*.graphqls', {}, (err, files) => {
    Object.values(files).forEach((file) => {
        const distPath = file.split('/');
        distPath[0] = 'dist';
        const newPath = distPath.join('/');
        distPath.pop();
        const newDir = distPath.join('/')
        fs.mkdirSync(newDir, { recursive: true });
        fs.copyFile(file,newPath, () => {});
    });
});
