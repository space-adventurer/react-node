const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const configKeys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

// Models.
require('./models/user-model');
require('./models/survey-model');
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
require('./routes/surveyRoutes')(app);

// Serve static assets in production environment.
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets.
    // Like main.js and main.css.
    // This will return a certain file from client/build folder.
    app.use(express.static('client/build'));

    // Express will serve up the index.html if it
    // doesen't recognize the route.
    // This request handler will send index.html back. To any unknown
    // request path.
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT);
console.log(`Server is running at localhost:${PORT}`);
