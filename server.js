const http = require('http');

// Cloud Run sets PORT env variable — MUST use it
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Hello from Ecommerce App v2!',
        version: '2.0.0',
        port: PORT,
        timestamp: new Date().toISOString()
    }));
});

// CRITICAL — must listen on 0.0.0.0 not just localhost
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
});
