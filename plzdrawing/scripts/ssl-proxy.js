/**
 * SSL 만료 우회 로컬 프록시 (개발용)
 * 에뮬레이터 → http://10.0.2.2:8080 → https://plzdrawing.o-r.kr (SSL 검증 무시)
 *
 * 실행: node scripts/ssl-proxy.js
 */
const http = require('http');
const https = require('https');
const url = require('url');

const TARGET_HOST = 'plzdrawing.o-r.kr';
const PROXY_PORT = 8080;

const server = http.createServer((req, res) => {
  const options = {
    hostname: TARGET_HOST,
    port: 443,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET_HOST,
    },
    rejectUnauthorized: false, // SSL 인증서 검증 무시
  };

  console.log(`[proxy] ${req.method} ${req.url}`);

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('[proxy error]', err.message);
    res.writeHead(502);
    res.end(`Proxy error: ${err.message}`);
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`✅ SSL Proxy running on http://0.0.0.0:${PROXY_PORT}`);
  console.log(`   → forwards to https://${TARGET_HOST}`);
  console.log(`   에뮬레이터 BASE_URL: http://10.0.2.2:${PROXY_PORT}`);
});
