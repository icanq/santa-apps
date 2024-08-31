require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const { santaRouter } = require('./routes/santa.routes.js');
const { sendEmail, emailInterval } = require('./utils/email.utils');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;
const TARGET_PORT = 3000; // proxy port to FE

// middlewares
app.use(express.json());
app.use(morgan('combined'));

// static files path
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(
  '/coverage',
  express.static(path.join(__dirname, '/../coverage/lcov-report'))
);

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/santa', santaRouter);
apiRouter.get('/coverage', (req, res) => {
  const covPath = path.join(__dirname, '../coverage/lcov-report/index.html');
  res.sendFile(covPath);
});
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 200,
    message: 'Running',
  });
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});

// i guess glitch.com choose the first open port, using proxy to the front-end side instead of serve static files
// since the front-end side need to be build first to be used
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res) => {
    const options = {
      hostname: 'localhost',
      port: TARGET_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);

    proxyReq.on('error', (error) => {
      console.error('Proxy error:', error);
      res.status(500).send('Proxy error');
    });
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests :)
const server = app.listen(PORT, function () {
  sendEmail();
  console.log('Your app is listening on port ' + server.address().port);
});

process.on('SIGINT', () => {
  clearInterval(emailInterval);
  server.close(() => {
    console.log('Stopping..');
    process.exit();
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
