const { Server } = require("socket.io");
const ACTIONS = require("./Actions");

function getAllConnectedClients(io, roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: io.sockets.sockets.get(socketId).username,
        admin: io.sockets.sockets.get(socketId).admin,
      };
    }
  );
}

function socketSetup(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("CHAT", (msg) => {
      const clients = getAllConnectedClients(io, msg.room_id);
      clients.forEach(({ socketId, username }) => {
        io.to(socketId).emit(ACTIONS.CHAT, msg, username);
      });
    });
  });
}

module.exports = socketSetup;
