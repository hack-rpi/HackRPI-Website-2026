// The client sends commands and displays replies. All blockchain rules are on the server.
const readline = require('node:readline');
const socketClient = require('socket.io-client');

const serverUrl = process.env.SERVER_URL || 'http://127.0.0.1:3000';
const socket = socketClient.io(serverUrl);
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});
const commands = 'Commands: view | mine <text> | help | exit';

// Receiving: the server pushes updates whenever its chain changes.
socket.on('connect', function () {
  console.log(`Connected to ${serverUrl}\n${commands}`);
  terminal.prompt();
});
socket.on('chain:full', function (state) {
  const height = state.blocks.length - 1;
  const latestBlock = state.blocks[height];
  console.log(`\n[chain] height=${height} hash=${latestBlock.hash} valid=${state.validation.valid}`);
  terminal.prompt(true);
});
socket.on('mine:done', function (result) {
  console.log(`\n[mined] Block #${result.block.index} in ${result.elapsedMs}ms`);
});
socket.on('mine:error', function (error) {
  console.log(`\n[error] ${error.message}`);
  terminal.prompt(true);
});
socket.on('connect_error', function (error) {
  console.log(`\nCannot connect: ${error.message}`);
});
socket.on('disconnect', function (reason) {
  if (reason !== 'io client disconnect') {
    console.log('\nDisconnected; reconnecting…');
  }
});

// Sending: each command maps directly to one socket event.
terminal.on('line', function (line) {
  const words = line.trim().split(/\s+/);
  const command = words[0];
  const text = words.slice(1).join(' ');

  if (command === 'exit') {
    terminal.close();
    return;
  }
  if (!socket.connected && (command === 'mine' || command === 'view')) {
    console.log('Wait until the client connects to the server.');
    terminal.prompt();
    return;
  }

  if (command === 'mine') {
    socket.emit('mine:start', { data: text });
  } else if (command === 'view') {
    // The server calls this function with the requested snapshot.
    socket.emit('chain:get', {}, function (state) {
      console.log(JSON.stringify(state, null, 2));
      terminal.prompt();
    });
  } else {
    if (command !== '') {
      console.log(commands);
    }
    terminal.prompt();
  }
});

terminal.on('close', function () {
  socket.close();
});
