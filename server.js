/**
 * Servidor Web Ligero en Node.js para Hostinger y Entornos Cloud
 * Nancy García Decoración & Eventos
 * Cero dependencias externas para garantizar despliegue instantáneo y 100% confiable.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const ROOT_DIR = path.resolve(__dirname);

// Mapa de Tipos MIME oficiales
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  // Manejo de métodos
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  // Parsear URL de forma segura decodificando caracteres y espacios
  let safePathname;
  try {
    const rawUrl = req.url.split('?')[0];
    safePathname = decodeURIComponent(rawUrl);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request: Invalid URL Encoding');
    return;
  }

  // Ruta por defecto: / -> /index.html
  if (safePathname === '/' || safePathname === '') {
    safePathname = '/index.html';
  }

  // Resolver la ruta absoluta y proteger contra Directory Traversal
  const filePath = path.normalize(path.join(ROOT_DIR, safePathname));

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  // Verificar existencia del archivo
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Fallback: Si no existe, servir index.html para SPA o 404
      if (err.code === 'ENOENT') {
        const fallback404 = path.join(ROOT_DIR, 'index.html');
        fs.readFile(fallback404, (err404, data404) => {
          if (!err404) {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-cache'
            });
            res.end(data404);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    // Si es un directorio, intentar servir su index.html
    let finalPath = filePath;
    if (stats.isDirectory()) {
      finalPath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(finalPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Headers de caché
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    };

    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, must-revalidate';
    } else if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.woff2'].includes(ext)) {
      headers['Cache-Control'] = 'public, max-age=86400'; // 1 día de caché
    }

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }

    const readStream = fs.createReadStream(finalPath);
    readStream.on('open', () => {
      res.writeHead(200, headers);
      readStream.pipe(res);
    });

    readStream.on('error', (streamErr) => {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error reading file');
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[Nancy García Eventos] Servidor activo en http://${HOST}:${PORT}`);
});

module.exports = server;
