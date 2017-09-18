const express = require('express');

// Require passport config.
require('./services/passport');

const PORT = process.env.PORT || 5000;
const app = express();
// Pass app to the authRoutes.
require('./routes/authRoutes')(app);

app.listen(PORT);
console.log(`Server is running at localhost:${PORT}`);
