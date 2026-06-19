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
});

const sshConfig = {
  host: process.env.SSH_HOST,
  port: Number(process.env.SSH_PORT || 22),
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
};

if (!sshConfig.host || !sshConfig.username || !sshConfig.password) {
  throw new Error('Missing SSH_HOST, SSH_USER, or SSH_PASSWORD environment variables');
}

conn.connect(sshConfig);
