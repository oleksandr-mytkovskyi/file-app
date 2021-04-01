const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());

app.use(express.json());
// app.use(multipart());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('app/public'));

// connect to DB 
const db = require('./model/index');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to file app.' });
});

require('./routes/file.routes')(app);
require('./routes/auth.routes')(app);

app.use(errorMiddleware);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});