import express from 'express';
import session from 'express-session';
import passport from 'passport';
import initFileStore from 'session-file-store';
import { getConfig } from './utils/helpers.mjs';

const config = getConfig();
const host = config.host || 'localhost';
const port = config.port || 3000;

const FileStore = initFileStore(session);

const app = express();
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

const fileStoreOption = {
  path: './storage/sessions',
  reapInterval: config.purgeExpiredSessionIntervalHours * 60 * 60,
}

app.use(session({
    store: new FileStore(fileStoreOption),
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.sessionTTLHours * 60 * 60 * 1000,
    }
}));


// ----
app.get('/', (req, res, next) => {
  req.session.requestCount ? req.session.requestCount += 1 : req.session.requestCount = 1;

  res.send(`session requested ${req.session.requestCount} times`);
});
// ----



app.listen(port, host, () => {
  console.log(`server started, listening on [${host}:${port}]...`);
});
