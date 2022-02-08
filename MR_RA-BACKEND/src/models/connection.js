const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const usudb = process.env.USERDB;
const passdb = process.env.PASSDB;

function connection() {
  const URL = `mongodb+srv://${usudb}:${passdb}@cluster0.n3grf.mongodb.net/allRecItau?retryWrites=true&w=majority`;
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', () => {
    console.log('DEU PAU:' + Error)
  });
  db.on('open', () => {
    console.log('CONEXAO ESTABELECIDA!')
  })
}
connection();
// module.exports = connection;