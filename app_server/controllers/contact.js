const fs = require('fs');
const path = require('path');

const contact = (req, res) => {
  const contactData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/contact.json'), 'utf8'));
  res.render('contact', { title: 'Contact', ...contactData });
};

module.exports = { contact };