const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.resolve(__dirname, '../client/build_webpack')));

// Api
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Api is ready for requests"}');
});


app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build_webpack', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
