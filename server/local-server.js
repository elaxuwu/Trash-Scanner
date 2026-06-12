const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 8000);
const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.manifest': 'application/manifest+json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.txt': 'text/plain; charset=utf-8'
};

const noCacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0'
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`Invalid port: ${process.argv[2]}`);
    console.error('Usage: node local-server.js 8000');
    process.exit(1);
}

const indexPath = path.join(root, 'index.html');
if (!fs.existsSync(indexPath)) {
    console.error('Local server failed: index.html is missing.');
    console.error(`Expected file: ${indexPath}`);
    console.error('Run this command from the project root folder.');
    process.exit(1);
}

const server = http.createServer((request, response) => {
    const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
    if (requestPath === '/health') {
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            ...noCacheHeaders
        });
        response.end('OK');
        return;
    }

    const normalizedPath = path
        .normalize(requestPath === '/' ? 'index.html' : requestPath)
        .replace(/^([.][.][\\/])+/, '');
    const filePath = path.join(root, normalizedPath);

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.end('Not found');
            return;
        }

        response.writeHead(200, {
            'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            ...noCacheHeaders
        });
        response.end(data);
    });
});

server.on('error', error => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Local server failed: port ${port} is already in use.`);
        console.error(`Try another port, for example: node local-server.js ${port === 8000 ? 5500 : 8000}`);
    } else {
        console.error(`Local server failed: ${error.message}`);
    }
    process.exit(1);
});

server.listen(port, () => {
    console.log('Status: running');
    console.log(`Serving ${root}`);
    console.log(`Open http://127.0.0.1:${port}/index.html`);
    console.log(`Health check: http://127.0.0.1:${port}/health`);
    console.log('Do not close this window while testing. Press Ctrl+C to stop.');
});
