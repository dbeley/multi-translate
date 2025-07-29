const { spawn } = require('child_process');
const http = require('http');

const child = spawn('node', ['server.js'], {
  env: { ...process.env, PORT: 4000 },
  stdio: 'inherit'
});

setTimeout(() => {
  http.get('http://localhost:4000/', res => {
    child.kill();
    if (res.statusCode === 404) {
      console.log('Server started');
      process.exit(0);
    } else {
      console.error('Unexpected status', res.statusCode);
      process.exit(1);
    }
  }).on('error', err => {
    child.kill();
    console.error(err);
    process.exit(1);
  });
}, 1000);
