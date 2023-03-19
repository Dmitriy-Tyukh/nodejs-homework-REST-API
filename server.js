const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.MONGO_URL;

mongoose.connect(URI_DB || 'localhost:27017')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running. Use our API on port: ${PORT}`));
    console.log('Mongo_DB successfully conected..');
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });