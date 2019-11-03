const path = require('path');
const express = require('express');

const app = express();

app.use('/', express.static(path.join(__dirname, '/docs')));

// Serve the files on port 3000.
app.listen(80, () => console.log('Ready on http://localhost\n'));
