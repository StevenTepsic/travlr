const fs = require('fs');
const path = require('path');
const meals = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/meals.json'), 'utf8'));

const mealsCtrl = (req, res) => {
  res.render('meals', { title: 'Meals', meals });
};

module.exports = { meals: mealsCtrl };