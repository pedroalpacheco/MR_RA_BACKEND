const os = require('os');
const shell = require('shelljs');
const schedule = require('node-schedule');

const nodeVersion = process.versions.node.split('.')[0];

if (nodeVersion < 16) {
  throw new Error('É requirido a versão do node 16 ou mais');
}

const job = schedule.scheduleJob('*/10 * * * *', () => {
  const appdir = '/MR_RA-BACKEND';
  const dirhome = os.homedir() + appdir;
  shell.cd(dirhome);
  shell.exec('node src/service/clickpg.js');
  console.log('Exec agenda>>');
});