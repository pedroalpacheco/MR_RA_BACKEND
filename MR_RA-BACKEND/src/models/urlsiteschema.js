const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    link: String,
    titulo: String,
    local: String,
    data: String,
    id: String,
    reclamacao: String,
});

const AllReclamacao = mongoose.model('allReclamacao', schema);

module.exports = AllReclamacao;