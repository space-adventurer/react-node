const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const configKeys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user-model');
// Require passport config.
require('./services/passport');

// Establish connection to MongoDB.
mongoose.connect(configKeys.mongoURI, {
    useMongoClient: true
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [configKeys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Pass app to the authRoutes.
require('./routes/authRoutes')(app);

app.listen(PORT);
console.log(`Server is running at localhost:${PORT}`);
