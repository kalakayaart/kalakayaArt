const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const commands = `
    cd KalakayaArt && git status && git pull
  `;
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', (code, signal) => {
      console.log('Stream closed. Exit code: ' + code);
      console.log('--- OUTPUT ---\n' + output);
      conn.end();
    }).on('data', (data) => {
      output += data;
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: 'kalakaya.art',
  port: 22,
  username: 'dev1',
  password: 'Dev1234!'
});
