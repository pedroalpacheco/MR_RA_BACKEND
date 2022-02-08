const mongoose = require('mongoose');
const Allurlsmodel = require('./urlsiteschemaurls');
const connection = require('./connection');

const dados = [];

const classoperationmongourl = {
  start: async () => {
    connection();
  },
  add: async (dt) => {
    try {
      const urlreclames = new Allurlsmodel({
        link: dt.link,
      });
      const dadosdeconsulta = await Allurlsmodel.find({ 
          link: urlreclames.link 
        })
        .countDocuments();
      if (dadosdeconsulta === 0) {
        await urlreclames.save();
        console.log(`Cadastrando: ${urlreclames.link}`);
        dados.push(urlreclames.link);
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Não foi possivel salvar dados! => ${error}`);
    }
  },
  close: async () => {
    setTimeout(() => { mongoose.connection.close(); }, 5000);
    console.log('>>FECHANDO CONN!!');
  },
  mostra: async () => {
    const urlsnovas = dados;
    return urlsnovas;
  },

};

module.exports = classoperationmongourl;