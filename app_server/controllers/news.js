const fs = require('fs');
const path = require('path');
const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/news.json'), 'utf8'));

const news = (req, res) => {
  res.render('news', { title: 'News', ...newsData });
};

module.exports = { news };