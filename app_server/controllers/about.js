const fs = require('fs');
const path = require('path');

const about = (req, res) => {
  const aboutData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/about.json'), 'utf8'));
  res.render('about', { title: 'About', ...aboutData });
};

module.exports = { about };