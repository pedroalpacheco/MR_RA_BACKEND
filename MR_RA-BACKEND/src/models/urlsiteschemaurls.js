const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    link: String,
});

const Allurls = mongoose.model('allurls', schema);

module.exports = Allurls;