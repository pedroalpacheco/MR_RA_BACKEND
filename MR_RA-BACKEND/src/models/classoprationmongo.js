const mongoose = require('mongoose');
const AllReclamacaomodel = require('./urlsiteschema');
const connection = require('./connection');

const classoperationmongo = {
  start: async () => {
    connection();
  },
  add: async (dt) => {
    try {
      const dadosreclames = new AllReclamacaomodel({
        link: dt.link,
        titulo: dt.titulo,
        local: dt.local,
        time: dt.time,
        id: dt.id,
        reclamacao: dt.reclamacao,
      });
      const dadosdeconsulta = await AllReclamacaomodel.find({ 
          titulo: dadosreclames.titulo 
        })
        .countDocuments();
      if (dadosdeconsulta === 0) {
        await dadosreclames.save();
        console.log(`Cadastrando: ${dadosreclames.titulo}`);
      }
    } catch (error) {
      console.log(`Não foi possivel salvar dados! => ${error}`);
    }
    return true;
  },
  close: async () => {
    setTimeout(() => { mongoose.connection.close(); }, 5000);
    console.log('>>FECHANDO CONN!!');
  },

};

module.exports = classoperationmongo;