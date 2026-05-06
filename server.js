const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Hello from Ecommerce App!',
        version: '1.0.0',
        build: process.env.BUILD_NUMBER || 'local',
        timestamp: new Date().toISOString()
    }));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
