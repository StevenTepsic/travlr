const fs = require('fs');
const path = require('path');
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/rooms.json'), 'utf8'));

const roomsCtrl = (req, res) => {
  res.render('rooms', { title: 'Rooms', rooms });
};

module.exports = { rooms: roomsCtrl };