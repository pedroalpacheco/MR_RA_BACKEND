const speedTest = require('speedtest-net');
const internetAvaliable = require('internet-available');

internetAvaliable({
  timeout: 4000,
  retries: 10,
  domainName: 'reclameaqui.com.br',
  port: 53,
  host: '8.8.8.8',
}).then(() => {
  console.log('Site alvo no ar!');
  (async () => {
    try {
      const internet = await speedTest({
        acceptLicense: true, acceptGdpr: true
      });
      
      // Arredondar e transofrmar bytes em MB 
      const download = Math.round(parseFloat(
        internet.download.bytes) / 1024 / 1024
      );
      const upload = Math.round(parseFloat(
        internet.upload.bytes) / 1024 / 1024
      );
      const servidor = internet.server.name;
      const seuisp = internet.isp;
      const dados = {
        download,
        upload,
        servidor,
        seuisp,
      };
      console.log(dados);

    } catch (error) {
      console.log(error)
    } finally {
      process.exit(0);
    }
  })();
}).catch(() => {
  console.log('Sem internet!')
});