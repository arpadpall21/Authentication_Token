const express = require('express');
const session = require('express-session');
const config = require('./config.json');

const FileStore = require('session-file-store')(session);
const app = express();
app.use(express.json());

const host = 'localhost';
const port = 3000;

const fileStoreOption = {
  path: './sessionsLocalStorage',
  reapInterval: config.purgeSessionStorageIntervalHours * 60 * 60 * 1000,
}

app.use(session({
    store: new FileStore(fileStoreOption),
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.sessionTTLHours * 60 * 60 * 1000,
    }
}));

app.get('/', (req, res, next) => {
  req.session.requestCount ? req.session.requestCount += 1 : req.session.requestCount = 1;

  res.send(`session requested ${req.session.requestCount} times`);
});

app.listen(port, host, () => {
  console.log(`server listening on ${host}:${port}`);
});
